module.exports.executarConsulta = (conexao, tabelas) => {
    tabelas.forEach(tabela => {
        const query = `SELECT * FROM ${tabela}`
        conexao.query(query, (err, res) => {
            if (err) throw new Error(`Erro ao executar a query ${query}`)
        })
    })
}

function inserirRegistros(conexao, registros, tabela) {
    
}