import { useAuthViewModel } from '../viewmodels/useAuthViewModel';
import { useNavigationViewModel } from '../viewmodels/useNavigationViewModel';
import { WelcomeView } from '../views/WelcomeView';
import { LoginView } from '../views/LoginView';
import { RegisterView } from '../views/RegisterView';

export function AuthContainer() {
  const { authState, login, register, clearError } = useAuthViewModel();
  const { navigationState, goToWelcome, goToLogin, goToRegister } = useNavigationViewModel();

  // Si el usuario está autenticado, aquí se navegaría a la pantalla principal
  if (authState.isAuthenticated && authState.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl mb-4">¡Bienvenido, {authState.user.name}!</h1>
          <p className="text-muted-foreground mb-4">
            Tipo de usuario: {authState.user.userType === 'admin' ? 'Administrador' : 'Socio'}
          </p>
          <p className="text-sm text-muted-foreground">
           Aquí irá la pantalla principal de la aplicación
          </p>
        </div>
      </div>
    );
  }

  const handleError = () => {
    if (authState.error) {
      // Opcional: Auto-limpiar el error después de un tiempo
      setTimeout(() => {
        clearError();
      }, 5000);
    }
  };

  // Ejecutar manejo de errores cuando hay error
  if (authState.error) {
    handleError();
  }

  // Renderizar la vista correspondiente según el estado de navegación
  switch (navigationState.currentScreen) {
    case 'welcome':
      return (
        <WelcomeView
          onLoginClick={goToLogin}
          onRegisterClick={goToRegister}
        />
      );

    case 'login':
      return (
        <LoginView
          onBack={goToWelcome}
          onLogin={login}
          onRegisterClick={goToRegister}
          isLoading={authState.isLoading}
          error={authState.error}
        />
      );

    case 'register':
      return (
        <RegisterView
          onBack={goToWelcome}
          onRegister={register}
          onLoginClick={goToLogin}
          isLoading={authState.isLoading}
          error={authState.error}
        />
      );

    default:
      return (
        <WelcomeView
          onLoginClick={goToLogin}
          onRegisterClick={goToRegister}
        />
      );
  }
}