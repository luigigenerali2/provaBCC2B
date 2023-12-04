import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/usuario"/>
            <Route path="/mensagem"/>
            <Route path="/"/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
