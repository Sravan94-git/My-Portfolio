package com.myportfolio.myportfoliobackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myportfolio.myportfoliobackend.ContactForm;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @PostMapping
    public ResponseEntity<String> submitContactForm(@RequestBody ContactForm formData) {
        System.out.println("New contact form submission:");
        System.out.println("Name: " + formData.getName());
        System.out.println("Email: " + formData.getEmail());
        System.out.println("Message: " + formData.getMessage());

        // In a real application, you would save this to a database or send an email.
        // For now, we'll just send a success response.
        return ResponseEntity.ok("Message received successfully!");
    }
}