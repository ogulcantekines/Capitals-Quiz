# 🌍 Capitals Quiz App

An interactive and visually engaging geography quiz game built with **Node.js**, **Express**, **EJS**, and **PostgreSQL**. Users can log in with a custom username, select difficulty levels, and guess the capital cities of countries from around the world.

---

## 🎯 Objective
Test your knowledge of world capitals while tracking your score and improving your memory. The app is enriched with animations, sound effects, and a dynamic UI to make learning fun and addictive!

---

## ✨ Features

- 🧑‍💼 **Username login** without registration
- 🎮 **Easy** and **Hard** difficulty modes
- ✅ **Answer validation** with instant feedback
- 🏆 **High score tracking** per user and difficulty level
- 💾 **PostgreSQL-powered** backend logic and storage
- 🎉 **Confetti animation** on correct answers
- ❌ **Shake effect & loss screen** on wrong answers
- 🎧 **Sound effects** for victory and defeat
- 🎨 **Stylish, responsive UI** with modern neon-glow styling
- 🛡️ Protected routes and cache disabling for secure gameplay

---

## 🔧 Tech Stack

| Layer        | Technology                     |
|--------------|----------------------------------|
| Backend      | Node.js, Express.js             |
| Templating   | EJS (Embedded JavaScript)       |
| Database     | PostgreSQL                      |
| Frontend     | HTML, CSS, Vanilla JS           |
| Styling      | Poppins Font + Custom CSS       |
| Effects      | canvas-confetti + MP3 Sounds    |

---

## 📦 Project Structure

```
📁 Capitals-quiz
├── 📁 public            # Static assets (CSS, images, sounds)
│   ├── styles/
│   ├── sounds/
│   └── images/
├── 📁 views             # EJS templates
│   ├── index.ejs
│   └── login.ejs
├── 📄 index.js          # Main server logic
├── 📄 database.sql      # PostgreSQL setup & data scripts
├── 📄 .gitignore
├── 📄 README.md
└── 📄 LICENSE
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ogulcantekines/Capitals-quiz.git
cd Capitals-quiz
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup the PostgreSQL database
- Import `database.sql` to create tables and sample data
- Update your PostgreSQL credentials inside `index.js`

### 4. Run the app
```bash
node index.js
```
Visit [`http://localhost:3000`](http://localhost:3000) to play 🌍

---

## 🧠 Game Logic Overview

- Each user session starts by entering a username and difficulty
- Questions are randomly selected from two tables: `capitals` or `capitals_easy`
- Correct answers increase score and trigger confetti & sound
- Incorrect answers trigger loss screen, sound, and restart prompt
- User scores are saved in the `high_scores` table with difficulty scope

---

## 📌 Tips

- Use the **Back** button? You're logged out automatically 🚪
- Attempt to hack via URL? App will redirect you safely 🔒
- Everything is **sessionless** → no login system needed 👤

---

## 📝 License

This project is licensed under the **MIT License**.  
Feel free to use, fork, and improve! 🌟

```
MIT License © 2024 Oğulcan Tekineş
```

---

## 🙌 Acknowledgements

- Built with love and caffeine ☕
- Inspired by geography games and quiz apps
- Thanks to [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for the party vibes 🎊

---

## 💬 Contact
**Developer:** [Oğulcan Tekineş](https://github.com/ogulcantekines)  
**Repo:** [github.com/ogulcantekines/Capitals-quiz](https://github.com/ogulcantekines/Capitals-Quiz)

**mail:** ogulcan.tekines@gmail.com
**linkedIn:** https://www.linkedin.com/in/oğulcan-tekineş-483309268/

---

> “Nothing stays unlearned forever. Let the capitals burn into your memory.” 🌍
