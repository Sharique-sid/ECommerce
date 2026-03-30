package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    public void sendEmail(String to, String subject, String body) {
        // Check if email is configured
        if (fromEmail == null || fromEmail.isEmpty()) {
            log.warn("Email service not configured. Email would have been sent to: {} with subject: {}", to, subject);
            log.warn("To enable email, set environment variables: MAIL_USERNAME and MAIL_PASSWORD");
            log.warn("Email body: {}", body);
            throw new RuntimeException("Email service is not configured. Please set up SMTP credentials (MAIL_USERNAME and MAIL_PASSWORD)");
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }
}
