import { ResponseDaApi, UsuarioAdmin } from "../types/dados";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-finder-production-2c5d.up.railway.app/api/users";

// Gera a credencial de forma compatível com Node.js e Navegador
const user = process.env.NEXT_PUBLIC_SYSTEM_USER || "";
const pass = process.env.NEXT_PUBLIC_SYSTEM_PASS || "";
const auth = typeof window !== "undefined" 
  ? btoa(`${user}:${pass}`) 
  : Buffer.from(`${user}:${pass}`).toString("base64");

const headers = {
  "Authorization": `Basic ${auth}`,
  "Content-Type": "application/json"
};

// 1. Buscar usuários admin
export async function getUsuarios(): Promise<ResponseDaApi> {
    const response = await fetch(`${API_URL}/list`, { method: "GET", headers });

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }
    return response.json();
}

// 2. Criar usuário admin
export async function createUsuario(usuarioAdmin: UsuarioAdmin): Promise<UsuarioAdmin> {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(usuarioAdmin)
    });

    if (!response.ok) {
        throw new Error("Erro ao criar usuário");
    }
    return response.json();
}

// 3. Deletar usuário admin
export async function deleteUsuario(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        headers
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
    }

    // Evita erro se o servidor retornar 204 No Content
    if (response.status !== 204) {
        return response.json();
    }
}

// 4. Login de usuário
export async function loginUsuario(email: string, senha: string) {
    const response = await fetch(`${API_URL}/authenticate/${encodeURIComponent(email)}/${encodeURIComponent(senha)}`, {
        method: "POST",
        headers
    });

    if (!response.ok) {
        throw new Error("Credenciais inválidas");
    }

    return response.json();
}

// 5. Enviar código de recuperação
export async function RecoverEmail(email: string) {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error("Email não encontrado");
    }

    return response.json();
}

// 6. Resetar senha usando token
export async function AuthRecover(resetToken: string, senha: string) {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers,
        body: JSON.stringify({ resetToken, senha })
    });

    if (!response.ok) {
        throw new Error("Token inválido");
    }

    return response.json();
}