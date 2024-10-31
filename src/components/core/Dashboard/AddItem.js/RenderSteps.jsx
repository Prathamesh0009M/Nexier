import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ProductInformation from "./ProductInformation";
import PublishItem from './PublishItem';

const RenderSteps = () => {
    const { step } = useSelector((state) => state.item);
    const steps = [
        {
            id: 1,
            title: "Product Information",
        },
        {
            id: 2,
            title: "Publish",
        }
    ];

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center relative mb-10 gap-x-12   ">
                {steps.map((item, index) => (
                    <div key={item.id} className="flex flex-col items-center ">

                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition duration-200 ${step === item.id ? "bg-yellow-900 border-yellow-200 text-yellow-200" : "border-richblack-700 bg-richblack-800 text-richblack-300"
                            }`}>
                            {step > item.id ? <FaCheck /> : item.id}
                        </div>
                        <p className="text-center text-richblack-300 mt-2">{item.title}</p>

                        {/* Draw line if it's not the last item */}
                        {index < steps.length - 1 && (
                            <div className="absolute w-24 ml-[23px] bg-yellow-100 h-1 top-1/3 left-1/2 transform -translate-x-1/2" />
                        )}
                    </div>
                ))}
            </div>

            {/* Render component based on the current step */}
            {step === 1 && <ProductInformation />}
            {step === 2 && <PublishItem />}
        </div>
    );
}

export default RenderSteps;
