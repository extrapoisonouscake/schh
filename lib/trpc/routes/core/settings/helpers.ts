import { db } from "@/db";
import {
  notifications_subscriptions,
  tracked_school_data,
  TrackedSubject,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const updateSubjectLastAssignments = async (
  userId: string,
  subjectId: string,
  lastAssignments: TrackedSubject["assignments"]
) => {
  const hasNotifications = await db
    .select()
    .from(notifications_subscriptions)
    .where(eq(notifications_subscriptions.userId, userId))
    .limit(1);

  if (!hasNotifications.length) {
    return;
  }
  await db
    .insert(tracked_school_data)
    .values({
      userId,
      subjects: {
        [subjectId]: {
          assignments: lastAssignments,
        } satisfies TrackedSubject,
      },
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: tracked_school_data.userId,
      set: {
        subjects: sql`jsonb_set(
          ${tracked_school_data.subjects},
          ${`{${subjectId}}`}::text[],
          ${JSON.stringify({
            assignments: lastAssignments,
          } satisfies TrackedSubject)}::jsonb,
          true
        )`,
        updatedAt: new Date(),
      },
    });
};
