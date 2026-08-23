package com.yashwardhan.moneymanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.entity.Borrower;

@Repository
public interface BorrowerRepo extends JpaRepository<Borrower, Long> {
    List<Borrower> findByUser(AppUser user);

}
