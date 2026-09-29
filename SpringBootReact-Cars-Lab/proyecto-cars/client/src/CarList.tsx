import React, { useState, useEffect, useCallback } from 'react';
import { Car } from './Car';
import CarForm from './CarForm';
import GiphyImage from './GiphyImage';

const API_URL = 'http://localhost:8080/cars';

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const fetchCars = useCallback(() => {
    setIsLoading(true);
    setError('');

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de carros');
        }
        return response.json();
      })
      .then((data: Car[]) => {
        setCars(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // ----------------------------------------------------------------
  // Crear (POST) o Actualizar (PUT), segun si el carro trae id o no
  // ----------------------------------------------------------------
  const handleFormSubmit = (car: Car) => {
    const isEditing = Boolean(car.id);
    const url = isEditing ? `${API_URL}/${car.id}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(
            isEditing
              ? 'No se pudo actualizar el vehiculo'
              : 'No se pudo crear el vehiculo'
          );
        }
        return response.json();
      })
      .then(() => {
        setShowForm(false);
        setEditingCar(null);
        fetchCars();
      })
      .catch(err => setError(err.message));
  };

  const handleDelete = (car: Car) => {
    if (!car.id) return;
    if (!window.confirm(`¿Eliminar "${car.name}"?`)) return;

    fetch(`${API_URL}/${car.id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo eliminar el vehiculo');
        }
        fetchCars();
      })
      .catch(err => setError(err.message));
  };

  const startEdit = (car: Car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const startCreate = () => {
    setEditingCar(null);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };

  return (
    <div className="car-app-container">
      <div className="toolbar">
        {!showForm && (
          <button className="btn btn-primary" onClick={startCreate}>
            + Agregar vehiculo
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <CarForm
          initialCar={editingCar}
          onSubmit={handleFormSubmit}
          onCancel={cancelForm}
        />
      )}

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="car-grid">
          {cars.map(car => (
            <div className="car-card" key={car.id}>
              <h3>{car.name}</h3>
              <p className="car-attr">Modelo: {car.model}</p>
              <p className="car-attr">Color: {car.color}</p>
              <p className="car-attr">
                Precio: {car.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </p>
              <p className="car-attr">Año: {car.year}</p>

              <GiphyImage name={car.name} />

              <div className="car-card-actions">
                <button className="btn btn-secondary" onClick={() => startEdit(car)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(car)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
