import { USER_SETTINGS_DEFAULT_VALUES } from "@/constants/core";
import { InferSelectModel, relations, sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
export const users = table(
  "users",
  {
    id: t.text("id").primaryKey(), //user student id
    username: t.text().unique(), //encrypted
    password: t.text(), //encrypted
  },
  (table) => {
    return [
      t.check(
        "username_password_check",
        sql`(${table.username} IS NULL AND ${table.password} IS NULL) OR (${table.username} IS NOT NULL AND ${table.password} IS NOT NULL)`
      ),
    ];
  }
);
export const usersRelations = relations(users, ({ many, one }) => ({
  notifications_subscriptions: many(notifications_subscriptions),
  tracked_school_data: one(tracked_school_data),
}));
export const user_settings = table("user_settings", {
  id: t.uuid().defaultRandom().primaryKey(),
  userId: t
    .text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  updatedAt: t.timestamp("updated_at").defaultNow(),
  schoolId: t.text("school_id"),
  shouldShowNextSubjectTimer: t
    .boolean("should_show_next_subject_timer")
    .notNull()
    .default(USER_SETTINGS_DEFAULT_VALUES.shouldShowNextSubjectTimer),
  shouldShowPercentages: t
    .boolean("should_show_percentages")
    .notNull()
    .default(USER_SETTINGS_DEFAULT_VALUES.shouldShowPercentages),
  shouldHighlightMissingAssignments: t
    .boolean("should_highlight_missing_assignments")
    .notNull()
    .default(USER_SETTINGS_DEFAULT_VALUES.shouldHighlightMissingAssignments),
  shouldShowLetterGrade: t
    .boolean("should_show_letter_grade")
    .notNull()
    .default(USER_SETTINGS_DEFAULT_VALUES.shouldShowLetterGrade),
  themeColor: t.text("theme_color"),
});

export type UserSettingsSelectModel = InferSelectModel<typeof user_settings>;
export const notifications_settings = table("notifications_settings", {
  id: t.uuid().defaultRandom().primaryKey(),
  userId: t
    .text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  newAssignments: t.boolean("new_assignments").notNull().default(true),
});

export const notifications_subscriptions = table(
  "notifications_subscriptions",
  {
    id: t.uuid().defaultRandom().primaryKey(),
    userId: t
      .text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    endpointUrl: t.text("endpoint_url").unique().notNull(),
    deviceId: t.text("device_id").unique().notNull(),
    publicKey: t.text("public_key").notNull(),
    authKey: t.text("auth_key").notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    lastSeenAt: t.timestamp("last_seen_at").defaultNow().notNull(),
  }
);
export const notifications_subscriptionsRelations = relations(
  notifications_subscriptions,
  ({ one }) => ({
    user: one(users, {
      fields: [notifications_subscriptions.userId],
      references: [users.id],
    }),
  })
);
export type NotificationsSubscriptionSelectModel = InferSelectModel<
  typeof notifications_subscriptions
>;
export const notificationSubscriptionSchema = createSelectSchema(
  notifications_subscriptions
);
export const tracked_school_data = table("tracked_school_data", {
  id: t.uuid().defaultRandom().primaryKey(),
  userId: t
    .text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  subjects: t.jsonb("subjects").notNull(),
  updatedAt: t
    .timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
export type TrackedSchoolDataSelectModel = InferSelectModel<
  typeof tracked_school_data
>;
export type TrackedSubject = {
  assignments: Array<{
    id: string;
    score?: number;
  }>;
};
export const tracked_school_dataRelations = relations(
  tracked_school_data,
  ({ one }) => ({
    user: one(users, {
      fields: [tracked_school_data.userId],
      references: [users.id],
    }),
  })
);
