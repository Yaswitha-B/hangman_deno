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
  GET(ctx) {
    const index: number | undefined = getRandomWordIdx(wordList);

    if (index === undefined) {
      return new Response("No words available", { status: 400 });
    }

    const gameState: GameState = {
        wordIdx: index,
        wordState: "_ ".repeat(wordList[index].length).trim(),
        guessedLetters: [],
        wrongLetters: [],
        remainingChances: 6,
        gameOver: false,
        won: false,
    };
    return new Response(JSON.stringify(gameState), {
      headers: { "Content-Type": "application/json" },
    });
  },
});

function getRandomWordIdx(words: string[]): number | undefined {
  if (words.length === 0) {
    return undefined;
  }
  return Math.floor(Math.random() * words.length);
};