package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InstructionStep {
    private int number;
    private String step;
    private List<Ingredients> ingredients;
    private List<Equipment> equipment;
}
