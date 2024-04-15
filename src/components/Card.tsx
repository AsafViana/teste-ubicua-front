import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Usuario } from '@/redux/types'


interface CardProps {
	usuario: Usuario
}

interface CardWithBaseProps extends React.HTMLAttributes<HTMLDivElement>, CardProps {}

export function CardUsuario(props: CardWithBaseProps) {
  const { usuario, ...rest } = props;
  const [isClicked, setIsClicked] = useState(false);
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  function formatarCPF(cpf: string) {
    // Remove caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, "");

    // Adiciona os separadores no formato XXX.XXX.XXX-XX
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return cpf;
  }

  return (
    <Card
      className={`pt-7 flex flex-col bg-gradient-to-tr from-slate-200 overflow-hidden shadow-lg transform ${
        isClicked ? "scale-95" : "scale-100"
      } transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...rest}
    >
      <CardHeader>
        <CardTitle
          style={{ whiteSpace: "break-spaces" }}
          className={`font-bold`}
        >
          {usuario?.nome && typeof usuario.nome === "string"
            ? usuario?.nome
                .replace(" ", "")
                .split(" ")
                .map((l: string) => l[0].toUpperCase() + l.substr(1))
                .join(" ")
            : "Nome Indefinido"}
        </CardTitle>
        <CardDescription className="font-bold">
          Idade: <span className="font-normal">{usuario?.idade}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="font-bold">
          E-mail: <span className="font-normal">{usuario?.email}</span>
        </div>
        <div className="font-bold">
          CPF: <span className="font-normal">{formatarCPF(usuario?.cpf)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

