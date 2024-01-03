package com.example.keywordcrawlingpush.dto

data class SendPushMessageRequest(
    val deviceToken: String,
    val title: String,
    val body: String
)