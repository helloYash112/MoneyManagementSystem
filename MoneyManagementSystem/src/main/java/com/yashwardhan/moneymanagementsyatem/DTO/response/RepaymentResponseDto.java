package com.yashwardhan.moneymanagementsyatem.DTO.response;


import java.math.BigDecimal;
import java.time.LocalDate;

public class RepaymentResponseDto {
    private Long id;
    private Long loanId;
    private BigDecimal amount;
    private LocalDate paymentDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getLoanId() { return loanId; }
    public void setLoanId(Long loanId) { this.loanId = loanId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
}