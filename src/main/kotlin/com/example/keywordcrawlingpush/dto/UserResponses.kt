package com.example.keywordcrawlingpush.dto

import com.example.keywordcrawlingpush.common.UserRole
import com.example.keywordcrawlingpush.entity.User

data class SignUpResponse(
    val userSn: Long? = null,
    val userId: String? = null,
    var userName: String? = null,
    var role: UserRole? = null
) {
    companion object {
        fun from(user: User) = SignUpResponse(
            userSn = user.userSn!!,
            userId = user.userId,
            userName = user.userName,
            role = user.role
        )
    }
}

data class SignInResponse(
    val userName: String?,
    val role: UserRole?,
    val token: String?
)

data class UserUpdateResponse(
    val result: Boolean,
    val userName: String?,
    val role: UserRole?
) {
    companion object {
        fun of(result: Boolean, user: User) = UserUpdateResponse(
            result = result,
            userName = user.userName,
            role = user.role
        )
    }
}

data class UserInfoResponse(
    val userSn: Long?,
    val userId: String?,
    val userName: String?,
    val role: UserRole?,
) {
    companion object {
        fun from(user: User) = UserInfoResponse(
            userSn = user.userSn!!,
            userId = user.userId!!,
            userName = user.userName,
            role = user.role
        )
    }
}

data class UserDeleteResponse(
    val result: Boolean
)