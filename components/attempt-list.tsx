"use client"

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Attempt {
  input: string;
  success: boolean;
}

interface AttemptListProps {
  attempts: Attempt[];
}

export function AttemptList({ attempts }: AttemptListProps) {
  if (attempts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="pixel-font text-xl mb-4 text-center">
        Ninja&apos;s Attempts: {attempts.length}/10
      </h3>
      {attempts.map((attempt, index) => (
        <Card 
          key={index} 
          className={cn(
            "p-6 bg-card border-2 transition-all duration-300",
            attempt.success ? "border-green-500/50" : "border-red-500/50"
          )}
        >
          <p className="mb-3 font-mono">
            <span className="text-muted-foreground">Attempt {index + 1}:</span>{" "}
            {attempt.input}
          </p>
          <p className={cn(
            "pixel-font text-sm",
            attempt.success ? "text-green-500" : "text-red-500"
          )}>
            {attempt.success ? "✨ Prompt held strong!" : "💥 Prompt broken!"}
          </p>
        </Card>
      ))}
    </div>
  );
}