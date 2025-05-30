import { UserSettings } from "@/types/core";

export const INTERNAL_DATE_FORMAT = "YYYY-MM-DD";
export const USER_SETTINGS_COOKIE_PREFIX = "settings";
export const USER_SETTINGS_KEYS = [
  "schoolId",
  "shouldShowNextSubjectTimer",
  "shouldShowPercentages",
  "shouldHighlightMissingAssignments",
  "shouldShowLetterGrade",
  "themeColor",
] as const satisfies Array<keyof UserSettings>;
//TODO change type to ensure all keys are included
export const USER_SETTINGS_DEFAULT_VALUES = {
  shouldShowNextSubjectTimer: true,
  shouldShowPercentages: true,
  shouldHighlightMissingAssignments: true,
  shouldShowLetterGrade: false,
  themeColor: "162 23% 49%",
};
export const isDevelopment = process.env.NODE_ENV === "development";
