import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

//this is a function to add new prediction
async function addPrediction(prediction: {
  question: string;
  solution: string;
  day: number;
  time: string;
}) {
  await db.collection("predictions").add({
    question: prediction.question,
    solution: prediction.solution,
    day: prediction.day,
    time: prediction.time,
    enable: false,
    showAnswer: false,
  });
}

//this is a method to get all prediction
export async function GET() {
  try {
    const predictions = (await db.collection("predictions").get()).docs;

    return NextResponse.json(
      {
        predictions: predictions.map((doc) => {
          return {
            predictionId: doc.id,
            ...doc.data(),
          };
        }),
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Fetching error : " + err);
    return NextResponse.json({ error: "Fetching error" }, { status: 500 });
  }
}

//this is a method to add new prediction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, solution, day, time } = body;

    if (!question || !solution || !day || !time) {
      return NextResponse.json(
        {
          error: "question,solution,day and time are required",
        },
        { status: 400 }
      );
    }

    await addPrediction({ question, solution, day, time });

    return NextResponse.json(
      {
        message: "successfully create prediction",
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error create prediction : " + err);
    return NextResponse.json(
      {
        error: "Error create prediction : " + err,
      },
      {
        status: 500,
      }
    );
  }
}
