import { useState } from 'react';
import { CounterModel } from '../models/CounterModel';

export function useCounterViewModel() {
    const [counter, setCounter] = useState<CounterModel>({ count: 0 });

    const increment = () => setCounter({ count: counter.count + 1 });
    const decrement = () => setCounter({ count: counter.count - 1 });

    return {
        count: counter.count,
        increment,
        decrement,
    };
}
