import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Usuario } from "@/redux/types"
import { updateUser, deleteUser, fetchUsuarios } from "@/redux/features/UsuarioSlice"

interface FormDialogProps {
	isOpen: boolean
	onClose: (params: boolean) => void
}

export const FormDialog: React.FC<FormDialogProps> = ({ isOpen, onClose }) => {
	const usuario = useSelector((state: RootState) => state.usuario.usuarioSelected)
	const [Nome, setNome] = useState(usuario.nome)
	const [Cpf, setCpf] = useState(usuario.cpf)
	const [Email, setEmail] = useState(usuario.email)
	const [Idade, setIdade] = useState(usuario.idade)
	const dispatch = useDispatch()

	const handleEnviar = async () => {
		const dados: Partial<Usuario> = {
			// Usando Partial<Usuario> para permitir que você atualize apenas os campos necessários
			cpf: Cpf,
			email: Email,
			idade: Idade,
			nome: Nome,
			id: usuario.id
		}
		try {
			await dispatch(updateUser({ id: usuario.id, userData: dados }) as any)
		} catch (error) {
			console.log(error)
		}
		onClose(false)
	}

	const handleDeletar = async () => {
		try {
			await dispatch(deleteUser(usuario.id) as any)
			await dispatch(fetchUsuarios() as any)
		} catch (error) {
			console.log(error)
		}
		onClose(false)
	}

	useEffect(() => {
		setNome(usuario.nome)
		setCpf(usuario.cpf)
		setEmail(usuario.email)
		setIdade(usuario.idade)
	}, [usuario])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px] bg-claro text-lilas">
				<DialogHeader>
					<DialogTitle>Editar Perfil</DialogTitle>
					<DialogDescription>Edite e depois clique em enviar.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="nome" className="text-right">
							Nome
						</Label>
						<Input id="nome" value={Nome} className="col-span-3" onChange={(e) => setNome(e.target.value)} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="idade" className="text-right">
							Idade
						</Label>
						<Input id="idade" value={Idade} type="text" pattern="[0-9]*" className="col-span-3" onChange={(e) => setIdade(Number(e.target.value))} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							E-mail
						</Label>
						<Input id="email" value={Email} type="email" pattern="[0-9]*" className="col-span-3" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="cpf" className="text-right">
							Cpf
						</Label>
						<Input id="cpf" value={Cpf} type="text" pattern="[0-9]*" className="col-span-3" onChange={(e) => setCpf(e.target.value)} />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" className="bg-red-700" onClick={handleDeletar}>
						Deletar
					</Button>
					<Button type="submit" className="bg-lilas" onClick={handleEnviar}>
						Enviar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
