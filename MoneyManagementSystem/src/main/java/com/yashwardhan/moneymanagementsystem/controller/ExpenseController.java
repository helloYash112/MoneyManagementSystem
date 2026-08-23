package com.yashwardhan.moneymanagementsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yashwardhan.moneymanagementsystem.DTO.request.ExpenseRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.ExpenseResponseDto;
import com.yashwardhan.moneymanagementsystem.service.ExpenseService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // CREATE: Add a new expense
    @PostMapping
    public ResponseEntity<ExpenseResponseDto> createExpense(
            @Valid @RequestBody ExpenseRequestDto req) {
        ExpenseResponseDto created = expenseService.createExpense(req);
        return ResponseEntity.ok(created);
    }

    // READ: Get expense by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponseDto> getExpenseById(@PathVariable Long id) {
        ExpenseResponseDto expense = expenseService.getExpenseById(id);
        return ResponseEntity.ok(expense);
    }

    // READ: Get all expenses for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExpenseResponseDto>> getExpensesByUser(@PathVariable Long userId) {
        List<ExpenseResponseDto> expenses = expenseService.getExpensesByUser(userId);
        return ResponseEntity.ok(expenses);
    }

    // UPDATE: Update an expense by ID
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDto> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequestDto req) {
        ExpenseResponseDto updated = expenseService.updateExpense(id, req);
        return ResponseEntity.ok(updated);
    }

    // DELETE: Remove expense by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
