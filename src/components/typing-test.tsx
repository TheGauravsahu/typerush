"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner"


// Sample word list
const wordList = [
  "apple",
  "banana",
  "car",
  "dog",
  "elephant",
  "football",
  "guitar",
  "house",
  "ice",
  "jungle",
  "kite",
  "lion",
  "mountain",
  "ocean",
  "park",
  "queen",
  "rose",
  "sun",
  "tree",
  "umbrella",
  "violet",
  "water",
  "xylophone",
  "yellow",
  "zebra",
];

export default function TypingTest() {
  const [words, setWords] = useState<string[]>([]); // List of words to type
  const [currentWord, setCurrentWord] = useState<string>(""); // Current word to type
  const [inputValue, setInputValue] = useState<string>(""); // Value entered by user
  const [isGameOver, setIsGameOver] = useState<boolean>(false); // Game over state
  const [wpm, setWpm] = useState<number>(0); // Words per minute
  const [timer, setTimer] = useState<number>(15); // Game timer (15 seconds)
  const [started, setStarted] = useState<boolean>(false); // Start game flag

  // Generate random words
  useEffect(() => {
    const generateRandomWords = () => {
      return Array.from({ length: 50 }, () => {
        return wordList[Math.floor(Math.random() * wordList.length)];
      });
    };
    setWords(generateRandomWords());
    setCurrentWord(generateRandomWords()[0]);
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (started && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsGameOver(true); // End game when time is up
      setStarted(false); // Stop the game
    }
  }, [started, timer]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if the current word matches the input
    if (value === currentWord) {
      setInputValue(""); // Clear input
      setCurrentWord(words[Math.floor(Math.random() * words.length)]); // Set new word
    }
  };

  // Start or restart the game
  const startGame = () => {
    toast("Started.")
    setInputValue(""); // Clear input
    setStarted(true);
    setIsGameOver(false);
    setTimer(15); // Reset the timer to 15 seconds
    setWpm(0); // Reset WPM
    setCurrentWord(words[0]); // Set the first word
  };

  const restartGame = () => {
    setInputValue(""); // Clear input
    setStarted(false);
    setIsGameOver(false);
    setTimer(15); // Reset the timer to 15 seconds
    setWpm(0); // Reset WPM
    setCurrentWord(words[0]);
  };

  // Calculate WPM (Words per minute)
  useEffect(() => {
    if (started && !isGameOver) {
      const correctWords = words.filter((word) => inputValue.includes(word));
      setWpm(Math.floor((correctWords.length / (15 - timer)) * 60));
    }
  }, [inputValue, timer, started, isGameOver, words]);

  return (
    <>
      {/* Game Over message */}
      {isGameOver ? (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <div className="mt-4 text-2xl font-semibold text-red-500 text-center">
            Game Over! Your WPM: {wpm}
          </div>
          {/* Restart button */}
          <Button className="w-32 mt-4" onClick={restartGame}>
            Restart Game
          </Button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-8">
          {/* Timer display */}
          <div className="mt-4 text-xl font-semibold text-center">
            <p>Time Left: {timer}s</p>
          </div>

          <div className="p-4 rounded mb-4">
            <p className="text-gray-400 text-2xl font-semibold">
              {words.join(" ")} {/* Display all words (adjust if needed) */}
            </p>
          </div>

          <div className="flex items-center">
            <Input
              readOnly={!started || isGameOver}
              onChange={handleInputChange}
              type="text"
              className="text-4xl"
              value={inputValue}
            />
          </div>

          {/* Start button */}
          {!started && !isGameOver && (
            <Button className="mt-2" onClick={startGame}>
              Start Game
            </Button>
          )}
        </div>
      )}
    </>
  );
}
