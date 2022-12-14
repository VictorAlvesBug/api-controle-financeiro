# api-controle-financeiro

**Api em Node.js** desenvolvida em grupo para as disciplinas de **WebServices** 
e **Mobile Development** no MBA da **FIAP** (43SCJ).

**Persistência** local realizada em 
[**arquivo JSON**](https://github.com/VictorAlvesBug/api-controle-financeiro/blob/master/api/data/database.json).

**OpenAPI** (Swagger): http://localhost:3000/doc

## Integrantes do Grupo

<!-- - RM 344507 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/ali-tannouri-neto-12aaa6110/">Ali Tannouri Neto</a> -->
<!-- - RM 345321 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/pedrohrossi99/">Pedro Henrique Rossi</a> -->
- RM 344245 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/matheus-ciribeli/">Matheus Ciribeli </a>
- RM 345763 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/victor-alves-bugueno-122438144/">Victor Alves Bugueno</a>
- RM 344869 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/victor-dias-6b505275/">Victor Augusto Dias</a>

## Configurando a API

Realize o clone do 
[repositório da API](https://github.com/VictorAlvesBug/api-controle-financeiro)
executando o seguinte comando no **cmd**, dentro da pasta desejada:

```bach
git clone https://github.com/VictorAlvesBug/api-controle-financeiro.git
```

No **Visual Studio Code**, abra o projeto recém-clonado.

Abra o *cmd* ou o *terminal* da IDE na pasta do projeto e execute o seguinte 
comando para carregar as **dependências do projeto**:

```bash
npm i
```

Após carregadas as dependências do projeto, execute o comando abaixo para 
**rodar a API**:

```bash
npm run start
```

Caso seja necessário gerar novamente o **OpenApi** (Swagger), execute o comando 
abaixo:

```bash
npm run swagger
```