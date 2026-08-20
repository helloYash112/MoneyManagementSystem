package com.yashwardhan.moneymanagementsyatem.DTO.request;



import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class LoanRequestDto {

    @NotNull(message = "Borrower ID is required")
    private Long borrowerId;

    @NotNull(message = "Amount lent is required")
    @DecimalMin(value = "0.01", message = "Amount lent must be greater than zero")
    private BigDecimal amountLent;

    private LocalDate dueDate;

    @Size(max = 500, message = "Notes cannot exceed 500 characters")
    private String notes;

    // Getters and Setters
    public Long getBorrowerId() { return borrowerId; }
    public void setBorrowerId(Long borrowerId) { this.borrowerId = borrowerId; }
    public BigDecimal getAmountLent() { return amountLent; }
    public void setAmountLent(BigDecimal amountLent) { this.amountLent = amountLent; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}