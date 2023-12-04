import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import { useState } from "react";
import FormCadUsuario from "./formulario/FormCadUsuario";

export default function TelaCadastroUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [usuarioParaEdicao, setUsuarioParaEdicao] = useState({
        codigo: '0',
        descricao: ''
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    <FormCadUsuario exibirFormulario={setExibirFormulario}
                        usuarioParaEdicao={usuarioParaEdicao}
                        setUsuarioParaEdicao={setUsuarioParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                }
            </Pagina>
        </Container>
    )
}