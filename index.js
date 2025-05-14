// ============================
// 1. MODULE IMPORTS
// ============================
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// ============================
// 2. DATABASE CONNECTION
// ============================
const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.LOCAL ? false : { rejectUnauthorized: false }
});
db.connect();

// ============================
// 3. EXPRESS APP CONFIG
// ============================
const app = express();
const port = process.env.PORT || 3000;

// ============================
// 4. GLOBAL VARIABLES
// ============================
let quiz = [];
let currentUser = "";
let currentHighScore = 0;
let totalCorrect = 0;
let currentQuestion = {};
let currentDifficulty = "easy";

// ============================
// 5. MIDDLEWARE
// ============================
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Prevent caching for better navigation control
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// ============================
// 6. FETCH QUIZ QUESTIONS
// ============================ 
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
});

// ============================
// 7. LOGIN ROUTES
// ============================
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/logout", (req, res) => {
  currentUser = "";
  currentDifficulty = "";
  totalCorrect = 0;
  currentHighScore = 0;
  res.redirect("/login");
});

// ============================
// 8. HANDLE LOGIN POST
// ============================
app.post("/login", async (req, res) => {
  const username = req.body.username.trim();
  const difficulty = req.body.difficulty;

  currentUser = username;
  currentDifficulty = difficulty;

  try {
    const result = await db.query(
      "SELECT * FROM high_scores WHERE username = $1 AND difficulty = $2",
      [username, difficulty]
    );

    if (result.rows.length === 0) {
      await db.query(
        "INSERT INTO high_scores (username, score, difficulty) VALUES ($1, $2, $3)",
        [username, 0, difficulty]
      );
      currentHighScore = 0;
    } else {
      currentHighScore = result.rows[0].score;
    }

    res.redirect("/quiz");
  } catch (err) {
    console.error("Login error:", err);
    res.send("Error occurred. Please try again.");
  }
});

// ============================
// 9. QUIZ START ROUTE
// ============================
app.get("/quiz", async(req, res) => {
  if (!currentUser || !currentDifficulty) {
    return res.redirect("/login");    
  }

  totalCorrect = 0;
  await nextQuestion();

  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: null,
    totalScore: totalCorrect,
    highScore: currentHighScore,
    username: currentUser,
    correctAnswer: "",
    currentDifficulty: currentDifficulty
  });

  console.log(currentQuestion);
});

// ============================
// 10. DEFAULT ROUTES
// ============================
app.get("/", (req, res) => {
  return res.redirect("/login");
});

app.get("/submit", (req, res) => {
  res.redirect("/logout");
});

// ============================
// 11. SUBMIT ANSWER AND UPDATE SCORE
// ============================
app.post("/submit", async (req, res) => {
  if (!currentUser || !currentDifficulty) {
    return res.redirect("/login");
  }

  const answer = req.body.answer.trim();
  const correctAnswerToShow = currentQuestion.capital;
  let isCorrect = false;

  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;

    const result = await db.query("SELECT * FROM high_scores WHERE username = $1 AND difficulty = $2", [currentUser, currentDifficulty]);
    const dbScore = result.rows[0]?.score || 0;

    if (totalCorrect > dbScore) {
      await db.query("UPDATE high_scores SET score = $1 WHERE username = $2 AND difficulty = $3", [totalCorrect, currentUser, currentDifficulty]);
      currentHighScore = totalCorrect;
    }

    await nextQuestion(); // ✅ only question is changing
    console.log(currentQuestion); // ✅ only log here
  } 
else {
    console.log("❌ Wrong answer. No new question selected."); 
  }

  res.render("index.ejs", {
    question: currentQuestion, // if wrong it stays
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
    highScore: currentHighScore,
    username: currentUser,
    correctAnswer: correctAnswerToShow,
    currentDifficulty: currentDifficulty
  });

});

// ============================
// 12. RESTART QUIZ ROUTE
// ============================
app.get("/restart", async(req, res) => {
  if (!currentUser || !currentDifficulty) {
    return res.redirect("/login");
  }

  totalCorrect = 0;
  await nextQuestion();

  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: null,
    totalScore: totalCorrect,
    highScore: currentHighScore,
    username: currentUser,
    correctAnswer: "",
    currentDifficulty: currentDifficulty
  });

  console.log(currentQuestion);
});

// ============================
// 13. RANDOM QUESTION FUNCTION
// ============================
async function nextQuestion() {
  let queryText =
    currentDifficulty === "easy"
      ? "SELECT * FROM capitals_easy ORDER BY RANDOM() LIMIT 1"
      : "SELECT * FROM capitals ORDER BY RANDOM() LIMIT 1";

  try {
    const result = await db.query(queryText);
    currentQuestion = result.rows[0];
  } catch (err) {
    console.error("Error fetching question:", err);
  }
}

// ============================
// 14. START SERVER
// ============================
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
