import Sidebar from 'components/Sidebar';
import React from 'react'

export default function Feedback() {
    return (
        <>
          <div className={`flex flex-row bg-[#fcf4e6]`}>
            <Sidebar />
            <div className='flex justify-center mt-[60px] mb-[60px] mx-[16px] w-full h-full'>
              <div>
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
