package com.yashwardhan.moneymanagementsystem.DTO.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AppUserRequestDto {

    @NotBlank(message = "Provider ID is required")
    private String providerId;

    @NotBlank(message = "Provider name is required")
    private String provider;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String name;
    private String imageUrl;

    // Getters and Setters
    public String getProviderId() { return providerId; }
    public void setProviderId(String providerId) { this.providerId = providerId; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}