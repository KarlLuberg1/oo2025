import { Athlete } from "./Athlete";

export interface Result {
  id: number;
  athlete: Athlete;
  event: string;
  score: number;
  points: number;
}
