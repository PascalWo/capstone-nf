package de.neuefische.backend.dto;

import de.neuefische.backend.model.Ingredients;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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
    private BigDecimal pricePerServing;
    private int readyInMinutes;
    private int servings;
    private String summary;
    private Ingredients[] extendedIngredients;
}
