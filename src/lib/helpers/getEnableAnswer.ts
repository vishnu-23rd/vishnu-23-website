import { getUserAnswer } from "@/lib/helpers/getAnswer";
import { Prediction } from "@/lib/helpers/getEnablePrediction";

export async function getEnableAnswer() {
  try {
    const response = await fetch("/api/v1/prediction", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { predictions } = await response.json();

    const enabledAnswers = predictions.find(
      (prediction: Prediction) => prediction.showAnswer
    );

    if (!enabledAnswers) {
      throw new Error("No enabled answers found");
    }

    const answer = await getUserAnswer({
      predictionId: enabledAnswers.predictionId,
    });

    return answer;
  } catch (error) {
    console.error("Error fetching answer:", error);
    throw new Error("Failed to fetch answer");
  }
}
