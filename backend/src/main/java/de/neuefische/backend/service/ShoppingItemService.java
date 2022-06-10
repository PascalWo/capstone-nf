package de.neuefische.backend.service;

import de.neuefische.backend.dto.CreateShoppingItemDto;
import de.neuefische.backend.model.ShoppingItem;
import de.neuefische.backend.repository.ShoppingItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingItemService {

    private final ShoppingItemRepo shoppingItemRepo;

    @Autowired
    public ShoppingItemService(ShoppingItemRepo shoppingItemRepo) {
        this.shoppingItemRepo = shoppingItemRepo;
    }

    public List<ShoppingItem> getShoppingItems() {
        return shoppingItemRepo.findAll();
    }

    public ShoppingItem addNewItem(CreateShoppingItemDto item) {
        ShoppingItem newItem = new ShoppingItem();
        if(item.getName() == null){
            throw new IllegalArgumentException("Name of the given shopping item was null");
        }
        newItem.setName(item.getName());
        newItem.setDone(item.isDone());
        newItem.setAmount(item.getAmount());
        newItem.setUnit(item.getUnit());

        return shoppingItemRepo.insert(newItem);
    }

    public void deleteShoppingItem(String id) {
        shoppingItemRepo.deleteById(id);
    }
}
