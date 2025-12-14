

import Items from '../components/Items'

export default function AboutSection() {
  return (
    <section id='who-we-are' className='font-[dmsans] md:flex px-[5%] sm:px-[10%] lg:pt-10  md:gap-2 lg:gap-3 mb-20 '>
      <section className='md:w-[70%]'>
        <h2 className='font-extrabold text-[2rem] lg:text-[60px] mb-5'>About Us</h2>
        <p className=' mb-6 sm:text-[1.1rem] md:text-[1rem] lg:text-[1.25rem]'>Travel & Events Made Easy by Nicky is a full-service travel and event planning company specializing in unforgettable group vacations, seamless destination experiences, and beautifully coordinated events. Founded and led by Nickia Fulton, a passionate travel expert and event coordinator, the company focuses on creating stress-free, personalized experiences that bring people together through travel, celebration, and connection. With 15+ years of travel and event planning experience 20 + group trips and 100+ special events including weddings, anniversaries, We are Known for blending luxury, fun, affordability, and connection in every experience</p>
      </section>

      <section className=' flex flex-col md:flex-row w-full justify-center md:items-center md:max-w-125 '>
        <div className="relative flex justify-center mb-4 max-w-75 mx-auto md:max-w-[80%] md:h-full">
        {/* Large Image */}
        <img
          src="/AboutImg1.png"
          width={312}
          height={453}
          alt="About section Image 1"
          className="rounded-2xl w-[90%] min-w-62.5 md:w-full md:h-[82%] md:max-w-75 h-auto"
        />

        {/* Small Image overlapping on the right */}
        <img
          src="/AboutImg2.png"
          width={150}
          height={189}
          alt="About section Image 2"
          className="rounded-2xl absolute top-1/4 -right-5 w-[40%] max-w-37.5 h-auto shadow-lg"
        />
      </div>

        <ul className='px-[4%] md:px-0 flex md:flex-col justify-between py-3 md:py-0  gap-4  w-full mx-auto md:max-w-[30%] md:justify-between md:h-[82%]'>
          <div className=' grow md:grow-0 flex md:flex-col  justify-between sm:flex-row gap-4 lg:gap-0 lg:flex-col md:h-[60%] pr-[2%]'>
            <Items title='500+' description='Happy Travellers' />
            <Items title='15+' description='Years of Experience' />
          </div>
          <h3 className=' flex items-center md:block text-[1.3rem] lg:text-[2rem] font-[dmsans] text-[#646464] font-bold  justify-end w-[33%] md:w-full md:text-right'>Creating <br />Memories</h3>
        </ul>
      </section>

    </section>
  )
}
