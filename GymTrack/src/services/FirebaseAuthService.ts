import { 
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  updateEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { getFirebaseErrorMessage, isFirebaseAuthError } from '../utils/firebaseErrors';

/**
 * Servicio extendido para funcionalidades adicionales de Firebase Auth
 * Separado del AuthService principal para mantener la separación de responsabilidades
 */
export class FirebaseAuthService {
  private static instance: FirebaseAuthService;

  public static getInstance(): FirebaseAuthService {
    if (!FirebaseAuthService.instance) {
      FirebaseAuthService.instance = new FirebaseAuthService();
    }
    return FirebaseAuthService.instance;
  }

  /**
   * Maneja errores de Firebase y los convierte a mensajes amigables
   */
  private handleAuthError(error: unknown): never {
    if (isFirebaseAuthError(error)) {
      throw new Error(getFirebaseErrorMessage(error));
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Ocurrió un error inesperado');
  }

  /**
   * Envía un email para restablecer la contraseña
   */
  public async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/login', // URL de retorno después del reset
        handleCodeInApp: false
      });
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Confirma el restablecimiento de contraseña con el código recibido
   */
  public async confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    try {
      await confirmPasswordReset(auth, code, newPassword);
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Verifica si un código de restablecimiento de contraseña es válido
   */
  public async verifyPasswordResetCode(code: string): Promise<string> {
    try {
      return await verifyPasswordResetCode(auth, code);
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Actualiza la contraseña del usuario actual
   */
  public async updateUserPassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error('No hay usuario autenticado');
      }

      // Re-autenticar al usuario antes de cambiar la contraseña
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Actualizar la contraseña
      await updatePassword(user, newPassword);
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Actualiza el email del usuario actual
   */
  public async updateUserEmail(newEmail: string, password: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error('No hay usuario autenticado');
      }

      // Re-autenticar al usuario antes de cambiar el email
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // Actualizar el email
      await updateEmail(user, newEmail);
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Envía un email de verificación al usuario actual
   */
  public async sendEmailVerification(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      await sendEmailVerification(user, {
        url: window.location.origin + '/dashboard', // URL de retorno después de verificar
        handleCodeInApp: false
      });
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Elimina la cuenta del usuario actual
   */
  public async deleteAccount(password: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error('No hay usuario autenticado');
      }

      // Re-autenticar al usuario antes de eliminar la cuenta
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // Eliminar la cuenta
      await deleteUser(user);
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Verifica si el email del usuario actual está verificado
   */
  public get isEmailVerified(): boolean {
    return auth.currentUser?.emailVerified ?? false;
  }

  /**
   * Obtiene información del proveedor de autenticación del usuario
   */
  public getUserProviders(): string[] {
    const user = auth.currentUser;
    if (!user) return [];
    
    return user.providerData.map(provider => provider.providerId);
  }
}