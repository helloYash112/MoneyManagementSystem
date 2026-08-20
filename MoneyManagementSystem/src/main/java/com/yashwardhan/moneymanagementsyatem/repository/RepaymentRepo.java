package com.yashwardhan.moneymanagementsyatem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsyatem.entity.Repayment;

@Repository
public interface RepaymentRepo extends JpaRepository<Repayment,Long> {

    
} 
