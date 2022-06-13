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

    @GetMapping("{id}")
    public ShoppingItem getShoppingItemById(@PathVariable String id){
        return shoppingItemService.getShoppingItemById(id);
    }

    @PutMapping("{id}")
    public ShoppingItem updateShoppingItemById(@PathVariable String id, @RequestBody CreateShoppingItemDto updatedItem) {
        return shoppingItemService.updateShoppingItemByID(id, updatedItem);
    }
    @PutMapping()
    public ShoppingItem updateShoppingItemById(@RequestBody ShoppingItem updatedItem) {
        return shoppingItemService.updateShoppingItemByID(updatedItem);
    }
}
