package com.yashwardhan.moneymanagementsyatem.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "loans")
@Data
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The amount of money you originally lent
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amountLent;

    // The amount the friend has paid back so far (defaults to 0)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amountRepaid = BigDecimal.ZERO;

    // When the friend is supposed to return the money
    private LocalDate dueDate;

    // Status of the loan (PENDING, PARTIAL, SETTLED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanStatus status = LoanStatus.PENDING;

    @Column(length = 500)
    private String notes; // e.g., "For concert tickets"

    private LocalDateTime createdAt;

    // --- RELATIONSHIP: Many Loans belong to One Borrower ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "borrower_id", nullable = false)
    private Borrower borrower;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.amountRepaid == null) {
            this.amountRepaid = BigDecimal.ZERO;
        }
    }

    // Helpful business logic method to process a repayment chunk
    public void registerRepayment(BigDecimal repaymentAmount) {
        if (repaymentAmount == null || repaymentAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Repayment amount must be greater than zero");
        }

        this.amountRepaid = this.amountRepaid.add(repaymentAmount);

        // Automatically update the status based on totals
        if (this.amountRepaid.compareTo(this.amountLent) >= 0) {
            this.status = LoanStatus.SETTLED;
        } else {
            this.status = LoanStatus.PARTIAL;
        }
    }
}

enum LoanStatus {
    PENDING,
    PARTIAL,
    SETTLED
}

