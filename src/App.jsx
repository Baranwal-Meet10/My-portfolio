import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
  FaPaperPlane
} from "react-icons/fa"

import { TypeAnimation } from "react-type-animation"

import { motion } from "framer-motion"

import { useState, useEffect } from "react"

import emailjs from '@emailjs/browser'

import heroImage from './assets/hero.gif'
import surveillanceImage from './assets/assets_abnormal_20250421_164900_frame_165.jpg'
import meetPhoto from './assets/Meet.jpeg'

// Initialize EmailJS - ADD YOUR PUBLIC KEY HERE
emailjs.init('CDrgeX8T-AQ83AVlM');

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Sending email with data:', {
        name: formData.name,
        email: formData.email,
        title: formData.subject,
        message: formData.message
      });

      const result = await emailjs.send(
        'service_awsvb6e',
        'template_a1bclva',
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message
        }
      );

      console.log('Email sent successfully:', result);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Full Error Object:', error);
      console.error('Error Status:', error.status);
      console.error('Error Text:', error.text);
      
      // Show specific error message
      let errorMessage = 'Failed to send message.';
      if (error.status === 0) {
        errorMessage = 'Network error - please check your connection';
      } else if (error.status === 403) {
        errorMessage = 'Permission denied - check your EmailJS Public Key';
      } else if (error.status === 400) {
        errorMessage = 'Bad request - check template variables';
      } else if (error.text) {
        errorMessage = error.text;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-black font-semibold mb-2 text-sm">
          Your Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="w-full border-2 border-black rounded-2xl px-5 py-3 text-black outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2 transition text-sm"
        />
      </div>

      <div>
        <label className="block text-black font-semibold mb-2 text-sm">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full border-2 border-black rounded-2xl px-5 py-3 text-black outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2 transition text-sm"
        />
      </div>

      <div>
        <label className="block text-black font-semibold mb-2 text-sm">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project Inquiry"
          required
          className="w-full border-2 border-black rounded-2xl px-5 py-3 text-black outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2 transition text-sm"
        />
      </div>

      <div>
        <label className="block text-black font-semibold mb-2 text-sm">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder="Tell me about your project..."
          required
          className="w-full border-2 border-black rounded-2xl px-5 py-3 text-black outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2 transition resize-none text-sm"
        ></textarea>
      </div>

      {submitted && (
        <div className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-3 rounded-2xl text-sm">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-2xl text-sm">
          ✗ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-[#F5E6D3] py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : <>SEND MESSAGE <FaPaperPlane /></>}
      </button>
    </form>
  );
};

// Click GIF Animation Component
const ClickGif = ({ clicks }) => {`+-*`
  return (
    <>
      {clicks.map((click, index) => (
        <motion.img
          key={index}
          src={heroImage}
          alt="click"
          className="fixed pointer-events-none w-20 h-20 z-[998]"
          style={{
            left: `${click.x}px`,
            top: `${click.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 1, scale: 1.9 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 4.5 }}
        />
      ))}
    </>
  )
}

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [clicks, setClicks] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      const newClick = { x: e.clientX, y: e.clientY, id: Date.now() }
      setClicks(prev => [...prev, newClick])
      
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id))
      }, 600)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="bg-[#F5E6D3] text-black min-h-screen overflow-x-hidden relative">
      <ClickGif clicks={clicks} />
      
      <div
        className="fixed pointer-events-none text-5xl z-[999] transition-all duration-75"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 sticky top-0 bg-[#F5E6D3] z-50">
        <h1 className="text-3xl font-bold text-black w-12 h-12 rounded-full bg-[#F5E6D3] border-3 border-black flex items-center justify-center">
          M
        </h1>

        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li>
            <a href="#home" className="hover:text-black transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-black transition duration-300">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="hover:text-black transition duration-300">
              Skills
            </a>
          </li>
          <li>
            <a href="#education" className="hover:text-black transition duration-300">
              Education
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-black transition duration-300">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-black transition duration-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col justify-center items-center text-center px-5 relative overflow-hidden"
      >
        <p className="text-black text-lg mb-4 z-10 tracking-[0.3em] uppercase">
          Welcome To My Portfolio
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 z-10 leading-tight text-black">
          Hi, I'm{" "}
          <span className="text-black">
            Meet Baranwal
          </span>
        </h1>

        <div className="text-black text-2xl md:text-4xl font-bold mb-8 z-10">
          <TypeAnimation
            sequence={[
              "Software Developer",
              2000,
              "Python Developer",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="max-w-3xl text-black text-base md:text-xl leading-9 mb-10 z-10 px-2">
          I'm driven to use my skills in software development and use AI to create meaningful solutions and contribute to team and continuously grow with every challenge
        </p>

        <div className="flex flex-col sm:flex-row gap-5 z-10 mb-10">
          <a href="#projects">
            <button className="bg-black text-[#F5E6D3] px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 hover:shadow-lg transition-all duration-500">
              Explore Projects
              <FaArrowRight />
            </button>
          </a>

          <a href="#contact">
            <button className="border-2 border-black text-black px-8 py-4 rounded-2xl hover:bg-black hover:text-[#F5E6D3] hover:shadow-lg transition-all duration-500">
              Contact Me
            </button>
          </a>
        </div>

        <div className="flex gap-8 text-3xl z-10">
          <a
            href="https://github.com/Baranwal-Meet10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black hover:-translate-y-2 transition duration-300 text-black"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/meet-barnwal-153aba315"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black hover:-translate-y-2 transition duration-300 text-black"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:barnwalmeet2@gmail.com"
            className="hover:text-black hover:-translate-y-2 transition duration-300 text-black"
          >
            <FaEnvelope />
          </a>
        </div>
      </motion.section>

      {/* About */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="py-24 px-6 md:px-20 bg-[#F5E6D3]"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">
            About <span className="text-black">Me</span>
          </h2>
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="w-48 h-48 md:w-64 md:h-74 rounded-3xl overflow-hidden border-2 border-black shadow-lg">
              <img 
                src={meetPhoto} 
                alt="Meet Baranwal" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-2xl font-bold text-black mt-6 tracking-wide"></p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-black">
                I'm Meet Baranwal
              </h3>

              <p className="text-black leading-8 mb-6">
                I am currently pursuing my B.Tech in Computer Science and Engineering at the United Institute of Technology (UIT), Karnavati University. 
              </p>
              <p className="text-black leading-8 mb-6">
                My journey as a developer started with curiosity and a passion for solving real-world problems. What began as tinkering with code evolved into a deep commitment to crafting meaningful solutions that make a difference.

              </p>

              <p className="text-black leading-8 mb-6">
                I've explored diverse domains—from building intelligent surveillance systems with AI and computer vision to creating healthcare platforms that connect doctors and save lives. Each project pushed my boundaries, teaching me not just programming, but the art of turning ideas into reality.
              </p>
            </div>
          </div>
          <motion.h3
            id="skills"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-3xl font-bold text-center mb-12 text-black"
          >
            Technical Skills
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                skills: ["React", "Tailwind CSS", "JavaScript", "HTML/CSS"]
              },
              {
                title: "Backend",
                skills: ["Python", "Django", "Flask", "APIs",]
              },
              {
                title: "Tools",
                skills: ["Git", "Figma", "GitHub", "VS Code"]
              }
            ].map((skillCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: false }}
                whileHover={{ y: -10 }}
                className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-black">
                  {skillCategory.title}
                </h3>

                <ul className="space-y-3">
                  {skillCategory.skills.map((skill, idx) => (
                    <li key={idx} className="text-black flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        id="education"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="py-24 px-6 md:px-20 bg-[#F5E6D3]"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-black">
            Education
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              whileHover={{ y: -8 }}
              className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold mb-2 text-black">
                School
              </h3>

              <p className="text-black text-b mb-6">CS Vidya Bharti English School</p>

              
              <p className="text-black leading-8">
                I completed my higher secondary education with a focus on Physics, Chemistry, and Mathematics, achieving a score of 68%.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: false }}
              whileHover={{ y: -8 }}
              className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold mb-2 text-black">
                Bachelor of Technology
              </h3>

              <p className="text-black text-sm mb-6">Engineering - In Progress</p>

              <p className="text-black leading-8 mb-4">
                Currently pursuing a Bachelor of Technology in Computer Science and Engineering.              
              </p>

              <p className="text-black leading-8">
                Currently maintaining a 7.0 CGPA while pursuing practical expertise in AI, Backend Developer through academic projects.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="py-24 px-6 md:px-20 bg-[#F5E6D3]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-5xl font-bold text-center mb-16 text-black"
          >
            My <span className="text-black">Projects</span>
          </motion.h2>

          <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {[
              {
                title: "AI Surveillance System",
                desc: "It scans video feeds to detect suspicious or abnormal activity and social distancing violations. Alerts are sent to the control system, and screenshots of incidents are saved automatically for review and evidence.",
                image: surveillanceImage,
                languages: ["Python", "YOLOv4", "OpenCV"],
                github: "https://github.com/Baranwal-Meet10/crowd-monitoring-alert-system"
              },
              {
                title: "DOCLN",
                desc: "A simple web app for doctors to connect, share updates, browse research, and chat—like a professional, healthcare-focused social app.",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
                languages: ["React", "Node.js", "MongoDB"],
                github: "https://github.com/Baranwal-Meet10/DocIn-"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false }}
                whileHover={{ y: -12 }}
                className="bg-[#F9F5F0] border-2 border-black rounded-3xl overflow-hidden"
              >
                <div className="h-52 bg-gray-300 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.languages.map((lang, idx) => (
                      <span key={idx} className="bg-black text-[#F5E6D3] text-xs font-semibold px-3 py-1 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <p className="text-black mb-6 leading-8">
                    {project.desc}
                  </p>

                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <button className="bg-black text-[#F5E6D3] px-5 py-3 rounded-xl font-bold hover:scale-105 transition duration-300 flex items-center gap-2">
                        <FaGithub /> Explore
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 md:px-20 bg-[#F5E6D3]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-black">
            Get In <span className="text-black">Touch</span>
          </h2>

          <p className="text-center text-black text-lg mb-12">
            Have a project in mind or want to collaborate? Let's connect!
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-8"
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <div className="space-y-6">
                {/* Email */}
                <div className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-6 flex items-center gap-4 hover:-translate-y-2 transition">
                  <div className="text-4xl text-black">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-black text-sm font-semibold">Email</p>
                    <p className="text-black font-bold">
                      barnwalmeet2@gmail.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-6 flex items-center gap-4 hover:-translate-y-2 transition">
                  <div className="text-4xl text-black">
                    ☎
                  </div>
                  <div>
                    <p className="text-black text-sm font-semibold">Phone</p>
                    <p className="text-black font-bold">
                      +91 9016999827
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-[#F9F5F0] border-2 border-black rounded-3xl p-6 flex items-center gap-4 hover:-translate-y-2 transition">
                  <div className="text-4xl text-black">
                    📍
                  </div>
                  <div>
                    <p className="text-black text-sm font-semibold">Location</p>
                    <p className="text-black font-bold">
                      Surat, Gujarat, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-black font-semibold text-sm mb-4">Follow Me</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Baranwal-Meet10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full border-2 border-black bg-white flex items-center justify-center text-2xl text-black hover:bg-black hover:text-[#F5E6D3] transition"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/meet-barnwal-153aba315"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full border-2 border-black bg-white flex items-center justify-center text-2xl text-black hover:bg-black hover:text-[#F5E6D3] transition"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black py-8 text-center text-black bg-[#F5E6D3]">
        <p className="mb-2">
          © 2026 Meet Baranwal. All rights reserved.
        </p>

        <p className="text-sm text-black">
          BTECH-CSE Karnavati University
        </p>
      </footer>
    </div>
  )
}

export default App