package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InstructionStep {
    private int number;
    private String step;
    private Ingredients[] ingredients;
    private Equipment[] equipment;
}
