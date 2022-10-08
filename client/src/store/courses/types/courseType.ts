export type CourseType = {
  id: number;
  name: string;
  link: string;
  required: string;
  image: string;
  status?: CourseStatus;
};

export enum CourseStatus {
  NotStarted = 'notstarted',
  InProgress = 'inprogress',
  Completed = 'completed',
}
