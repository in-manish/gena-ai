## Relevant Files

- `src/gen.ts` - Main CLI logic for the `gen` command.
- `package.json` - Exposes the CLI via the `bin` field and manages dependencies.
- `tsconfig.json` - TypeScript configuration, including output directory for compiled CLI.
- `dist/gen.js` - Compiled JavaScript CLI entry point for global use.
- `README.md` - Documentation for installation and usage instructions.
- `src/gen.test.ts` - Unit and integration tests for the CLI command.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `gen.ts` and `gen.test.ts` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- CLI tested on macOS (Darwin 24.5.0, arm64). Linux and Windows should be tested by users or in CI.
- No platform-specific issues encountered on macOS.

## Tasks

- [x] 1.0 Create and configure the CLI entry point for the `gen` command
  - [x] 1.1 Ensure `src/gen.ts` has a Node.js shebang (`#!/usr/bin/env node`) at the top
  - [x] 1.2 Refactor or confirm argument parsing and help output in `src/gen.ts`
  - [x] 1.3 Ensure the CLI logic works as a standalone script (not just via npm scripts)
  - [x] 1.4 Export the CLI entry point in `package.json` using the `bin` field
  - [x] 1.5 Compile TypeScript to JavaScript in the `dist/` directory for production use

- [x] 2.0 Set up local and global installation support for the CLI
  - [x] 2.1 Configure `tsconfig.json` to output compiled files to `dist/`
  - [x] 2.2 Add or update build scripts in `package.json` (e.g., `build` script)
  - [x] 2.3 Test running the CLI locally via `npx` and `./dist/gen.js`
  - [x] 2.4 Test global installation via `npm install -g .` and running `gen` from any directory

- [x] 3.0 Ensure cross-platform compatibility and executable permissions
  - [x] 3.1 Ensure the compiled `dist/gen.js` is executable (`chmod +x`)
  - [x] 3.2 Test the CLI on macOS, Linux, and Windows (if possible)
  - [x] 3.3 Handle or document any platform-specific issues (e.g., line endings, permissions)

- [x] 4.0 Update documentation and usage instructions
  - [x] 4.1 Update `README.md` with local and global install instructions
  - [x] 4.2 Add usage examples for all supported CLI options
  - [x] 4.3 Document troubleshooting steps for common issues (e.g., command not found, permission errors)

- [x] 5.0 Implement and verify tests for CLI functionality
  - [x] 5.1 Write or update unit tests in `src/gen.test.ts` for argument parsing and output
  - [x] 5.2 Add integration tests for local and global CLI usage (if feasible)
  - [x] 5.3 Run all tests and ensure they pass
  - [x] 5.4 Fix any bugs or issues found during testing

- [ ] 6.0 Improve CLI answer formatting and question parsing
  - [x] 6.1 Refactor argument parsing to accept unquoted questions (all args after options are joined as the question)
  - [x] 6.2 Ensure keywords/options (e.g., --model, --help) are not included in the question
  - [x] 6.3 Implement beautiful/stylish terminal output for answers (e.g., box, colors, clear sections)
  - [x] 6.4 Update help output and README with new usage pattern and examples
  - [x] 6.5 Add/modify tests to verify new parsing and output behavior

---
I have generated the high-level tasks based on the PRD. Ready to generate the sub-tasks? Respond with 'Go' to proceed. 