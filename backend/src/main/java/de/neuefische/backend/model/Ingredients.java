package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ingredients {

    private String aisle;
    private double amount;
    private String consitency;
    private int id;
    private String image;
    private String name;
    private String original;
    private String originalName;
    private String unit;

}
