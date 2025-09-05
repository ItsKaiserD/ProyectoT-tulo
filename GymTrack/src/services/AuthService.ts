import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser} from 'firebase/auth';
import { auth } from '../config/firebase';
import { LoginCredentials, RegisterData, User } from '../models/User';
import { getFirebaseErrorMessage, isFirebaseAuthError } from '../utils/firebaseErrors';

export class AuthService {
  private static instance: AuthService;
  private currentUserPromise: Promise<User | null> | null = null;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Convierte un usuario de Firebase a nuestro modelo de User
   */
  private firebaseUserToUser(firebaseUser: FirebaseUser, userType?: string): User {
    // Intentamos obtener el userType del displayName o usamos un valor por defecto
    let resolvedUserType: 'admin' | 'member' = 'member';
    
    if (userType) {
      resolvedUserType = userType as 'admin' | 'member';
    } else if (firebaseUser.displayName) {
      // Si el displayName contiene información del tipo de usuario
      const displayNameParts = firebaseUser.displayName.split('|');
      if (displayNameParts.length > 1) {
        resolvedUserType = displayNameParts[1] as 'admin' | 'member';
      }
    }

    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName?.split('|')[0] || 'Usuario',
      userType: resolvedUserType,
      createdAt: firebaseUser.metadata.creationTime 
        ? new Date(firebaseUser.metadata.creationTime) 
        : new Date(),
      updatedAt: firebaseUser.metadata.lastSignInTime 
        ? new Date(firebaseUser.metadata.lastSignInTime) 
        : new Date()
    };
  }

  /**
   * Maneja errores de Firebase y los convierte a mensajes amigables
   */
  private handleAuthError(error: unknown): never {
    if (isFirebaseAuthError(error)) {
      throw new Error(getFirebaseErrorMessage(error));
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Ocurrió un error inesperado');
  }

  /**
   * Inicia sesión con email y contraseña
   */
  public async login(credentials: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      );
      
      return this.firebaseUserToUser(userCredential.user, credentials.userType);
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Registra un nuevo usuario
   */
  public async register(data: RegisterData): Promise<User> {
    try {
      // Validación local
      if (data.password !== data.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (data.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Actualizar perfil con nombre y tipo de usuario
      // Guardamos el tipo de usuario en el displayName como nombre|tipo
      const displayName = `${data.name}|${data.userType}`;
      await updateProfile(userCredential.user, {
        displayName: displayName
      });

      return this.firebaseUserToUser(userCredential.user, data.userType);
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Cierra la sesión del usuario actual
   */
  public async logout(): Promise<void> {
    try {
      await signOut(auth);
      this.currentUserPromise = null;
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  /**
   * Obtiene el usuario actualmente autenticado
   */
  public async getCurrentUser(): Promise<User | null> {
    // Si ya tenemos una promesa en curso, la retornamos
    if (this.currentUserPromise) {
      return this.currentUserPromise;
    }

    // Creamos una nueva promesa para obtener el usuario actual
    this.currentUserPromise = new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe(); // Nos desuscribimos inmediatamente
        
        if (firebaseUser) {
          const user = this.firebaseUserToUser(firebaseUser);
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });

    return this.currentUserPromise;
  }

  /**
   * Observa cambios en el estado de autenticación
   */
  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = this.firebaseUserToUser(firebaseUser);
        callback(user);
      } else {
        callback(null);
      }
    });
  }

  /**
   * Verifica si hay un usuario autenticado actualmente
   */
  public get isAuthenticated(): boolean {
    return !!auth.currentUser;
  }

  /**
   * Obtiene el usuario de Firebase actual (sin conversión)
   */
  public get firebaseCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }
}