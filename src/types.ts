export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  title: string;
  description: string;
  createdDate: string;
  dueDate: string;
  status: Id;
  isDueDatePassed: boolean;
};

export type Headers = {
  UserKey: string;
  "Content-Type": "application/json"
};