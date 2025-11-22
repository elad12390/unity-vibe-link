# Publishing Guide

## NPM Package Publishing

### Prerequisites

1. **NPM Account**: Create one at https://www.npmjs.com/signup
2. **NPM Token**: Generate at https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token"
   - Select "Automation" type (for CI/CD) or "Publish" type
   - Copy the token

### Publishing Steps

#### 1. Login to NPM (One-time)

```bash
npm login
# Enter username, password, and email
```

Or with token:

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_NPM_TOKEN
```

#### 2. Build and Test

```bash
cd mcp-server
npm run build
npm run test:unit
```

#### 3. Publish to NPM

**First time (scoped package):**
```bash
cd mcp-server
npm publish --access public
```

**Subsequent updates:**
```bash
# Update version in package.json first
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes

npm publish
```

### Version 1.0.0-alpha.1 Checklist

- [x] Tests passing
- [x] Build successful
- [x] README.md created
- [x] .npmignore configured
- [x] package.json metadata complete
- [ ] NPM token configured
- [ ] Published to npm

### After Publishing

1. **Verify Installation:**
   ```bash
   npx @vibelink/mcp-server
   ```

2. **Update Main README:**
   Add installation instructions:
   ```bash
   npm install -g @vibelink/mcp-server
   ```

3. **Tag Git Release:**
   ```bash
   git tag v1.0.0-alpha.1
   git push --tags
   ```

4. **Create GitHub Release:**
   ```bash
   gh release create v1.0.0-alpha.1 \
     --title "VibeLink v1.0.0-alpha.1" \
     --notes "Initial alpha release of VibeLink Unity Agentic Bridge"
   ```

## Unity Package Publishing

### Option 1: Unity Package Manager (Git URL)

Users can install directly from GitHub:

```
https://github.com/elad12390/unity-vibe-link.git?path=/unity-package
```

### Option 2: OpenUPM (Recommended for Production)

1. **Fork OpenUPM:** https://github.com/openupm/openupm
2. **Add Package:**
   Create `data/packages/com.vibelink.unity.yml`:
   ```yaml
   name: com.vibelink.unity
   displayName: VibeLink - Unity Agentic Bridge
   description: Enable AI agents to interact with Unity Editor
   repoUrl: 'https://github.com/elad12390/unity-vibe-link'
   parentRepoUrl: null
   licenseSpdxId: MIT
   licenseName: MIT License
   topics:
     - AI
     - Agent
     - MCP
     - Development
   hunter: YOUR_GITHUB_USERNAME
   ```
3. **Submit PR** to OpenUPM

### Option 3: Unity Asset Store

For wider distribution (requires more setup):
1. Create Publisher account
2. Prepare submission package
3. Submit for review

## Current Status

- ✅ GitHub: https://github.com/elad12390/unity-vibe-link
- ⏳ NPM: Pending token and publish
- ⏳ OpenUPM: Not submitted yet  
- ⏳ Unity Asset Store: Not submitted yet

## Next Steps

1. Get NPM token from user
2. Publish to npm: `@vibelink/mcp-server`
3. Test npm installation
4. Tag git release
5. Submit to OpenUPM (optional)
