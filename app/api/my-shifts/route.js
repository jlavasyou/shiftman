import { NextResponse } from "next/server";
import { Shift, Application, sequelize } from "../../db"; // Adjust the import path as necessary

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    // Ensure the database is initialized
    await sequelize.sync();

    // Fetch applications for the given provider name
    const applications = await Application.findAll({
      where: { provider: name },
      include: [Shift],
    });

    // Extract shift IDs from the applications
    const myShiftIds = applications.map((app) => app.shiftId);

    // Fetch shifts based on the extracted shift IDs
    const myShifts = await Shift.findAll({
      where: { id: myShiftIds },
    });

    // Return the fetched shifts as a JSON response
    return NextResponse.json(myShifts);
  } catch (error) {
    console.error("Error fetching shifts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
