export type UserInfo = {
  id: number;
  name: string;
  surname: string;
  username: string;
  roles: { role: Role }[];
  public_key: string;
  private_key: string;
};

export enum Role {
  Director,
  Moderator,
  Mentor,
  Admin,
}
