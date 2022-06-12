package de.neuefische.backend.model;

import de.neuefische.backend.dto.CreateShoppingItemDto;
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

    public ShoppingItem(CreateShoppingItemDto dto){
        this.name = dto.getName();
        this.amount = dto.getAmount();
        this.unit = dto.getUnit();
        this.done = dto.isDone();
    }

    @Id
    private String id;
    private String name;
    private int amount;
    private String unit;
    private boolean done;

    public ShoppingItem(String name, int amount, String unit, boolean done) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.done = done;
    }
}
