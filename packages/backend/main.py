import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from auth import *
from security import validate_token


app = FastAPI(
    title='Vietlaw API', openapi_url='/openapi.json', docs_url='/docs',
    description='LLMs for law'
)


class LoginRequest(BaseModel):
    username: str
    password: str


@app.post('/login')
def login(request_data: LoginRequest):
    if verify_password(username=request_data.username, password=request_data.password):
        token = generate_token(request_data.username)
        return {
            'token': token
        }
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.get('/test', dependencies=[Depends(validate_token)])
def test():
    return {"status": "success"}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
