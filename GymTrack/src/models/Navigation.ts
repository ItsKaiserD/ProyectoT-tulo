export type AuthScreenType = 'welcome' | 'login' | 'register';

export interface NavigationState {
  currentScreen: AuthScreenType;
}