--PRIMEIRO RODAR ESSA LINHA PARA CRIAR O BANCO:
CREATE DATABASE teste_angular_arthur_miksza;

--DEPOIS, RODAR AS PRÓXIMAS LINHAS
USE teste_angular_arthur_miksza;

CREATE TABLE usu_tb_usuario(
	id_usuario INT IDENTITY(1,1) NOT NULL,
	tx_nome NVARCHAR(64),
	tx_sobrenome NVARCHAR(128),
	tx_email NVARCHAR(128),
	tx_sexo NVARCHAR(64),
	tx_cidade NVARCHAR(128),
	tx_estado NVARCHAR(64),
	tx_formacao NVARCHAR(256),
	tx_profissao NVARCHAR(256),
	dt_cadastro NVARCHAR(10),
	is_deleted BIT NOT NULL DEFAULT 0
)

--POPULAR A TABELA COM ALGUNS DADOS
INSERT INTO usu_tb_usuario (tx_nome, tx_sobrenome, tx_email, tx_sexo, tx_cidade, tx_estado, tx_formacao, tx_profissao, dt_cadastro) VALUES
('Arthur', 'Navarro Miksza', 'arth.miksza@gmail.com', 'Masculino', 'São João do Ivaí', 'Paraná', 'Análise e Desenvolvimento de Sistemas', 'Desenvolvedor WEB', '10/09/2019'),
('Maria', 'da Silva Souza', 'mariadasilva@gmail.com', 'Feminino', 'Apucarana', 'Paraná', 'Análise e Desenvolvimento de Sistemas', 'Desenvolvedora Mobile', '10/09/2019'),
('Roberto', 'dos Santos', 'robertodossantos@gmail.com', 'Masculino', 'Maringá', 'Paraná', 'Análise e Desenvolvimento de Sistemas', 'Formatador de PC', '10/09/2019'),
('Joaquina', 'Desão Paulo', 'joaquina_desp@gmail.com', 'Feminino', 'Leme', 'São Paulo', 'Economia', 'Analista de Mercado', '10/09/2019');

--PROC PARA PAGINAR USUARIOS
CREATE PROCEDURE pGetUsers
@page INT,
@limit INT
AS
BEGIN
	SELECT
		t.id_usuario,
		t.tx_nome,
		t.tx_sobrenome,
		t.tx_email,
		t.tx_sexo, 
		t.tx_cidade,
		t.tx_estado,
		t.tx_formacao,
		t.tx_profissao
	FROM 
	(   SELECT
			ROW_NUMBER() OVER(ORDER BY id_usuario) AS nu_row,
			id_usuario,
			tx_nome,
			tx_sobrenome,
			tx_email,
			tx_sexo,
			tx_cidade,
			tx_estado,
			tx_formacao,
			tx_profissao
		FROM
			usu_tb_usuario
		WHERE 
			is_deleted = 0
	) AS t
	WHERE (t.nu_row > (( @page - 1 ) * @limit) AND 
		  t.nu_row <= (( @page - 1 ) * @limit + @limit))
END

--PROC PARA RETORNAR TODOS USERS DE ACORDO COM FILTRO
CREATE PROCEDURE getAllUsersWithFilter
@filter nvarchar(150),
@type int
AS
BEGIN
	--TYPE 1 = NOME COMPLETO, TYPE 2 = PROFISSAO
	SET @filter = ISNULL(@filter, '')
	SELECT
		id_usuario,
		tx_nome,
		tx_sobrenome,
		tx_email,
		tx_sexo, 
		tx_cidade,
		tx_estado,
		tx_formacao,
		tx_profissao
	FROM
		usu_tb_usuario
	WHERE 
		@type = 1 AND CONCAT(tx_nome,' ', tx_sobrenome) = @filter OR @type = 2 AND tx_profissao = @filter
END
