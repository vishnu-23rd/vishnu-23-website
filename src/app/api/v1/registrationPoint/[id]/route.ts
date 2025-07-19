import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const studentId = params.id;
  const user = await db.collection("users").doc(studentId).get();
  if (!user.exists) {
    return NextResponse.json({ error: "Wrong student id" }, { status: 400 });
  }
  const userGroup = user.data()?.group;
  const group = await db.collection("groups").doc(userGroup).get();
  const registrationsPoint = group.data()?.registrationsPoint;
  return NextResponse.json(
    {
      registrationsPoint,
    },
    {
      status: 200,
    }
  );
}
