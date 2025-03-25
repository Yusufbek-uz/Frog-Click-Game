import { useState, useEffect } from "react";

import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!gameStarted || timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (gameStarted) moveFrog();
  }, [gameStarted]);

  useEffect(() => {
    if (timeLeft === 0) {
      setModalOpen(true);
      setBestScore(prev => Math.max(prev, score));
    }
  }, [timeLeft]);

  const moveFrog = () => {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    setPosition({ x, y });
  };

  const handleClick = () => {
    setScore(prev => prev + 1);
    moveFrog();
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameStarted(true);
    setModalOpen(false);
  };

  return (
    <div className="game-container" style={styles.container}>
      {!gameStarted ? (
        <div className="start-modal" style={styles.modal}>
          <h2>O'yinni boshlash</h2>
          <button onClick={startGame} style={styles.button}>Boshlash</button>
        </div>
      ) : (
        <>
          <div style={styles.scoreboard}>
            <p>Ball: {score}</p>
            <p>Vaqt: {timeLeft}s</p>
          </div>
          {timeLeft > 0 && (
            <img
              src="https://raw.githubusercontent.com/Yusufbek-uz/logos/refs/heads/main/Veranix.png"
              alt="Frog"
              onClick={handleClick}
              style={{
                ...styles.frog,
                left: `${position.x}px`,
                top: `${position.y}px`,
                borderRadius: '50%'
              }}
            />
          )}
        </>
      )}
      {modalOpen && (
        <div className="end-modal" style={styles.modal}>
          <h2>O'yin tugadi!</h2>
          <p>Sizning ballingiz: {score}</p>
          <p>Shaxsiy rekord: {bestScore}</p>
          <button onClick={startGame} style={styles.button}>Qayta boshlash</button>
        </div>
      )}
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "hidden"
  },
  scoreboard: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px"
  },
  frog: {
    width: "50px",
    height: "50px",
    position: "absolute",
    cursor: "pointer"
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)"
  },
  button: {
    marginTop: "10px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    background: "#ff6f61",
    color: "white",
    transition: "0.3s",
  },
  buttonHover: {
    background: "#ff3b30"
  }
};


export default App
