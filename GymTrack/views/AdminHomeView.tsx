import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AdminHomeView({ onLogout }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Administrator Home</Text>
            <Button title="Logout" onPress={onLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
});
