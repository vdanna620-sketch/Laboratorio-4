package com.udea.cars;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarsApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarsApplication.class, args);
    }

    /**
     * Carga datos iniciales de prueba, ahora incluyendo modelo, color,
     * precio y año para cada vehiculo.
     */
    @Bean
    ApplicationRunner init(CarRepository repository) {
        return args -> {
            List<Car> demoCars = Arrays.asList(
                    new Car(null, "Ferrari", "488 GTB", "Rojo", 280000.0, 2023),
                    new Car(null, "Jaguar Car", "F-Type", "Verde", 95000.0, 2022),
                    new Car(null, "Porsche", "911 Carrera", "Blanco", 120000.0, 2023),
                    new Car(null, "Lamborghini", "Huracan", "Amarillo", 260000.0, 2024),
                    new Car(null, "Bugatti", "Chiron", "Azul", 3000000.0, 2021),
                    new Car(null, "AMC Gremlin", "Base", "Naranja", 3500.0, 1974),
                    new Car(null, "Triumph Stag", "Base", "Beige", 4200.0, 1976),
                    new Car(null, "Ford Pinto", "Base", "Cafe", 2800.0, 1978),
                    new Car(null, "Yugo GV", "Base", "Gris", 1500.0, 1985)
            );

            demoCars.forEach(repository::save);

            repository.findAll().forEach(System.out::println);
        };
    }
}
