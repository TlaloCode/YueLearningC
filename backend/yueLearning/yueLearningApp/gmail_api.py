import os
import io
import json
import base64
from decouple import config
from email.message import EmailMessage
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google.oauth2.service_account import Credentials as ServiceAccountCredentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def send_email_gmail(to_email, subject, body):
    creds = None

    try:
        # ✅ PRODUCCIÓN: leer de variable de entorno
        raw_creds = config("GOOGLE_GMAIL_JSON", default=None)
        if raw_creds:
            info = json.loads(raw_creds)
            creds = ServiceAccountCredentials.from_service_account_info(info, scopes=SCOPES)
        else:
            # ✅ DESARROLLO: usar archivo credentials.json + token.json
            if os.path.exists('token.json'):
                creds = Credentials.from_authorized_user_file('token.json', SCOPES)

            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                else:
                    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                    credentials_path = os.path.join(BASE_DIR, 'Credentials', 'credentials.json')
                    flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
                    creds = flow.run_local_server(port=0)

                with open('token.json', 'w') as token:
                    token.write(creds.to_json())
    except Exception as e:
        raise Exception(f"❌ Error al obtener credenciales de Gmail: {str(e)}")

    try:
        service = build('gmail', 'v1', credentials=creds)

        message = EmailMessage()
        message.set_content(body)
        message['To'] = to_email
        message['From'] = 'yuelearning2025a011@gmail.com'
        message['Subject'] = subject

        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        create_message = {'raw': encoded_message}

        send_message = service.users().messages().send(userId="me", body=create_message).execute()
        return send_message
    except Exception as e:
        raise Exception(f"❌ Error al enviar correo: {str(e)}")
