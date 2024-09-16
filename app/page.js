"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import ShiftList from "./ShiftList";
//import { Shift } from "./Shift";

export default function Home() {
  const [name, setName] = useState("Mister Exemplar");
  const [zipCode, setZipCode] = useState("");
  const [distance, setDistance] = useState(10);
  const [myShifts, setMyShifts] = useState([]);
  const [availableShifts, setAvailableShifts] = useState([]);

  useEffect(() => {
    fetchMyShifts();

  }, [name]);

  useEffect(() => {
    if (zipCode) {
      fetchAvailableShifts();
    }
  }, [zipCode, distance]);

  const fetchMyShifts = async () => {
    try {
      const response = await fetch(
        `/api/my-shifts?name=${encodeURIComponent(name)}`
      );
      if (!response.ok) throw new Error("Failed to fetch my shifts");
      const data = await response.json();
      setMyShifts(data);
    } catch (error) {
      console.error("Error fetching my shifts:", error);
    }
  };

  const fetchAvailableShifts = async () => {
    try {
      const response = await fetch(
        `/api/search?zip=${encodeURIComponent(
          zipCode
        )}&distanceInMiles=${distance}`
      );
      if (!response.ok) throw new Error("Failed to fetch available shifts");
      const data = await response.json();
      setAvailableShifts(data);
    } catch (error) {
      console.error("Error fetching available shifts:", error);
    }
  };

  const handleApply = async (shiftId) => {
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, shift: shiftId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      fetchMyShifts();
      fetchAvailableShifts();
    } catch (error) {
      console.error("Error applying for shift:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to apply for shift. Please try again."
      );
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shift Management</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Search for Shifts</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter ZIP code"
            className="border p-2 flex-grow"
          />
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance (miles)"
            className="border p-2 w-24"
          />
          <button
            onClick={fetchAvailableShifts}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Shifts</h2>
        <ShiftList shifts={availableShifts} onApply={handleApply} isMyShifts={false} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">My Shifts</h2>
        <ShiftList shifts={myShifts} onApply={handleApply} isMyShifts={true} />
      </div>
    </main>
  );
}
