import { useEffect, useState } from "react";
import Modelo from "./components/Modelo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import {
  fetchUsuarios,
  setUsuarioSelected,
} from "./redux/features/UsuarioSlice";
import { Usuario } from "./redux/types";
import { CardUsuario } from "./components/Card";
import { FormDialog } from "./components/FormDialog";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [DialogIsOpen, setDialogIsOpen] = useState(false);
  const dispatch = useDispatch();
  const usuarios = useSelector((state: RootState) => state.usuario.usuarios);
  const status = useSelector((state: RootState) => state.usuario.status);

  const handleClickCard = (usuario: Usuario) => {
    setDialogIsOpen(true);
    dispatch(setUsuarioSelected(usuario));
  };

  const handleCloseDialog = () => {
    setDialogIsOpen(false);
    dispatch(
      setUsuarioSelected({
        id: "",
        nome: "",
        email: "",
        cpf: "",
        idade: 0,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchUsuarios() as any);
  }, []);
  

  return (
    <Modelo>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 justify-center items-center">
        <FormDialog isOpen={DialogIsOpen} onClose={handleCloseDialog} />
        {usuarios?.map((usuario, index) => (
          <CardUsuario
            key={index}
            usuario={usuario}
            onClick={() => handleClickCard(usuario)}
          />
        ))}
      </div>
    </Modelo>
  );
}

export default App;
