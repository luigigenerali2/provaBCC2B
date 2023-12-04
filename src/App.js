import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroUsuario from "./telas/TelaCadastroUsuario";
import TelaBatePapo from "./telas/TelaBatePapo";
import Menu from "./templates/Menu";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/usuario" element={<TelaCadastroUsuario/>} />
            <Route path="/mensagem" element={<TelaBatePapo />} />
            <Route path="/" element={<Menu/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
