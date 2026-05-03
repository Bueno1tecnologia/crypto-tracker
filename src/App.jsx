import { useState, useEffect } from 'react'
import CryptoCard from './CryptoCard'

function App() {
  const [moedas, setMoedas] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('')

  useEffect(() => {
    buscarMoedas()

    const intervalo = setInterval(() => {
      buscarMoedas(false)
    }, 10000)

    return () => clearInterval(intervalo)
  }, [])

  async function buscarMoedas(mostrarLoading = true) {
    if (mostrarLoading) setLoading(true)
    setErro('')

    try {
      const resposta = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
      )
      const dados = await resposta.json()
      setMoedas(dados)
      setUltimaAtualizacao(new Date().toLocaleTimeString())
    } catch {
      setErro('Erro ao buscar dados. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const moedasFiltradas = moedas.filter(moeda =>
    moeda.name.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="container">
      <div className="header">
        <h1>Crypto Tracker</h1>
        <div className="header-info">
          {ultimaAtualizacao && (
            <span className="ultima-atualizacao">
              Atualizado às {ultimaAtualizacao}
            </span>
          )}
          <button
            className="btn-refresh"
            onClick={() => buscarMoedas()}
            disabled={loading}
          >
            {loading ? 'Atualizando...' : '↻ Atualizar'}
          </button>
        </div>
      </div>

      <input
        className="campo-busca"
        type="text"
        placeholder="Buscar moeda..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />

      {loading && moedas.length === 0 && (
        <div className="loading">
          <p>Carregando moedas...</p>
        </div>
      )}

      {erro && (
        <div className="erro-container">
          <p className="erro">{erro}</p>
          <button className="btn-refresh" onClick={() => buscarMoedas()}>
            Tentar novamente
          </button>
        </div>
      )}

      <div className="lista-moedas">
        {moedasFiltradas.map(moeda => (
          <CryptoCard
            key={moeda.id}
            nome={moeda.name}
            simbolo={moeda.symbol}
            preco={moeda.current_price}
            variacao={moeda.price_change_percentage_24h}
            imagem={moeda.image}
          />
        ))}
      </div>
    </div>
  )
}

export default App