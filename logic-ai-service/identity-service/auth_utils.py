import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import hashlib
import os
import hmac


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

def hash_password(password: str) -> str:
    salt = os.urandom(16).hex()
    # Combine salt and password string
    sha256 = hashlib.sha256()
    sha256.update(f"{salt}{password}".encode('utf-8'))
    return f"{salt}.{sha256.hexdigest()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        salt, stored_hash = hashed_password.split('.')
        sha256 = hashlib.sha256()
        sha256.update(f"{salt}{plain_password}".encode('utf-8'))
        return hmac.compare_digest(sha256.hexdigest(), stored_hash)
    except Exception:
        return False