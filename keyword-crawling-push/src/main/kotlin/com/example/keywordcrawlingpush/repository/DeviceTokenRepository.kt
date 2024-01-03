package com.example.keywordcrawlingpush.repository

import com.example.keywordcrawlingpush.entity.DeviceToken
import com.example.keywordcrawlingpush.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DeviceTokenRepository : JpaRepository<DeviceToken?, Long?> {
    fun findByUserSn(userSn: Long?): DeviceToken?
}
