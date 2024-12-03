import { z } from 'zod';

export const ChallengeInputSchema = z.object({
  attack: z.string(),
  response: z.string(),
  analysis: z.object({
    explanation: z.string(),
    status: z.enum(['win', 'lose', 'tie']),
  }),
});

export const ChallengeResultSchema = z.object({
  id: z.number(),
  attack: z.string(),
  response: z.string(),
  status: z.enum(['win', 'lose', 'tie']),
  explanation: z.string(),
});

export type ChallengeInput = z.infer<typeof ChallengeInputSchema>;
export type ChallengeResult = z.infer<typeof ChallengeResultSchema>;