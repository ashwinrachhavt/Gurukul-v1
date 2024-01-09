// utils/supabaseUtils.js
import { createClient } from '@supabase/supabase-js';
// import { cookies } from 'next/headers';

export const initSupabase = () => {
 return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

export const fetchProblems = async (supabase, tableName) => {
 const { data, error } = await supabase.from(tableName).select('*');
 if (error) throw error;
 return data;
};

export const fetchProblemById = async (supabase, tableName, id) => {
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id);
    if (error) throw error;
    return data;
   };

export const insertIntoTable = async (supabase, tableName, data) => {
    const { data: result, error } = await supabase.from(tableName).insert([data]);
    if (error) throw error;
    return result;
};