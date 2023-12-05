package com.example.keywordcrawling.service

import com.example.keywordcrawling.dto.*
import com.example.keywordcrawling.entity.User
import com.example.keywordcrawling.repository.UserRepository
import com.example.keywordcrawling.security.TokenProvider
import com.example.keywordcrawling.util.flushOrThrow
import org.springframework.security.crypto.password.PasswordEncoder

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class UserService(val userRepository: UserRepository,
                  val tokenProvider: TokenProvider,
                  val encoder: PasswordEncoder,
) {
    fun getAllUser(): List<UserInfoResponse> {
        val result = userRepository.findAll()
        return result.map {
            UserInfoResponse(userSn = it?.userSn, userId = it?.userId, userName = it?.userName, role = it?.role)
        }
    }

    @Transactional
    fun registerUser(request: SignUpRequest) = SignUpResponse.from(
        userRepository.flushOrThrow(IllegalArgumentException("이미 사용중인 아이디입니다.")){
            save(User.from(request, encoder))}
    )

    @Transactional
    fun signIn(request: SignInRequest): SignInResponse {
        val user = userRepository.findByUserId(request.userId)
            ?.takeIf { encoder.matches(request.password, it.password) }
            ?: throw IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다.")
        val token = tokenProvider.createToken("${user.userId}:${user.role}")
        return SignInResponse(user.userName, user.role, token)
    }

    @Transactional
    fun updateUser(id: String, request: UserUpdateRequest): UserUpdateResponse {
        val user = userRepository.findByUserId(id)?.takeIf { encoder.matches(request.password, it.password) }
            ?: throw IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다.")
        user.update(request, encoder)
        return UserUpdateResponse.of(true, user)
    }
}

