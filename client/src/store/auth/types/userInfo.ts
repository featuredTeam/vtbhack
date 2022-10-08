export type UserInfo = {
  id: string;
  name: string;
  surname: string;
  username: string;
  avatar?: string;
  roles: Role[];
  public_key: string;
  private_key: string;
};

export enum Role {
  Director,
  Moderator,
  Mentor,
  Admin,
}
