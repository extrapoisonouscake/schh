import { prepareAssignmentForDBStorage } from "@/trigger/send-notifications";
import { SubjectTerm, SubjectYear } from "@/types/school";
import { after } from "next/server";
import { z } from "zod";
import { router } from "../../../base";
import { authenticatedProcedure } from "../../../procedures";
import { updateSubjectLastAssignments } from "../../core/settings/helpers";
const subjectYearEnum = z.enum([
  "current",
  "previous",
] as const satisfies SubjectYear[]);
export const subjectsRouter = router({
  getSubjects: authenticatedProcedure
    .input(
      z
        .object({
          isPreviousYear: z.boolean().optional().default(false),
          termId: z.string().optional(),
        })
        .optional()
        .default({})
    )
    .query(async ({ input, ctx: { getMyEd } }) => {
      return getMyEd("subjects", input);
    }),
  getSubjectInfo: authenticatedProcedure
    .input(
      z.object({
        id: z.string(),
        year: subjectYearEnum,
      })
    )
    .query(async ({ input, ctx: { getMyEd } }) => {
      return getMyEd("subjectSummary", input);
    }),
  getSubjectAssignments: authenticatedProcedure
    .input(
      z
        .object({
          term: z.nativeEnum(SubjectTerm).optional(),
          termId: z.string().optional(),
        })
        .partial()
        .merge(z.object({ id: z.string() }))
        .refine(
          (data) => !!data.term || !!data.termId,
          "Either term or termId should be filled in."
        )
    )
    .query(
      async ({
        input: { id, termId, term },
        ctx: { getMyEd, studentHashedId },
      }) => {
        const response = await getMyEd("subjectAssignments", {
          id,
          termId,
          term,
        });
        if (
          term ||
          (response.currentTermIndex &&
            termId === response.terms![response.currentTermIndex]?.id)
        ) {
          after(
            updateSubjectLastAssignments(
              studentHashedId,
              id,
              response.assignments.map(prepareAssignmentForDBStorage)
            )
          );
        }
        return response;
      }
    ),
  getSubjectAssignment: authenticatedProcedure
    .input(
      z.object({
        subjectId: z.string(),
        assignmentId: z.string(),
      })
    )
    .query(async ({ input, ctx: { getMyEd } }) => {
      return getMyEd("subjectAssignment", input);
    }),
  getSubjectAttendance: authenticatedProcedure
    .input(
      z.object({
        subjectId: z.string(),
        year: subjectYearEnum,
      })
    )
    .query(async ({ input, ctx: { getMyEd } }) => {
      return getMyEd("subjectAttendance", input);
    }),
});
