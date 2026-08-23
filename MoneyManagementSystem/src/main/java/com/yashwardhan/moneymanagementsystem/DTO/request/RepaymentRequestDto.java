package com.yashwardhan.moneymanagementsystem.DTO.request;


import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class RepaymentRequestDto {

    @NotNull(message = "Loan ID is required")
    private Long loanId;

    @NotNull(message = "Payment amount is required")
    @DecimalMin(value = "0.01", message = "Payment amount must be greater than zero")
    private BigDecimal amount;

    // Optional: if null, entity's @PrePersist handles defaulting to LocalDate.now()
    private LocalDate paymentDate;

    // Getters and Setters
    public Long getLoanId() { return loanId; }
    public void setLoanId(Long loanId) { this.loanId = loanId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
}