package com.yashwardhan.moneymanagementsyatem.DTO.request;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BorrowerRequestDto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Borrower name is required")
    private String name;

    private String phoneNumber;
    private String address;
    private String notes;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}