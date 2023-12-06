
from transformers import T5ForConditionalGeneration, AutoTokenizer
import torch

MODEL_FOLDER = "nhantran0506/law-llms-v2"
TOKENIZER_FOLDER = "nhantran0506/law-llms-v2"

model = T5ForConditionalGeneration.from_pretrained(MODEL_FOLDER)
tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_FOLDER)


# Document retrival
doc = ""

# Grenerate question

question = input("Question: ")

prompt = f"""
        {doc}
        {question}
        """

DEVICE = "cpu" if not torch.cuda.is_available() else "cuda"

input_ids = tokenizer.encode(
    prompt, return_tensors="pt", max_length=512, truncation=True).to(DEVICE)

output = model.generate(input_ids,
                        max_length=128,
                        num_beams=2,
                        early_stopping=True,
                        top_p=0.95,
                        top_k=30,
                        do_sample=True)

generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
