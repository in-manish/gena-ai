import { execSync } from 'child_process';

describe('CLI Agent Integration', () => {
  it('sets model and gets a suggestion', () => {
    execSync('npx ts-node src/cli-agent.ts --set-model gemini');
    const output = execSync('npx ts-node src/cli-agent.ts echo').toString();
    expect(output).toMatch(/Suggestion:/);
    expect(output).toMatch(/Explanation:/);
  });
});
