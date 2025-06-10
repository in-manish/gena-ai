import { GeminiProvider, ChatGptProvider } from './ai-provider';

describe('AI Providers', () => {
  it('GeminiProvider returns a suggestion', async () => {
    const provider = new GeminiProvider();
    const result = await provider.getSuggestion('test context');
    expect(result.suggestion).toBe('cd src');
    expect(result.explanation).toMatch(/src folder/);
  });

  it('ChatGptProvider returns a suggestion', async () => {
    const provider = new ChatGptProvider();
    const result = await provider.getSuggestion('test context');
    expect(result.suggestion).toBe('ls -la');
    expect(result.explanation).toMatch(/files and directories/);
  });
});
