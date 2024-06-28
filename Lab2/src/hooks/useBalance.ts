import { useState, useEffect, useCallback } from 'react';
import { BalanceProps } from '../models/models.ts';

export const useBalance = () => {
    const [balance, setBalance] = useState<BalanceProps>(() => {
        const storedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        return { collected: storedBalance.collected || 0, goal: storedBalance.goal || 0 };
    });

    const updateBalance = useCallback((amount: number) => {
        setBalance(prev => ({
            ...prev,
            collected: prev.collected + amount
        }));
    }, []);

    useEffect(() => {
        localStorage.setItem('balance', JSON.stringify(balance));
        window.dispatchEvent(new Event('balanceUpdated'));
    }, [balance]);

    return { balance, updateBalance };
};