
import { connect } from "@planetscale/database"
import {config} from "./db/config"
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { submissions } from "./db/schema"
import { eq } from "drizzle-orm"
// import { Course } from "../types"
// import { Submissions } from "../types"
import { sql } from "drizzle-orm"


export default async function getUserSubmissions(userId: string): Promise<Submissions[]> {
    const conn = connect(config)
    const db = drizzle(conn)
 
    const results : Submissions[] = await db.query.submissions.findMany({
        where: (submissions, { eq }) => eq(submissions.userid, userId)
    });
 
    return results
 }
 