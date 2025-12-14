// components/FormItems.tsx
interface FormItemsProps {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export default function FormItems({ 
  label, 
  placeholder, 
  type = 'text', 
  value = '', 
  onChange,
  required = true 
}: FormItemsProps) {
  const inputId = label.toLowerCase().replace(/\s+/g, '-');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className='grow mb-3 flex flex-col text-[#2A2A2A]'>
      <label htmlFor={inputId} className='text-[0.8rem] font-dmsans font-semibold pb-1'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <input 
        type={type}
        id={inputId}
        className='bg-[#F6F6F6] text-[0.8rem] px-4 py-2 rounded-md w-full focus:outline-0 focus:ring-2 focus:ring-black focus:ring-opacity-30 transition'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        aria-label={placeholder}
      />
    </div>
  );
}





// export default function FormItems({ label, placeholder, type = 'text' }: { label: string, placeholder: string, type?: string }) {
//     return (
//         <div className='grow mb-3 flex flex-col text-[#2A2A2A]'>
//             <label htmlFor={label} className='text-[0.8rem] font-dmsans font-semibold pb-1'>{label}</label>

//             <input type={type} id={label} className='bg-[#F6F6F6] text-[0.8rem] px-4 py-2 rounded-md w-full focus:outline-0' placeholder={placeholder} />
//         </div>
//     )
// }
