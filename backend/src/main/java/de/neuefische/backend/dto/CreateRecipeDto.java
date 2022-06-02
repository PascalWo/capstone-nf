package de.neuefische.backend.dto;

import de.neuefische.backend.model.Ingredients;
import de.neuefische.backend.model.Instructions;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRecipeDto {

    private String title;
    private String image;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private int readyInMinutes;
    private int servings;
    private String summary;
    private List<Ingredients> extendedIngredients;
    private String instructions;
    private List<Instructions> analyzedInstructions;
}
