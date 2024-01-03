package com.example.keywordcrawlingpush.controller

import com.example.keywordcrawlingpush.dto.*
import com.example.keywordcrawlingpush.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController(val userService: UserService){
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    fun getAllUser(): List<UserInfoResponse> {
        return userService.getAllUser()
    }

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: Long, @RequestBody request: UserUpdateRequest): UserUpdateResponse {
        return userService.updateUser(id, request)
    }
}
