import React from 'react'
import HighlightText from '../../common/HighlightText'
import CTAButton from "../../common/CTAButton"

const LearningGridArray = [
    {
        order: -1,
        heading: 'Only "DBATU" Student involves',
        highliteText: "Anyone, Anywhere ",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/dashboard/my-profile",
    },
    {
        order: 1,
        heading: "User-Friendly Interface",
        description:
            "Our platform is designed with students in mind, offering an intuitive interface that allows easy item listing and seamless browsing of available products. ",
    },
    {
        order: 2,
        heading: "Community-Driven Environment:",
        description:
            "We encourage a strong sense of community by integrating user profiles, messaging systems, and a transparent review process, ensuring a trusted environment for all transactions.",
    },
    {
        order: 3,
        heading: " Real-Time Chat for Transactions",
        description:
            "Communicate directly with buyers or sellers using our built-in chat feature, ensuring smooth negotiations and faster transaction completion.",
    },
    {
        order: 4,
        heading: "Secure Payments & Privacy Protection",
        description:
            "We prioritize safety with encrypted transactions and privacy controls, ensuring that personal and payment information remains secure throughout the process.",
    },
    {
        order: 5,
        heading: "Item Condition & Pricing Indicators   ",
        description:
            "Each listing includes clear status indicators for item conditions (new, used, or rental), and dynamic pricing tools that help users set competitive prices.",
    },
]

const LearningGrid = () => {
    return (
        <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div key={index} className={`${index === 0 && "lg:col-span-2 lg:h-[280px] p-5"}
                        ${card.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px]  p-5" : "bg-richblack-800 lg:h-[280px] p-5"
                            }
                            ${card.order === 3 && "lg:col-start-2"}
                            ${card.order<0 && "bg-transparent"}
                        `}>
                            {
                                card.order < 0 ? (<div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                    <div className='text-4xl font-semibold'>
                                        {card.heading} <HighlightText text={card.highliteText} />
                                    </div>
                                    <p className='font-medium'>{card.description}</p>
                                    <div className='w-fit'>
                                        <CTAButton active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
                                    </div>


                                </div>) : (<div className='flex flex-col gap-8 p-7'>
                                        <h1 className='text-richblack-5 text-lg'>
                                            {card.heading}
                                        </h1>
                                        <p className='text-richblack-300 font-medium'>{card.description}</p>
                                </div>)
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}

export default LearningGrid