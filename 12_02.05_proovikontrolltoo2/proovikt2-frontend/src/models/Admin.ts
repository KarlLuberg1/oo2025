import type { Word } from "./Word";

export interface Admin {
  id: number;
  name: string;
  words: Word[];
}
