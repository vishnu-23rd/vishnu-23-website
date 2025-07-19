export async function getUserAnswer({
  predictionId,
}: {
  predictionId: string;
}) {
  const response = await fetch(
    `/api/v1/prediction/answer?prediction=${predictionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch answer");
  }

  const answer = await response.json();

  return answer;
}
