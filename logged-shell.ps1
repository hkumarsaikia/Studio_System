# ===== Studio_System Logged Terminal =====

$projectPath = "C:\Users\hkuma\Node.js_Animation\21st_Century\Studio_System"
$logPath = Join-Path $projectPath "engineering.log"

Set-Location $projectPath

Write-Host ""
Write-Host "===============================" -ForegroundColor Cyan
Write-Host " Engineering Logging ACTIVE " -ForegroundColor Green
Write-Host " Log File: $logPath" -ForegroundColor Yellow
Write-Host "===============================" -ForegroundColor Cyan
Write-Host ""

Start-Transcript -Path $logPath -Append