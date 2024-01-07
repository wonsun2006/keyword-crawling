package com.example.keywordcrawlingpush.dto

data class AddDeviceTokenResponse(
        val result: Boolean,
        val deviceName: String? = null,
        val deviceToken: String? = null
){
    companion object {
        fun of(result: Boolean, deviceName:String?, deviceToken: String) = AddDeviceTokenResponse(
            result = result,
            deviceName = deviceName,
            deviceToken = deviceToken
        )
    }
}

data class DeleteDeviceTokenResponse(
        val result: Boolean,
        val message: String? = null
){
    companion object {
        fun of(result: Boolean, message: String?) = DeleteDeviceTokenResponse(
            result = result,
            message = message
        )
    }
}