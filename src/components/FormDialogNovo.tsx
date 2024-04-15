import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UsuarioEnvio } from "@/redux/types";
import { createUser, fetchUsuarios } from "@/redux/features/UsuarioSlice";
import { Separator } from "./ui/separator";

interface FormDialogProps {
  isOpen: boolean;
  onClose: (params: boolean) => void;
}

export const FormDialogNovo: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [usuarios, setUsuarios] = useState([
    { nome: "", cpf: "", email: "", idade: 0 },
  ]);
  const dispatch = useDispatch();

  const handleAddUser = () => {
    setUsuarios([...usuarios, { nome: "", cpf: "", email: "", idade: 0 }]);
  };

  const handleEnviar = async () => {
    try {
       await dispatch(createUser(usuarios) as any)
        await dispatch(fetchUsuarios() as any)
        console.log("Usuários registrados com sucesso");
        setUsuarios([{ nome: "", cpf: "", email: "", idade: 0 }]);
    } catch (error) {
        console.log("Erro ao registrar usuários:", error);
    }
    onClose(false);
};

  const handleChange = (
    index: number,
    field: keyof UsuarioEnvio,
    value: string | number
  ) => {
    const updatedUsuarios = [...usuarios];
    updatedUsuarios[index][field] = value;
    setUsuarios(updatedUsuarios);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-claro text-lilas overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Registrar Usuários</DialogTitle>
          <DialogDescription>
            Preencha os campos e clique em Enviar para registrar os usuários.
          </DialogDescription>
        </DialogHeader>
        {usuarios.map((usuario, index) => (
          <div key={index} className="grid gap-4">
            <Separator className="my-4 bg-slate-500" />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`nome-${index}`} className="text-right">
                Nome
              </Label>
              <Input
                id={`nome-${index}`}
                value={usuario.nome}
                className="col-span-3"
                onChange={(e) => handleChange(index, "nome", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`idade-${index}`} className="text-right">
                Idade
              </Label>
              <Input
                id={`idade-${index}`}
                value={usuario.idade}
                type="text"
                pattern="[0-9]*"
                className="col-span-3"
                onChange={(e) =>
                  handleChange(index, "idade", Number(e.target.value))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`email-${index}`} className="text-right">
                E-mail
              </Label>
              <Input
                id={`email-${index}`}
                value={usuario.email}
                type="email"
                pattern="[0-9]*"
                className="col-span-3"
                onChange={(e) => handleChange(index, "email", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`cpf-${index}`} className="text-right">
                CPF
              </Label>
              <Input
                id={`cpf-${index}`}
                value={usuario.cpf}
                type="text"
                pattern="[0-9]*"
                className="col-span-3"
                onChange={(e) => handleChange(index, "cpf", e.target.value)}
              />
            </div>
          </div>
        ))}
        <DialogFooter>
          <Button
            type="button"
            className="bg-lilas mr-4"
            onClick={handleAddUser}
          >
            Adicionar Usuário
          </Button>
          <Button type="button" className="bg-lilas" onClick={handleEnviar}>
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
