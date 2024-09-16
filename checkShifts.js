import { Shift, sequelize } from "./app/db.js";
import { faker } from "@faker-js/faker";

const initializeDatabase = async () => sequelize.sync().then(async (sequelize) => {
  // Seed the Shift database with random shifts
  for (let i = 0; i < 50; i++) {
    await Shift.create({
      description: faker.lorem.sentence(),
      startTime: faker.date.future(),
      duration: faker.number.int({ min: 1, max: 8 }), // duration in hours
      zipCode: (Math.floor(Math.random() * 11) + 78700).toString(),
    });
  }
  console.log("Database seeded with 50 random shifts in area code 78702");
  return sequelize
});

const checkShifts = async () => {
  try {
    // Ensure the database is initialized
    await sequelize.sync();

    await initializeDatabase();


    // Fetch all shifts
    const shifts = await Shift.findAll();

    // Log the shifts
    console.log("Shifts stored in the database:");
    shifts.forEach(shift => {
      console.log(shift.toJSON());
    });
  } catch (error) {
    console.error("Error fetching shifts:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

checkShifts();