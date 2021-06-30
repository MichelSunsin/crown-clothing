export type CurrentUser = {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
};

export type User = {
  currentUser: CurrentUser | null | undefined;
  id?: string | null | undefined;
};
