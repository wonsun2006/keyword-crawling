package com.example.keywordcrawling.controller

import com.example.keywordcrawling.dto.SignInRequest
import com.example.keywordcrawling.dto.SignUpRequest
import com.example.keywordcrawling.service.UserService
import org.springframework.web.bind.annotation.*


@RestController
class SignController(val userService: UserService){
    @PostMapping("/sign-up")
    fun signUp(request: SignUpRequest) = userService.registerUser(request)

    @PostMapping("/sign-in")
    fun signIn(request: SignInRequest) = userService.signIn(request)
}
