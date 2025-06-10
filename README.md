# CLI AI Agent

This project is a Command Line Interface (CLI) agent that leverages AI models (such as Gemini, ChatGPT, or similar) to provide intelligent, context-aware command suggestions and code completions. Inspired by tools like codex-cli, this agent helps users by predicting the next command, offering explanations, and providing code snippets directly in the terminal.

---

## Quick Summary

- **Ask AI questions in your terminal** using the `gen` command (e.g., `npm run gen -- 'What is today'`).
- **Get command suggestions and explanations** with the main CLI agent (e.g., `npx ts-node src/cli-agent.ts ls`).
- **Supports Gemini and ChatGPT models** (selectable per query or as default).
- **All configuration is stored locally** in `~/.cli-ai-agent-config.json`.
- **API keys are required** for Gemini and ChatGPT (see below for setup).
- **All tests pass** (see below for how to run tests).

---

## Installation (Step-by-Step)

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd gem-cli
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Build the project (optional, for TypeScript):**
   ```sh
   npx tsc
   ```

---

## Setting Up API Keys (Required)

### Gemini API Key
1. **Get your Gemini API key:**
   - Go to [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key) and create a Gemini API key.
2. **Set your Gemini API key in the CLI config:**
   ```sh
   npx ts-node src/cli-agent.ts --set-api-key <YOUR_GEMINI_API_KEY>
   ```
   - This will store your key in `~/.cli-ai-agent-config.json`.
   - The same key is used for both Gemini and ChatGPT (if you use both, update as needed).

### (Optional) Set Default Model
- To use Gemini by default:
  ```sh
  npx ts-node src/cli-agent.ts --set-model gemini
  ```
- To use ChatGPT by default:
  ```sh
  npx ts-node src/cli-agent.ts --set-model chatgpt
  ```
- You can override the model per query (see below).

---

## Zsh Users: Use gen Without Quotes

If you use zsh and want to run gen without quotes (e.g., gen What is the capital of India?), add this to your ~/.zshrc:

```sh
gen() {
  noglob command gen "$@"
}
```

Then restart your terminal. This disables globbing for the gen command, so you can use special characters like ? without quoting or escaping.

---

## Global CLI Usage (Recommended)

After building and installing globally, you can use the `gen` command anywhere:

1. **Build the project:**
   ```sh
   npm run build
   ```
2. **Install globally:**
   ```sh
   npm install -g .
   ```
3. **Ask a question from any directory:**
   ```sh
   gen What is today?
   gen --model chatgpt Who is the president of France?
   gen --help
   ```

---

## Usage

### Main CLI Agent (Command Suggestions)
Run the CLI agent:
```sh
npx ts-node src/cli-agent.ts [options] [command]
```
- Example:
  ```sh
  npx ts-node src/cli-agent.ts ls
  ```

### `gen` Command (Ask AI Anything)
Ask a question using the `gen` command:

#### Locally (without global install)
```sh
npm run gen -- [options] your question here
# or
npx ./dist/gen.js [options] your question here
```
- Example:
  ```sh
  npm run gen -- What is today
  npm run gen -- --model chatgpt Who is the president of France?
  npx ./dist/gen.js --model gemini What is the capital of Germany?
  ```

#### Globally (after install)
```sh
gen [options] your question here
```
- Example:
  ```sh
  gen What is today
  gen --model chatgpt Who is the president of France?
  gen --help
  ```

#### Options
- `--help`           Show help information
- `--model`          Select AI model (`gemini`|`chatgpt`) for this query

---

## Configuration Details

- All configuration is stored in `~/.cli-ai-agent-config.json`.
- You can update your API key or default model at any time using the `--set-api-key` and `--set-model` flags.
- The config file is used by both the main CLI agent and the `gen` command.

---

## Running Tests

To run all tests:
```sh
npx jest
```
To run a specific test file:
```sh
npx jest src/gen.test.ts
```

---

## Troubleshooting & FAQ

- **No suggestions or answers are shown:** Ensure you have set a valid API key and selected a supported model.
- **Permission denied writing config:** Make sure you have write access to your home directory.
- **Command not found:** If `gen` is not found after global install, ensure your npm global bin directory is in your PATH. You can check with `npm bin -g`.
- **Zsh: Unquoted questions with ? or * cause errors:** This is due to zsh globbing. Use quotes, escape special characters, or add the noglob wrapper function above to your `.zshrc`.
- **How do I use the `gen` command?**
  Use `gen your question here` (after global install) or `npm run gen -- your question here` to ask a question and get an AI-generated answer in the terminal.
- **Where is my data stored?**
  Only configuration (API key, model) is stored locally in your home directory. No command history or project data is sent or stored without your consent.

---

## Security Notes
- **Never share your API key.**
- **Do not commit your API key to source control.**
- **If you need to rotate your key, just re-run the `--set-api-key` command.**

---

For more help, use the `--help` flag or check the source code.
