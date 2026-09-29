package com.udea.cars;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Repositorio JPA para Car.
 *
 * Se mantiene expuesto vía Spring Data REST (HAL Browser) en la ruta
 * "/repository/cars" tal como se explora en la primera parte del laboratorio
 * (http://localhost:8080/browser/index.html#http://localhost:8080/repository/cars).
 *
 * El path se cambió de "/cars" a "/repository/cars" para no chocar con los
 * endpoints personalizados de CRUD (GET/POST/PUT/DELETE) que se agregaron en
 * CarController y que también viven en "/cars", los cuales son los que
 * consume la aplicación de React.
 */
@RepositoryRestResource(path = "repository/cars", collectionResourceRel = "cars")
public interface CarRepository extends JpaRepository<Car, Long> {

}
