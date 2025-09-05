import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  connectAuthEmulator,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';

// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Inicializar Firebase
let app: FirebaseApp;
let auth: Auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Configurar persistencia local
  setPersistence(auth, browserLocalPersistence);
  
  // Solo conectar al emulador en desarrollo y si no está ya conectado
  // Verificamos si estamos en desarrollo sin usar process.env
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1'));
  
  if (isDevelopment) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    } catch (error) {
      // El emulador ya está conectado o no está disponible
      console.log('Firebase Auth Emulator connection skipped');
    }
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { auth, app };
export default app;