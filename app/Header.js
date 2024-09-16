import { useState } from "react";
import Modal from "./Modal";

const Header = ({
  name,
  setName,
  zipCode,
  setZipCode,
  distance,
  setDistance,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleSaveName = () => {
    setName(tempName);
    setIsModalOpen(false);
  };

  return (
    <header className="bg-primary p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-background">
          Shift Management App
        </h1>
        <div className="flex items-center">
          <span className="mr-2 text-background">{name}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-secondary text-background px-2 py-1 rounded hover:opacity-80"
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter ZIP code"
          className="border p-2 rounded text-foreground"
        />
        <div className="flex items-center">
          <span className="mr-2 text-background">
            Distance: {distance} miles
          </span>
          <input
            type="range"
            min="1"
            max="100"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-32"
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Name</h2>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleSaveName}
          className="bg-secondary text-background px-4 py-2 rounded hover:opacity-80"
        >
          Save
        </button>
      </Modal>
    </header>
  );
};

export default Header;
