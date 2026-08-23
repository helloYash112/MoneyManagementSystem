package com.yashwardhan.moneymanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsystem.entity.Loan;
import com.yashwardhan.moneymanagementsystem.entity.Repayment;

@Repository
public interface RepaymentRepo extends JpaRepository<Repayment, Long> {
    public List<Repayment> findByLoan(Loan loan);

}
