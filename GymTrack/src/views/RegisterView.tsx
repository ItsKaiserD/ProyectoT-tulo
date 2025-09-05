import * as React from "react";
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { ArrowLeft, Users, UserCheck, Loader2 } from 'lucide-react';
import { UserType, RegisterData } from '../models/User';

interface RegisterViewProps {
  onBack: () => void;
  onRegister: (data: RegisterData) => Promise<boolean>;
  onLoginClick: () => void;
  isLoading: boolean;
  error: string | null;
}

export function RegisterView({ onBack, onRegister, onLoginClick, isLoading, error }: RegisterViewProps) {
  const [userType, setUserType] = useState<UserType>('member');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onRegister({
      ...registerData,
      userType
    });
    
    if (success) {
      // El ViewModel manejará la navegación después del registro exitoso
      console.log('Registro exitoso');
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
            <CardTitle className="ml-2">Crear Cuenta</CardTitle>
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
                    <RadioGroupItem value="member" id="member-register" />
                    <Label htmlFor="member-register" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Socio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin-register" />
                    <Label htmlFor="admin-register" className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Administrador
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                  minLength={6}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto"
              onClick={onLoginClick}
              disabled={isLoading}
            >
              Inicia sesión aquí
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}