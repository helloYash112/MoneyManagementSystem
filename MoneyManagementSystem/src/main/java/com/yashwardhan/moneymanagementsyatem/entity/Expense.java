package com.yashwardhan.moneymanagementsyatem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@Data
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Always use BigDecimal for money to avoid floating-point inaccuracies
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    // Category e.g., "Food", "Transport", "Utilities", "Entertainment"
    @Column(nullable = false)
    private String category;

    @Column(length = 255)
    private String description; // e.g., "Lunch with colleagues"

    // The date the expense actually occurred (defaults to today if not provided)
    @Column(nullable = false)
    private LocalDate expenseDate;

    // Automatically records when the row was created in the database
    private LocalDateTime createdAt;

    // Relates the expense back to the specific user who owns it
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.expenseDate == null) {
            this.expenseDate = LocalDate.now(); // Default to current date
        }
    }
}