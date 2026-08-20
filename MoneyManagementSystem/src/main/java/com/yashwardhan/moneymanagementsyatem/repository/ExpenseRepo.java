package com.yashwardhan.moneymanagementsyatem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsyatem.entity.Expense;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense,Long> {
    
}
