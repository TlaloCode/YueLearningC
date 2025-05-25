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

    try:
        # Intenta obtener la variable de entorno para producción
        raw_creds = config('GOOGLE_CREDENTIALS_JSON', default=None)
        if raw_creds:
            credentials_info = json.loads(raw_creds)
            credentials = service_account.Credentials.from_service_account_info(
                credentials_info, scopes=SCOPES
            )
        else:
            # Si no existe, usar archivo local (desarrollo)
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            SERVICE_ACCOUNT_FILE = os.path.join(BASE_DIR, 'Credentials', 'service_account.json')
            credentials = service_account.Credentials.from_service_account_file(
                SERVICE_ACCOUNT_FILE, scopes=SCOPES
            )
    except Exception as e:
        raise Exception(f"❌ Error al construir el servicio de Google Drive: {str(e)}")

    service = build('drive', 'v3', credentials=credentials)
    return service
# 🔹 Subir archivo a Google Drive
def upload_file_to_drive(file_obj, filename, folder_id=None):
    try:
        service = build_service()
    except Exception as e:
        raise Exception(f"❌ No se pudo construir el servicio de Google Drive: {str(e)}")

    try:
        file_metadata = {'name': filename}
        if folder_id:
            file_metadata['parents'] = [folder_id]

        # Detectar el tipo MIME del archivo desde el objeto recibido (Django lo proporciona)
        mimetype = getattr(file_obj, 'content_type', 'application/octet-stream')

        media = MediaIoBaseUpload(
            file_obj,
            mimetype=mimetype,
            chunksize=1024 * 1024,  # 1MB
            resumable=True
        )

        # Subir el archivo
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

    except Exception as e:
        raise Exception(f"❌ Error al subir el archivo a Google Drive: {str(e)}")
