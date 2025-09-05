# Configuración de Firebase para GymTrack

Esta guía te ayudará a configurar Firebase Authentication en tu proyecto GymTrack.

## 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ej: "gymtrack-app")
4. Configura Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

## 2. Configurar Authentication

1. En la consola de Firebase, ve a **Authentication**
2. Haz clic en **"Comenzar"**
3. Ve a la pestaña **"Sign-in method"**
4. Habilita **"Correo electrónico/contraseña"**
5. (Opcional) Habilita **"Enlace de correo electrónico (sin contraseña)"**

## 3. Registrar tu Aplicación Web

1. En la página principal del proyecto, haz clic en el ícono **Web** (`</>`)
2. Registra tu app con un nickname (ej: "gymtrack-web")
3. (Opcional) Configura Firebase Hosting
4. Copia la configuración que se muestra

## 4. Configurar tu Aplicación

### Opción A: Configuración Directa

Reemplaza los valores en `/src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyExample...",
  authDomain: "gymtrack-app.firebaseapp.com",
  projectId: "gymtrack-app",
  storageBucket: "gymtrack-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};
```

### Opción B: Variables de Entorno (Recomendado)

1. Crea un archivo `.env` en la raíz del proyecto:

```bash
VITE_FIREBASE_API_KEY=AIzaSyExample...
VITE_FIREBASE_AUTH_DOMAIN=gymtrack-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gymtrack-app
VITE_FIREBASE_STORAGE_BUCKET=gymtrack-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456789
```

2. Actualiza `/src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 5. Configurar Dominios Autorizados

1. En Firebase Console, ve a **Authentication > Settings**
2. En **"Dominios autorizados"**, agrega:
   - `localhost` (para desarrollo)
   - Tu dominio de producción

## 6. Configurar Plantillas de Email (Opcional)

1. Ve a **Authentication > Templates**
2. Personaliza las plantillas para:
   - Verificación de correo electrónico
   - Restablecimiento de contraseña
   - Cambio de dirección de correo electrónico

### Ejemplo de plantilla personalizada:

**Asunto**: Bienvenido a GymTrack - Verifica tu cuenta

**Cuerpo**:
```html
<h2>¡Bienvenido a GymTrack!</h2>
<p>Hola %%DISPLAY_NAME%%,</p>
<p>Gracias por registrarte en GymTrack. Para completar tu registro, por favor verifica tu dirección de correo electrónico.</p>
<p><a href="%%EMAIL_ACTION_URL%%">Verificar Email</a></p>
<p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
<p>¡Gracias!<br>El equipo de GymTrack</p>
```

## 7. Desarrollo Local con Emulador (Opcional)

Para un entorno de desarrollo más controlado:

### Instalar Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### Configurar Emulador
```bash
firebase init emulators
```

Selecciona:
- ✅ Authentication Emulator

### Ejecutar Emulador
```bash
firebase emulators:start
```

### Configurar en tu app
El emulador se conecta automáticamente cuando `NODE_ENV === 'development'`.

## 8. Reglas de Seguridad (Futuro)

Cuando agregues Firestore, configura estas reglas básicas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Solo admins pueden acceder a datos de administración
    match /gyms/{gymId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }
  }
}
```

## 9. Pruebas

### Crear Usuarios de Prueba

1. Ve a **Authentication > Users**
2. Haz clic en **"Agregar usuario"**
3. Crea usuarios de prueba:
   - `admin@gymtrack.com` - Administrador
   - `socio@gymtrack.com` - Socio

### Probar Funcionalidades

1. **Registro**: Crea una nueva cuenta
2. **Login**: Inicia sesión con credenciales existentes
3. **Logout**: Cierra sesión
4. **Reset Password**: Prueba la recuperación de contraseña
5. **Email Verification**: Verifica el flujo de verificación

## 10. Monitoreo y Analytics

### Habilitar Analytics
1. Ve a **Analytics > Dashboard**
2. Configura eventos personalizados:
   - `login_success`
   - `registration_success`
   - `password_reset_request`

### Configurar Crashlytics (Futuro)
Para el tracking de errores en producción.

## 11. Límites y Cuotas

Firebase Authentication tiene límites gratuitos:
- **Usuarios**: Ilimitados
- **Autenticaciones**: 50,000/mes
- **Verificaciones telefónicas**: 10,000/mes

Para aplicaciones en crecimiento, considera el plan Blaze (pago por uso).

## 12. Backup y Exportación

1. Ve a **Authentication > Users**
2. Usa **"Exportar usuarios"** para backup
3. Configura backups automáticos en el plan Blaze

## 13. Troubleshooting

### Errores Comunes

**"Firebase: Error (auth/configuration-not-found)"**
- Verifica que la configuración en `firebase.ts` sea correcta

**"Firebase: Error (auth/unauthorized-domain)"**
- Agrega tu dominio a los dominios autorizados

**"Firebase: Error (auth/quota-exceeded)"**
- Has alcanzado el límite de autenticaciones del día

### Debugging

```typescript
// Activar logs de Firebase en desarrollo
import { getAuth, connectAuthEmulator } from 'firebase/auth';

if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Auth Debug Mode Enabled');
}
```

## 14. Próximos Pasos

Una vez configurado Firebase Auth:

1. ✅ **Autenticación funcionando**
2. 🔄 **Agregar Firestore para datos**
3. 🔄 **Implementar Cloud Functions**
4. 🔄 **Configurar Storage para imágenes**
5. 🔄 **Setup de notificaciones push**