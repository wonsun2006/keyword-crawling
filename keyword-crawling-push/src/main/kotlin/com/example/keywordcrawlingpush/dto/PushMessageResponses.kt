package com.example.keywordcrawlingpush.dto

data class SendPushMessageResponse(
        val result: Boolean,
        val deviceToken: String,
        val title: String,
        val body: String,
)