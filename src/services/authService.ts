export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  full_name: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function login({
  email,
  password,
}: LoginData): Promise<{
  token: string;
  user: { id: number; email: string; full_name: string };
}> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al iniciar sesión");
  }

  return res.json();
}

export async function register({
  full_name,
  email,
  password,
}: RegisterData): Promise<{
  token: string;
  user: { id: number; email: string; full_name: string };
}> {
const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al registrarse");
  }

  return res.json();
}
