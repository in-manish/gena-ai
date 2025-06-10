import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('gen command', () => {
  it('prints help with --help flag', () => {
    const output = execSync('npm run gen -- --help').toString();
    expect(output).toMatch(/Usage: gen/);
    expect(output).toMatch(/Options:/);
  });

  it('prints error if no question is provided', () => {
    let output = '';
    try {
      execSync('npm run gen');
    } catch (err: any) {
      output = err.stdout.toString() + err.stderr.toString();
    }
    expect(output).toMatch(/Error: Please provide a question/);
  });

  function stripAnsi(str: string) {
    return str.replace(/\x1b\[[0-9;]*m/g, '');
  }
  function normalize(str: string) {
    return stripAnsi(str).replace(/\s+/g, ' ');
  }

  it('prints AI answer for a question', () => {
    const output = execSync("npm run gen -- What is today").toString();
    const norm = normalize(output);
    expect(norm).toContain('AI Answer');
    expect(norm).toMatch(/[┌┐└┘]/);
    expect(norm).toMatch(/\d{4}|today|date|\d{1,2}\s\w+\s\d{4}/i);
  });

  it('prints AI answer for a question with --model chatgpt', () => {
    const output = execSync("npm run gen -- --model chatgpt List files").toString();
    const norm = normalize(output);
    expect(norm).toContain('AI Answer');
    expect(norm).toMatch(/[┌┐└┘]/);
    expect(norm).toMatch(/ls|list|directory|file/i);
  });

  it('prints AI answer for a question with --model gemini', () => {
    const output = execSync("npm run gen -- --model gemini Change directory").toString();
    const norm = normalize(output);
    expect(norm).toContain('AI Answer');
    expect(norm).toMatch(/[┌┐└┘]/);
    expect(norm).toMatch(/cd|directory|change/i);
  });
}); 