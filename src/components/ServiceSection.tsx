
import EllipsePictureFrame from './EllipsePictureFrame'
import ServiceItems from './ServiceItems'
// import ServiceImage2 from '../../public/ServiceImage2.png'
// import ServiceImage3 from '../../public/ServiceImage3.png'
// import ServiceImage4 from '../../public/ServiceImage4.png'
import HeroSectionImg from './HeroSectionImg'

export default function ServiceSection() {
    return (
        <section id='services' className=' relative px-[5%] sm:px-[10%] pt-10 lg:pt-20 '>
            <div className='flex justify-between  mb-7.5'>
                <div className='max-w-[50%] lg:max-w-[70%] grow '>
                    <h2 className='text-[2rem] lg:text-[3rem] font-semibold'>Our <span className='text-[#026EFF] font-[dmserifitalics] font-normal italic'>Services</span></h2>
                    <p className='font-[dmsans] text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] text-[#7B7B7B] '>Where will your next adventure take you? Check out these top destinations loved by travelers around the world.</p>
                </div>
                <div className='flex justify-end w-full'>
                    <EllipsePictureFrame />
                </div>
            </div>

            <section>
                <div className='mb-5 md:mb-15'>
                    <HeroSectionImg images={['/travelpool.jpeg', '/travelgroupgreen.jpeg', '/travelgroupblack.jpeg', '/travelwaterfall.jpeg']} title='Group Travel Planning' description="From destination weddings to girls' getaways and family reunions, we specialize in coordinating all aspects of group travel. We handle logistics, accommodations, excursions, and communication so you can focus on the fun" expandBtnOnMobileView={false} heroSectionHeight={false} showEllipsePictureFrame={false} />
                </div>
                <ServiceItems image={['/ServiceImage2.png', '/ServiceImage3.png','/ServiceImage4.png','/travelgroup.jpeg']} title='All-Inclusive Vacation Packages' description='Curated travel experiences with luxury accommodations, meals, and entertainment included—making travel effortless and enjoyable from start to finish.' />

                <ServiceItems image={['/ServiceImage3.png', '/ServiceImage2.png','/travelgroupgreen.jpeg','/ServiceImage4.png']} title='Event Planning & Coordination' description='Full-service planning for social, corporate, or private events, including milestone celebrations, dinners, and themed parties. We take your vision and bring it to life with creativity and precision' />

                <ServiceItems image={['/ServiceImage4.png', '/ServiceImage2.png','/ServiceImage3.png','/travelgreen.jpeg']} title="Couples' Experiences" description='A dream destination for adventure lovers. Whether you want to ski down snowy peaks, hike scenic trails, or take in breathtaking views, the Swiss Alps offer a magical experience year-round.' />

            </section>
        </section>
    )
}
