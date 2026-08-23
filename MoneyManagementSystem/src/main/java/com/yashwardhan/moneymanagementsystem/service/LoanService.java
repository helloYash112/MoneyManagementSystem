package com.yashwardhan.moneymanagementsystem.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.yashwardhan.moneymanagementsystem.DTO.request.LoanRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.LoanResponseDto;
import com.yashwardhan.moneymanagementsystem.entity.Borrower;
import com.yashwardhan.moneymanagementsystem.entity.Loan;
import com.yashwardhan.moneymanagementsystem.repository.BorrowerRepo;
import com.yashwardhan.moneymanagementsystem.repository.LoanRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LoanService {

    private final LoanRepo loanRepo;
    private final BorrowerRepo borrowerRepo;

    public LoanService(LoanRepo loanRepo, BorrowerRepo borrowerRepo) {
        this.loanRepo = loanRepo;
        this.borrowerRepo = borrowerRepo;
    }

    // CREATE
    public LoanResponseDto createLoan(LoanRequestDto req) {
        Borrower borrower = borrowerRepo.findById(req.getBorrowerId())
                .orElseThrow(() -> new RuntimeException("Borrower not found with id " + req.getBorrowerId()));

        Loan loan = new Loan();
        loan.setBorrower(borrower);
        loan.setAmountLent(req.getAmountLent());
        loan.setDueDate(req.getDueDate());
        loan.setNotes(req.getNotes());

        Loan saved = loanRepo.save(loan);
        return mapToResponseDto(saved);
    }

    // READ: Get loan by ID
    public LoanResponseDto getLoanById(Long id) {
        Loan loan = loanRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan not found with id " + id));
        return mapToResponseDto(loan);
    }

    // READ: Get all loans for a borrower
    public List<LoanResponseDto> getLoansByBorrower(Long borrowerId) {
        Borrower borrower = borrowerRepo.findById(borrowerId)
                .orElseThrow(() -> new RuntimeException("Borrower not found with id " + borrowerId));

        return loanRepo.findByBorrower(borrower).stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    // UPDATE: Register repayment
    public LoanResponseDto registerRepayment(Long loanId, BigDecimal repaymentAmount) {
        Loan loan = loanRepo.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found with id " + loanId));

        loan.registerRepayment(repaymentAmount); // business logic inside entity
        Loan updated = loanRepo.save(loan);

        return mapToResponseDto(updated);
    }

    // UPDATE: Update loan details (notes, due date)
    public LoanResponseDto updateLoan(Long id, LoanRequestDto req) {
        Loan loan = loanRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan not found with id " + id));

        loan.setAmountLent(req.getAmountLent());
        loan.setDueDate(req.getDueDate());
        loan.setNotes(req.getNotes());

        Loan updated = loanRepo.save(loan);
        return mapToResponseDto(updated);
    }

    // DELETE
    public void deleteLoan(Long id) {
        if (!loanRepo.existsById(id)) {
            throw new RuntimeException("Loan not found with id " + id);
        }
        loanRepo.deleteById(id);
    }

    // Helper: Map entity → response DTO
    private LoanResponseDto mapToResponseDto(Loan loan) {
        LoanResponseDto dto = new LoanResponseDto();
        dto.setId(loan.getId());
        dto.setBorrowerId(loan.getBorrower().getId());
        dto.setAmountLent(loan.getAmountLent());
        dto.setAmountRepaid(loan.getAmountRepaid());
        dto.setDueDate(loan.getDueDate());
        dto.setStatus(loan.getStatus());

        dto.setNotes(loan.getNotes());
        dto.setCreatedAt(loan.getCreatedAt());
        return dto;
    }
}
