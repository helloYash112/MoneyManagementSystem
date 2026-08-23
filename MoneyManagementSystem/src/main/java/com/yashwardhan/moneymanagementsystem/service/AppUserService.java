package com.yashwardhan.moneymanagementsystem.service;

import org.springframework.stereotype.Service;

import com.yashwardhan.moneymanagementsystem.DTO.request.AppUserRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.AppUserResponseDto;
import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.repository.AppUserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AppUserService {

    private final AppUserRepo appUserRepository;

    public AppUserService(AppUserRepo appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    // Fetch user by ID
    public AppUserResponseDto findById(Long id) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User is not found with id: " + id));

        // Map entity → response DTO
        AppUserResponseDto dto = new AppUserResponseDto();
        dto.setId(user.getId());
        dto.setProviderId(user.getProviderId());
        dto.setProvider(user.getProvider());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setImageUrl(user.getImageUrl());
        dto.setCreatedAt(user.getCreatedAt());

        return dto;
    }

    // Fetch user by email
    public AppUserResponseDto findByEmail(String email) {
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User is not found with email: " + email));
        AppUserResponseDto dto = new AppUserResponseDto();
        dto.setId(user.getId());
        dto.setProviderId(user.getProviderId());
        dto.setProvider(user.getProvider());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setImageUrl(user.getImageUrl());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    // Update user profile (name, image, etc.)
    public AppUserResponseDto updateProfile(Long id, AppUserRequestDto dto) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        // Update fields from DTO
        user.setProviderId(dto.getProviderId());
        user.setProvider(dto.getProvider());
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setImageUrl(dto.getImageUrl());

        AppUser updated = appUserRepository.save(user);

        // Map entity → response DTO
        AppUserResponseDto resDto = new AppUserResponseDto();
        resDto.setId(updated.getId());
        resDto.setProviderId(updated.getProviderId());
        resDto.setProvider(updated.getProvider());
        resDto.setEmail(updated.getEmail());
        resDto.setName(updated.getName());
        resDto.setImageUrl(updated.getImageUrl());
        resDto.setCreatedAt(updated.getCreatedAt());

        return resDto;
    }

    // Delete user account
    public void deleteUser(Long id) {
        if (!appUserRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }
        appUserRepository.deleteById(id);
    }
}
