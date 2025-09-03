import { useState } from 'react';
import { UserModel, UserRole } from '../models/UserModel';

const mockDB: UserModel[] = [];

export function useAuthViewModel() {
    const [user, setUser] = useState<UserModel | null>(null);
    const [error, setError] = useState<string>('');

    const register = (username: string, password: string, role: UserRole) => {
        if (mockDB.find(u => u.username === username)) {
            setError('Username already exists');
            return false;
        }
        const newUser: UserModel = { username, password, role };
        mockDB.push(newUser);
        setUser(newUser);
        setError('');
        return true;
    };

    const login = (username: string, password: string) => {
        const found = mockDB.find(u => u.username === username && u.password === password);
        if (found) {
            setUser(found);
            setError('');
            return true;
        }
        setError('Invalid credentials');
        return false;
    };

    const logout = () => setUser(null);

    return { user, error, register, login, logout };
}
