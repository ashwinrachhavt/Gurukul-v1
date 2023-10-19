import { NextResponse } from 'next/server'
import { auth } from "@clerk/nextjs"

import supabaseClient from '@/lib/supabase-client'

export async function POST(request: Request) {
  
  const { getToken, userId } = auth()
  const supabaseAccessToken = await getToken({ template: "supabase" })
  const supabase = await supabaseClient(supabaseAccessToken as string)
  if (!userId) throw new Error("User ID not found")

  const { code, language } = await request.json()
  const { data, error } = await supabase
    .from('codeSubmissionsTest')
    .insert([
      { code : code, language: language.value, userId: userId },
    ])


  if (error) throw error

  return NextResponse.json({ message: 'Code submission saved successfully.' })
}
