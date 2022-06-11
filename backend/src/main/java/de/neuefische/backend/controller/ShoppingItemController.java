package de.neuefische.backend.controller;

import de.neuefische.backend.dto.CreateShoppingItemDto;
import de.neuefische.backend.model.ShoppingItem;
import de.neuefische.backend.service.ShoppingItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoppingitem")
public class ShoppingItemController {

    private final ShoppingItemService shoppingItemService;

    public ShoppingItemController(ShoppingItemService shoppingItemService) {
        this.shoppingItemService = shoppingItemService;
    }

    @GetMapping
    public List<ShoppingItem> getShoppingItems() {
        return shoppingItemService.getShoppingItems();
    }

    @PostMapping
    public ShoppingItem postNewItem(@RequestBody CreateShoppingItemDto newItem) {
        return shoppingItemService.addNewItem(newItem);
    }

    @DeleteMapping("{id}")
    public void deleteShoppingItem(@PathVariable String id) {
        shoppingItemService.deleteShoppingItem(id);
    }

    @PostMapping("/list")
    public List<ShoppingItem> postNewItemList(@RequestBody List<CreateShoppingItemDto> newItemList) {
       return shoppingItemService.addNewItemList(newItemList);
    }
}

