export type UserInfo = {
  id: string;
  name: string;
  surname: string;
  avatar: Buffer;
  role: Role;
  public_key: string;
  private_key: string;
};

export enum Role {
  Director,
  Moderator,
  Mentor,
  Admin,
}
