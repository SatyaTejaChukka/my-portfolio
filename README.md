# Personal Portfolio

A modern, responsive portfolio website built with React and Vite, featuring glassmorphism design, smooth animations, and an interactive timeline.

🌐 **Live Demo**: [https://satyatejachukka.github.io/my-portfolio/](https://satyatejachukka.github.io/my-portfolio/)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on all devices
- **Glassmorphism UI**: Modern glass-effect design with backdrop filters
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Dark/Light Theme**: Toggle between dark and light themes
- **Interactive Timeline**: Education and experience section with animated timeline
- **Project Showcase**: Filterable project gallery with tech stack tags
- **Contact Form**: Integrated contact form with EmailJS
- **Optimized Performance**: Built with Vite for fast loading and optimal performance

## 🛠️ Built With

- **React** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **EmailJS** - Email service integration
- **Tailwind CSS** - Utility-first CSS (via inline styles)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/SatyaTejaChukka/my-portfolio
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Configure EmailJS for the contact form:
   - See [google_apps_script_instructions.md](./google_apps_script_instructions.md) for detailed setup instructions

4. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Deploy to GitHub Pages:
```bash
npm run deploy
```

## 📁 Project Structure

```
my-portfolio/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images and media
│   ├── components/   # React components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── Projects.jsx
│   ├── App.jsx       # Main app component
│   ├── App.css       # Component styles
│   ├── index.css     # Global styles
│   └── main.jsx      # Entry point
├── index.html
├── package.json
└── vite.config.js
```