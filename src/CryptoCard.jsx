function CryptoCard({ nome, simbolo, preco, variacao, imagem }) {
  const variacaoPositiva = variacao > 0

  return (
    <div className="crypto-card">
      <img src={imagem} alt={nome} />
      <div className="crypto-info">
        <h2>{nome}</h2>
        <span className="simbolo">{simbolo.toUpperCase()}</span>
      </div>
      <div className="crypto-preco">
        <p className="preco">${preco.toLocaleString()}</p>
        <p className={variacaoPositiva ? "variacao-positiva" : "variacao-negativa"}>
          {variacaoPositiva ? "▲" : "▼"} {Math.abs(variacao).toFixed(2)}%
        </p>
      </div>
    </div>
  )
}

export default CryptoCard