async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/nhantran0506/law-llms-v1",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

query({ inputs: "The answer to the universe is" }).then((response) => {
  console.log(JSON.stringify(response));
});
