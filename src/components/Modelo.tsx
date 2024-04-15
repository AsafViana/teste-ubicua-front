import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import './Modelo.css'
import Input from './input'
import { FormDialogNovo } from './FormDialogNovo'
import { Button } from './ui/button'

interface ModeloProps {
	children: React.ReactNode
}

const Modelo: React.FC<ModeloProps> = ({ children }) => {
	const [IsOpenModal, setIsOpenModal] = useState(false)

	return (
		// Container principal da página
		<div className={`min-h-screen min-w-full flex justify-center items-end flex-col ${isMobile ? 'px-5' : 'px-40 '} py-20 bg-lilas`}>
				<FormDialogNovo isOpen={IsOpenModal} onClose={setIsOpenModal}/>

				<div className={`flex w-full ${isMobile ? 'flex-col space-y-5' : ''}`}>
				<Button className='bg-lilasClaro' onClick={() => setIsOpenModal(true)}>
					<span className='text-claro'>Novo Usuario</span>
				</Button>

				<Input/>
				</div>
				<div className={`bg-claro container ${isMobile ? 'px-4' : ''} py-10 rounded-3xl overflow-auto`}>
					{children}
				</div>
		</div>
	)
}

export default Modelo
