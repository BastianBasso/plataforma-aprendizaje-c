# Compila docs/frontend.tex a PDF (requiere MiKTeX o TeX Live con pdflatex en PATH)
# Uso:
#   PowerShell: .\compile_pdf.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$tex = Join-Path $PSScriptRoot 'frontend.tex'

if (-not (Test-Path $tex)) {
  throw "No existe: $tex"
}

if (-not (Get-Command pdflatex -ErrorAction SilentlyContinue)) {
  throw "No se encontró 'pdflatex' en PATH. Instala MiKTeX o TeX Live."
}

Push-Location $PSScriptRoot
try {
  pdflatex -interaction=nonstopmode -halt-on-error frontend.tex | Out-String
  pdflatex -interaction=nonstopmode -halt-on-error frontend.tex | Out-String
  Write-Host "OK: generado frontend.pdf en $PSScriptRoot"
} finally {
  Pop-Location
}
