import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Pagina from "../templates/Pagina.jsx";
import FormCadMensagem from "./formulario/FormCadMensagem.jsx";
import TabelaMensagens from "./tabelas/TabelaMensagens.jsx";

export default function TelaBatePapo(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mensagemParaEdicao, setMensagemParaEdicao] = useState({
        codigo: '0',
        descricao: ''
      });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    <FormCadMensagem exibirFormulario={setExibirFormulario}
                        mensagemParaEdicao={mensagemParaEdicao}
                        setMensagemParaEdicao={setMensagemParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                }
            </Pagina>
        </Container>
    )
}
