import Button from "../components/Button";
import HeroSectionImg from './HeroSectionImg'

export default function HeroSection() {
  return (
    <section id='home' className="pt-5 font-[dmsans] px-[5%] sm:px-[10%] mb-12.5">
      <h1 className="text-[#1B1B1B] mb-4 lg:mb-10 mx-auto text-[2.5rem] leading-14 px-[4%] sm:text-[3.9rem] sm:leading-18  md:text-[4.5rem] md:leading-20 lg:text-[6rem] lg:leading-25 text-center font-semibold  ">
        Where Travel, Fun and Easy Planning Comes together
      </h1>
      <Button title="Book a Vacation" text="text-[1rem] md:text-[1.5rem] mb-5 md:mb-10 " />

      <HeroSectionImg images={['/HeroImage.png', '/travelpool.jpeg', '/travelgroupgreen.jpeg', '/travelgroupblack.jpeg', '/travelwaterfall.jpeg']} heroSectionHeight={true} />
      <p className='flex font-[dmsans] justify-between pt-5 text-[#026EFF]'><span>Vacation/Events</span><span>Made</span><span>Easy</span></p>
    </section>
  );
}

