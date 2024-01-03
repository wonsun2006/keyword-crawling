package com.example.keywordcrawlingpush.entity

import com.example.keywordcrawlingpush.dto.AddDeviceTokenRequest
import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class DeviceToken(
        @Id
        val deviceToken: String,
        val userSn: Long,
        val deviceName: String? = null
){
    companion object {
        fun from(request: AddDeviceTokenRequest, userSn: Long): DeviceToken {
            return DeviceToken(
                    deviceToken = request.deviceToken,
                    userSn = userSn,
                    deviceName = request.deviceName
            )
        }
    }
}