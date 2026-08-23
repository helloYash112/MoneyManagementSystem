package com.yashwardhan.moneymanagementsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yashwardhan.moneymanagementsystem.DTO.request.RepaymentRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.RepaymentResponseDto;
import com.yashwardhan.moneymanagementsystem.service.RepaymentService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/repayments")
public class RepaymentController {

    private final RepaymentService repaymentService;

    public RepaymentController(RepaymentService repaymentService) {
        this.repaymentService = repaymentService;
    }

    // CREATE: Register a repayment for a loan
    @PostMapping
    public ResponseEntity<RepaymentResponseDto> createRepayment(
            @Valid @RequestBody RepaymentRequestDto req) {
        RepaymentResponseDto created = repaymentService.createRepayment(req);
        return ResponseEntity.ok(created);
    }

    // READ: Get repayment by ID
    @GetMapping("/{id}")
    public ResponseEntity<RepaymentResponseDto> getRepaymentById(@PathVariable Long id) {
        RepaymentResponseDto repayment = repaymentService.getRepaymentById(id);
        return ResponseEntity.ok(repayment);
    }

    // READ: Get all repayments for a loan
    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<RepaymentResponseDto>> getRepaymentsByLoan(@PathVariable Long loanId) {
        List<RepaymentResponseDto> repayments = repaymentService.getRepaymentsByLoan(loanId);
        return ResponseEntity.ok(repayments);
    }

    // UPDATE: Edit repayment details
    @PutMapping("/{id}")
    public ResponseEntity<RepaymentResponseDto> updateRepayment(
            @PathVariable Long id,
            @Valid @RequestBody RepaymentRequestDto req) {
        RepaymentResponseDto updated = repaymentService.updateRepayment(id, req);
        return ResponseEntity.ok(updated);
    }

    // DELETE: Remove repayment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepayment(@PathVariable Long id) {
        repaymentService.deleteRepayment(id);
        return ResponseEntity.noContent().build();
    }
}
