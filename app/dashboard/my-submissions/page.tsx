"use client";
import { useAuth, auth, useUser } from "@clerk/nextjs";

export default function Example() {
  //const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-2xl font-medium">User Details</h2>
        {/* Option 1: Use JSON.stringify to convert the user object into a string */}
        <pre className="mt-4 bg-gray-100 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(resp, null, 2)}
        </pre>
        <br></br>
      </div>
    </div>
  );
}