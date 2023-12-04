import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { buscarMsgs, incluirMsg } from "../redux/mensagemReducer";
import { buscarUsuarios } from "../redux/usuarioReducer";
import TabelaMensagens from "./tabelas/TabelaMensagens.jsx";
import Pagina from "../../templates/Pagina";


const FormCadMensagem = ({ onEnviar, usuarios }) => {
  const dispatch = useDispatch();
  const { estado: estadoMsg, mensagem: mensagemMsg, msgs } = useSelector((state) => state.msg);
  const { estado: estadoUsuario, mensagem: mensagemUsuario } = useSelector((state) => state.usuario);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(buscarMsgs());
    dispatch(buscarUsuarios());
  }, [dispatch]);

  const handleEnviarMensagem = (mensagem) => {
    if (selectedUser) {
      dispatch(incluirMsg({ mensagem, usuarioId: selectedUser.id }));
    }
  };

  return (
    <Container>
      <Pagina>
        <h2>Tela de Bate Papo</h2>
        {estadoUsuario === 2 && <p>{mensagemUsuario}</p>}
        {estadoUsuario === 3 && <p className="text-danger">{mensagemUsuario}</p>}
        {estadoUsuario === 1 && (
          <>
            <Form>
              <Form.Group controlId="formUsuario">
                <Form.Label>Selecione um usuário</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}
                >
                  <option value="" disabled defaultValue>
                    Selecione um usuário
                  </option>

                  {usuarios && usuarios.map((usuario) => (
                    <option key={usuario.id} value={JSON.stringify(usuario)}>
                        {usuario.nickname}
                    </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Form>
            {estadoMsg === 2 && <p>{mensagemMsg}</p>}
            {estadoMsg === 3 && <p className="text-danger">{mensagemMsg}</p>}
            {estadoMsg === 1 && (
              <>
                <TabelaMensagens mensagens={msgs} />
                <FormCadMensagem onEnviar={handleEnviarMensagem} usuarios={usuarios} />
              </>
            )}
          </>
        )}
      </Pagina>
    </Container>
  );
};

export default FormCadMensagem;
