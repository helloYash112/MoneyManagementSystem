package com.yashwardhan.moneymanagementsystem.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yashwardhan.moneymanagementsystem.DTO.request.AppUserRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.AppUserResponseDto;
import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.service.AppUserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<AppUserResponseDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(appUserService.findById(id));
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<AppUserResponseDto> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(appUserService.findByEmail(email));

    }

    // Update profile
    @PutMapping("/{id}/profile")
    public ResponseEntity<AppUserResponseDto> updateUserProfile(
            @PathVariable Long id,
            @Valid @RequestBody AppUserRequestDto dto) {

        AppUserResponseDto updatedUser = appUserService.updateProfile(id, dto);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        appUserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/me")
    public ResponseEntity<AppUserResponseDto> getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Extract provider + providerId
        String provider = principal.getAttribute("iss") != null ? "GOOGLE" : "GITHUB";
        Object providerIdObj = principal.getAttribute("id"); // GitHub
        if (providerIdObj == null) {
            providerIdObj = principal.getAttribute("sub"); // Google
        }
        String providerId = String.valueOf(providerIdObj);

       
        return ResponseEntity.ok(appUserService.findByProviderAndProviderId(provider, providerId));
    }
}
