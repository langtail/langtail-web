"use client"

import { Textarea } from '@/components/ui/textarea';
import { Target } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PromptInput({ value, onChange, disabled }: PromptInputProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Target className="w-6 h-6 text-primary" />
        <h2 className="pixel-font text-lg">Your Prompt</h2>
      </div>
      <Textarea
        placeholder="Enter your prompt instructions here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] mb-4"
        disabled={disabled}
      />
    </div>
  );
}