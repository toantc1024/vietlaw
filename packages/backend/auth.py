import jwt
from datetime import datetime, timedelta
from typing import Union, Any
from dotenv import load_dotenv
import os

load_dotenv()
SECURITY_ALGORITHM = os.getenv('SECURITY_ALGORITHM')
SECRET_KEY = os.getenv('SECRET_KEY')


def verify_password(username, password):
    # Add authentication latter
    if username == 'admin' and password == 'admin':
        return True
    return False


def generate_token(username: Union[str, Any]) -> str:
    expire = datetime.utcnow() + timedelta(
        seconds=60 * 60 * 24 * 7  # Expired after 2 days
    )
    to_encode = {
        "exp": expire, "username": username
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY,
                             algorithm=SECURITY_ALGORITHM)
    print(encoded_jwt)
    return encoded_jwt
