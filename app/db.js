import { Sequelize, DataTypes } from "sequelize";
import sqlite3 from "sqlite3";
import { faker } from "@faker-js/faker";

// Initialize Sequelize with an in-memory SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // or provide a path to a file for persistent storage
  dialectModule: sqlite3,
  logging: false,
});

// Define the Shift model
const Shift = sequelize.define(
  "Shift",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Define the Application model
const Application = sequelize.define(
  "Application",
  {
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Shift,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

// Define the association
Shift.hasMany(Application, { foreignKey: "shiftId" });
Application.belongsTo(Shift, { foreignKey: "shiftId" });

// Sync the models with the database


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

export { Shift, Application, sequelize, initializeDatabase };
