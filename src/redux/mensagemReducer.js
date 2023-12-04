import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const urlBase = "https://backend-bcc-2-b.vercel.app/mensagem";

export const buscarMsgs = createAsyncThunk('buscarMsg', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            const msgsFormatadas = dados.listaMensagens.map(msg => {
                return {
                    id: msg.id,
                    dataHora: msg.dataHora,
                    lida: msg.lida,
                    mensagem: msg.mensagem,
                    usuario: {
                        id: msg.usuario.id,
                        nickname: msg.usuario.nickname,
                        urlAvatar: msg.usuario.urlAvatar,
                        dataIngresso: msg.usuario.dataIngresso,
                        mensagens: msg.usuario.mensagens
                    }
                };
            });

            return {
                status: dados.status,
                mensagem: "",
                listaMensagens: msgsFormatadas
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaMensagens: []
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar mensagem: " + erro.message,
            listaMensagens: []
        };
    }
});

export const incluirMsg = createAsyncThunk('incluirMsg', async ({ mensagem, usuarioId }) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mensagem,
                usuario: {
                    id: usuarioId
                }
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                msg: { id: dados.id, mensagem, lida: false, usuario: { id: usuarioId } },
                mensagem: dados.mensagem
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível cadastrar msg " + erro.message
        };
    }
});

export const atualizarMsg = createAsyncThunk('atualizarMsg', async ({ id, lida }) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lida
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                msg: { id, lida:true }
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível atualizar msg " + erro.message
        };
    }
});

export const excluirMsg = createAsyncThunk('excluirMsg', async (id) => {

    const obterMensagemPorId = async (id) => {
        const resposta = await fetch(`${urlBase}/${id}`, { method: "GET" });
        const dados = await resposta.json();
      
        if (dados.status) {
          return dados.mensagem;
        } else {
          throw new Error(dados.mensagem);
        }
      };
      
    try {
      const mensagem = await obterMensagemPorId(id);
      const tempoDecorrido = Date.now() - new Date(mensagem.dataHora).getTime();
  
      if (tempoDecorrido <= 5 * 60 * 1000) {
        const resposta = await fetch(urlBase, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id
          })
        });
  
        const dados = await resposta.json();
  
        if (dados.status) {
          return {
            status: dados.status,
            mensagem: dados.mensagem,
            msg: { id }
          };
        } else {
          return {
            status: dados.status,
            mensagem: dados.mensagem
          };
        }
      } else {
        return {
          status: false,
          mensagem: "Não é possível excluir mensagens com mais de 5 minutos."
        };
      }
    } catch (erro) {
      return {
        status: false,
        mensagem: "Não foi possível excluir mensagem " + erro.message
      };
    }
  });


const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    msgs: []
}

const msgSlice = createSlice({
    name: 'msg',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMsgs.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando msgs';
            })
            .addCase(buscarMsgs.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Mensagens recuperadas do backend!";
                    state.msgs = action.payload.listaMensagens;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.msgs = [];
                }
            })
            .addCase(buscarMsgs.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.msgs = [];
            })
            .addCase(incluirMsg.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(incluirMsg.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.msgs.push(action.payload.msg);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirMsg.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarMsg.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(atualizarMsg.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.msgs.findIndex((msg) => msg.id === action.payload.msg.id);
                    state.msgs[indice] = action.payload.msg;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarMsg.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirMsg.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(excluirMsg.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.msgs = state.msgs.filter((msg) => msg.id !== action.payload.msg.id);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(excluirMsg.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default msgSlice.reducer;
