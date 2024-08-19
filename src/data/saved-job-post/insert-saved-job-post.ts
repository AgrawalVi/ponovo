import { db } from "@/lib/db";
import { savedJobPosts } from "@/drizzle/schema";
import { roleTypeEnum } from "@/types";

export const insertSavedJobPost = async (
  userId: string,
  companyName: string,
  jobTitle: string,
  addedDate: Date,
  roleType: roleTypeEnum,
  url: string | undefined
)=> {
  let newJobPost
  try {
    newJobPost = await db.insert(savedJobPosts).values({
      userId,
      companyName,
      jobTitle,
      addedDate,
      url,
      roleType
    }).returning()
  } catch (e) {
    console.error(e)
    return null
  }
  return newJobPost[0]
}