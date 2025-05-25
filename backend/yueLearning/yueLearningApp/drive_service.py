from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from decouple import config
import os
import io
import json

SCOPES = ['https://www.googleapis.com/auth/drive']

def build_service():
    credentials = None

    # Si existe la variable de entorno, estamos en producción (Railway)
    if os.getenv('GOOGLE_CREDENTIALS_JSON'):
        credentials_info = json.loads(config('GOOGLE_CREDENTIALS_JSON'))
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info, scopes=SCOPES
        )
    else:
        # Ruta al archivo local
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        SERVICE_ACCOUNT_FILE = os.path.join(BASE_DIR, 'Credentials', 'service_account.json')
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES
        )

    service = build('drive', 'v3', credentials=credentials)
    return service

# 🔹 Subir archivo a Google Drive
def upload_file_to_drive(file_obj, filename, folder_id=None):
    service = build_service()

    file_metadata = {'name': filename}
    if folder_id:
        file_metadata['parents'] = [folder_id]

    # Detectar el tipo MIME del archivo desde el objeto recibido (Django lo proporciona)
    mimetype = getattr(file_obj, 'content_type', 'application/octet-stream')

    media = MediaIoBaseUpload(
        file_obj,
        mimetype=mimetype,
        chunksize=1024*1024,  # 1MB
        resumable=True
    )

    uploaded_file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    file_id = uploaded_file.get('id')

    # Hacer el archivo público
    service.permissions().create(
        fileId=file_id,
        body={'role': 'reader', 'type': 'anyone'}
    ).execute()

    return file_id