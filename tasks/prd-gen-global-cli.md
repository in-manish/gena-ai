# Product Requirements Document: `gen` as a Local and Global CLI Command

## 1. Introduction/Overview

This document describes the requirements for making the `gen` command available as a true CLI tool, so users can run `gen 'question...'` directly in their terminal, both locally (within the project) and globally (anywhere on their system). The goal is to eliminate the need for `npm run` or `ts-node` prefixes, providing a seamless, user-friendly experience.

## 2. Goals

- Allow users to run `gen 'your question'` as a command in their terminal.
- Support both local (project directory) and global (system-wide) installation.
- Ensure the CLI works cross-platform (macOS, Linux, Windows).
- Maintain all current features and configuration.

## 3. User Stories

- As a user, I want to type `gen 'what is today'` in my terminal and get an AI-generated answer, without extra prefixes.
- As a developer, I want to install the CLI globally (e.g., with `npm install -g`) and use it anywhere.
- As a project contributor, I want to run `gen` locally in the project without global install.

## 4. Functional Requirements

1. The system must provide an executable `gen` command that can be run from the terminal.
2. The command must accept a question and options as arguments (e.g., `gen --model chatgpt 'question'`).
3. The command must work both as a local script (e.g., via `npx gen ...` or `./bin/gen ...`) and as a global CLI (after `npm install -g`).
4. The command must use the same configuration and API key as the current implementation.
5. The command must display answers and errors in the terminal as before.
6. The command must provide a `--help` flag for usage instructions.
7. The command must not require `npm run` or `ts-node` for normal use.
8. The command must be cross-platform (work on macOS, Linux, and Windows).
9. The command should avoid naming conflicts or provide guidance if `gen` is already taken.

## 5. Non-Goals (Out of Scope)

- The CLI will not provide a GUI or web interface.
- The CLI will not support installation via package managers other than npm/yarn (initially).
- The CLI will not manage multiple API keys per model (unless extended in the future).

## 6. Design Considerations (Optional)

- Use a Node.js shebang (`#!/usr/bin/env node`) for the CLI entry point.
- Add a `bin` field in `package.json` to map the `gen` command to the CLI script.
- Ensure the CLI is executable after `npm install -g` and via `npx`.
- Provide clear error messages if the command is not found or if there are conflicts.

## 7. Technical Considerations (Optional)

- The CLI entry point should be in `bin/gen` or `src/gen.ts` compiled to `dist/gen.js`.
- Use `ts-node` for local development, but compile to JavaScript for global use.
- Ensure the script has executable permissions (`chmod +x`).
- Test on all major platforms.

## 8. Success Metrics

- Users can run `gen 'question'` globally and locally without issues.
- High user satisfaction and adoption (measured by feedback or usage stats).
- No major platform-specific bugs or conflicts.

## 9. Open Questions

- Should the CLI warn or error if `gen` is already installed globally by another tool?
- Should we provide an alias (e.g., `ai-gen`) in case of conflicts?
- Should we publish to npm for easy global install?

---

**Assumptions:**
- The primary user is a developer or technical user comfortable with the terminal.
- The CLI will be published to npm for global install, but local use (via `npx` or `./bin/gen`) is also supported.
- The command will be informational only and will not execute any returned code.

**Next Steps:**
- Review and refine open questions and assumptions.
- Gather user feedback for further clarification and prioritization. 