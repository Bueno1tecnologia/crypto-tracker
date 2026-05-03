import { useState, useEffect } from 'react'
import CryptoCard from './CryptoCard'

function App() {
  const [moedas, setMoedas] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    buscarMoedas()
  }, [])

  async function buscarMoedas() {
    try {
      const resposta = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
      )
      const dados = await resposta.json()
      setMoedas(dados)
      setLoading(false)
    } catch {
      setErro('Erro ao buscar dados. Tente novamente.')
      setLoading(false)
    }
  }

  const moedasFiltradas = moedas.filter(moeda =>
    moeda.name.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Crypto Tracker</h1>
      <input
        className="campo-busca"
        type="text"
        placeholder="Buscar moeda..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      {loading && <p>Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}
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