package com.example.keywordcrawling.repository

import com.example.keywordcrawling.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User?, Long?> {
    fun findByUserId(userId: String?): User?
}
