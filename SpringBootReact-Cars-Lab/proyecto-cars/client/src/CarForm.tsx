import React, { useState, useEffect } from 'react';
import { Car } from './Car';

interface CarFormProps {
  initialCar: Car | null;
  onSubmit: (car: Car) => void;
  onCancel: () => void;
}

const emptyCar: Car = {
  name: '',
  model: '',
  color: '',
  price: 0,
  year: new Date().getFullYear(),
};

const CarForm: React.FC<CarFormProps> = ({ initialCar, onSubmit, onCancel }) => {
  const [car, setCar] = useState<Car>(initialCar ?? emptyCar);

  // Si cambia el carro a editar (por ejemplo, el usuario hace click en
  // "Editar" sobre otra fila), se actualiza el estado del formulario.
  useEffect(() => {
    setCar(initialCar ?? emptyCar);
  }, [initialCar]);

  const handleChange = (
    field: keyof Car,
    value: string
  ) => {
    setCar(prev => ({
      ...prev,
      [field]: field === 'price' || field === 'year' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(car);
  };

  const isEditing = Boolean(initialCar && initialCar.id);

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Editar vehiculo' : 'Agregar nuevo vehiculo'}</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nombre / Marca</label>
          <input
            id="name"
            type="text"
            required
            value={car.name}
            onChange={e => handleChange('name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Modelo</label>
          <input
            id="model"
            type="text"
            value={car.model}
            onChange={e => handleChange('model', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            id="color"
            type="text"
            value={car.color}
            onChange={e => handleChange('color', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Precio (USD)</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={car.price}
            onChange={e => handleChange('price', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Año</label>
          <input
            id="year"
            type="number"
            min="1900"
            max="2100"
            value={car.year}
            onChange={e => handleChange('year', e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" style={{ marginLeft: 8 }}>
          {isEditing ? 'Guardar cambios' : 'Crear vehiculo'}
        </button>
      </div>
    </form>
  );
};

export default CarForm;
