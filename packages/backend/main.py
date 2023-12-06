from transformers import T5ForConditionalGeneration, AutoTokenizer
import torch
import requests
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
import chromadb
from chromadb.utils import embedding_functions

app = FastAPI(
    title='Vietlaw API', openapi_url='/openapi.json', docs_url='/docs',
    description='LLMs for law'
)

# API MODEL CALL
# Chroma connect
db = chromadb.HttpClient(host='13.211.128.181', port=8000)
deMuc = db.get_collection(name='deMuc')

MODEL_FOLDER = "nhantran0506/law-llms-v1"
TOKENIZER_FOLDER = "nhantran0506/law-llms-v1"

model = T5ForConditionalGeneration.from_pretrained(MODEL_FOLDER)
tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_FOLDER)


generated_text = tokenizer.decode(output[0], skip_special_tokens=True)


client = Client("https://nhantran0506-vietlaw-llms.hf.space/--replicas/tr6ht/")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    # Allows CORS for this domain
    allow_origins=["http://localhost:3001",
                   "http://localhost:3000", "https://vielaw.vercel.app"],
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


class DeMucSearch(BaseModel):
    query: str


@app.post('/phapdien/search')
def search(request_data: DeMucSearch):
    results = deMuc.query(
        query_texts=[request_data.query],
        n_results=10
    )
    print(results)
    return results


@app.post('/phapdien/laydemuc')
def laydemuc(request_data: DeMucRequest):
    return FileResponse(os.getenv('RELATIVE_FILE_PATH')+'/database/demuc/' + request_data.demuc + '.html', media_type='text/html')


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
    # Document retrival
    doc = deMuc.query(
        query_texts=[request.query],
        n_results=1
    )

    if doc[1]["distance"] < 40:
        return {
            'result': doc["documents"][0]
        }

    # Grenerate question

    question = request.text

    prompt = f"""
            {doc}
            {question}
            """

    DEVICE = "cpu" if not torch.cuda.is_available() else "cuda"

    input_ids = tokenizer.encode(
        prompt, return_tensors="pt", max_length=512, truncation=True).to(DEVICE)

    output = model.generate(input_ids,
                            max_length=1024,
                            num_beams=2,
                            early_stopping=True,
                            temperature=0.3,
                            top_k=30,
                            do_sample=True)

    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    doc = deMuc.query(
        query_texts=[generated_text],
        n_results=2
    )

    if doc[1]["distance"] > 70:
        return {
            'result': f"Xin lỗi, tôi không hiểu câu hỏi '{question}'. Bạn có thể đặt câu hỏi khác được không?"
        }

    return {
        'result': output
    }
