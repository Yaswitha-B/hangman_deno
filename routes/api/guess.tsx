import { define } from "../../utils.ts";
import type { GameState } from "../../components/GameState.tsx";

const wordList: string[] = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
];

export const handler = define.handlers({
  POST: async (ctx) => {
    const { letter, gameState } = await ctx.req.json();

    const word = wordList[gameState.wordIdx];
    const updatedState: GameState = updateGameState(word, letter, gameState);

    return new Response(JSON.stringify(updatedState), {
        headers: { "Content-Type": "application/json" }
    });
  },
});

function isLetterInWord(word: string, letter: string): boolean {
  return word.includes(letter);
};

function updateWordState(word: string, letter: string, currentWordState: string): string {
  let newWordState = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      newWordState += letter + " ";
    } else {
      newWordState += currentWordState[i * 2] + " ";
    }
  }
  return newWordState;
};

function displayWord(word: string): string{
  let answer: string = "";
  for (let i = 0; i < word.length; i++){
    answer += word[i] + " ";
  }
  return answer;
};

function calculateGameStatus(gameState: GameState): GameState {
  if (!gameState.wordState.includes("_")) {
    gameState.won = true;
    gameState.gameOver = true;
  }
  if (gameState.remainingChances === 0) {
    gameState.gameOver = true;
    gameState.wordState = displayWord(wordList[gameState.wordIdx]);
  }
  return gameState;
};

function updateGameState(word: string, letter: string, gameState: GameState): GameState {
  
  if (isLetterInWord(word, letter)) {
    gameState.wordState = updateWordState(word, letter, gameState.wordState);
    if(!gameState.guessedLetters.includes(letter))
      gameState.guessedLetters.push(letter);
  } else {
    if(!gameState.wrongLetters.includes(letter)){
      gameState.wrongLetters.push(letter);
      gameState.remainingChances--;
      gameState.hangman = updateHangman(gameState.remainingChances);
    }
  }
  gameState = calculateGameStatus(gameState);
  return gameState;
};

function updateHangman(remaining_chances: number): string {
  const hangmanStages: string[] = [
  `  _____
  |     |
  |     O
  |    /|\\
  |    / \\
 _|_    (Dead)`,

  `  _____
  |     |
  |     O
  |    /|\\
  |    /
 _|_`,

  `  _____
  |     |
  |     O
  |    /|\\
  |
 _|_`,

 
  `  _____
  |     |
  |     O
  |    /|
  |
 _|_`,

  `  _____
  |     |
  |     O
  |     |
  |
 _|_`,

  `  _____
  |     |
  |     O
  |
  |
 _|_`,

  `  _____
  |     |
  |
  |
  |
 _|_`
];
;
  return hangmanStages[remaining_chances];
};