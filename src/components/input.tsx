import React, { useState } from 'react'
import { Input } from './ui/input'
import { useDispatch } from 'react-redux'
import { fetchUsuarios, fetchUsuariosBySearch } from '@/redux/features/UsuarioSlice'
import { isMobile } from 'react-device-detect'

const InputUsuario: React.FC = () => {
	const [query, setQuery] = useState<string>('')

	const dispatch = useDispatch()

	// Função para lidar com o evento de pesquisa
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		if(!!e.target.value){
			dispatch(fetchUsuariosBySearch(e.target.value) as any)
		}else{
			dispatch(fetchUsuarios() as any)
		}
	}

	// Função para lidar com o evento de pressionar tecla
	/* const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Se a tecla pressionada for Enter, realizar a pesquisa
		if (e.key === 'Enter') {
			handleSearch()
		}
	} */

	return (
		<>
			{/* Container flexível para posicionar o campo de pesquisa */}
			<div className={`w-full flex ${isMobile ? 'justify-center' : 'justify-end'} pb-10`}>
				{/* Container relativo para posicionar o ícone de pesquisa */}
				<div className="relative w-80">
					{/* Ícone de pesquisa SVG absoluto dentro do container relativo */}
					<svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-escuro left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					{/* Componente de entrada de texto para a pesquisa */}
					<Input type="text" placeholder="Search" value={query} onChange={handleSearch} className="pl-12 pr-4 rounded-full" />
				</div>
			</div>
		</>
	)
}

export default InputUsuario
