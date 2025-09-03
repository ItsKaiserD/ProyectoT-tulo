import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthViewModel } from '../viewmodels/AuthViewModel';
import { UserRole } from '../models/UserModel';

export default function RegisterView({ onRegisterSuccess, onNavigateLogin }: any) {
    const { register, error } = useAuthViewModel();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('member');

    const handleRegister = () => {
        if (register(username, password, role)) {
            onRegisterSuccess();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.roleContainer}>
                <TouchableOpacity
                    style={[styles.roleButton, role === 'member' && styles.selectedRole]}
                    onPress={() => setRole('member')}
                >
                    <Text>Member</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.roleButton, role === 'administrator' && styles.selectedRole]}
                    onPress={() => setRole('administrator')}
                >
                    <Text>Administrator</Text>
                </TouchableOpacity>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Register" onPress={handleRegister} />
            <TouchableOpacity onPress={onNavigateLogin}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
    input: { width: 250, height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 16, paddingHorizontal: 10, backgroundColor: '#fff' },
    roleContainer: { flexDirection: 'row', marginBottom: 16 },
    roleButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginHorizontal: 5, backgroundColor: '#eee' },
    selectedRole: { backgroundColor: '#cce5ff', borderColor: '#007bff' },
    error: { color: 'red', marginBottom: 8 },
    link: { color: '#007bff', marginTop: 16 },
});
