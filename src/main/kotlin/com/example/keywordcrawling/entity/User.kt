package com.example.keywordcrawling.entity

import com.example.keywordcrawling.common.UserRole
import com.example.keywordcrawling.dto.SignUpRequest
import com.example.keywordcrawling.dto.UserUpdateRequest
import jakarta.persistence.*
import org.springframework.security.crypto.password.PasswordEncoder

@Entity(name="users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val userSn: Long? = null,
    @Column(nullable = false, scale = 20, unique = true)
    val userId: String? = null,
    @Column(nullable = false)
    var password: String? = null,
    var userName: String? = null,
    @Enumerated(EnumType.STRING)
    var role: UserRole? = UserRole.ROLE_USER
){
    companion object {
        fun from(request: SignUpRequest, encoder: PasswordEncoder) = User(
            userId = request.userId,
            password = encoder.encode(request.password),
            userName = request.userName,
            role = request.role
        )
    }
    fun update(newUser: UserUpdateRequest, encoder: PasswordEncoder) {
        this.password = newUser.newPassword
            ?.takeIf { it.isNotBlank() }
            ?.let { encoder.encode(it) }	// 추가
            ?: this.password
        this.userName = newUser.userName
        this.role = newUser.role
    }
}

