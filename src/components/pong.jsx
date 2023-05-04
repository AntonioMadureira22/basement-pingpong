import React, { useState, useEffect } from 'react';
import '../components/pong.css';

const PingPongGame = () => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [ball, setBall] = useState({ x: 200, y: 200, dx: 1, dy: 1 });
  const [paddle1, setPaddle1] = useState({ y: 160 });
  const [paddle2, setPaddle2] = useState({ y: 160 });

  useEffect(() => {
    // Update ball position every 10ms
    const interval = setInterval(() => {
      setBall(ball => ({
        x: ball.x + ball.dx,
        y: ball.y + ball.dy,
        dx: ball.dx,
        dy: ball.dy
      }));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // update paddle position based on key presses
    };
  
    const handleKeyUp = (event) => {
      // stop updating paddle position when key is released
    };
  
    // add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    // set initial game state
    setPaddle1({ x: 10, y: 160 });
    setPaddle2({ x: 380, y: 160 });
    setBall({ x: 200, y: 200, dx: 5, dy: 5 });
  
    // start game loop
    const intervalId = setInterval(() => {
      // update game state
    }, 20);
  
    // cleanup function to remove event listeners and clear interval when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(intervalId);
    };
  }, []);
  
  const handleKeyDown = (event) => {
    // Move paddles up and down with arrow keys
    switch (event.key) {
      case 'ArrowUp':
        setPaddle1(paddle => ({ y: paddle.y - 10 }));
        break;
      case 'ArrowDown':
        setPaddle1(paddle => ({ y: paddle.y + 10 }));
        break;
      case 'w':
        setPaddle2(paddle => ({ y: paddle.y - 10 }));
        break;
      case 's':
        setPaddle2(paddle => ({ y: paddle.y + 10 }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Check for collisions with top and bottom walls
    if (ball.y < 0 || ball.y > 400) {
      setBall(ball => ({ ...ball, dy: -ball.dy }));
    }

    // Check for collisions with paddles
    if (ball.x < 10 && ball.y > paddle1.y && ball.y < paddle1.y + 80) {
      setBall(ball => ({ ...ball, dx: -ball.dx }));
      setScore(score => ({ ...score, player2: score.player2 + 1 }));
    } else if (ball.x > 390 && ball.y > paddle2.y && ball.y < paddle2.y + 80) {
      setBall(ball => ({ ...ball, dx: -ball.dx }));
      setScore(score => ({ ...score, player1: score.player1 + 1 }));
    }

    // Check for win condition
    if (score.player1 >= 11 || score.player2 >= 11) {
      alert(`Player ${score.player1 >= 11 ? '1' : '2'} wins!`);
      setScore({ player1: 0, player2: 0 });
    }
  }, [ball, paddle1.y, paddle2.y, score.player1, score.player2]);

  return (
    <div tabIndex="0" onKeyDown={handleKeyDown}>
      <svg width="400" height="400">
        <rect x="0" y="0" width="400" height="400" fill="#282c34" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="white" strokeWidth="5" />
        <rect x="10" y={paddle1.y} width="10" height="80" fill="white" />
        <rect x="380" y={paddle2.y} width="10" height="80" fill="white" />
        <circle cx={ball.x} cy={ball.y} r="10" fill="white" />
        <text x="100" y="30" fill="white" fontSize="24">
          {score.player1}
        </text>
        <text x="300" y="30" fill="white" fontSize="24">
          {score.player2}
        </text>
      </svg>
    </div>
  );
};

export default PingPongGame;