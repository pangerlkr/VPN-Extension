# Contributing to VeilRoute Proxy

Thank you for considering contributing to VeilRoute Proxy. This document outlines the process for contributing to this project and the standards we expect contributors to follow.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Critical Files - Do Not Modify](#critical-files---do-not-modify)
- [Contribution Types](#contribution-types)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation Requirements](#documentation-requirements)
- [Issue Reporting](#issue-reporting)
- [Commit Message Guidelines](#commit-message-guidelines)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and collaborative environment. We expect all contributors to:

- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

Violations may result in removal from the project.

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18.x or later (for backend development)
- Chromium-based browser (Chrome 116+ or Edge 116+)
- Git 2.x or later
- Text editor with EditorConfig support
- Basic understanding of Chrome Extension Manifest V3

### Environment Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/VPN-Extension.git
   cd VPN-Extension
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/pangerlkr/VPN-Extension.git
   ```

4. Load the extension in Chrome:
   - Navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `src/` directory

5. Create a new branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Workflow

### Standard Workflow

1. **Sync with upstream** before starting work:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Make your changes** in a feature branch

3. **Test locally** by reloading the extension in `chrome://extensions`

4. **Commit** with descriptive messages following our guidelines

5. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** against the `main` branch

### Branch Naming Conventions

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements
- `chore/description` - Maintenance tasks

---

## Critical Files - Do Not Modify

The following files are core to the extension's security and stability. **DO NOT modify these files** unless explicitly approved by a maintainer:

### Extension Core

```
src/manifest.json            # Extension manifest - version, permissions, CSP
src/service-worker.js        # Background script - proxy control, state management
src/regions.js               # Region definitions and default state
```

**Rationale**: These files control:
- Chrome Extension permissions and security boundaries
- Proxy configuration and authentication flow
- State management and persistence
- Region endpoint definitions

Unauthorized changes can:
- Break browser proxy functionality
- Introduce security vulnerabilities
- Cause state corruption across updates
- Violate Chrome Web Store policies

### Acceptable Changes to Core Files

If you believe a change to these files is necessary:

1. Open an issue describing the problem and proposed solution
2. Wait for maintainer approval before proceeding
3. Include comprehensive tests and documentation
4. Expect rigorous code review

### Files Open for Contribution

The following are safe to modify:

```
src/popup.html               # Popup UI
src/popup.js                 # Popup logic
src/options.html             # Settings page UI
src/options.js               # Settings logic
src/styles.css               # Shared styles
docs/*                       # All documentation
backend-api/*                # Backend specifications
```

---

## Contribution Types

### Bug Fixes

1. Search existing issues to avoid duplicates
2. Create a new issue if none exists
3. Reference the issue number in your PR
4. Include steps to reproduce the bug
5. Describe your fix and why it works

### Features

1. Open an issue describing the feature before writing code
2. Wait for maintainer feedback
3. Ensure the feature aligns with project goals
4. Update documentation to reflect new functionality

### Documentation

1. Fix typos, improve clarity, add examples
2. Keep language professional and technical
3. Avoid emojis or excessive formatting
4. Use tables and statistics where appropriate

### UI/UX Improvements

1. Maintain consistency with existing design
2. Test across different screen sizes
3. Avoid adding external dependencies
4. Include before/after screenshots

---

## Pull Request Process

### Before Submitting

- [ ] Code follows our coding standards
- [ ] All tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages follow guidelines
- [ ] No merge conflicts with main
- [ ] PR description is clear and detailed

### PR Template

When opening a PR, include:

```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Related Issues
Fixes #[issue number]

## Testing
[Describe testing performed]

## Screenshots (if UI changes)
[Before/After screenshots]

## Checklist
- [ ] Code follows project standards
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes
```

### Review Process

1. Maintainers will review within 3-5 business days
2. Address all review comments
3. Push updates to the same branch
4. Re-request review after updates
5. PR will be merged once approved

---

## Coding Standards

### JavaScript Style

- Use ES6+ syntax (const, let, arrow functions, async/await)
- 2-space indentation
- Semicolons required
- Single quotes for strings
- Meaningful variable names (no single letters except loop counters)

### Code Organization

```javascript
// Good
const getStoredState = async () => {
  const stored = await chrome.storage.local.get(DEFAULT_STATE);
  return { ...DEFAULT_STATE, ...stored };
};

// Bad
function f() {
  var x = chrome.storage.local.get(DEFAULT_STATE)
  return x
}
```

### Error Handling

- Always handle promise rejections
- Use try/catch for async functions
- Provide meaningful error messages
- Log errors to console for debugging

```javascript
// Good
try {
  await enableProxy(region);
} catch (error) {
  console.error("Failed to enable proxy:", error);
  await disableProxy();
  throw new Error(`Proxy connection failed: ${error.message}`);
}
```

### Comments

- Use comments to explain "why", not "what"
- Document complex algorithms
- Add JSDoc for exported functions

```javascript
/**
 * Validates proxy endpoint configuration.
 * Rejects demo endpoints, localhost, and invalid ports.
 * 
 * @param {Object} region - Region object with endpoint property
 * @returns {boolean} True if endpoint is production-ready
 */
const isProductionEndpoint = (region) => {
  const host = region?.endpoint?.host || "";
  return (
    host &&
    !host.endsWith(".example.com") &&
    host !== "localhost" &&
    host !== "127.0.0.1"
  );
};
```

---

## Testing Requirements

### Manual Testing

Before submitting a PR:

1. **Load extension** in clean Chrome profile
2. **Test all modified features** end-to-end
3. **Check browser console** for errors
4. **Test edge cases** (no network, invalid input, etc.)
5. **Verify state persistence** across browser restart

### Test Scenarios

For proxy-related changes:

- Connect to valid proxy
- Connect to invalid proxy (should fail gracefully)
- Switch regions while connected
- Disconnect and reconnect
- Check IP before and after connection
- Test WebRTC leak protection
- Verify auth credentials are handled securely

### Performance Testing

- Extension should load in under 100ms
- Popup should open in under 200ms
- Proxy enable/disable should complete in under 500ms
- No memory leaks during extended use

---

## Documentation Requirements

### Code Documentation

- Add JSDoc comments for all exported functions
- Document function parameters and return values
- Explain complex logic with inline comments

### User Documentation

When adding features:

1. Update README.md with usage instructions
2. Add entry to FAQ if needed
3. Update relevant docs/*.md files
4. Include examples where appropriate

### API Documentation

For backend changes:

1. Update backend-api/openapi.yaml
2. Document request/response formats
3. Include example payloads
4. Note breaking changes

---

## Issue Reporting

### Bug Reports

Include:

- VeilRoute version (from manifest.json)
- Chrome/Edge version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or error messages
- Network/console logs if applicable

### Feature Requests

Include:

- Clear description of the feature
- Use cases and benefits
- Potential implementation approach
- Alternatives considered
- Impact on existing functionality

---

## Commit Message Guidelines

Follow the conventional commits specification:

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(popup): add connection quality indicator

Adds real-time latency display in popup UI showing connection
quality to the selected region.

Closes #42
```

```
fix(service-worker): prevent race condition on rapid reconnect

Added reconnect attempt counter and 500ms debounce to prevent
multiple simultaneous connection attempts.

Fixes #58
```

```
docs(readme): update Chrome version requirement to 116+
```

---

## Questions?

If you have questions about contributing:

1. Check existing documentation in docs/
2. Search closed issues for similar questions
3. Open a new issue with the "question" label
4. Join discussions in open issues

---

**By contributing to VeilRoute Proxy, you agree that your contributions will be licensed under the MIT License.**
