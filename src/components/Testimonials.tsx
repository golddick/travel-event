


export default function Testimonials({
  image,
  comment,
  name,
  rotate,
  origin,
}: {
  image: string;
  comment: string;
  name: string;
  rotate: string;
  origin: string;
}) {
  return (
    <div
      className={`border border-[#B0B0B0] rounded-[5%] p-2 mb-10 mx-auto w-[80%] md:w-[78%]  md:max-w-[330px]  transform lg:${rotate} ${origin}`}
    >
      <img
        src={image}
        width="200"
        height="200"
        alt="Image fo the commenter"
        className="block  h-auto mx-auto mb-2 sm:min-w-[200px]  w-full"
      />
      <p className="text-center mb-2 text-[0.8rem] md:text-[1rem] leading-5 md:leading-6">{comment}</p>
      <h4 className="text-center font-bold md:text-[1.2rem]">&ndash; {name}</h4>
    </div>
  );
}
