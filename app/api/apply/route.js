import { NextResponse } from "next/server";
import { initializeDatabase, Shift, Application } from "../../db";

export async function POST(req) {
  const { name, shift: shiftId } = await req.json();

  if (!name || !shiftId) {
    return NextResponse.json({ error: "Name and shift ID are required" }, { status: 400 });
  }

  try {
    await initializeDatabase();

    const shift = await Shift.findOne({
      where: { id: shiftId },
    });

    if (!shift) {
      return NextResponse.json({ error: "Shift not found" }, { status: 404 });
    }

    const existingApplication = await Application.findOne({
      where: { shiftId },
    });
    if (!existingApplication) {
      await Application.create({
        provider: name,
        shiftId: shift.id,
      });
      return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Shift already has an application" }, { status: 409 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}