package com.example.keywordcrawlingpush.controller

import com.example.keywordcrawlingpush.dto.UserInfoResponse
import com.example.keywordcrawlingpush.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/admin")
class AdminController(val userService: UserService){
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    fun getAllUser(): List<UserInfoResponse> {
        return userService.getAllUser()
    }
}
