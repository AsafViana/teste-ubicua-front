import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Usuario, UsuarioEnvio, UsuarioState } from '../types'

const URL = 'https://localhost:7268/'

export const fetchUsuarios = createAsyncThunk('usuario/fetchUsuarios', async () => {
	try {
		const response = await fetch(`${URL}api/usuarios`)
		const data: Usuario[] = await response.json()
		return data
	} catch (error) {
		throw new Error('Failed to fetch users')
	}
})

export const fetchUsuariosBySearch = createAsyncThunk('usuario/fetchUsuariosBySearch', async (nome: string) => {
	try {
		const response = await fetch(`${URL}api/usuarios/Search/?nome=${nome}`)

		if (!response.ok) {
			throw new Error('Failed to fetch users by search')
		}

		const data: Usuario[] = await response.json()
		return data
	} catch (error) {
		throw new Error('Failed to fetch users by search')
	}
})

export const createUser = createAsyncThunk('usuario/createUser', async (userData: Partial<UsuarioEnvio[]>) => {
	try {
		const response = await fetch(`${URL}api/usuarios/batch`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})

		if (!response.ok) {
			throw new Error('Failed to create user')
		}

	} catch (error) {
		throw new Error('Failed to create user')
	}
})

export const updateUser = createAsyncThunk('usuario/updateUser', async ({ id, userData }: { id: string; userData: Partial<Usuario> }) => {
	try {
		const response = await fetch(`${URL}api/usuarios/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify(userData),
		})

		if (!response.ok) {
			throw new Error('Failed to update user')
		}else{
			return true

		}
	} catch (error) {
		throw new Error('Failed to update user')
	}
})

export const deleteUser = createAsyncThunk('usuario/deleteUser', async (id: string) => {
	try {
		const response = await fetch(`https://localhost:7268/api/usuarios/${id}`, {
			method: 'DELETE',
		})

		if (!response.ok) {
			
			throw new Error('Failed to delete user')
		}

		// Não é necessário retornar dados se a exclusão for bem-sucedida
	} catch (error) {
		throw new Error('Failed to delete user')
	}
})

// Estado inicial
const initialState: UsuarioState = {
	usuarios: [],
	status: 'idle',
	usuarioSelected: {
		id: '',
		nome: '',
		email: '',
		cpf: '',
		idade: 0,
	}
}

// Slice de usuário
export const usuarioSlice = createSlice({
	name: 'usuario',
	initialState,
	reducers: {
		setUsuarioSelected(state, action: PayloadAction<Usuario>){
			state.usuarioSelected = action.payload
		}
	},
	extraReducers: (builder) => {
  builder
		.addCase(fetchUsuarios.pending, (state) => {
			state.status = 'loading'
		})
		.addCase(fetchUsuarios.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.usuarios = action.payload
		})
		.addCase(fetchUsuarios.rejected, (state) => {
			state.status = 'failed'
		})
		.addCase(fetchUsuariosBySearch.pending, (state) => {
			state.status = 'loading'
		})
		.addCase(fetchUsuariosBySearch.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.usuarios = action.payload
		})
		.addCase(fetchUsuariosBySearch.rejected, (state) => {
			state.status = 'failed'
		})
		.addCase(createUser.pending, (state) => {
			state.status = 'loading'
		})
		.addCase(createUser.fulfilled, (state) => {
			state.status = 'succeeded'
			
		})
		.addCase(createUser.rejected, (state) => {
			state.status = 'failed'
		})
		.addCase(updateUser.pending, (state) => {
			state.status = 'loading'
		})
		.addCase(updateUser.fulfilled, (state) => {
			state.status = 'succeeded'

		})
		.addCase(updateUser.rejected, (state) => {
			state.status = 'failed'
		})
		.addCase(deleteUser.pending, (state) => {
			state.status = 'loading'
		})
		.addCase(deleteUser.fulfilled, (state) => {
			state.status = 'succeeded'
			// Você pode atualizar o array de usuários aqui se necessário
		})
		.addCase(deleteUser.rejected, (state) => {
			state.status = 'failed'
		})
}
})


export const {setUsuarioSelected} = usuarioSlice.actions

export default usuarioSlice.reducer
