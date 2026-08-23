package com.yashwardhan.moneymanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.entity.Expense;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(AppUser user);

}
