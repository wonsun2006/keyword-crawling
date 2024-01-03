package com.example.keywordcrawlingpush.controller

import com.example.keywordcrawlingpush.dto.SignInRequest
import com.example.keywordcrawlingpush.dto.SignUpRequest
import com.example.keywordcrawlingpush.service.UserService
import org.springframework.web.bind.annotation.*


@RestController
class SignController(val userService: UserService){
    @PostMapping("/sign-up")
    fun signUp(@RequestBody request: SignUpRequest) = userService.registerUser(request)

    @PostMapping("/sign-in")
    fun signIn(@RequestBody request: SignInRequest) = userService.signIn(request)
}
