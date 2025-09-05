import { useState, useEffect, useCallback } from 'react';
import { AuthState, LoginCredentials, RegisterData, User } from '../models/User';
import { AuthService } from '../services/AuthService';

export function useAuthViewModel() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Iniciamos con loading true para el estado inicial
    error: null
  });

  const authService = AuthService.getInstance();

  // Función para actualizar el estado de autenticación
  const updateAuthState = useCallback((user: User | null) => {
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null
    });
  }, []);

  useEffect(() => {
    // Suscribirse a cambios en el estado de autenticación
    const unsubscribe = authService.onAuthStateChanged((user) => {
      updateAuthState(user);
    });

    // Verificar usuario actual al montar el componente
    const checkInitialUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        updateAuthState(user);
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Error al verificar autenticación'
        });
      }
    };

    checkInitialUser();

    // Cleanup: desuscribirse cuando el componente se desmonte
    return () => {
      unsubscribe();
    };
  }, [updateAuthState, authService]);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.login(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error en el login'
      }));
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.register(data);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error en el registro'
      }));
      return false;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error en el logout'
      }));
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    authState,
    login,
    register,
    logout,
    clearError
  };
}