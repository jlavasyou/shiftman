import { NextResponse } from "next/server";
import { initializeDatabase, Shift, Application } from "../../db";
import { Op } from "sequelize";
import { getCoordinates, calculateDistance } from "../../distance";

const isValidZipCode = (zip) => {
  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
};

export async function GET(req) {
  // Parse query parameters from the request URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const zip = url.searchParams.get("zip");
  const distanceInMiles = url.searchParams.get("distanceInMiles");

  // If zip code or distance is null, exit with appropriate response
  if (!zip || !distanceInMiles) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  // Validate zip code format
  if (!isValidZipCode(zip)) {
    return NextResponse.json({ error: "Malformed zip code" }, { status: 400 });
  }

  // Validate distance is a number
  const distance = parseFloat(distanceInMiles);
  if (isNaN(distance)) {
    return NextResponse.json(
      { error: "Distance must be a number" },
      { status: 400 }
    );
  }

  try {
    // Initialize the database
    await initializeDatabase();

    // Get coordinates for the provided zip code
    const coordinates = await getCoordinates(zip);

    const shifts = await Shift.findAll({
      where: {
        zipCode: {
          [Op.ne]: zip,
        },
      },
      include: [{
        model: Application,
        attributes: ['id'],
      }],
    });

    // Fetch coordinates for all shifts in parallel
    const shiftCoordinatesPromises = shifts.map(shift => getCoordinates(shift.zipCode));
    const shiftCoordinates = await Promise.all(shiftCoordinatesPromises);

    // Filter shifts based on distance
    const nearbyShifts = shifts.filter((shift, index) => {
      const distance = calculateDistance(coordinates, shiftCoordinates[index]);
      return distance <= distanceInMiles;
    });

    return NextResponse.json(nearbyShifts, { status: 200 });
  } catch (error) {
    console.error("Error fetching shifts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
