'use client';

import { useState, useEffect } from 'react';
import { connect } from "@planetscale/database"
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { db } from "../../../lib/db/config"
import { submissions } from "../../../lib/db/schema"
import { useAuth, auth, useUser, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm"

// interface UserSubmission {
//   id: number;
//   userid: string;
//   languageId: number;
//   sourceCode: string;
//   stdin: string;
//   outputStatus: unknown;
//   outputMemory: number;
//   outputTime: string;
// }

async function fetchUserSubmissions(userId: string) {
    const result = await db.select().from(submissions).execute();
    return result;
}
 



export default function Example() {
  //const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

    const result = fetchUserSubmissions(user.id)

    console.log(result)
  
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-2xl font-medium">User Details</h2>
        {/* Option 1: Use JSON.stringify to convert the user object into a string */}
        <pre className="mt-4 bg-gray-100 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
        <br></br>
      </div>
    </div>
  );
}