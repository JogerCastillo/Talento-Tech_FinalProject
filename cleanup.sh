#!/bin/bash
cd "C:\Users\casti\Documentos\Capacitaciones\TalentoTECH\Talento-Tech_FinalProject"
git status
git add -A
git status
git commit -m "refactor: Eliminar carpeta Material-apoyo-FProject innecesaria

- Eliminada carpeta de material de apoyo que contenía duplicados
- CSV funcional ya se encuentra en public/ y src/data/
- Mantiene el repositorio limpio y organizado"
git push origin feature/datos-csv
