import os
import io
import json
import base64
from email.message import EmailMessage
from decouple import config
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def send_email_gmail(to_email, subject, body_text):
    try:
        raw_creds = config("GOOGLE_GMAIL_JSON", default=None)
        if raw_creds:
            # PRODUCCIÓN
            credentials_info = json.loads(raw_creds)
            creds = Credentials.from_service_account_info(credentials_info, scopes=SCOPES)
        else:
            # DESARROLLO: usa el archivo físico
            base_dir = os.path.dirname(os.path.abspath(__file__))
            credentials_path = os.path.join(base_dir, 'Credencials', 'credentials.json')
            creds = Credentials.from_service_account_file(credentials_path, scopes=SCOPES)

        service = build('gmail', 'v1', credentials=creds)

        message = EmailMessage()
        message.set_content(body_text)
        message['To'] = to_email
        message['From'] = creds.service_account_email # puede seguir siendo la cuenta delegada
        message['Subject'] = subject

        encoded = base64.urlsafe_b64encode(message.as_bytes()).decode()
        result = service.users().messages().send(userId="me", body={'raw': encoded}).execute()
        return result
    except Exception as e:
        raise Exception(f"❌ Error al enviar correo: {str(e)}")
