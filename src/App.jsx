import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Цель для текущего уровня
  const getGoal = (lvl) => lvl * 50;
  const currentGoal = getGoal(level);

  // Время для уровня (уменьшается с каждым уровнем)
  const getTimeLimit = (lvl) => Math.max(15, 30 - (lvl - 1) * 3);

  // Таймер
  useEffect(() => {
  if (timeLeft <= 0 || gameOver || won) return;

  const timer = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        setGameOver(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver, won]);

  // Проверка победы
  useEffect(() => {
    if (count >= currentGoal && !gameOver) {
      setWon(true);
    }
  }, [count, currentGoal, gameOver]);

  const handleClick = () => {
    if (gameOver || won) return;
    setCount(count + 1);
  };

  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setCount(0);
    setTimeLeft(getTimeLimit(newLevel));
    setWon(false);
    setGameOver(false);
  };

  const restart = () => {
    setLevel(1);
    setCount(0);
    setTimeLeft(30);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Кликер-игра</h1>
        
        <div>
          <h2>Уровень {level}</h2>
          <p>Цель: {currentGoal} очков</p>
          <p>Времени осталось: {timeLeft}с</p>
        </div>

        {!gameOver && !won && (
          <>
            <button onClick={handleClick}>Клик!</button>
            <p>
              Очки: {count} / {currentGoal}
            </p>
          </>
        )}

        {won && (
          <div>
            <h2>Уровень пройден!</h2>
            <p>Вы набрали {count} очков!</p>
            <button onClick={nextLevel}>Следующий уровень</button>
          </div>
        )}

        {gameOver && (
          <div>
            <h2>Время вышло!</h2>
            <p>Вы набрали {count} из {currentGoal} очков</p>
            <button onClick={restart}>Начать заново</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;