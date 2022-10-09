export type CourseType = {
  id: number;
  name: string;
  link: string;
  required: boolean;
  image: string;
  status?: CourseStatus;
};

export enum CourseStatus {
  NotStarted = 'notstarted',
  InProgress = 'inprogress',
  Completed = 'completed',
}
