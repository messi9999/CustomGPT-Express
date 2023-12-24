import Sidebar from 'components/Sidebar';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const BackIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1408 17.6558C10.9157 17.8808 10.6106 18.0072 10.2924 18.0072C9.97418 18.0072 9.66902 17.8808 9.44398 17.6558L4.64398 12.8558C4.41902 12.6308 4.29264 12.3256 4.29264 12.0074C4.29264 11.6892 4.41902 11.3841 4.64398 11.159L9.44398 6.35902C9.55468 6.24441 9.68709 6.15299 9.8335 6.0901C9.9799 6.02721 10.1374 5.99411 10.2967 5.99272C10.456 5.99134 10.6141 6.0217 10.7615 6.08204C10.909 6.14237 11.043 6.23148 11.1557 6.34415C11.2683 6.45682 11.3574 6.5908 11.4178 6.73828C11.4781 6.88575 11.5085 7.04377 11.5071 7.2031C11.5057 7.36244 11.4726 7.5199 11.4097 7.66631C11.3468 7.81271 11.2554 7.94512 11.1408 8.05582L8.38918 10.8074L17.4924 10.8074C17.8106 10.8074 18.1159 10.9339 18.3409 11.1589C18.566 11.3839 18.6924 11.6892 18.6924 12.0074C18.6924 12.3257 18.566 12.6309 18.3409 12.8559C18.1159 13.081 17.8106 13.2074 17.4924 13.2074L8.38918 13.2074L11.1408 15.959C11.3657 16.1841 11.4921 16.4892 11.4921 16.8074C11.4921 17.1256 11.3657 17.4308 11.1408 17.6558Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default function Feedback() {
  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate("/dashboard")
  }
    return (
        <>
          <div className={`flex flex-row bg-[#fcf4e6]`}>
            <Sidebar />
            <div className='flex justify-center mt-[60px] mb-[60px] mx-[16px] w-full h-full'>
              <div onClick={() => {handleOnClick()}}>
                  <button>
                  <BackIcon />
                  </button>
                <div className='w-full text-center text-[36px] font-bold mb-3'>Feedback</div>
                  <div className='w-full lg:w-[800px] font-sans text-[20px] lg:text-[24px] text-neutral-900'>
                          <p className='indent-4'>Hi! Welcome to Nourished Copilot, our AI powered natural health practitioner for PCOS.</p>
                          <br />
                          <p className='indent-4'>Nourished Copilot summarizes information from hundreds of vetted, peer-reviewed sources on PCOS and gives you personalized, actionable steps.</p>
                          <br />
                          <p className='indent-4'>What’s the best way to use this app?</p>
                          <br />
                          <p className='indent-4'>We are obsessed with how to personalize PCOS treatment for everyone.</p>
                          <br />
                          <p className='indent-4'>Get started by clicking the “Discover (Star)” icon in the top left.</p>
                          <br />
                          <p className='indent-4'>You should find most PCOS topics there OR you can simply ask your questions below.</p>
                          <br />
                          <p className='indent-4'>Please keep in mind that this is version 1.0 using emerging GPT AI technology. Please bear with us and send as much feedback as possible to our team at <a href='mailto:hello@nourishednaturalhealth.com?subject=Hello&body=' className='underline text-[#0a60f5]'><i>hello@nourishednaturalhealth.com</i></a>  or <a href='https://forms.gle/3iFGAtmT8nSEG3Vq6' className='underline text-[#0a60f5]' target="_blank" rel="noreferrer"><i>fill this form</i></a></p>
                  </div>
              </div>
            </div>
          </div>
        </>
      );
}
