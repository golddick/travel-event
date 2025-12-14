// components/RequestQuoteSection.tsx
import { useState } from 'react';
import FormItems from "./FormItems";
import Heading from "./Heading";
import { sendQuoteRequestEmails } from '../lib/sendEmail/sendEmail';

export default function RequestQuoteSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceType: '',
    numberOfGuests: '',
    date: '',
    time: '',
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fill in all required fields (Name, Email, and Phone Number)'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Send both admin and client emails
      const result = await sendQuoteRequestEmails(formData);
      
      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: formData.email 
            ? 'Thank you! Your quote request has been submitted. A confirmation email has been sent to you.'
            : 'Thank you! Your quote request has been submitted.'
        });
        
        // Reset form
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          serviceType: '',
          numberOfGuests: '',
          date: '',
          time: '',
          additionalInfo: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Sorry, there was an error submitting your request. Please try again or contact us directly at TMEbyNicky@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMessageStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      default:
        return 'bg-gray-50 text-gray-800 border border-gray-200';
    }
  };

  const getButtonStyle = () => {
    const baseStyle: React.CSSProperties = {
      display: 'block',
      width: '100%',
      color: 'white',
      padding: '12px 0',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      fontSize: '1rem',
      border: 'none',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      fontFamily: 'inherit'
    };

    if (isSubmitting) {
      return {
        ...baseStyle,
        backgroundColor: '#9ca3af', // gray-400
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#000000', // black
      };
    }
  };



  return (
    <section id='request-quote' className='px-[5%] sm:px-[10%] pt-15 mb-10'>
      <section className='mx-auto max-w-250 md:bg-[url("/RequestQuoteBgImage.png")] bg-no-repeat bg-position-[center_bottom] bg-contain pb-10'>
        <div className='text-center text-[1rem] mb-8'>
          <Heading heading1='Request a ' heading2='Quote.' wrap={false} />
          <p className='font-[librefranklin]'>Please provide the following information.</p>
        </div>

        <form onSubmit={handleSubmit} className='p-[5%] mx-auto shadow-2xl bg-[white] w-full md:w-[60%] rounded-xl'>
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg ${getMessageStyles(submitMessage.type)}`}>
              <p className='text-sm font-medium'>{submitMessage.text}</p>
            </div>
          )}

          <div className='sm:flex gap-2'>
            <FormItems 
              label='Full Name' 
              placeholder='Your Full Name' 
              value={formData.fullName}
              onChange={(value) => handleChange('fullName', value)}
              required
            />
            <FormItems 
              label='Phone Number' 
              placeholder='Your Phone Number' 
              value={formData.phoneNumber}
              onChange={(value) => handleChange('phoneNumber', value)}
              required
            />
          </div>

          <FormItems 
            label='Email Address' 
            placeholder='Your Email Address' 
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            required
          />

          <FormItems 
            label='Type of service needed' 
            placeholder='Enter the type of service required' 
            value={formData.serviceType}
            onChange={(value) => handleChange('serviceType', value)}
          />

          <FormItems 
            label='Number of Guest' 
            placeholder='Enter number of guests' 
            value={formData.numberOfGuests}
            onChange={(value) => handleChange('numberOfGuests', value)}
          />
          
          <div className='sm:flex gap-2'>
            <FormItems 
              label='Date' 
              placeholder='Select Date' 
              type='date'
              value={formData.date}
              onChange={(value) => handleChange('date', value)}
            />
            <FormItems 
              label='Time' 
              placeholder='Select Time' 
              type='time'
              value={formData.time}
              onChange={(value) => handleChange('time', value)}
            />
          </div>
          
          <div className='mb-5'>
            <label htmlFor="additionalInfo" className='font-semibold font-dmsans text-[0.8rem]'>
              Additional Information <span className='text-gray-400 font-normal'>(Optional)</span>
            </label>
            <textarea 
              id="additionalInfo"
              rows={5} 
              placeholder='Any special requests, dietary requirements, or additional details...'
              className='px-4 py-2 w-full bg-[#F6F6F6] text-[0.8rem] focus:outline-0 focus:ring-2 focus:ring-black focus:ring-opacity-30 transition rounded-md mt-1'
              value={formData.additionalInfo}
              onChange={(e) => handleChange('additionalInfo', e.target.value)}
            />
          </div>
          
          <p className='text-[0.8rem] mb-4 text-gray-600 leading-relaxed'>
            You may receive marketing and promotional materials. Contact the merchant for their privacy practices.
          </p>

          <button 
            type="submit"
            disabled={isSubmitting}
            style={getButtonStyle()}
            className="hover:bg-gray-800 active:bg-gray-900"
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#1f2937';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#000000';
              }
            }}
            onMouseDown={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#111827';
              }
            }}
            onMouseUp={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#1f2937';
              }
            }}
          >
            {isSubmitting ? (
              <span className='flex items-center justify-center'>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Submit Quote Request'}
          </button>
          
        </form>
      </section>
    </section>
  );
}








// // components/RequestQuoteSection.tsx
// import { useState } from 'react';
// import FormItems from "./FormItems";
// import Heading from "./Heading";
// import { sendQuoteRequestEmails } from '../lib/sendEmail/sendEmail';

// export default function RequestQuoteSection() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phoneNumber: '',
//     email: '',
//     serviceType: '',
//     numberOfGuests: '',
//     date: '',
//     time: '',
//     additionalInfo: ''
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

//   const handleChange = (field: keyof typeof formData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
//       setSubmitMessage({
//         type: 'error',
//         text: 'Please fill in all required fields (Name, Email, and Phone Number)'
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitMessage(null);

//     try {
//       // Send both admin and client emails
//       const result = await sendQuoteRequestEmails(formData);
      
//       if (result.success) {
//         setSubmitMessage({
//           type: 'success',
//           text: formData.email 
//             ? 'Thank you! Your quote request has been submitted. A confirmation email has been sent to you.'
//             : 'Thank you! Your quote request has been submitted.'
//         });
        
//         // Reset form
//         setFormData({
//           fullName: '',
//           phoneNumber: '',
//           email: '',
//           serviceType: '',
//           numberOfGuests: '',
//           date: '',
//           time: '',
//           additionalInfo: ''
//         });
//       } else {
//         throw new Error(result.error || 'Failed to submit request');
//       }
//     } catch (error) {
//       console.error('Form submission error:', error);
//       setSubmitMessage({
//         type: 'error',
//         text: 'Sorry, there was an error submitting your request. Please try again or contact us directly at TMEbyNicky@gmail.com'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getMessageStyles = (type: string) => {
//     switch (type) {
//       case 'success':
//         return 'bg-green-50 text-green-800 border border-green-200';
//       case 'error':
//         return 'bg-red-50 text-red-800 border border-red-200';
//       case 'info':
//         return 'bg-blue-50 text-blue-800 border border-blue-200';
//       default:
//         return 'bg-gray-50 text-gray-800 border border-gray-200';
//     }
//   };

//   return (
//     <section id='request-quote' className='px-[5%] sm:px-[10%] pt-15 mb-10'>
//       <section className='mx-auto max-w-250 md:bg-[url("/RequestQuoteBgImage.png")] bg-no-repeat bg-position-[center_bottom] bg-contain pb-10'>
//         <div className='text-center text-[1rem] mb-8'>
//           <Heading heading1='Request a ' heading2='Quote.' wrap={false} />
//           <p className='font-[librefranklin]'>Please provide the following information.</p>
//         </div>

//         <form onSubmit={handleSubmit} className='p-[5%] mx-auto shadow-2xl bg-[white] w-full md:w-[60%] rounded-xl'>
//           {submitMessage && (
//             <div className={`mb-6 p-4 rounded-lg ${getMessageStyles(submitMessage.type)}`}>
//               <p className='text-sm font-medium'>{submitMessage.text}</p>
//             </div>
//           )}

//           <div className='sm:flex gap-2'>
//             <FormItems 
//               label='Full Name' 
//               placeholder='Your Full Name' 
//               value={formData.fullName}
//               onChange={(value) => handleChange('fullName', value)}
//               required
//             />
//             <FormItems 
//               label='Phone Number' 
//               placeholder='Your Phone Number' 
//               value={formData.phoneNumber}
//               onChange={(value) => handleChange('phoneNumber', value)}
//               required
//             />
//           </div>

//           <FormItems 
//             label='Email Address' 
//             placeholder='Your Email Address' 
//             value={formData.email}
//             onChange={(value) => handleChange('email', value)}
//             required
//           />

//           <FormItems 
//             label='Type of service needed' 
//             placeholder='Enter the type of service required' 
//             value={formData.serviceType}
//             onChange={(value) => handleChange('serviceType', value)}
//           />

//           <FormItems 
//             label='Number of Guest' 
//             placeholder='Enter number of guests' 
//             value={formData.numberOfGuests}
//             onChange={(value) => handleChange('numberOfGuests', value)}
//           />
          
//           <div className='sm:flex gap-2'>
//             <FormItems 
//               label='Date' 
//               placeholder='Select Date' 
//               type='date'
//               value={formData.date}
//               onChange={(value) => handleChange('date', value)}
//             />
//             <FormItems 
//               label='Time' 
//               placeholder='Select Time' 
//               type='time'
//               value={formData.time}
//               onChange={(value) => handleChange('time', value)}
//             />
//           </div>
          
//           <div className='mb-5'>
//             <label htmlFor="additionalInfo" className='font-semibold font-dmsans text-[0.8rem]'>
//               Additional Information <span className='text-gray-400 font-normal'>(Optional)</span>
//             </label>
//             <textarea 
//               id="additionalInfo"
//               rows={5} 
//               placeholder='Any special requests, dietary requirements, or additional details...'
//               className='px-4 py-2 w-full bg-[#F6F6F6] text-[0.8rem] focus:outline-0 focus:ring-2 focus:ring-black focus:ring-opacity-30 transition rounded-md mt-1'
//               value={formData.additionalInfo}
//               onChange={(e) => handleChange('additionalInfo', e.target.value)}
//             />
//           </div>
          
//           <p className='text-[0.8rem] mb-4 text-gray-600 leading-relaxed'>
//             You may receive marketing and promotional materials. Contact the merchant for their privacy practices.
//           </p>

//           <button 
//             type="submit"
//             disabled={isSubmitting}
//             className={`block w-full text-white py-3 rounded-lg transition-all duration-300 font-medium ${
//               isSubmitting 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-black hover:bg-gray-800 active:bg-gray-900 cursor-pointer'
//             }`}
//           >
//             {isSubmitting ? (
//               <span className='flex items-center justify-center'>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </span>
//             ) : 'Submit Quote Request'}
//           </button>
          
//         </form>
//       </section>
//     </section>
//   );
// }