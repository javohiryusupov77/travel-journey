import React, { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [destinations, setDestinations] = useState([
    { id: 1, name: "Paris", description: "City of Light" },
    { id: 4, name: "Rome", description: "The Eternal City" },
    { id: 5, name: "Sydney", description: "Harbour City" },
    { id: 6, name: "Cape Town", description: "Mother City" },
  ]);
  const storageDestinantion = JSON.stringify(destinations);
  localStorage.setItem("destinations", storageDestinantion);

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
    if (!newDestination.name || !newDestination.description) {
      Swal.fire({
        title: "Error",
        text: "Occupy all the space",
        icon: "question",
      });
      return;
    }

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
    Swal.fire({
      title: "Your travel place has been deleted",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
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
            type="text"
            name="name"
            placeholder="Destination Name"
            value={newDestination.name}
            onChange={handleInputChange}
          />
          <input
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
