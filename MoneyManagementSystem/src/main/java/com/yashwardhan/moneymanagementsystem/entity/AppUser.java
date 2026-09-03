package com.yashwardhan.moneymanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.jspecify.annotations.Nullable;
//import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "users")
@Data
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Unique ID from the OAuth provider (e.g., Google's 'sub' claim)
    @Column(nullable = false, unique = true)
    private String providerId;

    // The OAuth provider name (e.g., "GOOGLE", "GITHUB")
    @Column(nullable = false)
    private String provider;

    @Column(nullable = false)
    private String email;

    private String name;

    private String imageUrl; // Profile picture from Google

    private LocalDateTime createdAt;

    // Relationships
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Borrower> borrowers;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

}