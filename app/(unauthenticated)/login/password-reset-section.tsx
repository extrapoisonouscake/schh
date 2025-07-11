import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormErrorMessage } from "@/hooks/use-form-error-message";
import { useFormValidation } from "@/hooks/use-form-validation";

import { trpc } from "@/app/trpc";
import { isTRPCError } from "@/lib/trpc/helpers";
import {
  PasswordResetSchema,
  passwordResetSchema,
} from "@/lib/trpc/routes/myed/auth/public";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function PasswordResetSection({
  setLoginFormValues,
  getInitialUsername,
}: {
  setLoginFormValues: (newUsername: string) => void;
  getInitialUsername: () => string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useFormValidation(passwordResetSchema);
  const { errorMessage, setErrorMessage, errorMessageNode } =
    useFormErrorMessage();
  const [securityQuestion, setSecurityQuestion] = useState<string | null>(null);
  const resetPasswordMutation = useMutation(
    trpc.myed.auth.resetPassword.mutationOptions()
  );
  const onSubmit = async (data: PasswordResetSchema) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    try {
      const response = await resetPasswordMutation.mutateAsync({
        ...data,
        securityQuestion: securityQuestion ?? undefined,
      });
      const newSecurityQuestion = response.securityQuestion; //fix types
      if (newSecurityQuestion) {
        setSecurityQuestion(newSecurityQuestion);
      } else {
        toast.success("A temporary password has been sent to your email.");
        setIsOpen(false);
        setErrorMessage(null);
        setSecurityQuestion(null);
        setLoginFormValues(data.username);
        form.reset();
      }
    } catch (e) {
      if (isTRPCError(e)) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };
  const clearSecurityQuestion = () => {
    if (securityQuestion) {
      setSecurityQuestion(null);
      form.setValue("securityAnswer", "");
    }
  };

  // Update form values when initial username changes
  useEffect(() => {
    if (isOpen) {
      const currentUsername = getInitialUsername();
      form.setValue("username", currentUsername);

      // Use setTimeout to ensure the dialog is fully rendered before setting focus
      setTimeout(() => {
        form.setFocus("email");
      }, 0);
    }
  }, [isOpen, getInitialUsername, form]);

  return (
    <>
      <p
        className="text-sm text-secondary-foreground cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Forgot password?
      </p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <Form {...form} onSubmit={onSubmit}>
            {errorMessageNode}

            <FormInput
              onChange={() => clearSecurityQuestion()}
              placeholder="1234567"
              name="username"
              label="Username"
            />
            <FormInput
              onChange={() => clearSecurityQuestion()}
              placeholder="student@school.ca"
              autoComplete="email"
              type="email"
              name="email"
              label="Email"
            />
            {securityQuestion && (
              <FormInput
                placeholder="Type in your answer..."
                name="securityAnswer"
                label={securityQuestion}
              />
            )}
            <SubmitButton>Submit</SubmitButton>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
