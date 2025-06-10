import { getConfig, setConfig, UserConfig } from './config';
import * as fs from 'fs';
import * as path from 'path';

describe('Config', () => {
  const CONFIG_FILE = path.join(process.env.HOME || process.env.USERPROFILE || '.', '.cli-ai-agent-config.json');
  const backupFile = CONFIG_FILE + '.bak';

  beforeAll(() => {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.copyFileSync(CONFIG_FILE, backupFile);
    }
  });

  afterAll(() => {
    if (fs.existsSync(backupFile)) {
      fs.copyFileSync(backupFile, CONFIG_FILE);
      fs.unlinkSync(backupFile);
    } else if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
    }
  });

  it('writes and reads config values', () => {
    const config: UserConfig = { apiKey: 'test-key', model: 'gemini' };
    setConfig(config);
    const readConfig = getConfig();
    expect(readConfig.apiKey).toBe('test-key');
    expect(readConfig.model).toBe('gemini');
  });
});
