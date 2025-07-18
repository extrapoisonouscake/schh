export interface Subject {
  id: string;
  name: string;
  teachers: string[];
  room: string | null;
  actualName: string;
  term?: SubjectTerm;
}
//? name?
export type ScheduleSubject = Omit<Subject, "average" | "id" | "term"> & {
  startsAt: Date;
  endsAt: Date;
};
// TODO: distinguish between quarterly and semester terms
export enum SubjectTerm {
  FirstSemester = "FIRST_SEMESTER",
  SecondSemester = "SECOND_SEMESTER",
  FullYear = "FULL_YEAR",
  FirstQuarter = "FIRST_QUARTER",
  SecondQuarter = "SECOND_QUARTER",
  ThirdQuarter = "THIRD_QUARTER",
  FourthQuarter = "FOURTH_QUARTER",
}

export type SubjectGrade = {
  mark: number;
  letter: string | null;
};
export type GradeObject = {
  [key: string]: SubjectGrade | null;
  overall: SubjectGrade | null;
};
export type SubjectYear = "current" | "previous";
export interface SubjectSummary {
  id: string;
  name: string;
  term: SubjectTerm;
  //this is the only way to get the current term
  currentTermIndex: number | null;
  academics: {
    running: GradeObject;
    posted: GradeObject;
    categories: {
      id: string;
      name: string;
      average: SubjectGrade | null;
      terms: {
        name: string;
        weight: number | null;
        average: SubjectGrade | null;
      }[];
    }[];
  };
  attendance: {
    tardy: number;
    absent: number;
    dismissed: number;
  };
  year: SubjectYear;
}
export type RichSubjectAttendance = {
  date: Date;
  code: string;
  reason?: string;
}[];
export type AnnouncementSectionData =
  | { type: "list"; content: string[] }
  | { type: "table"; content: string[][] };
export type AnnouncementSection = {
  title: string;
  emoji: string;
} & AnnouncementSectionData;
export interface PersonalDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  studentNumber: string;
  personalEducationNumber: string;
  taRoom?: string;
  locker?: string;
  schoolName: string;
  nextSchoolName?: string;
  graduationYear: string;
  grade: string;
  parkingSpaceNumber?: string;
  licensePlateNumber?: string;
  photoURL?: string;
  addresses: {
    physical?: string;
    secondaryPhysical?: string;
    mailing?: string;
    other?: string;
    // label -> value
    custom: Record<string, string>;
  };
}
export enum AssignmentStatus {
  Unknown,
  Ungraded,
  Graded,
  Missing,
  Exempt,
}
export interface AssignmentSubmission {
  id: string;
  type: "FILE" | "NOTE" | "GOOGLE_DOC" | "QUIZ";
  submittedAt: Date;
}
export type Assignment = {
  id: string;
  name: string;
  dueAt: Date;
  assignedAt: Date;
  weight?: number;
  feedback: string | null;
  classAverage: number | null;
  categoryId: string;
  maxScore: number;
  submission: AssignmentSubmission | null;
} & (
  | {
      status: AssignmentStatus.Graded;
      score: number;
    }
  | {
      status: Exclude<AssignmentStatus, AssignmentStatus.Graded>;
      score: number | null;
    }
);
export interface TermEntry {
  id: string;
  name: string;
}
