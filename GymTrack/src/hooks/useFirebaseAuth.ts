import { useState } from 'react';
import { FirebaseAuthService } from '../services/FirebaseAuthService';

/**
 * Hook personalizado para funcionalidades extendidas de Firebase Auth
 */
export function useFirebaseAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const firebaseAuthService = FirebaseAuthService.getInstance();

  const clearError = () => setError(null);

  const sendPasswordReset = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.sendPasswordReset(email);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al enviar email de recuperación');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.updateUserPassword(currentPassword, newPassword);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al actualizar contraseña');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmail = async (newEmail: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.updateUserEmail(newEmail, password);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al actualizar email');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailVerification = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.sendEmailVerification();
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al enviar verificación');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.deleteAccount(password);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al eliminar cuenta');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Estado
    isLoading,
    error,
    isEmailVerified: firebaseAuthService.isEmailVerified,
    userProviders: firebaseAuthService.getUserProviders(),
    
    // Acciones
    sendPasswordReset,
    updatePassword,
    updateEmail,
    sendEmailVerification,
    deleteAccount,
    clearError
  };
}