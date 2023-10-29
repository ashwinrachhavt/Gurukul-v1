import { NextResponse } from 'next/server'
import { db } from "../../../lib/db";
import { submissions_test } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
  const { userId } = auth();

  const payload = {
    "user_id": "123456789",
    "language": "Python",
    "sourceCode": "# This is a dummy Python code\nprint('Hello, world!')",
    // Add any other columns here
  }


  return NextResponse.json({hello:"hello world"}
  );
}


export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }
  const body = await request.json();

  console.log(body)

  const submission_id = await db.insert(submissions_test).values({ ...body, user_id: userId }).returning({insertedId: submissions_test.id});

  console.log(submission_id)

  return NextResponse.json(request);
}
