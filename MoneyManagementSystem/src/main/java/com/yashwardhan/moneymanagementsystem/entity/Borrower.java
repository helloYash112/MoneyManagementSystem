package com.yashwardhan.moneymanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "borrowers")
@Data
public class Borrower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Newly added contact and location details
    private String phoneNumber;
    
    private String address;

    @Column(length = 500)
    private String notes; // e.g., "Met through college, trustworthy"

    private LocalDateTime createdAt;

    // Relates back to the specific logged-in user who owns this contact
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    // One borrower can have multiple loan transactions over time
    @OneToMany(mappedBy = "borrower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Loan> loans;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}