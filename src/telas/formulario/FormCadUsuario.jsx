import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import { adicionarUsuario } from "../../redux/usuarioReducer";

export default function FormCadUsuario(props) {
    const usuarioVazio = {
        id: '0',
        nickname: '',
        urlAvatar: '',
        dataIngresso: '',
        mensagens: ''
    }

    const [usuario, setUsuario] = useState(usuarioVazio);
    const [formValidado, setFormValidado] = useState(false);

    const { estado, mensagem } = useSelector((state) => state.usuario);

    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setUsuario({ ...usuario, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            dispatch(adicionarUsuario(usuario));
            setUsuario(usuarioVazio);
            setFormValidado(false);
        } else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>
            </div>,
            { toastId: estado });
    } else if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Processando a requisição...</p>
            </div>,
            { toastId: estado });
    } else {
        toast.dismiss();
        return (
            <Container>
                <h2>Cadastro de usuário</h2>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Nickname:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="josé"
                                        id="nickname"
                                        name="nickname"
                                        value={usuario.nickname}
                                        onChange={manipularMudancas}
                                    />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o nickname</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="URL do Avatar:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a URL do Avatar"
                                        id="urlAvatar"
                                        name="urlAvatar"
                                        value={usuario.urlAvatar}
                                        onChange={manipularMudancas}
                                        required
                                    />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a URL do Avatar</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} offset={5} className="d-flex justify-content-end">
                            <Button type="submit" variant={"primary"}>Cadastrar</Button>
                        </Col>
                        <Col md={6} offset={5}>
                            <Button type="button" variant={"secondary"} onClick={() => props.exibirFormulario(false)}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}