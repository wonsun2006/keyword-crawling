package com.example.keywordcrawlingpush.config

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource

@Configuration
class FcmConfig {
    @Bean
    fun baseFirebaseApp(): FirebaseApp {

        val options = FirebaseOptions
            .builder()
            .setCredentials(GoogleCredentials.fromStream(ClassPathResource("/firebase/firebase_service_key.json").inputStream))
            .build()

        return FirebaseApp.initializeApp(options)
    }
}