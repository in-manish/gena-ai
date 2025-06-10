import * as fs from 'fs';
import * as path from 'path';

const CONFIG_FILE = path.join(process.env.HOME || process.env.USERPROFILE || '.', '.cli-ai-agent-config.json');

export interface UserConfig {
  apiKey?: string;
  model?: 'gemini' | 'chatgpt';
}

export function getConfig(): UserConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading config:', err);
  }
  return {};
}

export function setConfig(config: UserConfig): void {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { mode: 0o600 });
  } catch (err) {
    console.error('Error writing config:', err);
  }
}

export function userConsentsToLogging(): boolean {
  // TODO: Implement user consent check for logging
  return false;
}
