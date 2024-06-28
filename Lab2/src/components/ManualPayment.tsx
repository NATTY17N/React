import React, { useState, useCallback, useMemo } from "react";
import CreditCardInput from "./controls/CreditCardInput";
import CreditCardForm from "./controls/CreditCardForm";

interface ManualPaymentProps {
    needClearing: boolean;
    toggleClearing: () => void;
    pay: () => void;
}

const ManualPayment: React.FC<ManualPaymentProps> = ({ needClearing, toggleClearing, pay }) => {
    const [isManualActive, setIsManualActive] = useState(false);
    const [isCardNumberEntered, setIsCardNumberEntered] = useState(false);
    const [isCardDataEntered, setIsCardDataEntered] = useState(false);

    const isPaymentEnabled = isCardNumberEntered && isCardDataEntered;

    const buttonClasses = useMemo(() => {
        const baseClasses = "min-w-[340px] text-center flex items-center justify-center rounded-2xl p-0 b-0 mx-auto h-[56px] font-bold text-lg mb-[42px] text-white";
        return `${baseClasses} ${isPaymentEnabled ? "bg-orange-500 cursor-pointer" : "bg-orange-300 cursor-not-allowed"}`;
    }, [isPaymentEnabled]);

    const handleClick = useCallback(() => {
        pay();
        toggleClearing();
        if (needClearing) {
            setIsCardDataEntered(false);
            setIsCardNumberEntered(false);
        }
    }, [pay, toggleClearing, needClearing]);

    const toggleCardNumber = useCallback(() => setIsCardNumberEntered(prev => !prev), []);
    const toggleCardData = useCallback(() => setIsCardDataEntered(prev => !prev), []);

    if (!isManualActive) {
        return (
            <InactiveManualPayment onActivate={() => setIsManualActive(true)} />
        );
    }

    return (
        <div className="flex flex-col w-full mx-6 box-border max-w-[340px] mb-10">
            <Divider text="або уведіть дані карти" />
            <CreditCardInput
                needClearing={needClearing}
                placeholder="Номер картки"
                toggleCardNum={toggleCardNumber}
            />
            <CreditCardForm
                needClearing={needClearing}
                toggleCardData={toggleCardData}
            />
            <button
                disabled={!isPaymentEnabled}
                className={buttonClasses}
                onClick={handleClick}
            >
                Поповнити банку
            </button>
        </div>
    );
};

const InactiveManualPayment: React.FC<{ onActivate: () => void }> = ({ onActivate }) => (
    <div className="flex flex-col w-full mx-6 box-border max-w-[340px] mb-10">
        <div className="mt-6 mb-2 border-t-[0.5px] border-controlsBorderCol" />
        <div
            className="flex font-normal text-md text-center p-2 cursor-pointer bg-transparent
                text-manualPaymentCol items-center justify-center w-full box-border transition-all rounded-lg"
            onClick={onActivate}
        >
            <img src="https://send.monobank.ua/img/card.svg" alt="card" className="w-4 h-6 mr-2"/>
            <p className="font-normal text-md text-center">Оплатити карткою</p>
        </div>
    </div>
);

const Divider: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-[346px] flex items-center mb-6 mx-auto font-normal text-md">
        <div className="border-t-controlsBorderCol border-[0.5px] flex-grow" />
        <div className="px-4 py-0">{text}</div>
        <div className="border-t-controlsBorderCol border-[0.5px] flex-grow" />
    </div>
);

export default React.memo(ManualPayment);