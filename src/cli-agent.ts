#!/usr/bin/env node

const { version } = require('../package.json');
const readline = require('readline');
import { AiProvider, GeminiProvider, ChatGptProvider } from './ai/ai-provider';
import { getContext } from './context/context-gatherer';
import { getConfig, setConfig, UserConfig } from './config/config';

console.log('Welcome to the CLI AI Agent!');

// Parse user input from command line arguments
const args = process.argv.slice(2);

function showHelp() {
  console.log(`\nUsage: ai-cli [options] [command]\n`);
  console.log('Options:');
  console.log('  --help       Show help information');
  console.log('  --version    Show version number');
  console.log('  --model      Select AI model (gemini|chatgpt)');
  console.log('  --set-api-key  Set API key');
  console.log('  --set-model    Set AI model');
  console.log('\nType a command or use --help for options.');
}

function showSuggestion(suggestion: string, explanation: string) {
  console.log(`\nSuggestion: ${suggestion}`);
  console.log(`Explanation: ${explanation}`);
}

function promptUserAction() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Do you want to accept, modify, or ignore this suggestion? (a/m/i): ', (answer: string) => {
    switch (answer.trim().toLowerCase()) {
      case 'a':
        console.log('You accepted the suggestion.');
        break;
      case 'm':
        console.log('You chose to modify the suggestion. (Feature coming soon)');
        break;
      case 'i':
        console.log('You ignored the suggestion.');
        break;
      default:
        console.log('Invalid input. No action taken.');
    }
    rl.close();
  });
}

function getModelFromArgs(args: string[]): 'gemini' | 'chatgpt' {
  const modelIndex = args.indexOf('--model');
  if (modelIndex !== -1 && args[modelIndex + 1]) {
    const model = args[modelIndex + 1].toLowerCase();
    if (model === 'gemini' || model === 'chatgpt') {
      return model;
    }
  }
  return 'gemini'; // Default model
}

if (args.includes('--set-api-key')) {
  const keyIndex = args.indexOf('--set-api-key');
  const apiKey = args[keyIndex + 1];
  if (apiKey) {
    const config: UserConfig = getConfig();
    config.apiKey = apiKey;
    setConfig(config);
    console.log('API key set successfully.');
  } else {
    console.error('Error: Please provide an API key after --set-api-key. Example: ai-cli --set-api-key <your-key>');
  }
  process.exit(0);
}

if (args.includes('--set-model')) {
  const modelIndex = args.indexOf('--set-model');
  const model = args[modelIndex + 1];
  if (model === 'gemini' || model === 'chatgpt') {
    const config: UserConfig = getConfig();
    config.model = model;
    setConfig(config);
    console.log(`Model set to ${model}.`);
  } else {
    console.error('Error: Please provide a valid model (gemini|chatgpt) after --set-model. Example: ai-cli --set-model gemini');
  }
  process.exit(0);
}

if (args.length === 0) {
  showHelp();
} else if (args.includes('--help')) {
  showHelp();
} else if (args.includes('--version')) {
  console.log(`CLI AI Agent version: ${version}`);
} else {
  // Determine model
  const model = getModelFromArgs(args);
  let provider: AiProvider;
  if (model === 'chatgpt') {
    provider = new ChatGptProvider();
  } else {
    provider = new GeminiProvider();
  }
  // Remove --model and its value from args for context
  const filteredArgs = args.filter((arg, i) => arg !== '--model' && args[i - 1] !== '--model');
  // Use context gatherer
  const context = getContext();
  provider.getSuggestion(context)
    .then(({ suggestion, explanation }) => {
      console.log('Received input:', context);
      showSuggestion(suggestion, explanation);
      promptUserAction();
    })
    .catch((err: Error) => {
      console.error('Error getting suggestion from AI provider:', err.message);
    });
}
