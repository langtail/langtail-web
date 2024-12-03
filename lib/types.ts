export type ChallengeResult = {
  id: number;
  attack: string;
  response: string;
  status: 'win' | 'lose' | 'tie';
  explanation: string;
};