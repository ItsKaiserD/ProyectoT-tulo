import * as React from "react";
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { ArrowLeft, Users, UserCheck, Loader2 } from 'lucide-react';
import { UserType, LoginCredentials } from '../models/User';

interface LoginViewProps {
  onBack: () => void;
  onLogin: (credentials: LoginCredentials) => Promise<boolean>;
  onRegisterClick: () => void;
  isLoading: boolean;
  error: string | null;
}

export function LoginView({ onBack, onLogin, onRegisterClick, isLoading, error }: LoginViewProps) {
  const [userType, setUserType] = useState<UserType>('member');
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onLogin({
      ...loginData,
      userType
    });
    
    if (success) {
      // El ViewModel manejará la navegación después del login exitoso
      console.log('Login exitoso');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="ml-2">Iniciar Sesión</CardTitle>
          </div>
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Tipo de Usuario</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={(value) => setUserType(value as UserType)}
                  className="flex gap-6 mt-2"
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="member" id="member-login" />
                    <Label htmlFor="member-login" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Socio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin-login" />
                    <Label htmlFor="admin-login" className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Administrador
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto"
              onClick={onRegisterClick}
              disabled={isLoading}
            >
              Regístrate aquí
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}