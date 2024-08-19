import { db } from "@/lib/db";
import { savedJobPosts } from "@/drizzle/schema";
import { roleTypeEnum } from "@/types";
import { and, eq } from "drizzle-orm";

export const editSavedForLaterApplicationByIdAndUserId = async (id: string, userId: string, companyName: string, jobTitle: string, url: string, roleType: roleTypeEnum) => {
  let application
  try {
    application = await db.update(savedJobPosts).set({
      companyName,
      jobTitle,
      url,
      roleType
    }).where(and((eq(savedJobPosts.userId, userId)), (eq(savedJobPosts.id, id)))).returning()
  } catch (e) {
    console.error(e)
    return null
  }
  return application
}