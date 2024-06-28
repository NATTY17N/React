import React, { useEffect, useState, useMemo, useCallback } from "react";
import { BalanceProps } from "../models/models";

interface StatisticProps {
    isRightSide: boolean;
}

const LOGO_URLS = {
    right: "https://send.monobank.ua/img/target.svg",
    left: "https://send.monobank.ua/img/collected.svg"
};

const LABELS = {
    right: "Ціль",
    left: "Накопичено"
};

const useBalance = () => {
    const [balance, setBalance] = useState<BalanceProps>({ goal: 0, collected: 0 });

    const updateBalance = useCallback(() => {
        const updatedBalance = JSON.parse(localStorage.getItem('balance') || '{ "goal": 0, "collected": 0 }');
        setBalance(updatedBalance);
    }, []);

    useEffect(() => {
        updateBalance();
        window.addEventListener('balanceUpdated', updateBalance);
        return () => window.removeEventListener('balanceUpdated', updateBalance);
    }, [updateBalance]);

    return balance;
};

const Statistic: React.FC<StatisticProps> = ({ isRightSide }) => {
    const balance = useBalance();

    const { logoUrl, label, sum, borderClass } = useMemo(() => ({
        logoUrl: isRightSide ? LOGO_URLS.right : LOGO_URLS.left,
        label: isRightSide ? LABELS.right : LABELS.left,
        sum: isRightSide ? balance.goal : balance.collected,
        borderClass: isRightSide ? "" : "pr-5 border-r border-dividingCol border-opacity-70"
    }), [isRightSide, balance]);

    return (
        <div className="flex relative py-0 px-5 my-3 mx-0 items-center w-1/2">
            <img
                src={logoUrl}
                alt="statistic-icon"
                className="w-6 h-6 mr-4 min-w-6"
            />
            <div className={`flex flex-col ${borderClass}`}>
                <div className="font-semibold text-md text-statsTextColor">{label}</div>
                <div className="font-semibold text-lg text-black">{sum} ₴</div>
            </div>
        </div>
    );
};

export default React.memo(Statistic);