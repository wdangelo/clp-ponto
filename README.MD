# Users


  [ x ] Usuário cadastrado deve ter os seguintes campos(id, nome, e-mail, cpf, password, PIS)

  [ x ] Criar session através e autenticação com refresh Token

  [ x ] Listar todos os usuário

  [ x ] Listar usuário por ID

  [ x ] Remover usuáro

  [ x ] Update de usuário (name, email, cpf, password, )

  [ x ] Não pode ser possivel criar um novo usuário com CPF e PIS ja cadastrados 

  [ ] Criar testes de users

  [ ] Criar testes de session


# Point register

### Coleta das marcações dos relógios ponto
  [ x ] Deve coletar os registros de ponto de todos os relógios cadastrados 

  [ x ] deve verificar se o ip do relógio esta acessivel e caso não esteja passar para o proximo ip da lista

  [ x ] deve registrar todos os conteudos em um arquivo .txt



# Time Clock

  [ x ] Cadastro de novos relógios ponto

  [ x ] Update dos relógios
  
  [ x ] Delete do relógio
  

# Logs

  [ ] Criar log das ações de coleta para cada relógio ('Erros e status')

# e-mail

  [ ] Criar envio de e-mail para caso ocorra algum erro na coleta do arquivo ou envio para destino SFTP


# Containers

  [ ] Criar estrutura com docker e docker compose
  [ ] Criar container postgres

# Database

  [ ] Migrar estrutura para sqlite para postgress (typeorm ou Prisma)