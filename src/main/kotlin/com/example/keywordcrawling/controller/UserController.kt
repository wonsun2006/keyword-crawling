package com.example.keywordcrawling.controller

import com.example.keywordcrawling.dto.UserDetailDto
import com.example.keywordcrawling.dto.UserSignUpDto
import com.example.keywordcrawling.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(val userService:UserService){
    @PostMapping("/users")
    fun signUp(user: UserSignUpDto): UserDetailDto {
        return userService.joinUser(user)
    }
}
