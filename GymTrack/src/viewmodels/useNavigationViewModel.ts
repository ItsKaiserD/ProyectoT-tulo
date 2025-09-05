import { useState } from 'react';
import { AuthScreenType, NavigationState } from '../models/Navigation';

export function useNavigationViewModel() {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentScreen: 'welcome'
  });

  const navigateToScreen = (screen: AuthScreenType) => {
    setNavigationState({ currentScreen: screen });
  };

  const goToWelcome = () => navigateToScreen('welcome');
  const goToLogin = () => navigateToScreen('login');
  const goToRegister = () => navigateToScreen('register');

  return {
    navigationState,
    navigateToScreen,
    goToWelcome,
    goToLogin,
    goToRegister
  };
}