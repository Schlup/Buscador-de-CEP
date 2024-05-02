import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import InputMask from "react-input-mask";
import "./styles.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const verificarTecla = (evento) => {
    if (evento.key === "Enter") {
      handleSearch()
    }
  }

  async function handleSearch() {
    //89074-001

    if (input === "") {
      alert("Preencha com algum CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      if(response.data.erro===true) {
        alert("CEP Inexistente...")
      }
      setInput("");
    } catch {
      alert("Erro");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <InputMask 
          maskChar={null}
          placeholder="Digite seu CEP..."
          value={input}
          mask={"99999-999"}
          onKeyPress={verificarTecla}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="resultadoPesquisa">
          <h2>CEP: {cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Local: {cep.localidade} - {cep.uf}</span>
          <span>IBGE: {cep.ibge}</span>
          <span>GIA: {cep.gia}</span>
          <span>DDD: {cep.ddd}</span>
        </main>
      )}
    </div>
  );
}

export default App;
