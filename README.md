## Programador Frontend (Angular)

# Instruções

    Esse teste é público. Todos os interessados que fizerem pull request receberão um feedback da equipe 
    Theòs Sistemas
    
    1. Faça um fork deste repositório;
    2. Crie uma branch com o seu nome.
    2. Adicione seu currículo na raiz do repositório.
    3. Envie-nos o PULL-REQUEST para que seja avaliado.
    
### O Teste

O teste consiste em implementar um formulário em angular para cadastro de profissão que irá se comunicar com uma API.
Os campos que compõe esse formulário são:

	Nome
	Sobrenome
	Email
	Sexo
	Data (Data do cadastro)
	Cidade
	Estado
	Área de formação
	Profissão

O desenvolvimento precisa contemplar as 4 operações de CRUD, ou seja, inserir, selecionar, alterar e excluir um registro. Sendo assim, 
os botões que precisamos nesse formulário são:

	Novo
	Alterar
	Excluir
	Buscar
	Salvar


### Algumas regras do formulário

* Campos Sexo, Estado, Cidade e Profissão devem ser um Select com as opções para escolha.
* De acordo com a escolha no campo Estado, alterne entre listas diferentes de cidade. (min 2 estados)
* Campos Nome, Sobrenome, Email, Área de Formação, Data e Profissão são obrigatórios
* Garantir que o campo E-mail receba apenas emails válidos.
* Ao editar, salvar ou excluir um registro, atualizar a lista de registros para que na tela de busca, os dados estejam atualizados conforme a ação tomada na tela anterior.
* Ao selecionar BUSCAR, o usuário terá acesso a uma tela de busca, onde poderá realizar suas buscas por PROFISSÃO ou NOME COMPLETO. Após realizar a busca, deverá ser possível selecionar um registro na lista, e devolve-lo para o formulario caso o usuário precise editar algum dos dados.
	
		Obs: Os dados do registro selecionado na tela de busca, deverá ficar em estado de "VISUALIZAÇÃO" até o 
		momento em que o usuário clicar em alterar. Só assim, ele poderá editar e salvar as alterações.


### Esperamos que:

* Utilize as boas praticas do html 5 e que seja fiel a ele.
* Siga todas as regras descritas a cima.
* Usando  o GULP ou GRUNT, minifique seu HTML, CSS e JS (obs: faça commit também dos arquivos não minificados)
* Valide os campos do formulário
* Certifique-se que a aplicação esteja rodando antes de nos enviar o pull-request


### Você pode:

* Utilizar qualquer framework CSS (Bootstrap, Material ...)
* Utilizar componentes do Bower ou NPM


### Ganhe pontos

* Deixando a aplicação responsiva.
* Utilizando SASS ou LESS.
* Utilizando interfaces (Typescript)
* Considerando que essa aplicação pode evoluir, crie um "base-component" para que possa ser herdado com seus métodos padrões.
* Adicionando um "loader" em cada interação para avisar o usuário que os dados estão sendo carregados ou atualizados.
* Utilize modal para a tela de BUSCA.


### Nos surpreenda

* Ao invés de consumir um arquivo .json local para manipulação dos dados, implemente uma API HTTP REST simples, em NodeJS e disponibilize os mesmos dados para consulta, porém via API.


### Algumas observações:

    1. Armazene seus arquivos .json dentro da pasta JSON criado dentro do projeto.
    2. A versão do Angular instalado é: 7.0

## Instruções para rodar o teste

# SQL SERVER

O script para criar o banco, criar tabela, popular tabela e criar procs está dentro da pasta "sqlserver/", dentro desse script contém instruções de como executa-lo.

# API

Está dentro da pasta "server/", instruções para rodar a api:

	1. Na pasta "api/services/database.ts", alterar a variável "config" para que a mesma tenha as informações do SqlServer onde o script do banco foi executado (user, password, server, port e instancename).
	2. Abrir o terminal dentro da pasta.
	3. Rodar o comando "npm i" para instalar os node_moules.
	4. Rodar o comando "npm run start" para inicializar a api.
	
# FRONT END

Está dentro da pasta "aplicacao-theos", instruções para rodar o frontend:

	1. Concluir as etapas do "SQL Server" e da "API".
	2. Abrir o terminal dentro da pasta.
	3. Rodar o comando "npm i" para instalar os node_moules.
	4. Rodar o comando "ng serve --aot" para inicializar o frontend.