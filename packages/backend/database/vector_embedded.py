import weaviate
import weaviate.classes as wvc

# As of November 2023, we are working towards making all WCS instances compatible with the new API introduced in the v4 Python client.
# Accordingly, we show you how to connect to a local instance of Weaviate.
# Here, authentication is switched off, which is why you do not need to provide the Weaviate API key.
client = weaviate.connect_to_local(
    port=8080,
    grpc_port=50051,
    headers={
        # Replace with your inference API key
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]
    }
)

questions = client.collections.get("Question")

response = questions.query.near_text(
    query="biology",
    limit=2
)

print(response.objects[0].properties)  # Inspect the first object
