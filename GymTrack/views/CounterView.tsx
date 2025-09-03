import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCounterViewModel } from '../viewmodels/CounterViewModel';

export default function CounterView() {
    const { count, increment, decrement } = useCounterViewModel();

    return (
        <View style={styles.container}>
            <Text style={styles.count}>{count}</Text>
            <Button title="Increment" onPress={increment} />
            <Button title="Decrement" onPress={decrement} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    count: { fontSize: 48, marginBottom: 20 },
});
