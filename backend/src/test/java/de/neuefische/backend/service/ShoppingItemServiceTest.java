package de.neuefische.backend.service;

import de.neuefische.backend.dto.CreateRecipeDto;
import de.neuefische.backend.dto.CreateShoppingItemDto;
import de.neuefische.backend.model.ShoppingItem;
import de.neuefische.backend.repository.ShoppingItemRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ShoppingItemServiceTest {
    private final ShoppingItemRepo shoppingItemRepo = mock(ShoppingItemRepo.class);
    private final ShoppingItemService shoppingItemService = new ShoppingItemService(shoppingItemRepo);

    ShoppingItem item1() {
        return ShoppingItem.builder()
                .id("1")
                .name("Apfel")
                .amount(3)
                .unit("stk")
                .done(false)
                .build();
    }

    ShoppingItem item2() {
        return ShoppingItem.builder()
                .id("2")
                .name("Käse")
                .amount(200)
                .unit("g")
                .done(false)
                .build();
    }

    ShoppingItem itemToAdd() {
        return ShoppingItem.builder()
                .name("Mehl")
                .amount(500)
                .unit("g")
                .done(false)
                .build();
    }

    ShoppingItem itemToAdd2() {
        return ShoppingItem.builder()
                .name("Nudeln")
                .amount(500)
                .unit("g")
                .done(false)
                .build();
    }

    CreateShoppingItemDto newItemDto() {
        return CreateShoppingItemDto.builder()
                .name("Mehl")
                .amount(500)
                .unit("g")
                .done(false).build();
    }

    CreateShoppingItemDto newItemDto2() {
        return CreateShoppingItemDto.builder()
                .name("Nudeln")
                .amount(500)
                .unit("g")
                .done(false)
                .build();
    }

    @Test
    void getShoppingItems() {
        //GIVEN
        when(shoppingItemRepo.findAll()).thenReturn(List.of(item1(), item2()));
        //WHEN

        List<ShoppingItem> actual = shoppingItemService.getShoppingItems();

        //THEN
        List<ShoppingItem> expected = List.of(
                ShoppingItem.builder()
                        .id("1")
                        .name("Apfel")
                        .amount(3)
                        .unit("stk")
                        .done(false).build(),
                ShoppingItem.builder()
                        .id("2")
                        .name("Käse")
                        .amount(200)
                        .unit("g")
                        .done(false).build());

        verify(shoppingItemRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addNewItem() {
        //GIVEN
        when(shoppingItemRepo.insert(itemToAdd())).thenReturn(ShoppingItem.builder()
                .id("1234-test")
                .name("Mehl")
                .amount(500)
                .unit("g")
                .done(false).build());

        //WHEN
        ShoppingItem actual = shoppingItemService.addNewItem(newItemDto());

        //THEN
        ShoppingItem expected = ShoppingItem.builder()
                .id("1234-test")
                .name("Mehl")
                .amount(500)
                .unit("g")
                .done(false).build();
        verify(shoppingItemRepo).insert(itemToAdd());
        assertEquals(expected, actual);
    }

    @Test
    void addNewItem_whenNameEqualsNull_shouldThrowException() {
        //WHEN
        CreateShoppingItemDto shoppingItemDto = CreateShoppingItemDto
                .builder()
                .name(null)
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class, () -> shoppingItemService.addNewItem(shoppingItemDto));
    }

    @Test
    void addNewItem_whenTitleEqualsEmptyString_shouldThrowException() {
        //WHEN
        CreateShoppingItemDto shoppingItemDto = CreateShoppingItemDto
                .builder()
                .name("")
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class, () -> shoppingItemService.addNewItem(shoppingItemDto));
    }

    @Test
    void deleteShoppingItemById_ifIdIsValid() {
        //WHEN
        shoppingItemService.deleteShoppingItem("1");
        //THEN
        verify(shoppingItemRepo).deleteById("1");
    }

    @Test
    void addNewItemList() {
        //GIVEN
        List<ShoppingItem> shoppingItemList = List.of(itemToAdd(),itemToAdd2());
        List<CreateShoppingItemDto> dtoList = List.of(newItemDto(),newItemDto2());
        when(shoppingItemRepo.insert(shoppingItemList)).thenReturn(List.of(
                ShoppingItem.builder()
                        .id("123-456")
                        .name("Mehl")
                        .amount(500)
                        .unit("g")
                        .done(false)
                        .build(),
                ShoppingItem.builder()
                        .id("234-567")
                        .name("Nudeln")
                        .amount(500)
                        .unit("g")
                        .done(false)
                        .build()));

        //WHEN
        List<ShoppingItem> actual = shoppingItemService.addNewItemList(dtoList);

        //THEN
        List<ShoppingItem> expected = List.of(ShoppingItem.builder()
                .id("123-456")
                .name("Mehl")
                .amount(500)
                .unit("g")
                .done(false).build(),
        ShoppingItem.builder()
                .id("234-567")
                .name("Nudeln")
                .amount(500)
                .unit("g")
                .done(false)
                .build());
        verify(shoppingItemRepo).insert(shoppingItemList);
        assertEquals(expected, actual);
    }

    @Test
    void getShoppingItemById_whenIdIsValid() {
        //GIVEN
        when(shoppingItemRepo.findById("1")).thenReturn(
                Optional.of(item1()));

        //WHEN
        ShoppingItem actual = shoppingItemService.getShoppingItemById("1");

        //THEN
        ShoppingItem expected = item1();

        verify(shoppingItemRepo).findById("1");
        assertEquals(expected,actual);
    }

    @Test
    void getShoppingItemsById_ifIdIsNotValid_shouldThrowException() {
        //GIVEN
        when(shoppingItemRepo.findById("1")).thenReturn(Optional.empty());
        //WHEN //THEN
        assertThrows(NoSuchElementException.class, () -> shoppingItemService.getShoppingItemById("1"));
        verify(shoppingItemRepo).findById("1");
    }

    @Test
    void updateShoppingItemByID() {
        // GIVEN
        when(shoppingItemRepo.save(item1())).thenReturn(ShoppingItem.builder()
                .id("1234-test")
                .name("Apfel")
                .amount(3)
                .unit("stk")
                .done(false)
                .build());

        // WHEN
        ShoppingItem actual = shoppingItemService.updateShoppingItemByID(item1());

        // THEN
        ShoppingItem expexted = ShoppingItem.builder()
                .id("1234-test")
                .name("Apfel")
                .amount(3)
                .unit("stk")
                .done(false)
                .build();
        assertEquals(expexted,actual);
    }
}
