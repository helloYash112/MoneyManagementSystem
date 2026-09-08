package com.yashwardhan.moneymanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yashwardhan.moneymanagementsystem.DTO.request.BorrowerRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.BorrowerResponseDto;
import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.entity.Borrower;
import com.yashwardhan.moneymanagementsystem.repository.AppUserRepo;
import com.yashwardhan.moneymanagementsystem.repository.BorrowerRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BorrowerService {

    private final BorrowerRepo borrowerRepository;
    private final AppUserRepo appUserRepository;

    public BorrowerService(BorrowerRepo borrowerRepository, AppUserRepo appUserRepository) {
        this.borrowerRepository = borrowerRepository;
        this.appUserRepository = appUserRepository;
    }

    // Create borrower from DTO
    public BorrowerResponseDto createBorrower(BorrowerRequestDto dto) {
        AppUser user = appUserRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + dto.getUserId()));

        Borrower borrower = new Borrower();
        borrower.setUser(user);
        borrower.setName(dto.getName());
        borrower.setPhoneNumber(dto.getPhoneNumber());
        borrower.setAddress(dto.getAddress());
        borrower.setNotes(dto.getNotes());
        Borrower saved = borrowerRepository.save(borrower);

        BorrowerResponseDto resDto = new BorrowerResponseDto();
        resDto.setId(saved.getId());
        resDto.setName(saved.getName());
        resDto.setPhoneNumber(saved.getPhoneNumber());
        resDto.setAddress(saved.getAddress());
        resDto.setNotes(saved.getNotes());
        resDto.setCreatedAt(saved.getCreatedAt());

        return resDto;
    }

    // Get all borrowers for a user
    public List<BorrowerResponseDto> getBorrowersByUser(Long userId) {
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        List<Borrower> borrowers = borrowerRepository.findByUser(user);

        return borrowers.stream()
                .map(borrower -> {
                    BorrowerResponseDto dto = new BorrowerResponseDto();
                    dto.setUserId(user.getId()); // tie back to the user
                    dto.setName(borrower.getName());
                    dto.setPhoneNumber(borrower.getPhoneNumber());
                    dto.setAddress(borrower.getAddress());
                    dto.setNotes(borrower.getNotes());
                    dto.setId(borrower.getId());
                    dto.setCreatedAt(borrower.getCreatedAt());
                   
                    return dto;
                })
                .toList();
    }

    // Update borrower details
    public BorrowerResponseDto updateBorrower(Long borrowerId, BorrowerRequestDto dto) {
        Borrower borrower = borrowerRepository.findById(borrowerId)
                .orElseThrow(() -> new RuntimeException("Borrower not found with id " + borrowerId));

        borrower.setName(dto.getName());
        borrower.setPhoneNumber(dto.getPhoneNumber());
        borrower.setAddress(dto.getAddress());
        borrower.setNotes(dto.getNotes());
        Borrower saved = borrowerRepository.save(borrower);

        BorrowerResponseDto resDto = new BorrowerResponseDto();
        resDto.setId(saved.getId());
        resDto.setName(saved.getName());
        resDto.setPhoneNumber(saved.getPhoneNumber());
        resDto.setAddress(saved.getAddress());
        resDto.setNotes(saved.getNotes());
        resDto.setCreatedAt(saved.getCreatedAt());

        return resDto;
    }

    // Delete borrower
    public void deleteBorrower(Long borrowerId) {
        borrowerRepository.deleteById(borrowerId);
    }
}