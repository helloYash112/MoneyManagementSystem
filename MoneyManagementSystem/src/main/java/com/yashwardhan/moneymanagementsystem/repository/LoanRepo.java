package com.yashwardhan.moneymanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsystem.entity.Borrower;
import com.yashwardhan.moneymanagementsystem.entity.Loan;

@Repository
public interface LoanRepo extends JpaRepository<Loan, Long> {

    List<Loan> findByBorrower(Borrower borrower);

}
