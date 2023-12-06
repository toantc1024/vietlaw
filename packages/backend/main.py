import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from auth import *
from security import validate_token
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from database.database import *
from fastapi.responses import FileResponse
from gradio_client import Client

app = FastAPI(
    title='Vietlaw API', openapi_url='/openapi.json', docs_url='/docs',
    description='LLMs for law'
)

client = Client("https://nhantran0506-vietlaw-llms.hf.space/--replicas/25jv7/")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    # Allows CORS for this domain
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    username: str
    password: str


class Chatbot(BaseModel):
    text: str


class DeMucRequest(BaseModel):
    demuc: str


@app.post('/phapdien/laydemuc')
def laydemuc(request_data: DeMucRequest):
    return FileResponse('./database/demuc/' + request_data.demuc + '.html', media_type='text/html')


@app.get('/phapdien/data')
def chude():
    return getPhapDienData()


@app.post('/auth/login')
def login(request_data: LoginRequest):
    if verify_password(username=request_data.username, password=request_data.password):
        token = generate_token(request_data.username)
        return {
            'token': token
        }
    else:
        raise HTTPException(status_code=404, detail="User not found")


async def fake_video_streamer():

    for i in range(5):
        yield b"This topic"


@app.post('/api/chatbot', dependencies=[Depends(validate_token)])
def test(request: Chatbot):
    result = client.predict(
        request.text,  # str  in 'Input' Textbox component
        api_name="/predict"
    )
    return result


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
