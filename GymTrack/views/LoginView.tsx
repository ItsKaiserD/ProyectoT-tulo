// LoginView.tsx
import React, { useState } from 'react';
import { useAuthViewModel } from '../viewmodels/AuthViewModel';

export default function LoginView({ onLoginSuccess, onNavigateRegister }: any) {
    const { login, error } = useAuthViewModel();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (login(username, password)) {
            onLoginSuccess();
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <input
                style={styles.input}
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <div style={styles.error}>{error}</div>}
            <button onClick={onNavigateRegister}>Register</button>
        </div>
    );
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' },
    title: { marginBottom: '1rem' },
    input: { marginBottom: '1rem', padding: '0.5rem', width: '200px' },
    error: { color: 'red', marginBottom: '1rem' },
};