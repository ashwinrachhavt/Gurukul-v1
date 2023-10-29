import { users, CreateUser } from "../../lib/db/schema"
import { db } from "../../lib/db";
import { eq } from 'drizzle-orm';

export const createUser = async (user: CreateUser) => {
    await db
        .insert(users)
        .values({ ...user})
        .returning()
}

export const deleteUser = async (userId: string) => {
    await db
        .delete(users)
        .where(eq(users.authId, userId))
        .returning({ deletedId: users.authId })

}

export const updateUser = async (user: CreateUser) => {

    if (user.authId) {
        await db    
            .update(users)
            .set({ ...user })
            .where(eq(users.authId, user.authId))
    }

}