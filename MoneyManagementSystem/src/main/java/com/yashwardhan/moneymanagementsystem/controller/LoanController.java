package com.yashwardhan.moneymanagementsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yashwardhan.moneymanagementsystem.DTO.request.LoanRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.LoanResponseDto;
import com.yashwardhan.moneymanagementsystem.service.LoanService;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    // CREATE: Add a new loan
    @PostMapping
    public ResponseEntity<LoanResponseDto> createLoan(
            @Valid @RequestBody LoanRequestDto req) {
        LoanResponseDto created = loanService.createLoan(req);
        return ResponseEntity.ok(created);
    }

    // READ: Get loan by ID
    @GetMapping("/{id}")
    public ResponseEntity<LoanResponseDto> getLoanById(@PathVariable Long id) {
        LoanResponseDto loan = loanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }

    // READ: Get all loans for a borrower
    @GetMapping("/borrower/{borrowerId}")
    public ResponseEntity<List<LoanResponseDto>> getLoansByBorrower(@PathVariable Long borrowerId) {
        List<LoanResponseDto> loans = loanService.getLoansByBorrower(borrowerId);
        return ResponseEntity.ok(loans);
    }

    // UPDATE: Register repayment
    @PutMapping("/{id}/repay")
    public ResponseEntity<LoanResponseDto> registerRepayment(
            @PathVariable Long id,
            @RequestParam BigDecimal repaymentAmount) {
        LoanResponseDto updated = loanService.registerRepayment(id, repaymentAmount);
        return ResponseEntity.ok(updated);
    }

    // UPDATE: Update loan details
    @PutMapping("/{id}")
    public ResponseEntity<LoanResponseDto> updateLoan(
            @PathVariable Long id,
            @Valid @RequestBody LoanRequestDto req) {
        LoanResponseDto updated = loanService.updateLoan(id, req);
        return ResponseEntity.ok(updated);
    }

    // DELETE: Remove loan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }
}
