package com.dkagroup.handyhub.constant;

import org.springframework.stereotype.Component;

@Component
public class EmailTextConstant {
    public String emailContent() {
        return
                "    <!DOCTYPE html>\n" +
                        "    <html>\n" +
                        "    <head>\n" +
                        "        <meta charset=\"UTF-8\">\n" +
                        "        <title>Task Rejected - Handy Hub</title>\n" +
                        "        <style>\n" +
                        "            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }\n" +
                        "            .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 10px;\n" +
                        "                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; }\n" +
                        "            .header { background-color: #ff4d4d; color: white; padding: 15px; font-size: 20px; border-radius: 10px 10px 0 0; }\n" +
                        "            .content { padding: 20px; font-size: 16px; color: #333; }\n" +
                        "            .footer { margin-top: 20px; font-size: 14px; color: #777; }\n" +
                        "        </style>\n" +
                        "    </head>\n" +
                        "    <body>\n" +
                        "        <div class=\"container\">\n" +
                        "            <div class=\"header\">Task Rejected</div>\n" +
                        "            <div class=\"content\">\n" +
                        "                <p>Dear User,</p>\n" +
                        "                <p>Your task has been <strong style=\"color: #ff4d4d;\">successfully rejected</strong>.</p>\n" +
                        "            </div>\n" +
                        "            <div class=\"footer\">\n" +
                        "                &copy; 2025 Handy Hub | All rights reserved.\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </body>\n" +
                        "    </html>";
    }
}
