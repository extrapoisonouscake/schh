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
import { resetPassword } from "@/lib/auth/mutations";
import { PasswordResetSchema, passwordResetSchema } from "@/lib/auth/public";
import { isSuccessfulActionResponse } from "@/lib/helpers";
import { useState } from "react";
import { toast } from "sonner";

export function PasswordResetSection({
  setLoginFormValues,
}: {
  setLoginFormValues: (newUsername: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useFormValidation(passwordResetSchema);
  const { errorMessage, setErrorMessage, errorMessageNode } =
    useFormErrorMessage();
  const [securityQuestion, setSecurityQuestion] = useState<string | null>(null);
  const onSubmit = async (data: PasswordResetSchema) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    const response = await resetPassword({
      ...data,
      securityQuestion: securityQuestion ?? undefined,
    });
    if (isSuccessfulActionResponse(response)) {
      const securityQuestion = response?.data?.securityQuestion; //fix types
      if (securityQuestion) {
        setSecurityQuestion(securityQuestion);
      } else {
        toast.success("A temporary password has been sent to your email.");
        setIsOpen(false);
        setErrorMessage(null);
        setSecurityQuestion(null);
        setLoginFormValues(data.username);
        form.reset();
      }
    } else {
      setErrorMessage(response?.data?.message ?? "An unknown error occurred.");
    }
  };
  const clearSecurityQuestion = () => {
    if (securityQuestion) {
      setSecurityQuestion(null);
      form.setValue("securityAnswer", "");
    }
  };
  return (
    <>
      <p
        className="text-sm text-secondary-foreground cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Forgot Password?
      </p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Password Reset</DialogTitle>
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
