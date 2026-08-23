package com.yashwardhan.moneymanagementsystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yashwardhan.moneymanagementsystem.DTO.request.BorrowerRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.BorrowerResponseDto;
import com.yashwardhan.moneymanagementsystem.service.BorrowerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/borrowers")
public class BorrowerController {

    public BorrowerController(BorrowerService borrowerService) {
        this.borrowerService = borrowerService;
    }

    private BorrowerService borrowerService;

    /**
     * Registers a new borrower connected to a specific user.
     * 
     * @param request BorrowerRequestDto containing name, phone, address, etc.
     * @return BorrowerResponseDto with generated ID and timestamp, status 201
     *         Created
     */
    @PostMapping
    public ResponseEntity<BorrowerResponseDto> createBorrower(@RequestBody @Valid BorrowerRequestDto request) {
        // TODO: Fetch AppUser by request.getUserId(), map to Borrower entity, save, and
        // return ResponseDto
        return ResponseEntity.ok(borrowerService.createBorrower(request));
    }

    /**
     * Retrieves all borrowers created by a specific user.
     * 
     * @param userId The ID of the AppUser
     * @return List of BorrowerResponseDto objects
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BorrowerResponseDto>> getBorrowersByUser(@PathVariable Long userId) {
        // TODO: Call service to fetch borrowers by user ID
        return ResponseEntity.ok(borrowerService.getBorrowersByUser(userId));
    }

    /**
     * Deletes a borrower record by ID.
     * 
     * @param id The borrower's unique ID
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBorrower(@PathVariable Long id) {
        // TODO: Call service to delete borrower (cascade will handle related loans if
        // configured)
        borrowerService.deleteBorrower(id);
        return ResponseEntity.noContent().build();
    }
}