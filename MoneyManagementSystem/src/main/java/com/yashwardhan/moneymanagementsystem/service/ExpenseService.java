package com.yashwardhan.moneymanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yashwardhan.moneymanagementsystem.DTO.request.ExpenseRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.ExpenseResponseDto;
import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.entity.Expense;
import com.yashwardhan.moneymanagementsystem.repository.AppUserRepo;
import com.yashwardhan.moneymanagementsystem.repository.ExpenseRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ExpenseService {

    private AppUserRepo userRepo;
    private ExpenseRepo expenseRepo;

    public ExpenseService(AppUserRepo userRepo, ExpenseRepo expenseRepo) {
        this.userRepo = userRepo;
        this.expenseRepo = expenseRepo;
    }

    public ExpenseResponseDto createExpense(ExpenseRequestDto req) {
        // Validate user existence
        AppUser user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + req.getUserId()));

        // Map request DTO → entity
        Expense expense = new Expense();
        expense.setUser(user);
        expense.setAmount(req.getAmount());
        expense.setDescription(req.getDescription());
        expense.setCategory(req.getCategory());
        expense.setExpenseDate(req.getExpenseDate());

        // Save entity
        Expense saved = expenseRepo.save(expense);
        return mapToResponseDto(saved);
    }

    public ExpenseResponseDto getExpenseById(Long id) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id " + id));
        return mapToResponseDto(expense);
    }

    public List<ExpenseResponseDto> getExpensesByUser(Long userId) {
        AppUser user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        return expenseRepo.findByUser(user).stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    // UPDATE: Update an expense by ID
    public ExpenseResponseDto updateExpense(Long id, ExpenseRequestDto req) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id " + id));

        expense.setAmount(req.getAmount());
        expense.setDescription(req.getDescription());
        expense.setCategory(req.getCategory());
        expense.setExpenseDate(req.getExpenseDate());

        Expense updated = expenseRepo.save(expense);
        return mapToResponseDto(updated);
    }

    // DELETE: Remove expense by ID
    public void deleteExpense(Long id) {
        if (!expenseRepo.existsById(id)) {
            throw new RuntimeException("Expense not found with id " + id);
        }
        expenseRepo.deleteById(id);
    }

    private ExpenseResponseDto mapToResponseDto(Expense expense) {
        ExpenseResponseDto dto = new ExpenseResponseDto();
        dto.setId(expense.getId());
        dto.setUserId(expense.getUser().getId());
        dto.setAmount(expense.getAmount());
        dto.setDescription(expense.getDescription());
        dto.setCategory(expense.getCategory());
        dto.setExpenseDate(expense.getExpenseDate());
        dto.setCreatedAt(expense.getCreatedAt());
        return dto;
    }

}
