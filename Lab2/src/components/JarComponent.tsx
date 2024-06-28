import React, { useEffect, useState, useMemo, useCallback } from "react";
import { BalanceProps } from "../models/models";

const JAR_URLS = {
    "0": 'https://send.monobank.ua/img/jar/0.png',
    "33": 'https://send.monobank.ua/img/jar/uah_33.png',
    "50": 'https://send.monobank.ua/img/jar/uah_50.png',
    "100": 'https://send.monobank.ua/img/jar/uah_100.png',
} as const;

const JAR_BG_URL = "https://send.monobank.ua/img/jar_bg.png";
const GRID_URL = "https://send.monobank.ua/img/jar/grid.png";

const useBalance = () => {
    const [balance, setBalance] = useState<BalanceProps>(() => {
        const storedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        return {
            collected: storedBalance.collected || 0,
            goal: storedBalance.goal || 0
        };
    });

    const handleBalanceUpdate = useCallback(() => {
        const updatedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        setBalance(updatedBalance);
    }, []);

    useEffect(() => {
        handleBalanceUpdate();
        window.addEventListener('balanceUpdated', handleBalanceUpdate);
        return () => window.removeEventListener('balanceUpdated', handleBalanceUpdate);
    }, [handleBalanceUpdate]);

    return balance;
};

const getJarUrl = (collected: number, goal: number): string => {
    const percentage = (collected / goal) * 100;
    if (percentage >= 100) return JAR_URLS["100"];
    if (percentage >= 50) return JAR_URLS["50"];
    if (percentage >= 33) return JAR_URLS["33"];
    return JAR_URLS["0"];
};

export const JarComponent: React.FC = () => {
    const balance = useBalance();
    const jarUrl = useMemo(() => getJarUrl(balance.collected, balance.goal), [balance]);

    return (
        <div className="w-auto h-fit mt-auto mb-5">
            <div className="relative">
                <img src={JAR_BG_URL} alt="jar-bg" className="w-[215px] h-[215px]" />
                <div className="bg-avatar absolute mt-[-70px] ml-32 h-14 w-14 rounded-full z-10 bg-cover bg-center"/>
                <JarImage jarUrl={jarUrl} />
                <JarGrid goal={balance.goal} />
            </div>
        </div>
    );
};

/*return (
    <div className="w-auto h-fit mt-auto mb-5">
        <div className="relative">
            <img
                src="https://send.monobank.ua/img/jar_bg.png"
                alt="jar-bg"
                className="w-[215px] h-[215px]"
            />
            <div className="bg-avatar absolute mt-[-70px] ml-32 h-14 w-14 rounded-full z-10 bg-cover bg-center"/>
            <div className="absolute top-1/2 left-1/2 transform scale-95 translate-x-[-50%] translate-y-[-50%] origin-center">
                <img
                    src={currJarUrl}
                    alt="jar"
                    className="max-w-none h-[205px]"
                />
                <div className="absolute top-[26px] left-[13px]">
                    <img alt="grid" className="w-[42px] h-[168px]" src="https://send.monobank.ua/img/jar/grid.png"/>
                    <div className="absolute bottom-[150px] left-[16px] font-bold text-[10px] text-gridTextCol whitespace-nowrap">
                        {balance.goal}
                    </div>
                    <div className="absolute bottom-[78px] left-[5px] font-bold text-[10px] text-gridTextCol whitespace-nowrap">
                        {balance.goal / 2}
                    </div>
                    <div className="absolute bottom-[2px] left-[7px] font-bold text-[10px] text-gridTextCol whitespace-nowrap">
                        0
                    </div>
                </div>
            </div>
        </div>
    </div>
);*/

const JarImage: React.FC<{ jarUrl: string }> = ({ jarUrl }) => (
    <div className="absolute top-1/2 left-1/2 transform scale-95 translate-x-[-50%] translate-y-[-50%] origin-center">
        <img src={jarUrl} alt="jar" className="max-w-none h-[205px]" />
    </div>
);

const JarGrid: React.FC<{ goal: number }> = ({ goal }) => (
    <div className="absolute top-[35px] left-[50px]">
        <img alt="grid" className="w-[42px] h-[168px]" src={GRID_URL}/>
        <GridLabel value={goal} bottom={150} left={16} />
        <GridLabel value={goal / 2} bottom={78} left={5} />
        <GridLabel value={0} bottom={2} left={7} />
    </div>
);

const GridLabel: React.FC<{ value: number, bottom: number, left: number }> = ({ value, bottom, left }) => (
    <div className={`absolute bottom-[${bottom}px] left-[${left}px] font-bold text-[10px] text-gridTextCol whitespace-nowrap`}>
        {value}
    </div>
);