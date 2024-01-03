package com.example.keywordcrawlingpush.dto

data class AddDeviceTokenRequest(
        val deviceToken: String,
        val deviceName: String? = null
)