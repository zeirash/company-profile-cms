'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface ImageSliderProps {
  images: {
    src: string
    alt: string
  }[]
}

export default function ImageSlider({ images }: ImageSliderProps) {
  return (
    <div className="w-full h-full">
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 30px !important;
          height: 30px !important;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          color: #000 !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
        }
        .swiper-button-next {
          right: 10px !important;
        }
        .swiper-button-prev {
          left: 10px !important;
        }
      `}</style>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="relative w-full h-full aspect-square">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
