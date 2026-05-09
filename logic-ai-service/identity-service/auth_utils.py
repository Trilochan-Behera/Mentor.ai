import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_otp_email(receiver_email: str, otp: str):
    smtp_server = os.getenv("SMTP_SERVER", "smtp-relay.brevo.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    # Create Message
    message = MIMEMultipart()
    message["From"] = f"LOGIC.ai Support <{smtp_user}>"
    message["To"] = receiver_email
    message["Subject"] = f"{otp} is your LOGIC.ai Verification Code"

    body = f"""
    <html>
        <body>
            <h2>Welcome to LOGIC.ai</h2>
            <p>To complete your Sovereign Identity setup, please use the following OTP:</p>
            <h1 style="color: #1A237E;">{otp}</h1>
            <p>This code is valid for 5 minutes. If you didn't request this, please ignore this email.</p>
        </body>
    </html>
    """
    message.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(message)
        return True
    except Exception as e:
        print(f"SMTP Error: {e}")
        return False