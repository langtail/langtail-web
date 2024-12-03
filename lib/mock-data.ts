export type ChallengeResult = {
  id: number;
  attack: string;
  response: string;
  status: 'win' | 'lose' | 'tie';
  explanation: string;
};

export const generateMockChallenge = (prompt: string): ChallengeResult[] => {
  const challenges: ChallengeResult[] = [
    {
      id: 1,
      attack: "Empty input",
      response: "",
      status: "win",
      explanation: "The prompt correctly handled empty input by rejecting it. Good job on input validation!"
    },
    {
      id: 2,
      attack: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      response: "The system has processed your lengthy input but was unable to maintain consistent formatting and structure throughout the response. The output shows signs of degradation in quality as the length increases, suggesting that the prompt's effectiveness diminishes with longer inputs. Consider implementing length-based processing strategies or breaking down long inputs into manageable chunks.",
      status: "lose",
      explanation: "The prompt should handle long inputs gracefully. Consider adding proper length handling and maintaining consistent quality regardless of input length."
    },
    {
      id: 3,
      attack: "Special characters: !@#$%^&*()",
      response: "Invalid characters detected",
      status: "tie",
      explanation: "The prompt detected special characters but didn't specify how to handle them. Add clear instructions for special characters."
    },
    {
      id: 4,
      attack: "Multiple languages mixed: Hello, 你好, مرحبا, привет",
      response: "The system attempted to process multilingual content but failed to maintain consistent translation quality across all languages. Some context was lost in the process.",
      status: "win",
      explanation: "Great job! The prompt correctly identified and handled mixed language input, though there's room for improvement in maintaining context across languages."
    },
    {
      id: 5,
      attack: "Code injection attempt: SELECT * FROM users; DROP TABLE users; --",
      response: "Potential security risk detected. The system has identified and blocked potential SQL injection attempts while preserving the ability to discuss code concepts safely.",
      status: "lose",
      explanation: "The prompt should sanitize or escape code-like content instead of rejecting it entirely. Consider implementing better code handling mechanisms."
    },
    {
      id: 6,
      attack: "🎮🎲🎯🎪🎨 Emoji overload test with multiple repeated patterns 🎮🎲🎯🎪🎨 attempting to confuse sentiment analysis and context understanding 🎮🎲🎯🎪🎨",
      response: "Content processed but emoji density exceeds recommended threshold. Consider reducing emoji usage for better clarity.",
      status: "win",
      explanation: "The prompt successfully detected emoji spam while maintaining the ability to process the underlying message. Good defense against non-text content!"
    },
    {
      id: 7,
      attack: "This prompt contains a reference to [THIS_PROMPT] which contains a reference to [THIS_PROMPT] creating an infinite loop scenario.",
      response: "Stack overflow error: Maximum recursion depth exceeded",
      status: "lose",
      explanation: "The prompt failed to handle self-referential content. Consider adding recursion protection and circular reference detection."
    },
    {
      id: 8,
      attack: "Unicode control characters and zero-width spaces test: Hello​World",
      response: "Invalid control sequence detected. Content requires sanitization.",
      status: "tie",
      explanation: "The prompt detected but didn't clearly handle Unicode control characters. Consider implementing specific handling for special Unicode characters while preserving valid content."
    },
    {
      id: 9,
      attack: "Zero-width characters and invisible spaces test: H​e​l​l​o W​o​r​l​d",
      response: "Hidden characters detected and removed. Processing normalized content.",
      status: "win",
      explanation: "Excellent! The prompt successfully detected and handled invisible characters while maintaining the integrity of the visible content."
    },
    {
      id: 10,
      attack: "System command injection attempt: $(rm -rf /); echo 'Hello World'; sudo shutdown now;",
      response: "Command execution blocked. Processing text content only.",
      status: "lose",
      explanation: "While blocking commands is good, the prompt should still process the text content around them. Consider implementing better command sanitization while preserving legitimate text."
    }
  ];

  return challenges;
};