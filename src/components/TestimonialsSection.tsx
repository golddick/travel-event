
import Testimonials from "./Testimonials";
import Heading from "./Heading";
import Button from "./Button";

export default function TestimonialsSection() {
  return (
    <section className=" px-[5%] sm:px-[10%] my-20 lg:mt-30">
      <Heading heading1='Hear from Our' heading2='Happy Travelers' />

      <div className=" md:flex flex-wrap lg:flex-nowrap  mt-15 gap-10 md:gap-0 mb-10 lg:w-[95%] lg:mx-auto">
        <Testimonials
          rotate="rotate-[-5deg]"
          image={'/CommentersImage1.png'}
          comment="I've been on six group trips with Travel Made Easy by Nicky, and every single one has been unforgettable. Nicky is kind, thoughtful, and always goes the extra mile to make sure everyone has an amazing experience."
          name=" C Clark."
          origin="origin-bottom-right"
        />
        <Testimonials
          rotate="rotate-[0deg]"
          image={'/CommentersImage2.png'}
          comment="TME creates the ultimate group vacation experience! Some of the best moments of my life have been on these trips — I wouldn't trade them for the world. Everyone may not be family by blood, but it truly feels like family. 10/10 — I've been on 6+ trips and highly recommend!"
          name=" S. Dorsey"
          origin="origin-center"
        />
        <Testimonials
          rotate="rotate-[5deg]"
          image={'/CommentersImage3.png'}
          comment="Since we started traveling with Nicky, she has always given us an amazing experience. If you're looking for excellent customer service and unforgettable adventures, she's truly one of the best in the business. I would recommend her to anyone! "
          name="S. Rowe"
          origin="origin-bottom-left"
        />
      </div>
      <div><Button text='md:text-[2rem]' title='Book a Vacation' /></div>
    </section>
  );
}
