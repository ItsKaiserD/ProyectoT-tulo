import { VALIDATION_RULES } from './constants';
import { LoginCredentials, RegisterData } from '../models/User';

export class ValidationHelper {
  static validateEmail(email: string): boolean {
    return VALIDATION_RULES.EMAIL_REGEX.test(email);
  }

  static validatePassword(password: string): boolean {
    return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;
  }

  static validateLoginCredentials(credentials: LoginCredentials): string[] {
    const errors: string[] = [];

    if (!credentials.email.trim()) {
      errors.push('El email es requerido');
    } else if (!this.validateEmail(credentials.email)) {
      errors.push('El email no tiene un formato válido');
    }

    if (!credentials.password.trim()) {
      errors.push('La contraseña es requerida');
    } else if (!this.validatePassword(credentials.password)) {
      errors.push(`La contraseña debe tener al menos ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caracteres`);
    }

    return errors;
  }

  static validateRegisterData(data: RegisterData): string[] {
    const errors: string[] = [];

    if (!data.name.trim()) {
      errors.push('El nombre es requerido');
    }

    if (!data.email.trim()) {
      errors.push('El email es requerido');
    } else if (!this.validateEmail(data.email)) {
      errors.push('El email no tiene un formato válido');
    }

    if (!data.password.trim()) {
      errors.push('La contraseña es requerida');
    } else if (!this.validatePassword(data.password)) {
      errors.push(`La contraseña debe tener al menos ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caracteres`);
    }

    if (!data.confirmPassword.trim()) {
      errors.push('La confirmación de contraseña es requerida');
    } else if (data.password !== data.confirmPassword) {
      errors.push('Las contraseñas no coinciden');
    }

    return errors;
  }
}