import { USER_SETTINGS_KEYS } from "@/constants/core";
import { z } from "zod";

export const updateUserSettingSchema = z.object({
  key: z.enum(USER_SETTINGS_KEYS),
  value: z.any(), //!
  shouldUpdateDB: z.boolean(),
});
export type UpdateUserSettingSchema = z.infer<typeof updateUserSettingSchema>;
