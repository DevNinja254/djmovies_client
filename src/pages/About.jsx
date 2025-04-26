import React, { useEffect, useState } from 'react';
import img1 from '../assets/images/1.jpg'
import img2 from '../assets/images/2.jpg'
import img3 from '../assets/images/3.jpg'
import MainLayout from '../layout/MainLayout';
import { NavLink } from 'react-router-dom';
import api, { config } from '../assets/js/api';
import Loader from '../ui/Loader';

// Data for the CEO

function AboutPage() {
  const [ceoProfile, setCeoProfile] = useState({})
  const [ourTeam, setOurTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [loading1, setLoading1] = useState(true)
  const [progres, setProgress] = useState(4)
  const [progres1, setProgress1] = useState(4)
  const fetchData = async () => {
    api.get("/ceo", {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    .then(res => {
      const data = res.data.results
      // console.log(data)
      setLoading(false)
      setCeoProfile(data[0])
    })
    //////
    api.get("/about_team", {
      ...config,
      onDownloadProgress: (progressEvent) => {
        const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress1(percentageCompleted)
        // console.log(percentageCompleted)
      }
    })
    .then(res => {
      const data = res.data.results
      // console.log(data)
      setLoading1(false)
      setOurTeam(data)
    })
  } 
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <MainLayout>
      <div className="about-container mx-4 bg-gray-500 bg-opacity-20 ">
        {loading | loading1 ? <Loader progres={(progres + progres1) / 2}/> : null}
      {!loading && !loading1 ? <>
        <section className="about-overview sm:w-10/12 sm:mx-auto">
        <h1 className='text-lg my-2 text-gray-700 font-bold '>About dj MOVIES</h1>
        <p className='textMidSm text-gray-600 font-light'>
          Welcome to ---------, the ultimate online destination for experiencing the cinematic movie performances of your favorite DJs, including the iconic DJ Afro, the masterful DJ Smith, the electrifying DJ Sky, and many more! We are passionate about curating and delivering the full visual and auditory spectacle of their incredible sets directly to you.
        </p>
        <p className='textMidSm text-gray-600 font-light'>
          Our mission is simple: to bring the energy and excitement of a DJ performance, transformed into a captivating movie experience, right to your fingertips. Whether you're a devoted fan or a newcomer eager to explore their artistry, you'll find a unique and immersive journey into the world of DJ cinema here.
        </p>
      </section>

      <section className="about-ceo sm:w-10/12 sm:mx-auto">
        <h2 className='textBlue font-bold mb-4'>Meet Our Leader</h2>
        <div className="">
          <figure className='float-left'>
            <img src={ceoProfile.profile_image} alt={ceoProfile.name} className="ceo-image "/>
            <h3 className='text-center textMidSm text-gray-600 '>{ceoProfile.full_name}</h3>
          </figure>
          <div className="ceo-info">
            <p className="ceo-title text-sm font-bold text-gray-600">{ceoProfile.title}</p>
              <p className="ceo-bio textMidSm text-gray-600">{ceoProfile.message}</p>
          </div>
        </div>
      </section>

      <section className="about-team sm:w-10/12 sm:mx-auto">
        <h2 className='textBlue font-bold mb-4'>Our Dedicated Team</h2>
        <p className='textMidSm'>Behind the scenes, a dedicated team works tirelessly to bring you the best possible experience.</p>
        <div className="mt-4 md:grid md:grid-cols-2 gap-3">
          {ourTeam.map((member, index) => (
            <div key={index} className="my-3 shadow-sm shadow-gray-500 p-2">
             <figure className='float-left mr-2 '>
              <img src={require(member.profile_image)} alt={member.full_name} className="team-image" />
              <p className='text-center textMidSm text-gray-600 font-bold'>{member.full_name}</p>
             </figure>
              <p className="ceo-title text-sm font-bold text-gray-600 ">{member.title}</p>
                <p key={index} className="team-bio textMidSm text-gray-600">{member.message}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-vision sm:w-10/12 sm:mx-auto">
        <h2 className='textBlue font-bold mb-4'>Our Guiding Vision</h2>
        <p className='textMidSm'>
          We envision a future where the immersive and dynamic art of DJ performances is easily accessible to fans worldwide, transcending the boundaries of physical events. [Your Website Name] strives to be the leading platform that connects audiences with the full cinematic expression of their favorite DJs' talents, creating unforgettable entertainment moments.
        </p>
      </section>

      <section className="about-contact sm:w-10/12 sm:mx-auto">
        <h2 className='textBlue font-bold mb-4'>Get in Touch</h2>
        <p className='textMidSm'>
          We value your feedback and are always eager to connect with our community. If you have any questions, suggestions, or simply want to say hello, please don't hesitate to visit our <NavLink to="/contact">Contact Page</NavLink>. We're excited to hear from you!
        </p>
      </section>
      </> : null}
    </div>
    </MainLayout>
  );
}

export default AboutPage;