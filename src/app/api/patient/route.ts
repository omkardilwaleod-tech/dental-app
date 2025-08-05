import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, mobileNo, address, email, opdType, treatment } = body;

  if (!name || !mobileNo || !address || !opdType || !treatment) {
    return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // Uses the default DB from your connection string
    const result = await db.collection("patients").insertOne({
      name,
      mobileNo,
      address,
      email,
      opdType,
      treatment,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, patientId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save patient." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const patients = await db.collection("patients").find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ patients });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch patients." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { _id, treatment, seating, consultant, status, total } = body;
  if (!_id) return NextResponse.json({ error: "Missing patient ID" }, { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db();
    await db.collection("patients").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          treatment,
          seating,
          consultant,
          status,
          total,
          updatedAt: new Date(),
        },
      }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update patient." }, { status: 500 });
  }
}


