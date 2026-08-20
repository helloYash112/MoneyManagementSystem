package com.yashwardhan.moneymanagementsyatem.DTO.response;



import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class LoanResponseDto {
    private Long id;
    private Long borrowerId;
    private BigDecimal amountLent;
    private BigDecimal amountRepaid;
    private LocalDate dueDate;
    private String status; // String representation of LoanStatus enum
    private String notes;
    private LocalDateTime createdAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getBorrowerId() { return borrowerId; }
    public void setBorrowerId(Long borrowerId) { this.borrowerId = borrowerId; }
    public BigDecimal getAmountLent() { return amountLent; }
    public void setAmountLent(BigDecimal amountLent) { this.amountLent = amountLent; }
    public BigDecimal getAmountRepaid() { return amountRepaid; }
    public void setAmountRepaid(BigDecimal amountRepaid) { this.amountRepaid = amountRepaid; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
