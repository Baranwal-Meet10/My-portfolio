# 🚀 Personal Portfolio Website

A modern, responsive personal portfolio website built to showcase my software engineering journey, projects, technical skills, and professional experience.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, HTML5, CSS3 / Tailwind CSS
- **Backend:** Node.js, Express (if applicable)
- **Email Service:** EmailJS (integrated for the contact form)
- **Deployment:** GitHub Pages / Vercel / Netlify (choose yours)

## ✨ Features

- **Responsive Design:** Optimized for mobile, tablet, and desktop viewports.
- **Project Showcase:** Highlights key projects with live links and GitHub repositories.
- **Contact Form:** Fully functional contact form powered by EmailJS and Node.js.
- **Fast Performance:** Bundled and optimized using Vite for near-instant loading times.

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com
cd My-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your EmailJS / API credentials:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the site.

## 📄 License

This project is licensed under the MIT License.
