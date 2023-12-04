import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from auth import *
from security import validate_token
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from database.database import *

app = FastAPI(
    title='Vietlaw API', openapi_url='/openapi.json', docs_url='/docs',
    description='LLMs for law'
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows CORS for this domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    username: str
    password: str


@app.get('/api/chude')
def chude():
    return lay_all_chuDe()


@app.get('/api/deMuc')
def chude():
    return lay_all_deMuc_from_a_chuDe('An ninh')


@app.get('/api/test')
def test():
    return search_html_content('An ninh quốc gia')


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
def test():
    return StreamingResponse(fake_video_streamer())


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
