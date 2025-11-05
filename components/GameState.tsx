export interface GameState {
  wordIdx: number;
  wordState: string;
  guessedLetters: string[];
  wrongLetters: string[];
  remainingChances: number;
  gameOver: boolean;
  won: boolean;
};




