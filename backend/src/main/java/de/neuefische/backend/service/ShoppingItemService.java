package de.neuefische.backend.service;

import de.neuefische.backend.dto.CreateShoppingItemDto;
import de.neuefische.backend.model.ShoppingItem;
import de.neuefische.backend.repository.ShoppingItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
        if(item.getName() == null || item.getName().equals("")){
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

    public List<ShoppingItem> addNewItemList(List<CreateShoppingItemDto> dtoList){
        List<ShoppingItem> shoppingItemList = dtoList.stream().map(dto -> new ShoppingItem(dto.getName(), dto.getAmount(), dto.getUnit(), dto.isDone())).toList();
        return shoppingItemRepo.insert(shoppingItemList);
    }
    public ShoppingItem updateShoppingItemByID(String id, CreateShoppingItemDto itemToUpdate) {
        if(!shoppingItemRepo.existsById(id)){
            throw new NoSuchElementException("Item with ID: " + id + "does not exist!");
        }
        if (itemToUpdate.getName() == null || itemToUpdate.getName().equals("")){
            throw new IllegalArgumentException("Item name does not be empty!");
        }
        ShoppingItem updatedItem = new ShoppingItem(itemToUpdate);
        updatedItem.setId(id);
        return shoppingItemRepo.save(updatedItem);
    }

    public ShoppingItem getShoppingItemById(String id) {
        return shoppingItemRepo.findById(id)
                .orElseThrow( () -> new NoSuchElementException("Shoppingitem not found with id: " + id));
    }

    public ShoppingItem updateShoppingItemByID(ShoppingItem updatedItem) {
        return shoppingItemRepo.save(updatedItem);
    }
}
