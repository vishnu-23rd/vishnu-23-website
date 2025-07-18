import emailToId from "@/lib/helpers/emailToId";
import { db, firebaseAdmin } from "@/lib/services/firebase.admin";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  // get token from the authorization request header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  //decoding the token to get the user email and role
  const session = await firebaseAdmin.auth().verifyIdToken(token);

  const role: string = session?.role;

  if (role != "admin") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    const studentId = emailToId(email);
    const doc = await db
      .collection("users")
      .where("studentId", "==", studentId)
      .get();

    if (doc.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = doc.docs[0];

    if (role === userDoc.data().role) {
      return NextResponse.json(
        { error: "Role is already set to this value" },
        { status: 400 }
      );
    }

    await userDoc.ref.update({ role });
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("Error updating role:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
