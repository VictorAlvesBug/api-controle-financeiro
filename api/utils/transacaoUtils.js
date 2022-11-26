const databaseUtils = require('./databaseUtils')();

module.exports = () => {
  const transacaoUtils = {};

  const tiposTransacao = {
    R: 'Receita',
    D: 'Despesa'
  };

  transacaoUtils.listar = ({ incluirDesativados, nome, mes, ano, userId } = {}) => {
    if (!nome && !mes && !ano) {
      incluirDesativados = Boolean(
        incluirDesativados?.toLowerCase() === 'true'
      );

        const dados = databaseUtils.listar('transacoes', incluirDesativados, userId);

      return {
        sucesso: true,
        dados: dados
      };
    }

    const callbackFiltro = (transacao) => {
      const dataTransacao = new Date(`${transacao.dataTransacao} 00:00:00.000`);
      const mesTransacao = dataTransacao.getMonth() + 1;
      const anoTransacao = dataTransacao.getFullYear();

      mes = Number(mes);
      ano = Number(ano);

      return (
        (!nome || transacao.nome.toLowerCase().includes(nome.toLowerCase()))
        && ((!mes && !ano) || (mes === mesTransacao && ano === anoTransacao))
      );
    };

    const dados = databaseUtils.listarPorFiltro({
      nomeRecurso: 'transacoes',
      callback: callbackFiltro,
      userId
    });

    return {
      sucesso: true,
      dados: dados
    };
  };

  transacaoUtils.cadastrar = (transacao, userId) => {
    transacao.codigo = databaseUtils.gerarId();
    transacao.dataHoraCadastro = databaseUtils.retornarDataAtual();
    transacao.ativo = true;
    transacao.userId = userId;

    const validacao = databaseUtils.validarCadastro('transacoes', transacao);

    if (!validacao.ehValido) {
      return {
        sucesso: false,
        mensagem: validacao.listaErros.join(';'),
      };
    }

    const retorno = databaseUtils.cadastrar('transacoes', transacao);

    if (!retorno) {
      return {
        sucesso: false,
        mensagem: 'Ocorreu um erro ao cadastrar transação',
      };
    }

    let strTipoTransacao = tiposTransacao[transacao.tipo] ?? 'Transação';

    return {
      sucesso: true,
      mensagem: `${strTipoTransacao} cadastrada com sucesso`,
      dados: retorno,
    };
  };

  transacaoUtils.retornar = (codigo, userId) => {
    const retorno = databaseUtils.retornar('transacoes', codigo, userId);

    if (retorno) {
      return {
        sucesso: true,
        dados: retorno,
      };
    }

    return {
      sucesso: false,
      mensagem: 'Erro ao encontrar transação',
    };
  };

  transacaoUtils.editar = (codigo, transacao, userId) => {
    const transacaoDatabase = transacaoUtils.retornar(codigo, userId);

    if (!transacaoDatabase.sucesso) {
      return {
        sucesso: false,
        mensagem: 'Erro ao encontrar transação',
      };
    }

    transacao = { ...transacaoDatabase.dados[0], ...transacao };

    transacao.email = transacao.email?.toLowerCase();

    const validacao = databaseUtils.validarEdicao('transacoes', transacao);

    if (!validacao.ehValido) {
      return {
        sucesso: false,
        mensagem: validacao.listaErros.join(';'),
      };
    }

    const retorno = databaseUtils.editar('transacoes', codigo, transacao);

    let strTipoTransacao = tiposTransacao[retorno.tipo] ?? 'Transação';

    if (retorno) {
      return {
        sucesso: true,
        mensagem: `${strTipoTransacao} editada com sucesso`,
        dados: retorno,
      };
    }

    return {
      sucesso: false,
      mensagem: 'Erro ao editar transação',
    };
  };

  transacaoUtils.deletar = (codigo, userId) => {
    const sucesso = databaseUtils.deletar('transacoes', codigo, userId);

    return {
      sucesso: sucesso,
      mensagem: sucesso
        ? 'Transação deletada com sucesso'
        : 'Erro ao deletar transação',
    };
  };

  return transacaoUtils;
};
