import React from "react";

interface PaymentButtonProps {
    paymentType: string,
    onPayment: () => void,
}

const PaymentButton: React.FC<PaymentButtonProps> = ({paymentType, ...props}) => {
    const buttonImageSource: string = paymentType === 'mono'
        ? 'https://send.monobank.ua/img/mono_pay.svg'
        : 'https://www.gstatic.com/instantbuy/svg/dark_gpay.svg';
    const imageClasses: string = paymentType !== 'mono'
        ? 'w-[70px] h-[26px]' : '';
    return (
        <div
            className="h-12 my-0 mx-auto min-w-[340px] rounded-xl bg-black overflow-hidden cursor-pointer mb-2 grid place-items-center"
            onClick={props.onPayment}
        >
            <img src={buttonImageSource} alt="payment-logo" className={imageClasses}/>
        </div>
    )
}

export default PaymentButton;
