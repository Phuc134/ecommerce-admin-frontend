import React from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {AiOutlineHome, AiOutlineMail} from "react-icons/ai";
import  {BiPhoneCall, BiInfoCircle} from "react-icons/bi";
import Container from "../components/Container";

const Contact = () => {
    return (
       <>
           <Meta title={"Contact Us"}/>
           <BreadCrumb title="Contact Us"/>
           <Container class1="contact-wrapper py-5 home-wrapper-2">
               <div className="row">
                   <div className="col-12">
                       <iframe
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7596145344874!2d106.63621157572824!3d10.829699289322328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291691bb0c3b%3A0x3184fba11b21278a!2z44Of44OL44K544OI44OD44OX!5e0!3m2!1svi!2s!4v1722898914682!5m2!1svi!2s"
                           width="600"
                           height="450"
                           className="border-0 w-100"
                           allowFullScreen="" loading="lazy"
                           referrerPolicy="no-referrer-when-downgrade"></iframe>
                   </div>
                   <div className="col-12 mt-5">
                       <div className="contact-inner-wrapper d-flex justify-content-between">
                           <div>
                               <h3 className="contact-title mb-4">Contact </h3>
                               <form action="" className="d-flex flex-column gap-15">
                                   <div>
                                       <input type="text" className="form-control" placeholder="Name"/>
                                   </div>
                                   <div>
                                       <input type="email" className="form-control" placeholder="Email"/>
                                   </div>
                                   <div>
                                       <input type="tel" className="form-control" placeholder="Mobile"/>
                                   </div>
                                   <div>
                                       <textarea name="" id="" className="w-100 form-control" placeholder="Comments" cols="30" rows="4"></textarea>
                                   </div>
                                   <button className="button border-0" style={{width: "20%"}}>Send</button>

                               </form>
                           </div>

                           <div>
                               <h3 className="contact-title mb-4">Get in touch with us </h3>
                               <div>
                                   <ul className="ps-0">
                                       <li className="mb-3 d-flex gap-15 align-items-center">
                                           <AiOutlineHome className="fs-5"/>
                                           <address className="mb-0">Hno: 1234, Test address</address>
                                       </li>
                                       <li className="mb-3 d-flex gap-15 align-items-center">
                                           <BiPhoneCall  className="fs-5"/>
                                           <a href="tel: +91 821398213">+91 821398213</a>
                                       </li>
                                       <li className="mb-3 d-flex gap-15 align-items-center">
                                           <AiOutlineMail  className="fs-5"/>
                                           <a href="mailto:test@gmail.com">test@gmail.com</a>

                                       </li>
                                       <li className="mb-3 d-flex gap-15 align-items-center">
                                           <BiInfoCircle  className="fs-5"/>
                                           <p className="mb-0"> Monday - Friday 9AM - 7PM</p>
                                       </li>

                                   </ul>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

           </Container>
       </>
    )
}

export default Contact
