package com.yashwardhan.moneymanagementsyatem;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * MoneyManagementApplication
 */
@SpringBootApplication
public class MoneyManagementApplication {

    public static void main(String[] args) {
        // FIXED: Changed ExpenseTrackerApplication to MoneyManagementApplication
        SpringApplication.run(MoneyManagementApplication.class, args);
        System.out.println("welcome to the java world");
    }
}