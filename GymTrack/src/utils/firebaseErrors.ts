import { AuthError } from 'firebase/auth';

// Mapeo de códigos de error de Firebase a mensajes en español
export const getFirebaseErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No se encontró una cuenta con este email';
    
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con este email';
    
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    
    case 'auth/invalid-email':
      return 'El formato del email no es válido';
    
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada';
    
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Intenta más tarde';
    
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet';
    
    case 'auth/invalid-credential':
      return 'Las credenciales proporcionadas no son válidas';
    
    case 'auth/user-token-expired':
      return 'Tu sesión ha expirado. Inicia sesión nuevamente';
    
    case 'auth/requires-recent-login':
      return 'Esta operación requiere autenticación reciente';
    
    case 'auth/popup-closed-by-user':
      return 'Proceso de autenticación cancelado';
    
    case 'auth/cancelled-popup-request':
      return 'Solicitud cancelada por el usuario';
    
    case 'auth/popup-blocked':
      return 'Popup bloqueado por el navegador';
    
    case 'auth/missing-password':
      return 'La contraseña es requerida';
    
    case 'auth/missing-email':
      return 'El email es requerido';
    
    default:
      console.error('Firebase Auth Error:', error.code, error.message);
      return 'Ocurrió un error inesperado. Intenta nuevamente';
  }
};

// Validador para verificar si un error es de Firebase Auth
export const isFirebaseAuthError = (error: unknown): error is AuthError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string' &&
    (error as { code: string }).code.startsWith('auth/')
  );
};