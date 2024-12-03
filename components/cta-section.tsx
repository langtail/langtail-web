"use client"

import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CTASection() {
  return (
    <Card className="p-8 bg-card/50 border-2 border-primary/20">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="rounded-full bg-primary/10 p-3">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="pixel-font text-xl text-primary">Level Up Your Prompts!</h2>
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Want to create more stable and reliable prompts? Our ninja can teach you advanced prompt engineering techniques!
          </p>
        </div>
        <Button 
          className="pixel-font group"
          size="lg"
          onClick={() => window.open('https://langtail.com', '_blank')}
        >
          Master Prompt Engineering
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}