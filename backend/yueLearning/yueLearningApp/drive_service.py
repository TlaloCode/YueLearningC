from google.oauth2 import service_account
from googleapiclient.discovery import build
import io
from googleapiclient.http import MediaIoBaseUpload
import os


# Construye la ruta absoluta al archivo JSON
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVICE_ACCOUNT_FILE = os.path.join(BASE_DIR, 'Credentials', 'service_account.json')

SCOPES = ['https://www.googleapis.com/auth/drive']
# 🔹 Crear una instancia del servicio de Google Drive
def build_service():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('drive', 'v3', credentials=credentials)
    return service

# 🔹 Subir archivo a Google Drive
def upload_file_to_drive(file_obj, filename, folder_id=None):
    service = build_service()

    file_metadata = {'name': filename}
    if folder_id:
        file_metadata['parents'] = [folder_id]

    media = MediaIoBaseUpload(file_obj, mimetype='image/jpeg')  # O image/png
    uploaded_file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    # 🔹 Obtener el enlace público
    file_id = uploaded_file.get('id')

    # Hacer el archivo público
    service.permissions().create(
        fileId=file_id,
        body={'role': 'reader', 'type': 'anyone'}
    ).execute()

    # Retornar el link público
    return file_id
