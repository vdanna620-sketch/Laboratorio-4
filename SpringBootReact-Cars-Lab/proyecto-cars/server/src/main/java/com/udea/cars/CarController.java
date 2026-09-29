package com.udea.cars;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para el CRUD completo de Car.
 *
 * Endpoints disponibles:
 *   GET    /cars           -> lista todos los carros
 *   GET    /cars/{id}      -> obtiene un carro por id
 *   POST   /cars           -> crea un nuevo carro
 *   PUT    /cars/{id}      -> actualiza un carro existente
 *   DELETE /cars/{id}      -> elimina un carro
 *   GET    /cool-cars      -> (se mantiene del laboratorio original) filtra
 *                             los vehiculos "menos lujosos"
 *
 * Se habilita @CrossOrigin a nivel de clase para que todos los metodos
 * puedan ser consumidos desde la aplicacion de React en
 * http://localhost:3000
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping
public class CarController {

    private final CarRepository repository;

    public CarController(CarRepository repository) {
        this.repository = repository;
    }

    // ---------------------------------------------------------------
    // GET /cars  -> lista completa de carros (usada por CarList.tsx)
    // ---------------------------------------------------------------
    @GetMapping("/cars")
    public Collection<Car> allCars() {
        return repository.findAll();
    }

    // ---------------------------------------------------------------
    // GET /cars/{id} -> obtener un carro puntual
    // ---------------------------------------------------------------
    @GetMapping("/cars/{id}")
    public ResponseEntity<Car> getCar(@PathVariable Long id) {
        Optional<Car> car = repository.findById(id);
        return car.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ---------------------------------------------------------------
    // POST /cars -> crear un nuevo carro
    // ---------------------------------------------------------------
    @PostMapping("/cars")
    public ResponseEntity<Car> createCar(@RequestBody Car car) {
        // Se asegura que sea un carro nuevo (ignora un id que llegue del front)
        car.setId(null);
        Car saved = repository.save(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ---------------------------------------------------------------
    // PUT /cars/{id} -> actualizar un carro existente
    // ---------------------------------------------------------------
    @PutMapping("/cars/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(carDetails.getName());
                    existing.setModel(carDetails.getModel());
                    existing.setColor(carDetails.getColor());
                    existing.setPrice(carDetails.getPrice());
                    existing.setYear(carDetails.getYear());
                    Car updated = repository.save(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ---------------------------------------------------------------
    // DELETE /cars/{id} -> eliminar un carro (extra, no obligatorio)
    // ---------------------------------------------------------------
    @DeleteMapping("/cars/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ---------------------------------------------------------------
    // GET /cool-cars -> se mantiene del laboratorio original
    // ---------------------------------------------------------------
    @GetMapping("/cool-cars")
    public Collection<Car> coolCars() {
        return repository.findAll().stream()
                .filter(this::isCool)
                .collect(Collectors.toList());
    }

    private boolean isCool(Car car) {
        return !car.getName().equals("AMC Gremlin") &&
                !car.getName().equals("Triumph Stag") &&
                !car.getName().equals("Ford Pinto") &&
                !car.getName().equals("Yugo GV");
    }
}
