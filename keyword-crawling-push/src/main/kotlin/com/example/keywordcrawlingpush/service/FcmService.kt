package com.example.keywordcrawlingpush.service

import com.example.keywordcrawlingpush.dto.SendPushMessageResponse
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.Message
import com.google.firebase.messaging.MulticastMessage
import com.google.firebase.messaging.Notification
import org.springframework.stereotype.Service


@Service
class FcmService {
    fun sendPushMessage(targetToken: String, title: String, body: String): SendPushMessageResponse {
        val message: Message = Message.builder()
            .setNotification(Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build())
            .setToken(targetToken)
            .build()
        try {
            val response = FirebaseMessaging.getInstance().send(message)
            println("Successfully sent push message: $response")
        }catch(e: Exception){
            println("Failed to sent push message: $e")
            return SendPushMessageResponse(
                result = false,
                deviceToken = targetToken,
                title = title,
                body = body
            )
        }

        return SendPushMessageResponse(
            result = true,
            deviceToken = targetToken,
            title = title,
            body = body
        )
    }

    fun sendPushMessageMultiple(targetTokens: Collection<String>, title: String, body: String): SendPushMessageResponse {
        val message = MulticastMessage.builder()
            .setNotification(Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build())
            .addAllTokens(targetTokens)
            .build()
        val response = FirebaseMessaging.getInstance().sendMulticast(message)
        if (response.failureCount > 0) {
            val responses = response.responses
            val failedTokens: MutableList<String> = ArrayList()
            for (i in responses.indices) {
                if (!responses[i].isSuccessful) {
                    // The order of responses corresponds to the order of the registration tokens.
                    failedTokens.add(targetTokens.elementAt(i))
                }
            }
            println("List of tokens that caused failures: $failedTokens")
            return SendPushMessageResponse(
                result = false,
                deviceToken = targetTokens.toString(),
                title = title,
                body = body
            )
        }

        return SendPushMessageResponse(
            result = true,
            deviceToken = targetTokens.toString(),
            title = title,
            body = body
        )
    }
}