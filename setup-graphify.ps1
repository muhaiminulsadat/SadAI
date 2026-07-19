# setup-graphify.ps1
# Automates token-saving graphify setup in new project.

# 1. Run integration
Write-Host "Installing antigravity integrations..." -ForegroundColor Cyan
graphify antigravity install

# 1.5 Install caveman skill
Write-Host "Installing caveman skill..." -ForegroundColor Cyan
npx skills add https://github.com/juliusbrussee/caveman --skill caveman

# 2. Write .graphifyignore
Write-Host "Creating .graphifyignore..." -ForegroundColor Cyan
$ignoreContent = @"
package.json
package-lock.json
pnpm-lock.yaml
yarn.lock
tsconfig.json
node_modules/
dist/
build/
"@
$ignoreContent | Out-File -FilePath .graphifyignore -Encoding utf8 -NoNewline

# 3. Configure AGENTS.md
Write-Host "Configuring AGENTS.md..." -ForegroundColor Cyan
$rules = @"
Always use:
- caveman ultra skill to reduce token cost.
- use graphify for token optimization.
- run 'graphify update .' after making edits to codebase to keep the graphify knowledge graph current.
- do not read the whole project in every new session; use graphify to query, locate, and read only relevant files to optimize token consumption.
"@

if (Test-Path AGENTS.md) {
    $existing = Get-Content AGENTS.md -Raw
    if ($existing -notmatch "graphify") {
        "`n" + $rules | Out-File -FilePath AGENTS.md -Append -Encoding utf8
    }
} else {
    $rules | Out-File -FilePath AGENTS.md -Encoding utf8
}

Write-Host "Setup finished. Run `/graphify .` in chat to build initial graph." -ForegroundColor Green
