

export default function JourneyImageCards({
  image,

}: {
  image: string;

}) {
  return (
    <div>
      <img
        src={image}
        width="200"
        height="400"
        alt="An Image showing the our journey through memories"
        className='w-[25vw]'
      />
    </div>
  );
}
