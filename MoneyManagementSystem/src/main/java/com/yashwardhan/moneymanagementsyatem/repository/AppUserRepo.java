package com.yashwardhan.moneymanagementsyatem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yashwardhan.moneymanagementsyatem.entity.AppUser;

@Repository
public interface AppUserRepo extends JpaRepository<AppUser,Long> {
    
}
