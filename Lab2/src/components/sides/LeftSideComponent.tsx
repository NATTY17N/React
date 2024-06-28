import React from "react";
import { JarComponent } from "../JarComponent.tsx";
import Statistic from "../Statistic.tsx";

const LOGO_URL = "https://send.monobank.ua/img/logo_short.svg";

interface FundraiserInfo {
    collector: string;
    item: string;
    description: string;
}

const fundraiserInfo: FundraiserInfo = {
    collector: "Шевченко Н. В.",
    item: "На корм котикам!",
    description: "Збираємо на корм для бездомних котиків",
};

const Logo: React.FC = () => (
    <img
        src={LOGO_URL}
        alt="logo"
        className="mx-auto mt-[42px] mb-6"
    />
);

const FundraiserDetails: React.FC<FundraiserInfo> = ({ collector, item, description }) => (
    <>
        <div className="font-normal text-md text-center text-black leading-4 mt-1">
            {collector} збирає
        </div>
        <div className="mt-1 font-extrabold text-[22px] text-center">{item}</div>
        <div className="mt-1 min-w-[340px] flex flex-col items-center justify-center mb-auto">
            <div className="text-md font-normal mt-2 text-center mx-auto mb-0 text-black">
                {description}
            </div>
        </div>
    </>
);

const Statistics: React.FC = () => (
    <div className="flex rounded-2xl mx-auto my-0 text-left justify-center mb-4 bg-white">
        <Statistic isRightSide={false} />
        <Statistic isRightSide={true} />
    </div>
);

export const LeftSideComponent: React.FC = () => {
    return (
        <div className="w-1/2 bg-[#f3f4f6] rounded-l-3xl flex flex-col items-center justify-evenly">
            <Logo />
            <JarComponent />
            <FundraiserDetails {...fundraiserInfo} /> {/* Spread fundraiserInfo props */}
            <Statistics />
        </div>
    );
};

export default LeftSideComponent;
