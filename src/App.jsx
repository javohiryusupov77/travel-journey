import React, { useState } from "react";
import "./App.css";

function App() {
  const [destinations, setDestinations] = useState([
    { id: 1, name: "Paris", description: "City of Light" },
    { id: 2, name: "Tokyo", description: "Land of the Rising Sun" },
  ]);

  const [newDestination, setNewDestination] = useState({
    name: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination({ ...newDestination, [name]: value });
  };

  const handleAddDestination = () => {
    if (editMode) {
      setDestinations(
        destinations.map((destination) =>
          destination.id === currentDestination.id
            ? { ...currentDestination, ...newDestination }
            : destination
        )
      );
      setEditMode(false);
      setCurrentDestination(null);
    } else {
      const newId = destinations.length
        ? destinations[destinations.length - 1].id + 1
        : 1;
      setDestinations([...destinations, { id: newId, ...newDestination }]);
    }
    setNewDestination({ name: "", description: "" });
  };

  const handleDeleteDestination = (id) => {
    setDestinations(
      destinations.filter((destination) => destination.id !== id)
    );
  };

  const handleEditDestination = (destination) => {
    setEditMode(true);
    setCurrentDestination(destination);
    setNewDestination({
      name: destination.name,
      description: destination.description,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Journey</h1>
        <div>
          <h2>Destinations</h2>
          <ul>
            {destinations.map((destination) => (
              <li key={destination.id}>
                <strong>{destination.name}</strong>: {destination.description}
                <button onClick={() => handleEditDestination(destination)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteDestination(destination.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{editMode ? "Edit Destination" : "Add New Destination"}</h2>
          <input
            required
            type="text"
            name="name"
            placeholder="Destination Name"
            value={newDestination.name}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="description"
            placeholder="Description"
            value={newDestination.description}
            onChange={handleInputChange}
          />
          <button onClick={handleAddDestination}>
            {editMode ? "Update Destination" : "Add Destination"}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
