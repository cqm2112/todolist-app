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
  status: Id;
};

export type GetResponse = {
  id: Id;
  title: string;
  description: string;
  createdDate: string;
  status: Id;
};