package com.example.keywordcrawling.entity

import jakarta.persistence.*

@Entity(name="users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val userSn: Long? = null,
    val userId: String? = null,
    val password: String? = null,
    val userName: String? = null,
    val deviceToken: String? = null
)