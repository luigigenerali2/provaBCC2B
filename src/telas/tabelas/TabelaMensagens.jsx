import React from "react";
import { Table } from "react-bootstrap";

const TabelaMensagens = ({ mensagens }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Data/Hora</th>
          <th>Lida</th>
          <th>Mensagem</th>
          <th>Usuário</th>
        </tr>
      </thead>
      <tbody>
        {mensagens.map((mensagem) => (
          <tr key={mensagem.id}>
            <td>{mensagem.id}</td>
            <td>{mensagem.dataHora}</td>
            <td>{mensagem.lida ? "Sim" : "Não"}</td>
            <td>{mensagem.mensagem}</td>
            <td>{mensagem.usuario.nickname}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaMensagens;