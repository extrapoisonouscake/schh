import { trpc } from "@/app/trpc";
import { updateUserSettingState } from "@/helpers/updateUserSettingsState";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AsyncSwitchField } from "./async-switch-field";

export function SyncSettingsSwitch({
  initialValue,
}: {
  initialValue: boolean;
}) {
  const optInMutation = useMutation(
    trpc.core.settings.switchSettingsSync.mutationOptions()
  );
  return (
    <AsyncSwitchField
      label="Sync settings across devices"
      settingKey="isSynced"
      onChange={async (newValue) => {
        updateUserSettingState("isSynced", newValue);
        try {
          await optInMutation.mutateAsync();
        } catch (error) {
          toast.error("Failed to sync settings");
          updateUserSettingState("isSynced", !newValue);
        }
      }}
      initialValue={initialValue}
    />
  );
}
