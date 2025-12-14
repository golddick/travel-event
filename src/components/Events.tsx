



export default function Events({ image, title, description, }: { image: string, title: string, description: string }) {
    return (
        <div className='p-[5%] bg-white mb-[50px] shadow-xl rounded-md'>

            <img src={image} width='500' height='300 ' alt='Event image' className='w-full min-h-[150px]' />

            <div>
                <section className='mb-5'>
                    <h3 className='font-[dmsans] mt-2.5 font-bold text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]'>{title}</h3>
                    <p className='text-[0.6rem] md:text-[0.9rem] lg:text-[1.1rem] font-[nunitosans] text-justify'>{description}</p>
                </section>
                <section className='font-[nunitosans] text-[0.6rem] md:text-[0.9rem] lg:text-[1.1rem]'>
                    <p className=' font-[nunito]'>Deposit</p>
                    <p className=' font-bold mb-2.5 font-[nunitosans]'>$125 to secure a spot <span className='text-[0.55rem] lg:text-[0.8rem] font-normal'>(Non-Refundable)</span></p>
                </section>
                <div className='flex gap-9'>
                    <button className='font-nunito text-[0.6rem] px-2.5 py-[5px] border border-[#00000052] cursor-pointer hover:bg-[#e4e4e455] hover:text-[#000000b0] rounded-sm shadow-md'> Get Tickets </ button>
                    <div>
                        <button className='border rounded-full p-1 mr-2.5 hover:cursor-pointer hover:bg-[#2222224f] height-[50px] border-[#00000052]'>
                            <img src={'/Share.png'} width='5' height='5' alt='heart icon' className='w-3 h-3' /> </button>
                        <button className='border rounded-full p-1 height-[50px] hover:cursor-pointer hover:bg-[#2222224f] border-[#00000052]'>
                            <img src={'/Heart.png'} width='5' height='5' alt='heart icon' className='w-3 h-3' /> </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
