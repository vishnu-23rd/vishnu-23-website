import { NextRequest, NextResponse } from "next/server";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/services/firebase.admin";
import emailToId from "@/lib/helpers/emailToId";

//This is a function to get history by userId (use in get method)
async function getUserHistory(uid: string) {
  const userData = await db.collection("users").doc(uid).get();

  if (!userData.exists) {
    return { getHistoryError: "User not found" };
  }

  //get user history (array of prediction ID)
  const userHistory = userData.data()?.predictions || [];

  const [predictionsData, answersData] = await Promise.all([
    db
      .collection("predictions")
      .where("__name__", "in", userHistory)
      .select("question", "solution", "day", "time")
      .get(),
    db
      .collection("answers")
      .where("userId", "==", uid)
      .where("predictionId", "in", userHistory)
      .select("predictionId", "isCorrect", "answer")
      .get(),
  ]);

  //get an array of user history data
  const userHistoryData = userHistory.map((predictionId: string) => {
    const prediction = predictionsData.docs.find(
      (doc) => doc.id === predictionId
    );
    const userAnswer = answersData.docs.find(
      (doc) => doc.data().predictionId === predictionId
    );

    //return prediction history
    //if user does not answer this prediction answer will be an empty string, and not Correct
    return {
      predictionId,
      question: prediction?.data()?.question,
      answer: userAnswer?.data()?.answer || "",
      solution: prediction?.data()?.solution,
      day: prediction?.data()?.day,
      time: prediction?.data()?.time,
      isCorrect: userAnswer?.data()?.isCorrect || false,
    };
  });

  //return object of userHistory
  return { userHistory: userHistoryData };
}

//this is a function to add user history by userId and predictionId
async function addUserHistory(uid: string, predictionId: string) {
  const userData = await db.collection("users").doc(uid).get();

  const userPredictions = userData.data()?.predictions || [];

  if (userPredictions.includes(predictionId)) {
    return { addingError: "Prediction already exists in user history" };
  }

  await userData.ref.update({
    predictions: [...(userData.data()?.predictions || []), predictionId],
  });
}

//This is a method to get list of prediction history
export async function GET(request: NextRequest) {
  try {
    const { decodedToken, error } = await firebaseAuthMiddleware(request);

    if (!decodedToken?.uid || error) {
      return NextResponse.json(
        { error: "Unauthorize or token is invalid" },
        { status: 401 }
      );
    }

    const uid = emailToId(decodedToken.email || "");

    const { userHistory, getHistoryError } = await getUserHistory(uid);

    //get history error ,user not found
    if (getHistoryError) {
      return NextResponse.json({ error: getHistoryError }, { status: 404 });
    }

    return NextResponse.json(
      {
        history: userHistory,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error in GET /api/v1/prediction/history:", err);
    return NextResponse.json(
      { error: "Error fetching prediction history : " + err },
      { status: 500 }
    );
  }
}

//method to add new history
export async function POST(request: NextRequest) {
  const { decodedToken, error } = await firebaseAuthMiddleware(request);

  if (!decodedToken?.uid || error) {
    return NextResponse.json(
      { error: "Unauthorize or token is invalid" },
      { status: 401 }
    );
  }

  try {
    //send prediction ID in http body

    const uid = emailToId(decodedToken.email || "");

    const { prediction } = await request.json();

    if (!prediction) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    //use addUserHistory function
    const addUserHistoryResult = await addUserHistory(uid, prediction);
    const addingError = addUserHistoryResult?.addingError;

    if (addingError) {
      return NextResponse.json(
        { error: addingError },
        { status: 409 } // Conflict if prediction already exists
      );
    }

    revalidatePath("/[locale]/game/prediction/histories");

    return NextResponse.json(
      {
        message: "Prediction added to user history",
        predictionId: prediction,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in POST /api/v1/prediction/history:", err);
    return NextResponse.json(
      { error: "Error adding prediction history: " + err },
      { status: 500 }
    );
  }
}
