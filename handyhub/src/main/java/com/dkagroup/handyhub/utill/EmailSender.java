package com.dkagroup.handyhub.utill;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Properties;

@Component
@Log4j2
public class EmailSender {

    @Value("${email.outgoing.protocol}")
    private String outgoingProtocol;

    @Value("${email.outgoing.server}")
    private String outgoingServer;

    @Value("${email.outgoing.port}")
    private String outgoingPort;

    @Value("${email.outgoing.username}")
    private String outgoingUsername;

    @Value("${email.outgoing.password}")
    private String outgoingPassword;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    public void sendMail2(String recipient, String ccRecipient, String subject, String content, List<String> bccRecipients) {
        if (content == null || content.trim().isEmpty()) {
            log.error("Content is null or empty. Cannot send email.");
            return;
        }

        if (recipient == null || recipient.trim().isEmpty()) {
            log.error("Recipient is null or empty. Cannot send email.");
            return;
        }

        log.info("Start function sendMail subject: {}, recipient: {}", subject, recipient);
        try {
            // Create properties field
            Properties properties = new Properties();
            properties.put("mail.transport.protocol", outgoingProtocol);
            properties.put("mail.smtp.host", outgoingServer);
            properties.put("mail.smtp.port", outgoingPort);
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.starttls.enable", "true"); // For TLS
            properties.put("mail.smtp.connectiontimeout", "10000"); // Connection timeout
            properties.put("mail.smtp.timeout", "10000"); // Read timeout
            properties.put("mail.smtp.writetimeout", "10000"); // Write timeout

            log.info("outgoingUsername: {}", outgoingUsername);

            // Validate outgoing credentials
            if (outgoingUsername == null || outgoingPassword == null) {
                log.error("Outgoing email credentials (username or password) are not configured.");
                return;
            }

            // Create a new session with an authenticator
            Session session = Session.getInstance(properties, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(outgoingUsername, outgoingPassword);
                }
            });

            // Debugging enabled for development purposes
            session.setDebug("dev".equals(activeProfile));

            // Create a new message
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(outgoingUsername));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));

            if (ccRecipient != null && !ccRecipient.trim().isEmpty()) {
                message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(ccRecipient));
            }

            if (bccRecipients != null && !bccRecipients.isEmpty()) {
                for (String bccRecipient : bccRecipients) {
                    if (bccRecipient != null && !bccRecipient.trim().isEmpty()) {
                        message.addRecipient(Message.RecipientType.BCC, new InternetAddress(bccRecipient));
                    }
                }
            }

            message.setSubject(subject);
            message.setContent(content, "text/html");

            // Send the email
            Transport.send(message);
            log.info("Message successfully sent to {}", recipient);

        } catch (AuthenticationFailedException e) {
            log.error("SMTP Authentication failed: {}", e.getMessage(), e);
        } catch (MessagingException e) {
            log.error("Failed to send email due to messaging error: {}", e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error occurred while sending email: {}", e.getMessage(), e);
        }
    }
}