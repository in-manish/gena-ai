## Relevant Files

- `src/gen.ts` - Entry point for the `gen` command logic.
- `src/ai/ai-provider.ts` - AI provider abstraction and integrations (reused from main CLI agent).
- `src/config/config.ts` - Handles user configuration, API keys, and preferences (reused).
- `src/gen.test.ts` - Unit and integration tests for the `gen` command.
- `README.md` - Documentation and usage instructions.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `gen.ts` and `gen.test.ts` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Set up project structure and entry point for the `gen` command
  - [x] 1.1 Create `src/gen.ts` as the entry point for the command
  - [x] 1.2 Add CLI argument parsing for question input and flags
  - [x] 1.3 Add a script/alias to run `gen` from the terminal

- [x] 2.0 Implement core logic to send user questions to the AI provider and display answers
  - [x] 2.1 Reuse AI provider abstraction to send the question to the configured model
  - [x] 2.2 Display the AI-generated answer in the terminal (support single-line and multi-line)
  - [x] 2.3 Ensure no code/commands are executed from the answer

- [x] 3.0 Integrate configuration and model selection (including per-query model override)
  - [x] 3.1 Load API key and default model from config
  - [x] 3.2 Support `--model` flag to override model for a single query
  - [x] 3.3 Ensure config is shared with the main CLI agent

- [x] 4.0 Implement error handling, help output, and user experience improvements
  - [x] 4.1 Display clear error messages for failed API calls or invalid input
  - [x] 4.2 Implement `--help` flag to show usage instructions
  - [x] 4.3 (Optional) Add minimal output styling (e.g., bold question, colored answer)

- [x] 5.0 Write documentation and usage instructions
  - [x] 5.1 Update `README.md` with `gen` command usage, options, and examples
  - [x] 5.2 Add troubleshooting and FAQ for the `gen` command

- [x] 6.0 Add unit and integration tests
  - [x] 6.1 Write unit tests for CLI argument parsing and input handling (`src/gen.test.ts`)
  - [x] 6.2 Write unit tests for AI provider integration (`src/gen.test.ts`)
  - [x] 6.3 Write integration tests for end-to-end usage scenarios (`src/gen.test.ts`) 