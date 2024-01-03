package com.example.keywordcrawlingpush.controller

import com.example.keywordcrawlingpush.dto.*
import com.example.keywordcrawlingpush.security.TokenProvider
import com.example.keywordcrawlingpush.service.DeviceTokenService
import com.example.keywordcrawlingpush.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users/{id}/tokens")
class TokenController(
    val deviceTokenService: DeviceTokenService,
    val tokenProvider: TokenProvider,
    val userService: UserService
){
    @PostMapping
    fun addDeviceToken(@PathVariable id:Long, @RequestBody request: AddDeviceTokenRequest, authentication: Authentication): AddDeviceTokenResponse {
        val userToken = authentication.credentials as String
        val userData = tokenProvider.validateTokenAndGetSubject(userToken)
        if (userData is String){
            val userId = userData.split(":").let { it[0] }
            val userSn = userService.getUserSn(userId)
            if (id == userSn) {
                return deviceTokenService.addDeviceToken(id, request)
            }
        }

        return AddDeviceTokenResponse.of(false, null, "권한이 없습니다.")
    }
}
