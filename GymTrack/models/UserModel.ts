export type UserRole = 'administrator' | 'member';

export interface UserModel {
    username: string;
    password: string;
    role: UserRole;
}
