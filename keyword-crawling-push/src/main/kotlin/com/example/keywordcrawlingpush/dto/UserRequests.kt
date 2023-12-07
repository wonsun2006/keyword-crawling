package com.example.keywordcrawlingpush.dto

import com.example.keywordcrawlingpush.common.UserRole

data class SignInRequest(
    val userId: String,
    val password: String
)

data class SignUpRequest(
    val userId: String,
    val password: String,
    val userName: String,
    val role: UserRole
)

data class UserUpdateRequest(
    val password: String,
    val newPassword: String,
    val userName: String,
    val role: UserRole
)