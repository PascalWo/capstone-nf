package de.neuefische.backend.controller;

import de.neuefische.backend.model.ShoppingItem;
import de.neuefische.backend.repository.ShoppingItemRepo;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
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