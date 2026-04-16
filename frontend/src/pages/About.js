import React from "react";
import "../styles/About.css";

import rehanImg from "../assets/icons/rehan.png";
import atulyaImg from "../assets/icons/atulya.png";
import harshImg from "../assets/icons/harsh.png";
import rohitImg from "../assets/icons/rohit.png";
import noopurImg from "../assets/icons/noopur mam.png";

function About() {
  const developers = [
    {
      name: "Sk Rehan Islam",
      role: "Full-Stack Developer",
      desc: "Designed UI, dashboard and overall user experience.",
      img: rehanImg,
      email: "mailto:skrehanislam12@gmail.com",
      phone: "tel:+918348109468",
      linkedin: "https://www.linkedin.com/in/sk-rehan-islam-b6a3122b9/",
    },
    {
      name: "Atulya Kumar",
      role: "Backend Developer",
      desc: "Built MongoDB database structure and API integration.",
      img: atulyaImg,
      email: "mailto:atulya@email.com",
      phone: "tel:+911234567890",
      linkedin: "https://www.linkedin.com/in/atulya-kumar-03471622b/",
    },
    {
      name: "Harsh Kumar",
      role: "Mental Support",
      desc: "Designed application structure and system workflow.",
      img: harshImg,
      email: "mailto:harsh@email.com",
      phone: "tel:+911234567890",
      linkedin: "https://linkedin.com/in/harsh",
    },
    {
      name: "Rohit Singh Sisodiya",
      role: "Financer",
      desc: "Integrated AI chatbot and recovery support system.",
      img: rohitImg,
      email: "mailto:rohit@email.com",
      phone: "tel:+911234567890",
      linkedin: "https://linkedin.com/in/rohit",
    },
    {
      name: "Noopur Dass",
      role: "Mentor Support",
      desc: "Guide us to build this project and our beautiful mentor",
      img: noopurImg,
      email: "mailto:soec.noopur@dbuu.ac.in",
      phone: "+91 81262 00597",
      linkedin: "https://www.linkedin.com/in/noopur-dass-aba3b882/",
    },
  ];

  return (
    <div className="about-container">
      <h2 className="team-heading">Meet The Developers</h2>

      {developers.map((dev, index) => (
        <div className="team-card" key={index}>
          <img src={dev.img} alt={dev.name} />

          <div className="team-info">
            <h3>{dev.name}</h3>
            <p className="role">{dev.role}</p>
            <p>{dev.desc}</p>

            <div className="contact-links">
              <a href={dev.email}>📧 Email</a>
              <a href={dev.phone}>📞 Phone</a>
              <a href={dev.linkedin} target="_blank" rel="noreferrer">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
