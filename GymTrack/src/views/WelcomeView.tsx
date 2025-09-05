import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dumbbell } from 'lucide-react';

interface WelcomeViewProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function WelcomeView({ onLoginClick, onRegisterClick }: WelcomeViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Dumbbell className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">GymTrack</CardTitle>
          <CardDescription>
            Gestión inteligente para tu gimnasio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={onLoginClick}
            className="w-full h-12"
          >
            Iniciar Sesión
          </Button>
          <Button 
            onClick={onRegisterClick}
            variant="outline" 
            className="w-full h-12"
          >
            Crear Cuenta
          </Button>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            Para administradores y socios
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}