# Documentación (PDF)

Este folder contiene la documentación del frontend en LaTeX.

## Archivos
- `frontend.tex`: documento principal
- `compile_pdf.ps1`: script para compilar a PDF en Windows

## Compilar a PDF (Windows)
1) Instala una distribución LaTeX:
   - MiKTeX (recomendado en Windows) o TeX Live
2) Cierra y vuelve a abrir VS Code/terminal para refrescar el PATH.
3) Desde PowerShell, en este directorio:

```powershell
.\compile_pdf.ps1
```

Salida esperada:
- `frontend.pdf`

## Compilar manualmente
```powershell
pdflatex -interaction=nonstopmode -halt-on-error frontend.tex
pdflatex -interaction=nonstopmode -halt-on-error frontend.tex
```
