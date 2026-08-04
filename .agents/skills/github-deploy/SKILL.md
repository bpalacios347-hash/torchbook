---
name: github-deploy
description: Skill para verificar, guardar (git commit) y desplegar automáticamente las mejoras y actualizaciones de Torchbook a su repositorio en GitHub (bpalacios347-hash/torchbook).
---

# Skill de Despliegue y Mejoras Continuas en GitHub para Torchbook

Esta skill define el procedimiento estándar para aplicar mejoras al sitio Torchbook, verificar la integridad de la aplicación y desplegar automáticamente las actualizaciones hacia el repositorio en GitHub (`https://github.com/bpalacios347-hash/torchbook.git`).

## Repositorio y Configuración
- **Repositorio GitHub**: `https://github.com/bpalacios347-hash/torchbook.git`
- **Rama principal**: `main`

---

## Flujo de Trabajo Estándar

### 1. Verificación Previa
Antes de desplegar cualquier mejora, verificar la estructura del proyecto y el estado actual con:
```powershell
git status
```
Asegurar que los componentes principales (`index.html`, `css/`, `js/`, `data/`) estén en orden.

### 2. Confirmación de Cambios (Git Commit)
Tras realizar mejoras en la interfaz, funcionalidad o datos:
1. Incluir los cambios preparados para commit:
   ```powershell
   git add .
   ```
2. Registrar el commit con un mensaje claro y descriptivo en español:
   ```powershell
   git commit -m "<resumen claro de la mejora o corrección>"
   ```

### 3. Publicación y Despliegue (Git Push)
Sincronizar y publicar las mejoras hacia GitHub:
```powershell
git pull origin main --rebase
git push origin main
```

### 4. Verificación Post-Despliegue
- Confirmar la correcta ejecución de `git push`.
- Informar al usuario sobre los cambios integrados y confirmados en el repositorio remoto.
