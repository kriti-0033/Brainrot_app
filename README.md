# 🎯 Brainrot - Knowledge Quiz Application

## Project info
Brainrot is a fast, responsive, and interactive quiz web application built using **React + Vite**. The goal is to challenge users with multiple-choice questions while maintaining a clean and intuitive user interface.

## 🔗 Live Demo

**GitHub Pages:** [https://kriti-0033.github.io/Brainrot_app](https://kriti-0033.github.io/Brainrot_app)
- **Vercel:** [https://brainrot-app.vercel.app](https://brainrot-app.vercel.app) 

**🧠 Features**

- Clean and responsive UI with modern design
- Timer-based question answering (optional)
- Displays correct and wrong answers
- Final score summary
- Mobile-friendly layout

**⚙️ Tech Stack**

- **Frontend:** React, Vite, TypeScript, TailwindCSS
- **Hosting:** GitHub Pages & Vercel

Install Dependies:

```sh
# Step 1: npm install

# Step 2:npm run dev

# Step 3: npm run build [Build for production, only when you want to deploy it through github]

# Step 4: npm run deploy
```

**Assumptions Made**

- Each quiz question is multiple choice.
- No backened/database is used- questions are stored locally.
- The user plays the quiz in one session (no login or session tracking)

**⚠️Challenges Faced**

1. Blank screen on GitHub Pages
Cause: Missing base path in vite.config.ts

Fix: Added base: "/Brainrot_app/" to Vite config

2. gh-pages deployment errors
Cause: Using default build/ instead of dist/ in Vite

Fix: Changed deploy script to gh-pages -d dist



## 📄 License

This project is open source and free to use.

MADE BY **Kriti Gaur**