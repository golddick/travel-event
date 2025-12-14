export default function FooterSection() {
    return (
        <section id='contact-us' className='font-[dmsans] bg-[#151515] text-white  px-[5%] sm:px-[10%] py-10'>
            <section className='flex justify-between mb-2'>
                <div className='w-[30%] max-w-[200px]'>
                    <a href='#home'>
                        <img src={'/Logo.png'} width='300' height='300' alt='Website logo' className='w-full h-auto' />
                        <p className='text-[0.5rem] lg:text-[0.7rem] md:text-[0.6rem] text-center text-[#E1E1E1]'>Where travel, fun and easy planning comes together</p>
                    </a>
                </div>
                <div className='text-[0.8rem]'>
                    <h3 className='font-bold mb-2 text-[1rem]'>Contact</h3>
                    <ul className='flex flex-col gap-1 mb-2'>
                        <li>Maryland, USA</li>
                        <li>(443) 406-8048</li>
                        <li>TMEbyNicky@gmail.com</li>
                    </ul>
                    <div className='flex gap-5 mt-8'>
                        <a href='www.facebook.com'><img src={'/FacebookLogo.png'} width='200' height='200' alt='facebook logo' className='w-[25px] h-auto' /></a>
                        <a href='www.instagram.com'><img src={'/InstagramLogo.png'} width='200' height='200' alt='Instagram 
                    logo' className='w-[25px] h-auto' /></a>
                    </div>
                </div>
            </section>
            <section className='border-t border-white pt-2'>
                <p className='text-center text-[0.8rem]'>Copyright Traveleventsmadeeaasy. All Rights Reserved</p>
            </section>
        </section>
    )
}
