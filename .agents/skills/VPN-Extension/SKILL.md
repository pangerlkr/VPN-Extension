```markdown
# VPN-Extension Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and conventions used in the VPN-Extension JavaScript codebase. You'll learn how to structure files, write imports and exports, and follow the project's coding and commit conventions. It also covers how to write and organize tests, ensuring consistency and maintainability across the project.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `vpnManager.js`, `userSettings.js`

### Import Style
- Use **relative imports** for all modules.
  - Example:
    ```javascript
    import { connectVPN } from './vpnManager';
    ```

### Export Style
- Use **named exports** only.
  - Example:
    ```javascript
    // vpnManager.js
    export function connectVPN() { ... }
    export function disconnectVPN() { ... }
    ```

### Commit Messages
- Freeform style (no strict prefixes)
- Average length: ~42 characters
  - Example: `Add support for new VPN protocol`

## Workflows

### Adding a New Feature
**Trigger:** When you need to implement a new feature.
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Implement the feature using named exports.
3. Import the new module using a relative path where needed.
4. Write or update corresponding test files (`*.test.js`).
5. Commit changes with a clear, concise message.

### Fixing a Bug
**Trigger:** When you need to fix a bug in the codebase.
**Command:** `/fix-bug`

1. Locate the relevant file(s) using camelCase naming.
2. Apply the fix, ensuring you use named exports and relative imports.
3. Update or add test cases in the appropriate `*.test.js` file.
4. Commit with a descriptive message about the fix.

### Writing Tests
**Trigger:** When adding or updating tests for any module.
**Command:** `/write-test`

1. Create or update a test file matching the pattern `*.test.js`.
2. Write test cases for each exported function.
3. Use the project's preferred (unknown) test framework syntax.
4. Run tests to ensure correctness.

## Testing Patterns

- Test files use the pattern: `*.test.js`
- Each exported function should have corresponding test cases.
- The specific test framework is unknown; follow existing test file examples for structure and assertions.

Example:
```javascript
// vpnManager.test.js
import { connectVPN } from './vpnManager';

test('connectVPN establishes a connection', () => {
  // test implementation
});
```

## Commands
| Command      | Purpose                                      |
|--------------|----------------------------------------------|
| /add-feature | Start the process of adding a new feature    |
| /fix-bug     | Guide for fixing a bug                       |
| /write-test  | Steps for writing or updating tests          |
```
