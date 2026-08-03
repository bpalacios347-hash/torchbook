---
name: vercel-deploy
description: Skill para preparar, verificar y desplegar automáticamente las actualizaciones de Torchbook a Vercel a través de GitHub.
---

# Skill de Despliegue Automático a Vercel vía GitHub

Esta skill describe el procedimiento estándar para verificar y publicar cambios de Torchbook en Vercel mediante integración continua con GitHub.

## Flujo de Integración Continua (CI/CD)
- **Repositorio**: GitHub (`Torchbook`)
- **Plataforma de Hosting**: Vercel (`https://vercel.com`)

---

## Pasos para Desplegar Actualizaciones

### 1. Verificación de Archivos
Asegurar que existan en la raíz:
- `index.html`
- `css/styles.css`
- `js/app.js`
- `vercel.json`
- `.gitignore`

### 2. Publicación de Cambios a GitHub
Para publicar cambios hacia GitHub (lo que dispara el despliegue automático en Vercel):

```powershell
git add .
git commit -m "Actualización de Torchbook"
git push origin main
```

Vercel detectará el commit en `main` y desplegará la versión actualizada en vivo en pocos segundos.
