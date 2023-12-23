import Sidebar from 'components/Sidebar';
import React from 'react'

export default function Feedback() {
    return (
        <>
          <div className={`flex flex-row bg-[#fcf4e6]`}>
            <Sidebar />
            <div className='flex justify-center mt-[60px] mb-[60px] mx-[10px] w-full h-screen'>
                <div className='w-full lg:w-[800px] font-sans text-[20px] lg:text-[24px] text-neutral-900'>
                        <p>Hi! Welcome to Nourished Copilot, our AI powered natural health practitioner for PCOS.</p>
                        <p>Nourished Copilot summarizes information from hundreds of vetted, peer-reviewed sources on PCOS and gives you personalized, actionable steps.</p>
                        <p>What’s the best way to use this app?</p>
                        <p>We are obsessed with how to personalize PCOS treatment for everyone.</p>
                        <p>Get started by clicking the “Discover (Star)” icon in the top left.</p>
                        <p>You should find most PCOS topics there OR you can simply ask your questions below.</p>
                        <span>Please keep in mind that this is version 1.0 using emerging GPT AI technology. Please bear with us and send as much feedback as possible to our team at <a href='mailto:hello@nourishednaturalhealth.com?subject=Hello&body='><u><i>hello@nourishednaturalhealth.com</i></u></a>  or <a href='https://forms.gle/3iFGAtmT8nSEG3Vq6' target="_blank" rel="noreferrer"><u><i>fill this form</i></u></a></span>
                    </div>
            </div>
          </div>
        </>
      );
}
