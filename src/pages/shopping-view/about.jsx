import React from 'react'

function about() {
    return (
        <div>
            <section className=" bg-black py-40 mt-8 mx-4 lg:mx-20 rounded-2xl">
                <div className="container mx-auto px-4 lg:px-20">
                    <p className="mt-2 text-4xl font-bold text-center text-[#ff9900] mb-6">
                        CONTACT US
                    </p>
                    
                        
                            <p className='flex justify-center items-center'>
                                <span className="text-[#ff9900] text-2xl font-extrabold">Email:</span>
                                <a href="mailto:hublogs3@gmail.com" className="font-bold text-lg ml-2 text-white">
                                cvvglitch94@gmail.com
                                </a>
                                <span className="ml-2 text-[#00ff00] font-extrabold ">
                                    <a href="mailto:cvvglitch94@gmail.com">CLICK HERE</a>
                                </span>
                            </p>
                       
                        
                            <p className='flex justify-center items-center '>
                                <span className="text-[#ff9900] font-extrabold text-2xl ">Telegram:</span>
                                <a href="https://t.me/cvvglitchshop" className="text-white font-bold ml-2">
                                    @cvvglitchshop
                                </a>
                                <span className="text-[#00ff00] font-extrabold ml-2 ">
                                    <a href="https://t.me/cvvglitchshop">CLICK HERE</a>
                                </span>
                            </p>
                            <p className='flex justify-center items-center '>
                                <span className="text-[#ff9900] font-extrabold text-2xl ">WhatsApp:</span>
                                <a href="https://wa.me/13236770462" className="text-white font-bold ml-2">
                                   +1 (323) 677-0462
                                </a>
                                <span className="text-[#00ff00] font-extrabold ml-2">
                                    <a href="https://wa.me/13236770462">CLICK HERE</a>
                                </span>
                                
                            </p>
                     

                </div>
                <div className="mt-14 flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Left Section: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Cvvglitch. All rights reserved.
            </p>
          </div>
        </div>

            </section>
        </div>
    )
}

export default about
