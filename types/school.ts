export interface Subject {
  id: string;
  name: string;
  teachers: string[];
  room: string | null;
  actualName: string;
  average: number | null;
  term: string | null;
}
//? name?
export type ScheduleSubject = Omit<Subject, "average" | "id" | "term"> & {
  startsAt: Date;
  endsAt: Date;
};
export enum SubjectTerm {
  FirstSemester = "FIRST_SEMESTER",
  SecondSemester = "SECOND_SEMESTER",
  FullYear = "FULL_YEAR",
}
export interface SubjectSummary {
  id: string;
  name: string;
  term: SubjectTerm;
  academics: {
    average: number | null;
    posted: number | null;
    categories: {
      id: string;
      name: string;
      average: number | null;
      terms: {
        name: string;
        weight: number;
        average: number;
      }[];
    }[];
  };
  attendance: {
    tardy: number;
    absent: number;
    dismissed: number;
  };
}
export type AnnouncementSectionItemsFragment = {
  items: string[];
};
export type AnnouncementSection = {
  heading: string;
  emoji: string;
} & (AnnouncementSectionItemsFragment | { table: string[][] });
export interface PersonalDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  studentNumber: number;
  personalEducationNumber: number;
  taRoom?: string;
  locker?: string;
  schoolName: string;
  nextSchoolName?: string;
  graduationYear: number;
  grade: number;
  parkingSpaceNumber?: number;
  licensePlateNumber?: number;
  photoURL?: string;
}
export enum AssignmentStatus {
  Unknown,
  Ungraded,
  Graded,
  Missing,
  Exempt,
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
} & (
  | {
      status: AssignmentStatus.Graded;
      score: number;
      maxScore: number;
    }
  | {
      status: Exclude<AssignmentStatus, AssignmentStatus.Graded>;
      score: number | null;
      maxScore: number | null;
    }
);
export interface TermEntry {
  id: string;
  name: string;
}
