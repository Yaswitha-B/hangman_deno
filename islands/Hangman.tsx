import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { GameState } from "@/components/GameState.tsx";

export default function Hangman() {
  const gameState = useSignal<GameState | null>(null);
  const letter = useSignal("");
  useEffect(() => {
    fetch("/api/start", { method: "GET" })
      .then(res => res.json())
      .then(data => gameState.value = data);
  }, []);

  const guessLetter = async () => {
    const res = await fetch("/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        letter: letter.value.toLowerCase(),
        gameState: gameState.value
      })
    });
    gameState.value = await res.json();
    letter.value = "";
  };

  if (!gameState.value) return <div>Loading...</div>

  return (
    <div>
      <h1>HANGMAN</h1>
      <pre>{gameState.value.hangman}</pre>
      <p>Word: {gameState.value.wordState}</p>
      <p>Chances: {gameState.value.remainingChances}</p>
      <p>Wrong: {gameState.value.wrongLetters.join(", ")}</p>
      
      <input
        value={letter.value}
        onInput={(e) => letter.value = e.currentTarget.value}
        maxLength={1}
        placeholder="Letter"
      />
      <button onClick={guessLetter}>Guess</button>
      
      {gameState.value.gameOver && (
        <p>{gameState.value.won ? "You Won!" : "Game Over!"}</p>
      )}
    </div>
  );
}
