# Instruções para rodar o App

1. Rode o comando **yarn server** para iniciar o servidor articial. Ele ficará disponível na porta 3004.
2. Roda o comando **yarn start** para iniciar o App.

## Telas

### Login

1. Ao preencher o usuário e senha e clicar em entrar, você terá duas possíveis saídas:

   1. Se o usuário não for encontrado, nada vai acontecer.
   2. Se o usuário for encontrado, você receberá a mensagem "Usuário encontrado!" por alguns instantes.

2. Ao clicar no botão "Cadastrar" você será redirecionado para a rota de cadastro.

### Cadastro

1. Você poderá cadastrar um novo usuário no banco de dados. Será necessário preencher os campos usuário, senha e confirmação de senha. Após preencher esses dados o novo usuário será adicionado no arquivo db.json.
2. No input com título "Procurar usuário", você poderá digitar e verificar se existe algum usuário com os caracteres iniciais que você digitou.
   1. Caso Exista, ele será renderizado na tela.
   2. Se nenhum usuário existir, nada acontecerá.

3.Na terceira seção está sendo exibido todos os usuários existentes atualmente no banco de dados. Caso você efetue o cadastro de um novo usuário com sucesso, essa lista será atualizada.
