package com.example.keywordcrawling.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class UserSignUpDto(
    val userId: String,
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    val password: String,
    val userName: String
) {
    constructor(userId: String?, userName: String?) : this(userId = userId!!, password = "", userName = userName!!)
}