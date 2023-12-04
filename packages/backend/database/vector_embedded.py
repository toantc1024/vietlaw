import weaviate
from weaviate.embedded import EmbeddedOptions

client = weaviate.Client(
    embedded_options=EmbeddedOptions()
)

data_obj = {
    "name": "Chardonnay",
    "description": "Goes with fish"
}

client.data_object.create(data_obj, "Wine")
