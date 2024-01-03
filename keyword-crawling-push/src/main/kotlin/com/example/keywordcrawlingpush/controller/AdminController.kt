package com.example.keywordcrawlingpush.controller

import com.example.keywordcrawlingpush.dto.SendPushMessageRequest
import com.example.keywordcrawlingpush.dto.SendPushMessageResponse
import com.example.keywordcrawlingpush.dto.UserInfoResponse
import com.example.keywordcrawlingpush.service.FcmService
import com.example.keywordcrawlingpush.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
class AdminController(val userService: UserService, val fcmService: FcmService){
    @GetMapping("/users")
    fun getAllUser(): List<UserInfoResponse> {
        return userService.getAllUser()
    }

    @PostMapping("/send-push")
    fun sendPushMessage(@RequestBody request: SendPushMessageRequest): SendPushMessageResponse {
        return fcmService.sendPushMessage(request.deviceToken, request.title, request.body)
    }

}
