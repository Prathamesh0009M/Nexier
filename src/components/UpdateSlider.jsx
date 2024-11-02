import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';

import { ImageUrl } from '../data/imageLinks';

const UpdateSlider = () => {
    return (
        <div className=''>
            <Swiper
                spaceBetween={45}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                breakpoints={{
                    // Mobile view (show 1 slide)
                    0: {
                        slidesPerView: 1,
                    },
                    // Desktop view (show 2 slides)
                    768: {
                        slidesPerView: 2,
                    },
                }}
                className='w-full'
            >
                {
                    ImageUrl.map((url, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={url}
                                alt={`slide-${index}`}
                                className="w-full h-auto object-cover shadow-custom-xl border-custom border-custom-gray rounded-2xl"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default UpdateSlider;
