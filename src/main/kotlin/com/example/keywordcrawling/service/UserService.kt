package com.example.keywordcrawling.service

import com.example.keywordcrawling.dto.UserDetailDto
import com.example.keywordcrawling.dto.UserSignUpDto
import com.example.keywordcrawling.entity.User
import com.example.keywordcrawling.repository.UserRepository

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class UserService(val userRepository: UserRepository) {
    fun joinUser(dto: UserSignUpDto) : UserDetailDto{
        val user = User(
            userId = dto.userId,
            password = dto.password,
            userName = dto.userName
        )
        val result = userRepository.save<User>(user)
        return UserDetailDto(userId = result.userId!!, userName = result.userName!!)
    }
}

