

export default function NavLink({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <li className="w-full">
      <a
        href={href}
        className="font-[dmsans] block text-[#606060] sm:inline sm:px-2 sm:py-2 w-full h-full px-2.5 py-[5px]  hover:text-[#026EFF] sm:text-nowrap sm:text-[0.7rem] md:text-[1rem] font-medium lg:text-[1.25rem]"
      >
        {title}
      </a>
    </li>
  );
}
