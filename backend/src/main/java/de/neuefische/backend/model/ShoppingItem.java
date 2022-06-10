package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "shoppingItems")
public class ShoppingItem {

    @Id
    private String id;
    private String name;
    private int amount;
    private String unit;
    private boolean done;
}
