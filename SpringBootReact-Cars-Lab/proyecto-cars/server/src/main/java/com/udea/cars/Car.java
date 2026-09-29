package com.udea.cars;

import java.io.Serializable;
import lombok.*;

import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;

/**
 * Entidad Car.
 *
 * Se agregaron los atributos solicitados en el ejercicio:
 *  - model  (modelo del vehiculo)
 *  - color  (color del vehiculo)
 *  - price  (precio del vehiculo)
 *  - year   (anio del vehiculo, atributo adicional)
 *
 * Gracias a Lombok (@Data) no es necesario escribir manualmente los
 * getters, setters, equals, hashCode y toString.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Car implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    private @NonNull String name;

    private String model;

    private String color;

    private Double price;

    private Integer year;
}
