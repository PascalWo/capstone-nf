package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "recipes")
public class Recipe {

    @Id
    private String id;
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
