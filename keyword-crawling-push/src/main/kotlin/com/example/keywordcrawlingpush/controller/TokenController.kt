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
@PreAuthorize("hasRole('USER')")
class TokenController(
    val deviceTokenService: DeviceTokenService,
    val tokenProvider: TokenProvider,
    val userService: UserService
){
    @PostMapping
    fun addDeviceToken(@PathVariable id:Long, @RequestBody request: AddDeviceTokenRequest, authentication: Authentication): AddDeviceTokenResponse {
        val userToken = authentication.credentials as String
        val userId = tokenProvider.getUserId(userToken)
        if (userId is String){
            val userSn = userService.getUserSn(userId)
            if (id == userSn) {
                return deviceTokenService.addDeviceToken(id, request)
            }
        }

        return AddDeviceTokenResponse.of(false, null, "권한이 없습니다.")
    }

    @DeleteMapping
    fun deleteDeviceToken(@PathVariable id:Long, @RequestBody request: DeleteDeviceTokenRequest, authentication: Authentication): DeleteDeviceTokenResponse {
        val userToken = authentication.credentials as String
        val userId = tokenProvider.getUserId(userToken)
        if (userId is String){
            val userSn = userService.getUserSn(userId)
            if (id == userSn) {
                return deviceTokenService.deleteDeviceToken(id, request.deviceToken)
            }
        }

        return DeleteDeviceTokenResponse.of(false, "권한이 없습니다.")
    }
}
