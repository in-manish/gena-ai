#!/usr/bin/env node

console.log('Welcome to the gen command!');

import { AiProvider, GeminiProvider, ChatGptProvider } from './ai/ai-provider';
import { getConfig } from './config/config'; // Shared with main CLI agent

const args = process.argv.slice(2);

function showHelp() {
  console.log(`\nUsage: gen [options] your question here\n`);
  console.log('Options:');
  console.log('  --help       Show help information');
  console.log('  --model      Select AI model (gemini|chatgpt)');
  console.log('\nExample: gen --model chatgpt What is today\'s date?');
}

let model: string | undefined;
let questionParts: string[] = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--help') {
    showHelp();
    process.exit(0);
  } else if (args[i] === '--model' && args[i + 1]) {
    model = args[i + 1];
    i++;
  } else if (args[i].startsWith('--')) {
    // Skip unknown options and their values if any
    if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
      i++;
    }
  } else {
    questionParts.push(args[i]);
  }
}

const question = questionParts.join(' ').trim();

if (!question) {
  showHelp();
  console.error('Error: Please provide a question as an argument.');
  if (process.env.SHELL && process.env.SHELL.includes('zsh')) {
    console.error('Note: In zsh, unquoted questions with special characters (like ?) may cause errors. Use quotes, escape special characters, or add a noglob wrapper to your .zshrc:');
    console.error("  gen() { noglob command gen \"$@\" }");
    console.error('Then restart your terminal.');
  }
  process.exit(1);
}

const config = getConfig();
// If --model flag is provided, it overrides the default model from config for this query
const selectedModel = model || config.model || 'gemini';
let provider: AiProvider;
if (selectedModel === 'chatgpt') {
  provider = new ChatGptProvider();
} else {
  provider = new GeminiProvider();
}

function bold(text: string) {
  return `\x1b[1m${text}\x1b[0m`;
}
function green(text: string) {
  return `\x1b[32m${text}\x1b[0m`;
}
function cyan(text: string) {
  return `\x1b[36m${text}\x1b[0m`;
}
function box(text: string, colorFn: (t: string) => string = t => t) {
  const lines = text.split('\n');
  const width = Math.max(...lines.map(l => l.length));
  const top = '┌' + '─'.repeat(width + 2) + '┐';
  const bottom = '└' + '─'.repeat(width + 2) + '┘';
  const content = lines.map(l => `│ ${l.padEnd(width)} │`).join('\n');
  return colorFn([top, content, bottom].join('\n'));
}

provider.getSuggestion(question)
  .then(({ suggestion, explanation }) => {
    // Beautiful terminal output
    console.log(box(bold('Your Question:') + ' ' + question, cyan));
    console.log(box(bold('AI Answer:') + '\n' + suggestion, green));
    if (explanation) {
      console.log(box(bold('Explanation:') + '\n' + explanation, t => t));
    }
  })
  .catch((err: Error) => {
    console.error('Error: Unable to get answer from AI provider.');
    console.error('Details:', err.message);
  }); 