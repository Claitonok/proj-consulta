import { ResponseDaApi, UsuarioAdmin } from "../types/dados";


//const API_URL = "http://localhost:8080/api/users";  //My Localhost

const API_URL = "https://api-finder-production-2c5d.up.railway.app/api/users"; // Railway Deployment

// Recriando a credencial de forma segura
const auth = Buffer.from(`${process.env.NEXT_PUBLIC_SYSTEM_USER}:${process.env.NEXT_PUBLIC_SYSTEM_PASS}`).toString('base64');

// 1. Função para buscar usuários admin
export async function getUsuarios(): Promise<ResponseDaApi> {

    const response = await fetch(`${API_URL}/list`, {
        method: "GET",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }
    return response.json();
}

// 2. Função para criar usuário admin
export async function createUsuario(usuarioAdmin: UsuarioAdmin): Promise<UsuarioAdmin> {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioAdmin)
    });

    if (!response.ok) {
        throw new Error("Erro ao criar usuário");
    }
    return response.json();
}

// 3. Função para deletar usuário admin
export async function deleteUsuario(id: String): Promise<void> {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
    }

    return response.json();
}

// 🔥 Função para login do usuário
export async function loginUsuario(email: string, senha: string) {

    // usuario@padrao.com
    // 123456

    const response = await fetch(`${API_URL}/authenticate/${email}/${senha}`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Credenciais inválidas");
    }

    return response.json();
}

// 🔥 Função para enviar codigo por email de recuperação!!
export async function RecoverEmail(email: string) {

    // usuario@padrao.com
    // 123456
    
    // 🔍 Buscar usuário pelo email no banco
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error("Email não encontrado");
    }

    return response.json();
}

// 🔥 Função para resetar senha usando o token
export async function AuthRecover(resetToken: string, senha: string) {

    // 🔍 Buscar usuário pelo token no banco
    // verificar se existe e se não expirou
    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: {
            // 2. Passa o cabeçalho de autorização básico
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetToken, senha })
    });

    if (!response.ok) {
        throw new Error("Token inválido");
    }

    return response.json();
}
