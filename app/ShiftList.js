import { useState } from "react";
import Modal from "./Modal";

const ShiftList = ({ shifts, onApply, isMyShifts }) => {
  const [selectedShift, setSelectedShift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = () => {
    if (selectedShift) {
      onApply(selectedShift.id);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <ul className="space-y-4">
        {shifts.map((shift) => (
          <li key={shift.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {shift.description || "No description"}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(shift.startTime).toLocaleString()} - Duration:{" "}
                  {shift.duration} hours
                </p>
                <p className="text-sm text-gray-600">Zip Code: {shift.zipCode}</p>
              </div>
              {!isMyShifts && (
                <button
                  onClick={() => {
                    setSelectedShift(shift);
                    setIsModalOpen(true);
                  }}
                  className={`px-4 py-2 rounded ${shift.Applications && shift.Applications.length > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  disabled={shift.Applications && shift.Applications.length > 0}
                >
                  {shift.Applications && shift.Applications.length > 0 ? "Applied" : "Apply"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Apply for Shift</h2>
        {selectedShift && (
          <div className="mb-4">
            <p>
              Are you sure you want to apply for this shift?
            </p>
            <p className="mt-2">
              <strong>Date:</strong> {new Date(selectedShift.startTime).toLocaleString()}
            </p>
            <p>
              <strong>Duration:</strong> {selectedShift.duration} hours
            </p>
            <p>
              <strong>Zip Code:</strong> {selectedShift.zipCode}
            </p>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm Application
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ShiftList;
