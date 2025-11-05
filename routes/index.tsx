import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Hangman from "@/islands/Hangman.tsx"

export default define.page(function Home(ctx) {
  return (
    <div>
      <Head>
        <title>Hangman</title>
      </Head>
      <div>
        <h1>HANGMAN GAME</h1>
        <Hangman />
      </div>
    </div>
  );
});
