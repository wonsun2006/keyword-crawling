package com.example.keywordcrawlingpush.service

import com.example.keywordcrawlingpush.dto.AddDeviceTokenRequest
import com.example.keywordcrawlingpush.dto.AddDeviceTokenResponse
import com.example.keywordcrawlingpush.entity.DeviceToken
import com.example.keywordcrawlingpush.repository.DeviceTokenRepository
import com.example.keywordcrawlingpush.util.flushOrThrow
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
class DeviceTokenService(val deviceTokenRepository: DeviceTokenRepository) {

    @Transactional
    fun addDeviceToken(userSn: Long, request: AddDeviceTokenRequest): AddDeviceTokenResponse {
        val tokenData = deviceTokenRepository.flushOrThrow(IllegalArgumentException("이미 사용중인 아이디입니다.")){
            save(DeviceToken.from(request, userSn))}

        return AddDeviceTokenResponse.of(true, tokenData.deviceName, tokenData.deviceToken)
    }
}