# FocusBoard Frontend

✨ Aplicación web de productividad personal que permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas diarias.

## 🚀 Tecnologías

- [React](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Context API para manejo de autenticación
- Fetch API con JWT para consumo del backend

## 🔐 Funcionalidades actuales

- Registro con nombre completo, email y contraseña
- Inicio de sesión con persistencia en localStorage
- Navbar dinámico (según si el usuario está logueado)
- Logout y redirección segura
- Validaciones visuales en formularios

## 🛠️ Configuración local

### 1. Clonar el repo:
   ```bash
   git clone https://github.com/GastiKopp/Focusboard-frontend.git
   cd focusboard-frontend
   ```
### 2. Instalar dependencias:
    ```bash
    npm install
    ```
### 3. Crear archivo .env en la raíz:
   ```bash
   VITE_API_URL=http://localhost:4000
   ```
### 4. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Asegurate de tener el backend corriendo en http://localhost:4000

## 📂 Estructura
```bash
src/
├── components/     # Navbar, etc.
├── context/        # AuthContext con login y logout
├── pages/          # Login, Register, Dashboard
├── services/       # authService para llamadas HTTP
```
## ✍️ Autor

Gastón Kopplin - 
github.com/GastiKopp

