export const getLangtailUrl = (prompt: string) => {
  const schema = {
    state: {
      args: {
        stop: [],
        model: 'gpt-4o-mini',
        top_p: 1,
        stream: true,
        jsonmode: false,
        max_tokens: 800,
        temperature: 0.5,
        presence_penalty: 0,
        frequency_penalty: 0,
      },
      type: 'chat',
      tools: [],
      template: [
        {
          role: 'system',
          content: prompt,
        },
      ],
      functions: [],
    },
    chatInput: {},
    chatPlaygroundHistory: [],
  }

  return `https://app.langtail.com/playground?state=${encodeURIComponent(JSON.stringify(schema))}`
}
