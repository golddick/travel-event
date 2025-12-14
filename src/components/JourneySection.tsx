import JourneyImageCards from "../components/JourneyImageCards";
// import JourneyImage1 from "../../public/JourneyImage1.png";
// import JourneyImage2 from "../../public/JourneyImage2.png";
// import JourneyImage3 from "../../public/JourneyImage3.png";
// import JourneyImage4 from "../../public/JourneyImage4.png";
// import JourneyImage5 from "../../public/JourneyImage5.png";
// import JourneyImage6 from "../../public/JourneyImage6.png";
import Heading from "./Heading";

export default function JourneySection() {
  return (
    <section className=" px-[5%] sm:px-[10%] bg-[#F2F7FF] pt-[30px] pb-5">
      <Heading heading1='Our Journey Through' heading2='images' wrap={true} />

      <section className=' mt-10 lg:mt-20'>
        <div className="flex gap-[5%] lg:gap-[3%] mb-5 justify-center">
          <JourneyImageCards image={'/JourneyImage1.png'} />
          <JourneyImageCards image={'/JourneyImage2.png'} />
          <JourneyImageCards image={'/JourneyImage3.png'} />
        </div>
        <div className="flex gap-[5%] lg:gap-[3%] justify-center">
          <JourneyImageCards image={'/JourneyImage4.png'} />
          <JourneyImageCards image={'/JourneyImage5.png'} />
          <JourneyImageCards image={'/JourneyImage6.png'} />
        </div>
      </section>
    </section>
  );
}
