package com.example.keywordcrawling

import com.example.keywordcrawling.common.UserRole
import com.example.keywordcrawling.entity.User
import com.example.keywordcrawling.repository.UserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class AdminInitializer(
    private val userRepository: UserRepository,
    private val encoder: PasswordEncoder
) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        userRepository.save(User(userId="admin", password=encoder.encode("admin"), role= UserRole.ROLE_ADMIN))
    }
}