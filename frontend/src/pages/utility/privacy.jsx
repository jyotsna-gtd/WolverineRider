import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Switcher from "../../components/switcher";

import { restrictions } from "../../data/data";

export default function Privacy(){
    return(
        <>
        <Navbar navclass="defaultscroll is-sticky" navlight={true} manuclass="justify-end nav-light"/>

        <section className="relative table w-full items-center py-36 bg-[url('../../assets/images/bg/image.png')] bg-top bg-no-repeat bg-cover">
               <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
               <div className="container relative">
                 <div className="grid grid-cols-1 pb-8 text-center mt-10">
                   <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">Privacy Policy</h3>
                 </div>
               </div>
               <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                       <ul className="tracking-[0.5px] mb-0 inline-block">
                           <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Wolverine-Rider</Link></li>
                           <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                           <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">Privacy Policy</li>
                       </ul>
                   </div>
             </section>

        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="md:flex justify-center">
                    <div className="md:w-3/4">
                        <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-900 rounded-md">
                            <h5 className="text-xl font-semibold mb-4">Overview</h5>
                            <p className="text-slate-600">Last updated: October 19, 2019</p>
                            <p className="text-slate-500">(“us”, “we”, or “our”) operates the website (the “Service”).</p>
                            <p className="text-slate-500">This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.</p>
                            <p className="text-slate-500">We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                            <p className="text-slate-500">We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at http://wolverinerider.com</p>


                           
                        
                            <h5 className="text-xl font-semibold mb-4 mt-8">Information Collection And Use</h5>
                            <p className="text-slate-500">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information (“Personal Information”) may include, but is not limited to:</p>

                            <ul className="list-none text-slate-500 mt-4">
                                {restrictions.map((item,index)=>{
                                    return(
                                        <li className="flex mt-2" key={index}><i className="mdi mdi-chevron-right text-red-500 text-lg align-middle me-2"></i>{item}</li>
                                    )
                                })}
                            </ul>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Log Data</h5>
                            <p className="text-slate-500">We collect information that your browser sends whenever you visit our Service (“Log Data”). This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Google AdSense & DoubleClick Cookie</h5>
                            <p className="text-slate-500">Google, as a third party vendor, uses cookies to serve ads on our Service.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Cookies</h5>
                            <p className="text-slate-500">Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer’s hard drive.
                             We use “cookies” to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. </p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Service Providers                            </h5>
                            <p className="text-slate-500">We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.

These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Security</h5>
                            <p className="text-slate-500">The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Links To Other Sites</h5>
                            <p className="text-slate-500">Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.

We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Children’s Privacy</h5>
                            <p className="text-slate-500">Our Service does not address anyone under the age of 18 (“Children”).

We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we discover that a child under 18 has provided us with Personal Information, we will delete such information from our servers immediately.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Compliance With Laws</h5>
                            <p className="text-slate-500">We will disclose your Personal Information where required to do so by law or subpoena.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Changes To This Privacy Policy</h5>
                            <p className="text-slate-500">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

                            <h5 className="text-xl font-semibold mb-4 mt-8">Contact Us</h5>
                            <p className="text-slate-500">If you have any questions about this Privacy Policy, please contact us.</p>


                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <Switcher/>
        </>
    )
}