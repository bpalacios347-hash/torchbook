---
name: firebase-deploy
description: Skill para compilar, verificar y desplegar automáticamente las actualizaciones de Torchbook a Firebase Hosting (torchbook-750da) usando el CLI de Firebase.
---

# Skill de Despliegue Automático a Firebase Hosting

Esta skill describe el procedimiento estándar para verificar y publicar cambios o actualizaciones de la aplicación Torchbook en Firebase Hosting.

## Proyecto y URLs de Destino
- **ID de Proyecto**: `torchbook-750da`
- **URL Principal**: `https://torchbook-750da.web.app`
- **URL Secundaria**: `https://torchbook-750da.firebaseapp.com`

---

## Pasos para Desplegar Actualizaciones

### 1. Verificación Pre-Despliegue
Antes de publicar, asegura que los siguientes archivos clave existan en la raíz del proyecto:
- `index.html` (con referencias a Firebase SDK y metadatos SEO)
- `css/styles.css`
- `js/app.js`
- `firebase.json`
- `.firebaserc`
- `sitemap.xml` y `robots.txt`

### 2. Comando de Despliegue
Para publicar la versión más reciente en vivo hacia Firebase Hosting, ejecuta el siguiente comando en PowerShell / CMD desde la raíz del proyecto:

```powershell
npx.cmd --yes firebase-tools deploy --only hosting
```

### 3. Confirmación del Despliegue
Verifica que la salida de la consola devuelva:
```
✔ Deploy complete!
Hosting URL: https://torchbook-750da.web.app
```
Y notifica al usuario con el enlace activo a la aplicación.
