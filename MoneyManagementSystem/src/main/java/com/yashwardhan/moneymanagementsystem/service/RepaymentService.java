package com.yashwardhan.moneymanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yashwardhan.moneymanagementsystem.DTO.request.RepaymentRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.RepaymentResponseDto;
import com.yashwardhan.moneymanagementsystem.entity.Loan;
import com.yashwardhan.moneymanagementsystem.entity.Repayment;
import com.yashwardhan.moneymanagementsystem.repository.LoanRepo;
import com.yashwardhan.moneymanagementsystem.repository.RepaymentRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RepaymentService {

    private final RepaymentRepo repaymentRepo;
    private final LoanRepo loanRepo;

    public RepaymentService(RepaymentRepo repaymentRepo, LoanRepo loanRepo) {
        this.repaymentRepo = repaymentRepo;
        this.loanRepo = loanRepo;
    }

    // CREATE: Register a repayment for a loan
    public RepaymentResponseDto createRepayment(RepaymentRequestDto req) {
        Loan loan = loanRepo.findById(req.getLoanId())
                .orElseThrow(() -> new RuntimeException("Loan not found with id " + req.getLoanId()));

        // Create repayment entity
        Repayment repayment = new Repayment();
        repayment.setLoan(loan);
        repayment.setAmount(req.getAmount());
        repayment.setPaymentDate(req.getPaymentDate());

        // Save repayment
        Repayment saved = repaymentRepo.save(repayment);

        // Update loan repayment totals
        loan.registerRepayment(req.getAmount());
        loanRepo.save(loan);

        return mapToResponseDto(saved);
    }

    // READ: Get repayment by ID
    public RepaymentResponseDto getRepaymentById(Long id) {
        Repayment repayment = repaymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Repayment not found with id " + id));
        return mapToResponseDto(repayment);
    }

    // READ: Get all repayments for a loan
    public List<RepaymentResponseDto> getRepaymentsByLoan(Long loanId) {
        Loan loan = loanRepo.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found with id " + loanId));

        return repaymentRepo.findByLoan(loan).stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    // UPDATE: Edit repayment details (amount, date)
    public RepaymentResponseDto updateRepayment(Long id, RepaymentRequestDto req) {
        Repayment repayment = repaymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Repayment not found with id " + id));

        repayment.setAmount(req.getAmount());
        repayment.setPaymentDate(req.getPaymentDate());

        Repayment updated = repaymentRepo.save(repayment);
        return mapToResponseDto(updated);
    }

    // DELETE: Remove repayment
    public void deleteRepayment(Long id) {
        if (!repaymentRepo.existsById(id)) {
            throw new RuntimeException("Repayment not found with id " + id);
        }
        repaymentRepo.deleteById(id);
    }

    // Helper: Map entity → response DTO
    private RepaymentResponseDto mapToResponseDto(Repayment repayment) {
        RepaymentResponseDto dto = new RepaymentResponseDto();
        dto.setId(repayment.getId());
        dto.setLoanId(repayment.getLoan().getId());
        dto.setAmount(repayment.getAmount());
        dto.setPaymentDate(repayment.getPaymentDate());
        return dto;
    }
}
