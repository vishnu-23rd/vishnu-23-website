export type Prediction = {
  predictionId: string;
  question: string;
  solution: string;
  day: number;
  time: string;
  enable: boolean;
  showAnswer: boolean;
};

//get prediction that enable
export async function getEnablePrediction(): Promise<Prediction | undefined> {
  const predictions = await fetch("/api/v1/prediction", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const predictionsData = await predictions.json();

  return predictionsData.find((prediction: Prediction) => prediction.enable);
}
