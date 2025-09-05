import { UserType, User } from '../models/User';

/**
 * Utilidades para el manejo de autenticación y usuarios
 */

/**
 * Valida si un email tiene formato válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si una contraseña cumple con los requisitos mínimos
 */
export const isValidPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return {
      valid: false,
      message: 'La contraseña debe tener al menos 6 caracteres'
    };
  }

  // Opcional: agregar más validaciones
  if (!/(?=.*[a-z])/.test(password)) {
    return {
      valid: false,
      message: 'La contraseña debe contener al menos una letra minúscula'
    };
  }

  if (!/(?=.*\d)/.test(password)) {
    return {
      valid: false,
      message: 'La contraseña debe contener al menos un número'
    };
  }

  return { valid: true };
};

/**
 * Valida si un nombre es válido
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Obtiene el saludo apropiado según el tipo de usuario
 */
export const getUserGreeting = (user: User): string => {
  const timeOfDay = new Date().getHours();
  let greeting = '';
  
  if (timeOfDay < 12) {
    greeting = 'Buenos días';
  } else if (timeOfDay < 18) {
    greeting = 'Buenas tardes';
  } else {
    greeting = 'Buenas noches';
  }

  const title = user.userType === 'admin' ? 'Administrador' : 'Socio';
  return `${greeting}, ${title} ${user.name}`;
};

/**
 * Obtiene el dashboard URL según el tipo de usuario
 */
export const getDashboardUrl = (userType: UserType): string => {
  switch (userType) {
    case 'admin':
      return '/admin/dashboard';
    case 'member':
      return '/member/dashboard';
    default:
      return '/dashboard';
  }
};

/**
 * Verifica si un usuario tiene permisos de administrador
 */
export const isAdmin = (user: User | null): boolean => {
  return user?.userType === 'admin';
};

/**
 * Verifica si un usuario es un socio
 */
export const isMember = (user: User | null): boolean => {
  return user?.userType === 'member';
};

/**
 * Formatea la fecha de última conexión
 */
export const formatLastLoginDate = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Hace unos minutos';
  } else if (diffInHours < 24) {
    return `Hace ${Math.floor(diffInHours)} horas`;
  } else if (diffInHours < 48) {
    return 'Ayer';
  } else {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
};

/**
 * Genera un displayName para Firebase que incluye el tipo de usuario
 */
export const createFirebaseDisplayName = (name: string, userType: UserType): string => {
  return `${name}|${userType}`;
};

/**
 * Extrae el nombre y tipo de usuario del displayName de Firebase
 */
export const parseFirebaseDisplayName = (displayName: string): { name: string; userType: UserType } => {
  const parts = displayName.split('|');
  
  return {
    name: parts[0] || 'Usuario',
    userType: (parts[1] as UserType) || 'member'
  };
};

/**
 * Sanitiza el input del usuario para prevenir XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>"/]/g, '') // Remover caracteres peligrosos
    .substring(0, 255); // Limitar longitud
};

/**
 * Genera un mensaje de error amigable para validaciones
 */
export const getValidationErrorMessage = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      if (!value) return 'El email es requerido';
      if (!isValidEmail(value)) return 'El formato del email no es válido';
      return null;
      
    case 'password':
      if (!value) return 'La contraseña es requerida';
      const passwordValidation = isValidPassword(value);
      return passwordValidation.valid ? null : passwordValidation.message || null;
      
    case 'name':
      if (!value) return 'El nombre es requerido';
      if (!isValidName(value)) return 'El nombre debe tener al menos 2 caracteres';
      return null;
      
    case 'confirmPassword':
      if (!value) return 'Confirma tu contraseña';
      return null;
      
    default:
      return null;
  }
};