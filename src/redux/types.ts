export interface Usuario {
    id: string
    nome: string
    idade: number
    cpf: string
    email: string
}

export interface UsuarioEnvio {
    nome: string
    idade: number
    cpf: string
    email: string
}

export interface UsuarioState {
  usuarios: Usuario[] | null
  status: "idle" | "loading" | "succeeded" | "failed"
  usuarioSelected: Usuario
}

export interface FetchUsuarioParams {
	usuario: Usuario[]
	count: number
}

