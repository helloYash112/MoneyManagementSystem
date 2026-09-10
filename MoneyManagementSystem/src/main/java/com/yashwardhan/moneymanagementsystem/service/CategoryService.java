package com.yashwardhan.moneymanagementsystem.service;




import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yashwardhan.moneymanagementsystem.DTO.request.CategoryRequestDto;
import com.yashwardhan.moneymanagementsystem.DTO.response.CategoryResponseDto;
import com.yashwardhan.moneymanagementsystem.entity.Category;
import com.yashwardhan.moneymanagementsystem.repository.CategoryRepo;

import lombok.RequiredArgsConstructor;

import java.util.List;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor 
@Transactional
public class CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryResponseDto createCategory(CategoryRequestDto  request) {
        Category category = new Category();
        category.setDefaultCategory(true);
        category.setDescription(request.getDescription());
        category.setName(request.getName());
        category.setUserId(request.getUserId());

        Category savedCategory = categoryRepo.save(category);
        return mapToResponse(savedCategory);
    }

    @Transactional(readOnly = true)
    public CategoryResponseDto getCategoryById(Long id) {
        Category category = findCategoryOrThrow(id);
        return mapToResponse(category);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponseDto> getAllCategories() {
        return categoryRepo.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto request) {
        Category category = findCategoryOrThrow(id);
        category.setName(request.getName());        
        category.setDescription(request.getDescription());

        Category updatedCategory = categoryRepo.save(category);
        return mapToResponse(updatedCategory);
    }

    public void deleteCategory(Long id) {
        if (!categoryRepo.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepo.deleteById(id);
    }

    private Category findCategoryOrThrow(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    private CategoryResponseDto mapToResponse(Category category) {
        return CategoryResponseDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .userId(category.getUserId())
                .build();
    }
}
