

export default function Items({ title, description }: { title: string, description: string }) {
    return (
        <li className='flex flex-col'>
            <p className='font-bold  text-[1.9rem] md:text-[2rem] lg:text-[2.4rem] md:text-right text-center sm:mx-auto md:mx-0 lg:mx-0'>{title}</p>
            <p className='text-[#5E5E5E] text-[0.93rem] md:text-[0.7rem] lg:text-[0.9rem] md:text-right sm:max-w-full md:w-full   font-[robotoflex] text-center '>{description}</p>
        </li>
    )
}
