package com.example.keywordcrawlingpush.service

import com.example.keywordcrawlingpush.dto.AddDeviceTokenRequest
import com.example.keywordcrawlingpush.dto.AddDeviceTokenResponse
import com.example.keywordcrawlingpush.dto.DeleteDeviceTokenResponse
import com.example.keywordcrawlingpush.dto.GetDeviceTokensResponse
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

    @Transactional
    fun deleteDeviceToken(userSn: Long, deviceToken: String): DeleteDeviceTokenResponse {
        val tokenData = deviceTokenRepository.findByUserSnAndDeviceToken(userSn, deviceToken)
            ?: throw IllegalArgumentException("해당 디바이스 토큰이 존재하지 않습니다.")
        deviceTokenRepository.delete(tokenData)

        return DeleteDeviceTokenResponse.of(true, "디바이스 토큰이 삭제되었습니다.")
    }

    fun getDeviceTokens(id: Long): GetDeviceTokensResponse {
        val result = deviceTokenRepository.findAllByUserSn(id)
        return GetDeviceTokensResponse.of(result)
    }
}