export const APP_CONFIG = {
  APP_NAME: 'GymTrack',
  APP_DESCRIPTION: 'Gestión inteligente para tu gimnasio',
  VERSION: '1.0.0'
} as const;

export const USER_TYPES = {
  ADMIN: 'admin',
  MEMBER: 'member'
} as const;

export const SCREEN_TYPES = {
  WELCOME: 'welcome',
  LOGIN: 'login',
  REGISTER: 'register'
} as const;

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
} as const;