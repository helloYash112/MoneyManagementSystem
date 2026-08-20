package com.yashwardhan.moneymanagementsyatem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsyatem.entity.Loan;

@Repository
public interface LoanRepo extends JpaRepository<Loan,Long> {
    
}
