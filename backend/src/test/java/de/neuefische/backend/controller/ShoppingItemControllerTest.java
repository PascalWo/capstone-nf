package de.neuefische.backend.controller;

import de.neuefische.backend.dto.CreateShoppingItemDto;
import de.neuefische.backend.model.ShoppingItem;
import de.neuefische.backend.repository.ShoppingItemRepo;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ShoppingItemControllerTest {

    private String jwtToken;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private WebTestClient testClient;

    @Autowired
    private ShoppingItemRepo shoppingItemRepo;

    @BeforeEach
    public void cleanUP(){
        shoppingItemRepo.deleteAll();
        appUserRepository.deleteAll();
        jwtToken = generateJWTToken();
    }

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

    ShoppingItem saveItem = ShoppingItem.builder()
            .id("123")
            .name("Apfel")
            .amount(3)
            .unit("stk")
            .done(false)
            .build();

    CreateShoppingItemDto itemToUpdate = CreateShoppingItemDto.builder()
            .name("Apfel")
            .amount(3)
            .unit("stk")
            .done(false)
            .build();

    @Test
    void getShoppingItems() {
        //GIVEN
        ShoppingItem newItem = itemToAdd();
        shoppingItemRepo.insert(newItem);
        shoppingItemRepo.insert(item2());

        //WHEN
        List<ShoppingItem> actual = testClient.get()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        List<ShoppingItem> expected = List.of(
                ShoppingItem.builder()
                        .id(newItem.getId())
                        .name("Mehl")
                        .amount(500)
                        .unit("g")
                        .done(false)
                        .build(),
                ShoppingItem.builder()
                        .id(item2().getId())
                        .name("Käse")
                        .amount(200)
                        .unit("g")
                        .done(false)
                        .build());
        assertEquals(expected, actual);
    }

    @Test
    void postNewItem() {
        //WHEN
        ShoppingItem actual = testClient.post()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(itemToAdd())
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(actual);
        assertNotNull(actual.getId());
        ShoppingItem expected = ShoppingItem.builder()
                .id(actual.getId())
                .name("Mehl")
                .amount(500)
                .unit("g")
                .done(false).build();
        assertEquals(24, actual.getId().length());
        assertEquals(expected, actual);
    }

    @Test
    void deleteShoppingItem() {
        //GIVEN
        ShoppingItem addedShoppingItem = testClient.post()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(itemToAdd())
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //WHEN + THEN
        assertNotNull(addedShoppingItem);
        testClient.delete()
                .uri("/api/shoppingitem/" + addedShoppingItem.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful();
    }

    @Test
    void postNewItemList() {
        //WHEN
        List<ShoppingItem> actual = testClient.post()
                .uri("/api/shoppingitem/list")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(List.of(item1(),item2(), itemToAdd()))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(actual);
        List<ShoppingItem> expected = List.of(ShoppingItem.builder()
                        .id(actual.get(0).getId())
                        .name("Apfel")
                        .amount(3)
                        .unit("stk")
                        .done(false)
                        .build(),
                ShoppingItem.builder()
                        .id(actual.get(1).getId())
                        .name("Käse")
                        .amount(200)
                        .unit("g")
                        .done(false)
                        .build(),
                ShoppingItem.builder()
                        .id(actual.get(2).getId())
                        .name("Mehl")
                        .amount(500)
                        .unit("g")
                        .done(false)
                        .build()

        );
        assertEquals(expected, actual);
    }

    @Test
    void getShoppingItemById_whenIdIsValid() {
        //GIVEN
        ShoppingItem addShoppingItem = testClient.post()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(itemToAdd())
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //WHEN
        assertNotNull(addShoppingItem);
        ShoppingItem actual = testClient.get()
                .uri("/api/shoppingitem/" + addShoppingItem.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();
        //THEN
        assertNotNull(actual);
        ShoppingItem expected = ShoppingItem.builder().id(actual.getId()).name("Mehl")
                .amount(500)
                .unit("g")
                .done(false).build();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getItemById_whenIdIsNotValid_shouldThrowServerError() {
        //GIVEN
        testClient.post()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(item1())
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //WHEN THEN
        testClient.get()
                .uri("/api/shoppingitem/" + "5")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is5xxServerError();
    }

    @Test
    void updateShoppingItemByID_whenValid_thenReturnUpdatedShopping() {
        //GIVEN
        shoppingItemRepo.insert(saveItem);

        //WHEN
        ShoppingItem actual = testClient.put()
                .uri("/api/shoppingitem/" + saveItem.getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(itemToUpdate)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        ShoppingItem expected = ShoppingItem.builder()
                .id(saveItem.getId())
                .name("Apfel")
                .amount(3)
                .unit("stk")
                .done(false)
                .build();
        assertEquals(expected,actual);
    }

    @Test
    void updateShoppingItemByID_whenIdDoesNoteExist_shouldReturnError() {
        //GIVEN
        shoppingItemRepo.insert(saveItem);
        String notValidId = "999";

        //WHEN Then
        testClient.put()
                .uri("/api/shoppingitem/" + notValidId)
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(itemToUpdate)
                .exchange()
                .expectStatus().is5xxServerError();
    }

    @Test
    void updateShoppingItem_whenValid_thenReturnUpdatedShopping() {
        //GIVEN
        shoppingItemRepo.insert(saveItem);

        //WHEN
        ShoppingItem updatedItem = ShoppingItem.builder()
                .id("123")
                .name("Apfel")
                .amount(5)
                .unit("stk")
                .done(false)
                .build();
        ShoppingItem actual = testClient.put()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(updatedItem)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        ShoppingItem expected = ShoppingItem.builder()
                .id(saveItem.getId())
                .name("Apfel")
                .amount(5)
                .unit("stk")
                .done(false)
                .build();
        assertEquals(expected,actual);
    }

    @Test
    void updateShoppingItem_whenIDdoesNoteExist_thenReturnNewShoppingItem() {
        //GIVEN
        shoppingItemRepo.insert(saveItem);

        //WHEN
        ShoppingItem updatedItem = ShoppingItem.builder()
                .id("123-456")
                .name("Apfel")
                .amount(5)
                .unit("stk")
                .done(false)
                .build();
        ShoppingItem updated = testClient.put()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(updatedItem)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        List<ShoppingItem> actual = testClient.get()
                .uri("/api/shoppingitem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(ShoppingItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(saveItem);
        assertNotNull(updated);
        List<ShoppingItem> expected = List.of(saveItem, updated);
        assertEquals(expected,actual);
    }

    private String generateJWTToken() {
        String hashedPassword = passwordEncoder.encode("passwort");
        AppUser testUser = AppUser.builder()
                .username("testuser")
                .id("123")
                .password(hashedPassword)
                .build();
        appUserRepository.save(testUser);

        return testClient.post()
                .uri("/auth/login")
                .bodyValue(AppUser.builder()
                        .username("testuser")
                        .id("123")
                        .password("passwort")
                        .build())
                .exchange()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();
    }
}
