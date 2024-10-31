import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';
import Course_Card from './Course_Card';

const ItemSlider = ({ Items = [] }) => {

    return (
        <>
            {Items.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    className='mySwiper'
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[FreeMode, Pagination, Autoplay, Navigation]}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {Items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Course_Card item={item} Height={"h-60"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-gray-500">No Items Found</p>
            )}
        </>
    );
}

export default ItemSlider;
