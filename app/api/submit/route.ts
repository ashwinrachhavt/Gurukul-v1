import { NextResponse } from 'next/server'
// import { db } from "../../../lib/db/config";
// import { currentUser, useUser } from "@clerk/nextjs";
// import { getAuth } from '@clerk/nextjs/server';
// import { submissions } from "../../../lib/db/schema";

// export async function POST(request: Request) {
//   const body = await request.json();
 
//   // Destructure the body object to get the values for each field
//   const {
//     userid,
//     language_id,
//     source_code,
//     stdin,
//     output_status,
//     output_memory,
//     output_time
//   } = body;

//   console.log(body)

//   // Specify a value for the language_id field
//   const submission_id = await db.insert(submissions).values(body).execute();

//   console.log(submission_id)

//   return NextResponse.json({});
//  }

 
 // pages/route-name.js
import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();
 
  // Send the POST request to the Xano backend
  const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:VB5qx6PF/samplesubmissions', body);
  // Handle the response from the Xano backend
  if (response.status === 200) {
    // The request was successful
    // console.log(response.data);
    return NextResponse.json(response.data);
  } else {
    // The request failed
    console.error("Request Failed"
    );
    return NextResponse.error();
  }
}

 
 
