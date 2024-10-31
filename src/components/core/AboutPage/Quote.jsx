import React from 'react';
import HighlightText from '../../common/HighlightText';

const Quote = () => {
    return (
        <div>
            We are passionate about revolutionizing the way students buy and sell academic items. Our innovative platform <HighlightText text={"combines technology"}/> <span className='text-orange-500'>{" "}and community</span>, creating an 
            <span>
                unparalleled trading experience for students.
            </span>
        </div>
    );
}

export default Quote;
