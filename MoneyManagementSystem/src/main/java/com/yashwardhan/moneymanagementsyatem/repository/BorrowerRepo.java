package com.yashwardhan.moneymanagementsyatem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsyatem.entity.Borrower;

@Repository
public interface BorrowerRepo  extends JpaRepository<Borrower,Long>{
    
}
