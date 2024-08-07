var input = require('readline-sync')
//declarando listas, para armazenar os dados referentes aos clientes, funcionarios e produtos
var listaClientes = [];
var listaFuncionarios = [];
var listaProdutos = [];
var listaPedidos = []
var listaAvaliacao = [];
//declarando variaveis para o id, para que mais a frente possa se fazer a contagem dos id's e cada um ser !=
var idUnicoFunc = 0;
var idUnicoCliente = 0;
var idUnicoPedido = 0;
//criando a classe avaliacao
class Avaliacao {
    constructor(nomeDoCliente, idDoPedido, avaliar) {

        this.nomeDoCliente = nomeDoCliente;
        this.idDoPedido = idDoPedido;
        this.avaliar = avaliar;
    }
}
//criando a classe pedido
class Pedido {
    constructor(idUnico,idCliente,status,dataPedido) {
        //atributos da classe pedido
        this.idUnico = idUnico;
        this.idCliente = idCliente;
        this.status = status;
        this.dataPedido = dataPedido
    }
}
//criando a classe funcionario
class Funcionario {
    constructor(idUnico,nomeUsuario,cpf,email,senha) {
        //atributos da classe funcionario
        this.idUnico = idUnico;
        this.nomeUsuario = nomeUsuario;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}
//criando a classe cliente
class Cliente {
    constructor(idUnico,nome,dataNascimento,cpf,email,senha) {
        //atributos da classe cliente
        this.idUnico = idUnico;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}
//criando a classe produto
class Produto {
    constructor(validade,preco,qtdEstoque,nome,descricao) {
        //atributos da classe produto
        this.validade = validade;
        this.nome = nome;
        this.qtdEstoque = qtdEstoque;
        this.preco = preco;
        this.descricao = descricao;
    }
}
//criando a classe sistema, que sera a classe principal do codigo, onde estara todos os metodos a serem utilizados
class Sistema {
    constructor() {
    }
    //criando o metodo para o usuario fazer login
    fazerLogin() {
        var iniciarSistema = new Sistema();
        var confirmacaoLoginEmail = false
        //while para a verificacao se o email esta cadastrado
        while (confirmacaoLoginEmail == false){
            var emailLogin = input.question('Digite o email de login: ');
            console.log();
            //percorrendo a lista de funcionarios para ver se o email esta cadastrado
            for (let i = 0; i < listaFuncionarios.length; i++){
                //se sim, entra neste if, se nao, nao entra no if ate que encontre
                if (listaFuncionarios[i].email == emailLogin) { //verifica se eh um email de funcionario
                    //while para a verificacao da senha
                    var confirmacaoLoginFuncionarioSenha = false;
                    while (confirmacaoLoginFuncionarioSenha == false) {
                        let senha = input.question('Digite sua senha: ');
                        //se a senha estiver correta, entra no if
                        if (listaFuncionarios[i].senha == senha) {
                            //o funcionario consegue logar e entao o metodo funcionarioLogado() eh chamado para que ele possa mexer em sua conta
                            console.log('Login completado com sucesso!');
                            confirmacaoLoginEmail = true;
                            let IDFunc = listaFuncionarios[i].idUnico; //sabe-se qual funcionario esta logando pelo id
                            iniciarSistema.funcionarioLogado(IDFunc);
                        }
                        //se nao entrar no if de cima, entra no else e o loop continua
                        else {
                            console.log('Senha incorreta, digite novamente');
                            continue
                        }
                        confirmacaoLoginFuncionarioSenha = true; 
                    }
                }
            }
            for (let i = 0; i < listaClientes.length; i++){
                if (listaClientes[i].email == emailLogin) { //verifica se eh um email de cliente
                    //while para a verificacao da senha
                    var confirmacaoLoginClienteSenha = false;
                    while (confirmacaoLoginClienteSenha == false) {
                        let senha = input.question('Digite sua senha: ');
                        //se a senha estiver correta, entra no if
                        if (listaClientes[i].senha == senha) {
                            //o cliente consegue logar e entao o metodo clienteLogado() eh chamado para que ele possa mexer em sua conta
                            console.log('Login completado com sucesso!');
                            confirmacaoLoginEmail = true;
                            let IDcliente = listaClientes[i].idUnico; //sabe-se qual cliente esta logando pelo id
                            iniciarSistema.clienteLogado(IDcliente);
                        }
                        //se nao entrar no if de cima, entra no else e o loop continua
                        else {
                            console.log('Senha incorreta, digite novamente');
                            continue
                        }
                        confirmacaoLoginClienteSenha = true; 
                    }
                }
            }
            if (confirmacaoLoginEmail == false) { //caso o email nao seja encontrado nem na lista de funcionarios nem na lista de clientes, entra nesse if
                console.log('Email nao encontrado, digite novamente\n')
                continue
            //loop continua ate que o usuario digite um email cadastrado
            } 
            break //break para finalizar o primeiro loop
        } 
    }
    //metodo para o funcionario ver seus dados, que tem como argumento o id do funcionario logado
    verDadosFunc(id) {
        for (let funcionario of listaFuncionarios) { 
            //percorre a lista de funcionarios
            if (funcionario.idUnico == id){ //quando o id do funcionario logado for encontrado na lista, entra no if e printa os dados

                console.log(`ID: ${funcionario.idUnico} \nNome: ${funcionario.nomeUsuario} \nCPF: ${funcionario.cpf} \nEmail: ${funcionario.email} \n`);
            }
        }
    }
    //metodo para o cliente ver seus dados, que tem como argumento o id do cliente logado
    //mesma linha de raciocinio do metodo verDadosFunc
    verDadosCliente(id) { 
        for (let cliente of listaClientes) {

            if (cliente.idUnico == id){

                console.log(`ID: ${cliente.idUnico} \nNome: ${cliente.nome} \nData de Nascimento: ${cliente.dataNascimento} \nCPF: ${cliente.cpf} \nEmail: ${cliente.email} \nSenha: ${cliente.senha}\n`);
            }
        }
    }
    //metodo para ver a lista de produtos
    verListaProdutos() {
        listaProdutos.sort((a, b) => a.nome.localeCompare(b.nome)); //deixa em ordem alfabetica de acordo com o nome do produto
        for (let produto of listaProdutos) {
            //percorre a lista de produtos e printa cada dado dos produtos
            console.log(`Data de Validade: ${produto.validade} \nNome do Produto: ${produto.nome} \nQuantidade no Estoque: ${produto.qtdEstoque} \nPreco: ${produto.preco} \nDescricao: ${produto.descricao}\n`);
            console.log();
        }
    }
    //metodo para ver a lista de clientes
    //mesma linha de raciocinio do metodo verListaProdutos, mas com a lista de clientes
    verListaClientes() {
        listaClientes.sort((a, b) => a.nome.localeCompare(b.nome)); //deixa em ordem alfabetica de acordo com o nome do cliente
        for (let cliente of listaClientes) {

            console.log(`ID: ${cliente.idUnico} \nNome: ${cliente.nome} \nData de Nascimento: ${cliente.dataNascimento} \nCPF: ${cliente.cpf} \nEmail: ${cliente.email} \nSenha: ${cliente.senha}\n`);
        }
    }
    //metodo para modificar os dados do funcionario, que tem como argumento o id do funcionario logado
    modificarDadosFunc(id){

        for (let funcionario of listaFuncionarios) {

            if (funcionario.idUnico == id){ //percorre a lista de funcionarios e quando achar o id do funcionario logado, entra no if

                while (true) { //loop para fazer com que o usuario escolha uma opcao correta
                    let escolha = input.question(`Deseja alterar o Nome? O atual eh ${funcionario.nomeUsuario} (s/n): `);
                    if (escolha == 's') { 

                        let novoNome = input.question('Digite o nome: ') 
                        funcionario.nomeUsuario = novoNome; //se a resposta for sim, pede para digitar o novo nome e substitui na lista
                        break
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
                while (true) { //mesma linha de raciocinio do while acima, mas para o cpf
                    let escolha = input.question(`Deseja alterar o CPF? O atual eh ${funcionario.cpf} (s/n): `);
                    if (escolha == 's') {
                        while (true) { //loop para garantir que o usuario digite o cpf corretamente e um cpf nao repetido
                            var cpfFuncionario = input.question('Digite o seu CPF: ');
                            //verifica se o CPF tem exatamente 11 digitos e se eh composto apenas por numeros
                            if (!/^\d{11}$/.test(cpfFuncionario)) {
                                console.log('O CPF deve ter exatamente 11 digitos e conter apenas numeros.');
                                continue; //pede o CPF novamente
                            }
                            let confirmacao = false; //inicializa como falso
                            //verifica se o CPF esta na lista de funcionários
                            for (let funcionario of listaFuncionarios) {
                                if (funcionario.cpf == cpfFuncionario) {
                                    console.log('Este CPF já está cadastrado como funcionario.');
                                    confirmacao = true;
                                    break; //sai do loop de funcionários
                                }
                            }
                            //verifica se o CPF está na lista de clientes
                            if (confirmacao == false) {
                                for (let cliente of listaClientes) {
                                    if (cliente.cpf == cpfFuncionario) {
                                        console.log('Este CPF já está cadastrado como cliente.');
                                        confirmacao = true;
                                        break; //sai do loop de clientes
                                    }
                                }
                            }
                            //se o CPF não está cadastrado, sai do loop substitui a resposta na lista
                            if (confirmacao == false) {
                                funcionario.cpf = cpfFuncionario;
                                break;
                            }
                        } 
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
                while (true) { //mesma linha de raciocinio para o bloco de codigos da alteracao do cpf. mas nesse caso para o email
                    let escolha = input.question(`Deseja alterar o Email? O atual eh ${funcionario.email} (s/n): `);
                    if (escolha == 's') {
                        function validarEmail(email) {
                            //verifica se o e-mail contém exatamente um arroba e se ha letras antes e depois do arroba
                            let regex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
                            let partes = email.split('@');
                            //verifica se ha exatamente um arroba e se a estrutura esta correta
                            if (partes.length !== 2 || !regex.test(email)) {
                                return false;
                            }
                            return true;
                        }
                        while (true) { //loop para garantir que o usuário digite um e-mail válido e não cadastrado
                            var emailFuncionario = input.question('Digite o seu e-mail: ');
                            if (!validarEmail(emailFuncionario)) {
                                console.log('Email invalido. O email deve conter pelo menos uma letra antes do arroba e uma letra seguido de ponto e outra letra depois do @ (Ex: a@a.a).');
                                continue; //pede o e-mail novamente
                            }
                            let confirmacao = false; //inicializa como falso
                            //verifica se o email está na lista de funcionários
                            for (let funcionario of listaFuncionarios) {
                                if (funcionario.email === emailFuncionario) {
                                    console.log('Este email ja esta cadastrado como funcionario.');
                                    confirmacao = true;
                                    break; // Sai do loop de funcionários
                                }
                            }
                            //verifica se o email está na lista de clientes
                            if (confirmacao == false) {
                                for (let cliente of listaClientes) {
                                    if (cliente.email === cpfFuncionario) {
                                        console.log('Este email ja esta cadastrado como cliente.');
                                        confirmacao = true;
                                        break; //sai do loop de clientes
                                    }
                                }
                            }
                            //se o e-mail não está cadastrado, sai do loop
                            if (confirmacao == false) { 
                                funcionario.email = emailFuncionario;
                                break;
                            }
                        } 
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }  
                while (true) { //mesma linha de raciocinio para o bloco de codigos de alteracao de nome, mas nesse caso para a alteracao da senha
                    let escolha = input.question(`Deseja alterar a Senha? (s/n): `);
                    if (escolha == 's') {
                        while (true) { //loop para garantir que o usuário digite uma senha com pelo menos 6 dígitos
                            var senhaFuncionario = input.question('Digite a sua senha: ');
                            //verifica se a senha tem pelo menos 6 dígitos
                            if (senhaFuncionario.length < 6) {
                                console.log('A senha deve ter pelo menos 6 digitos.');
                                continue; //pede a senha novamente
                            } 
                            //se a senha eh valida, substitui e sai do loop
                            funcionario.senha = senhaFuncionario;
                            break;
                        }
                        break
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                } 
            }   
        }     
    }
    //mesma linha de raciocinio para o metodo modificarDadosFunc
    modificarDadosCliente(id){//metodo para modificar os dados do cliente, que tem como argumento o id do cliente logado
        for (let cliente of listaClientes) {

            if (cliente.idUnico == id){ //percorre a lista de clientes e quando achar o id do cliente logado, entra no if

                while (true) { //loop para fazer com que o usuario escolha uma opcao correta
                    let escolha = input.question(`Deseja alterar o Nome? O atual eh ${cliente.nome} (s/n): `);
                    if (escolha == 's') { 

                        let novoNome = input.question('Digite o nome: ') 
                        cliente.nome = novoNome; //se a resposta for sim, pede para digitar o novo nome e substitui na lista
                        break
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
                while (true) { //mesma linha de raciocinio do while acima, mas para o cpf
                    let escolha = input.question(`Deseja alterar o CPF? O atual eh ${cliente.cpf} (s/n): `);
                    if (escolha == 's') {
                        while (true) { //loop para garantir que o usuario digite o cpf corretamente e um cpf nao repetido
                            var cpfCliente = input.question('Digite o seu CPF: ');
                            //verifica se o CPF tem exatamente 11 digitos e se eh composto apenas por numeros
                            if (!/^\d{11}$/.test(cpfCliente)) {
                                console.log('O CPF deve ter exatamente 11 digitos e conter apenas numeros.');
                                continue; //pede o CPF novamente
                            }
                            let confirmacao = false; //inicializa como falso
                            //verifica se o CPF esta na lista de funcionários
                            for (let funcionario of listaFuncionarios) {
                                if (funcionario.cpf == cpfCliente) {
                                    console.log('Este CPF já está cadastrado como funcionario.');
                                    confirmacao = true;
                                    break; //sai do loop de funcionários
                                }
                            }
                            //verifica se o CPF está na lista de clientes
                            if (confirmacao == false) {
                                for (let cliente of listaClientes) {
                                    if (cliente.cpf == cpfCliente) {
                                        console.log('Este CPF já está cadastrado como cliente.');
                                        confirmacao = true;
                                        break; //sai do loop de clientes
                                    }
                                }
                            }
                            //se o CPF não está cadastrado, sai do loop substitui a resposta na lista
                            if (confirmacao == false) {
                                cliente.cpf = cpfCliente;
                                break;
                            }
                        } 
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
                while (true) { //mesma linha de raciocinio para o bloco de codigos da alteracao do cpf. mas nesse caso para o email
                    let escolha = input.question(`Deseja alterar o Email? O atual eh ${cliente.email} (s/n): `);
                    if (escolha == 's') {
                        function validarEmail(email) {
                            //verifica se o e-mail contém exatamente um arroba e se ha letras antes e depois do arroba
                            let regex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
                            let partes = email.split('@');
                            //verifica se ha exatamente um arroba e se a estrutura esta correta
                            if (partes.length !== 2 || !regex.test(email)) {
                                return false;
                            }
                            return true;
                        }
                        while (true) { //loop para garantir que o usuário digite um e-mail válido e não cadastrado
                            var emailCliente = input.question('Digite o seu e-mail: ');
                            if (!validarEmail(emailCliente)) {
                                console.log('Email invalido. O email deve conter pelo menos uma letra antes do arroba e uma letra seguido de ponto e outra letra depois do @ (Ex: a@a.a).');
                                continue; //pede o e-mail novamente
                            }
                            let confirmacao = false; //inicializa como falso
                            //verifica se o email está na lista de funcionários
                            for (let funcionario of listaFuncionarios) {
                                if (funcionario.email === emailCliente) {
                                    console.log('Este email ja esta cadastrado como funcionario.');
                                    confirmacao = true;
                                    break; // Sai do loop de funcionários
                                }
                            }
                            //verifica se o email está na lista de clientes
                            if (confirmacao == false) {
                                for (let cliente of listaClientes) {
                                    if (cliente.email === cpfCliente) {
                                        console.log('Este email ja esta cadastrado como cliente.');
                                        confirmacao = true;
                                        break; //sai do loop de clientes
                                    }
                                }
                            }
                            //se o e-mail não está cadastrado, sai do loop
                            if (confirmacao == false) { 
                                cliente.email = emailCliente;
                                break;
                            }
                        } 
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }  
                while (true) { //mesma linha de raciocinio para o bloco de codigos de alteracao de nome, mas nesse caso para a alteracao da senha
                    let escolha = input.question(`Deseja alterar a Senha? (s/n): `);
                    if (escolha == 's') {
                        while (true) { //loop para garantir que o usuário digite uma senha com pelo menos 6 dígitos
                            var senhaCliente = input.question('Digite a sua senha: ');
                            //verifica se a senha tem pelo menos 6 dígitos
                            if (senhaCliente.length < 6) {
                                console.log('A senha deve ter pelo menos 6 digitos.');
                                continue; //pede a senha novamente
                            } 
                            //se a senha eh valida, substitui e sai do loop
                            cliente.senha = senhaCliente;
                            break;
                        }
                        break
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
                while (true) { //loop para fazer com que o usuario escolha uma opcao correta
                    let escolha = input.question(`Deseja alterar a Data de Nascimento? A atual eh ${cliente.dataNascimento} (s/n): `);
                    if (escolha == 's') { 

                        function validarData(data) {
                            //expressao regular para verificar o formato DD/MM/YYYY
                            let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                            if (!regex.test(data)) {
                                return false; //formato invalido
                            }
                            //divide a data em dia, mes e ano
                            let [dia, mes, ano] = data.split('/').map(Number);
                            //verifica o ano
                            if (ano >= 2024) {
                                return false; //ano invalido
                            }
                            //verifica o mes
                            if (mes < 1 || mes > 12) {
                                return false; //mes invalido
                            }
                            // Verifica o dia
                            if (dia < 1 || dia > 31) {
                                return false; //dia invalido
                            }
                            //verifica se o dia eh valido para o mes especifico
                            let diasNoMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            if (dia > diasNoMes[mes - 1]) {
                                return false; // Dia inválido para o mês
                            }
                            return true; //data valida
                        }
                        while (true) { // Loop para garantir que o usuário digite uma data de nascimento válida
                            var dataNascimento = input.question('Digite a sua data de nascimento (DD/MM/YYYY): ');
                            if (validarData(dataNascimento)) {
                                cliente.dataNascimento = dataNascimento;
                                break; //sai do loop e substitui se a data for valida
                            } else {
                                console.log('Data invalida. Certifique-se de usar o formato DD/MM/YYYY e que a data seja válida.');
                            }
                        }
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
            }   
        }
    }
    //metodo para o funcionario adicionar algum produto
    adicionarProduto() {
        //pergunta os dados do produto para o funcionario
        function validarData(data) {
            //expressao regular para verificar o formato DD/MM/YYYY
            let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            if (!regex.test(data)) {
                return false; //formato invalido
            }
            //divide a data em dia, mes e ano
            let [dia, mes, ano] = data.split('/').map(Number);
            //verifica o mes
            if (mes < 1 || mes > 12) {
                return false; //mes invalido
            }
            // Verifica o dia
            if (dia < 1 || dia > 31) {
                return false; //dia invalido
            }
            //verifica se o dia eh valido para o mes especifico
            let diasNoMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (dia > diasNoMes[mes - 1]) {
                return false; // Dia inválido para o mês
            }
            return true; //data valida
        }
        while (true) { // Loop para garantir que o usuário digite uma data de nascimento válida
            var dataValidade = input.question('Digite a data de validade (DD/MM/YYYY): ');
            if (validarData(dataValidade)) {
                break; //sai do loop se a data for valida
            } else {
                console.log('Data invalida. Certifique-se de usar o formato DD/MM/YYYY e que a data seja válida.');
            }
        }
        while (true) {
            var qtdEstoque = input.question('Digite a quantidade no estoque: ')
            try { //garante que o usuario digite apenas numeros
                if (isNaN(qtdEstoque)) {
                throw new Error();
                }
            } 
            catch(erro) {
                console.log('Digite apenas numeros.')
                continue
            }
            if (parseInt(qtdEstoque) < 0) { //quantidade nao pode ser negativa
                console.log('Digite um numero maior ou igual a 0.')
                continue
            }
            break
        }
        while (true) {
            var preco = input.question('Digite o preco do produto: ')
            try { //garante que o usuario digite apenas numeros
                if (isNaN(preco)) {
                throw new Error();
                }
            } 
            catch(erro) {
                console.log('Digite apenas numeros.')
                continue
            }
            if (parseInt(preco) < 0) { //quantidade nao pode ser negativa
                console.log('Digite um numero maior ou igual a 0.')
                continue
            }
            break
        }
        while (true) { //loop para garantir que o usuário digite um produto não cadastrado
            var nomeProduto = input.question('Digite o nome do produto: ');
            let confirmacao = false; //inicializa como falso
            //verifica se o produto está na lista de produtos
            for (let produto of listaProdutos) {
                if (produto.nome == nomeProduto) {
                    console.log('Este produto ja esta cadastrado.');
                    confirmacao = true ;
                    break; //sai do loop 
                }
            }
            //se o produto não está cadastrado, sai do loop
            if (confirmacao == false) {
                break;
            }
        }
        let descricao = input.question('Digite a descricao do produto: ');
        //armazenando os dados na listaProdutos, assim essa lista se torna uma lista de objetos do tipo produto
        listaProdutos.push(new Produto(dataValidade, preco, qtdEstoque, nomeProduto, descricao));
        console.log('Produto adicionado com sucesso!\n');
    }
    //metodo para o funcionario alterar um produto
    alterarProduto() {
        var confirmacaoAlteracao = false //variavel de condicao para o termino do loop
        while (confirmacaoAlteracao == false) {
            let escolhaProduto = input.question('Digite o nome do produto: ');
            //verifica se o nome digitado esta na lista, se estiver, entra no if e o loop eh quebrado
            for (let i = 0; i < listaProdutos.length; i++) {
                if (listaProdutos[i].nome == escolhaProduto) {
                    console.log('Produto encontrado.\n')
                    confirmacaoAlteracao = true
                    break
                }
            }
            if (confirmacaoAlteracao == false){ //se nao estiver na lista, pede para o usuario digitar um outro produto
                console.log('Produto nao foi encontrado, digite novamente.')
            }
        }
        //quando o loop quebrar, entra no for, que procura onde esta o produto
        for (let produto of listaProdutos) {

            if (produto.nome == escolhaProduto){ // encontrando o produto, segue a mesma linha de raciocionio da parte do codigo
                                                // de mudanca dos dados de clientes e funcionarios, mas para os dados do produto
                while (true) {
                    let escolha = input.question(`Deseja alterar a Data de Validade? A atual eh ${produto.validade} (s/n): `);
                    if (escolha == 's') {

                        function validarData(data) {
                            //expressao regular para verificar o formato DD/MM/YYYY
                            let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                            if (!regex.test(data)) {
                                return false; //formato invalido
                            }
                            //divide a data em dia, mes e ano
                            let [dia, mes, ano] = data.split('/').map(Number);
                            //verifica o mes
                            if (mes < 1 || mes > 12) {
                                return false; //mes invalido
                            }
                            // Verifica o dia
                            if (dia < 1 || dia > 31) {
                                return false; //dia invalido
                            }
                            //verifica se o dia eh valido para o mes especifico
                            let diasNoMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            if (dia > diasNoMes[mes - 1]) {
                                return false; // Dia inválido para o mês
                            }
                            return true; //data valida
                        }
                        while (true) { // Loop para garantir que o usuário digite uma data de nascimento válida
                            var dataValidade = input.question('Digite a data de validade (DD/MM/YYYY): ');
                            if (validarData(dataValidade)) {
                                produto.validade = dataValidade;
                                break; //sai do loop e substitui se a data for valida
                            } else {
                                console.log('Data invalida. Certifique-se de usar o formato DD/MM/YYYY e que a data seja válida.');
                            }
                        }
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
                while (true) {
                    let escolha = input.question(`Deseja alterar o Nome do Produto? O atual eh ${produto.nome} (s/n): `);
                    if (escolha == 's') {
                        var confirmacao = false
                        while (confirmacao == false) {
                            let novoProduto = input.question('Digite o Nome do Produto: ')
                            for (let produtos of listaProdutos){
                                if (produtos.nome == novoProduto){
                                    console.log('Produto ja esta em estoque, tente novamente');
                                }
                                else {
                                    produto.nome = novoProduto;
                                    confirmacao = true;
                                }
                            }
                        } 
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
                while (true) {
                    let escolha = input.question(`Deseja alterar a Quantidade no Estoque? A atual eh ${produto.qtdEstoque} (s/n): `);
                    if (escolha == 's') {
                        while (true) {
                            let novoEstoque = input.question('Digite a Nova Quantidade: ')
                            try { //garante que o usuario digite apenas numeros
                                if (isNaN(novoEstoque)) {
                                throw new Error();
                                }
                            } 
                            catch(erro) {
                                console.log('Digite apenas numeros')
                                continue
                            }
                            if (parseInt(novoEstoque) < 0) { //quantidade nao pode ser negativa
                                console.log('Digite um numero maior ou igual a 0')
                                continue
                            }
                            else if (parseInt(novoEstoque) >= 0) { //
                                produto.qtdEstoque = novoEstoque;
                            }
                            break
                        } 
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }  
                while (true) {
                    let escolha = input.question(`Deseja alterar o preco? O atual eh ${produto.preco} (s/n): `);
                    if (escolha == 's') {
                        while (true) {
                            let novoPreco = input.question('Digite o Novo Preco: ')
                            try { //garante que o usuario digite apenas numeros
                                if (isNaN(novoPreco)) {
                                throw new Error();
                                }
                            } 
                            catch(erro) {
                                console.log('Digite apenas numeros')
                                continue
                            }
                            if (parseInt(novoPreco) < 0) { //preco nao pode ser negativo
                                console.log('Digite um numero maior ou igual a 0')
                                continue
                            }
                            else if (parseInt(novoPreco) >= 0) { //
                                produto.preco = novoPreco;
                            }
                            break
                        }
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                } 
                while (true) {
                    let escolha = input.question(`Deseja alterar a Descricao do Produto? A atual eh ${produto.descricao} (s/n): `);
                    if (escolha == 's') {

                        let novaDescricao = input.question('Digite a Descricao: ') 
                        produto.descricao = novaDescricao;
                        break
                    }
                    if (escolha != 's' && escolha != 'n') {
                        console.log('Digite uma opcao valida\n')
                        continue
                    } 
                    break
                }
            }   
        }
    }
    //metodo para o funcionario remover um produto
    removerProduto(){
        let confirmacao = false
        while (confirmacao == false) {
            let contagem = 0; //contagem para ver se o nome escolhido vai ser encontrado na lista
            let escolha = input.question('Digite o nome do produto: ');
            var novaListaProdutos = []; //lista criada para colocar todos os outros elemtnos da listaprodutos menos o elemento que contem o nome desejado
            for (let i = 0; i < listaProdutos.length; i++) {
                //verifica se o nome digitado esta na lista, se estiver, entra no if
                if (listaProdutos[i].nome != escolha) { // se o nome for diferente do escolhido, o produto sera colocado na nova lista
                    novaListaProdutos.push(listaProdutos[i]);
                }
                else if (listaProdutos[i].nome == escolha){
                    contagem++
                }
            }
            if (contagem < 1) { // produto nao foi encontrado e assim o loop é continuado
                console.log('Produto nao foi encontrado, digite novamente')
            }
            else {
                confirmacao = true // neste cado contagem >= 1 e entao o produto foi encontrado, podendo assim quebrar o loop
            }
        }
        listaProdutos = novaListaProdutos //guarda uma nova lista com o produto removido
        console.log('Produto removido com sucesso!\n')  
    }
    //metodo para o cliente fazer um pedido, que tem como argumento o id do cliente logado
    fazerPedido(IDcliente){
        let confirmacao = false
        while (confirmacao == false) {
            var escolhaPedido = input.question('Digite o nome do produto: ');
            //verifica se o nome digitado esta na lista, se estiverr, entra no if e o cliente pode pedir
            for (let i = 0; i < listaProdutos.length; i++) {
                if (listaProdutos[i].nome == escolhaPedido) {
                    if (listaProdutos[i].qtdEstoque > 0){
                        console.log('Produto encontrado.');
                        confirmacao = true;
                        let hoje = new Date(); //pega a data de hoje (data do pedido)
                        listaPedidos.push(new Pedido(idUnicoPedido.toString(), IDcliente,'Pedido pendente', hoje));
                        console.log(`Aqui esta o ID do seu pedido: ${idUnicoPedido}`); //da o id do pedido para o cliente
                        idUnicoPedido++;
                        break
                    }
                }
            }
            if (confirmacao == false){
                console.log('Produto nao encontrado ou nao ha estoque.')
            }
        }

    }
    //metodo para ver a lista de pedidos em ordem cronologica
    verListaPedidos(){
        listaProdutos.sort((a, b) => {
            let data1 = a.dataPedido;
            let data2 = b.dataPedido;
            return data1 - data2; //ordena em ordem crescente a data
          });
        for (let pedido of listaPedidos) { //para cada pedido, printa a informacao para o usuario

        console.log(`ID: ${pedido.idUnico} \nID do Cliente: ${pedido.idCliente} \nStatus do Pedido: ${pedido.status} \nData do Pedido: ${pedido.dataPedido.toLocaleDateString('pt-BR')} \n`);
        console.log();
        }
    }
    //metodo para alterar o status do pedido
    modificarStatusPedido() {
        var confirmacaoStatus = false
        while (confirmacaoStatus == false) {
            var escolhaIDstatus = input.question('Digite o ID do pedido que voce quer modificar o status: ');
            //verifica se o ID digitado esta na lista de pedidos, se estiver, entra no if e entao o status do pedido pode ser alterado
            for (let i = 0; i < listaPedidos.length; i++) {
                if (listaPedidos[i].idUnico == escolhaIDstatus) {
                    console.log('Pedido encontrado\n');
                    confirmacaoStatus = true; //quando voltar para o inicio do while acima, o loop sera quebrado
                    while (true) {
                        let escolhaStatus = input.question('Digite o novo status do pedido (pedido pendente, adiado, realizado, cancelado): ')
                        // pede para o usuario digitar o novo status e substitui na lista de pedidos
                        if (escolhaStatus != 'pedido pendente' && escolhaStatus != 'adiado' && escolhaStatus != 'realizado' && escolhaStatus != 'cancelado') {
                            console.log('Digite um status valido');
                            continue
                            //if para garantir que o usuario digite apenas um status valido-
                        }
                        if (escolhaStatus == 'pedido pendente') {
                            listaPedidos[i].status = 'pedido pendente';
                        }
                        if (escolhaStatus == 'adiado'){
                            listaPedidos[i].status = 'adiado';
                        }
                        if (escolhaStatus == 'realizado'){
                            listaPedidos[i].status = 'realizado';
                        }
                        if (escolhaStatus == 'cancelado'){
                            listaPedidos[i].status = 'cancelado';
                        }
                    break     
                    }
                }
            }
            if (confirmacaoStatus == false){
                console.log('Pedido nao foi encontrado, digite novamente')
            }
        }  
    }
    //metodo para o cliente cancelar o pedido, que tem como argumento o do cliente logado
    cancelarPedido(id) {
        let confirmacao = false;
        while (confirmacao == false){
            let idPedido = input.question('Digite o ID do pedido que voce quer cancelar: ')
            for (let pedido of listaPedidos) { //percorre a lista de pedidos para encontrar o pedido que o cliente quer cancelar
                if (pedido.idUnico == idPedido){ //se o pedido for encontrado, entra no if
                    if (pedido.idCliente == id) {//se o pedido encontrado for do cliente logado, entra no if e o pedido é cancelado
                        console.log('Pedido cancelado com sucesso!');
                        pedido.status = 'cancelado';
                        confirmacao = true;
                        break
                    }  
                }
            }
            if (confirmacao == false) {
                console.log('Pedido nao encontrado, tente novamente'); //caso o id do pedido nao seja encontrado ou seja encontrado mas nao pertenca ao cliente
            }
        }
    }
    //metodo para ver a lista de pedidos do cliente logado, que tem como argumento o id do cliente
    verPedidosCliente(id) {
        var novaListaPedidos = []; //lista criada para colocar apenas os pedidos do cliente com determinado id
        for (let i = 0; i < listaPedidos.length; i++) {
            //verifica se o id do cliente esta na lista, se estiver, entra no if
            if (listaPedidos[i].idCliente == id) { // se o nome for diferente do escolhido, o produto sera colocado na nova lista
                novaListaPedidos.push(listaPedidos[i]);
            }
        }
        novaListaPedidos.sort((a, b) => {
            let data1 = a.dataPedido;
            let data2 = b.dataPedido;
            return data1 - data2; //ordena em ordem crescente a data
          });
        for (let pedido of novaListaPedidos) {

        console.log(`ID: ${pedido.idUnico} \nID do Cliente: ${pedido.idCliente} \nStatus do Pedido: ${pedido.status} \nData do Pedido: ${pedido.dataPedido.toLocaleDateString('pt-BR')}\n`);
        console.log();
        }
    }
    //metodo para o cliente realizar a avaliacao do pedido, que tem como argumento o id do cliete logado
    avaliarPedido(id) {
        // loop para confirmar a avaliação
        let confirmacaoAvaliacao = false;
        while (!confirmacaoAvaliacao) {
            let idPedido = input.question('Digite o ID do pedido que você quer avaliar: ');
            // verifica se o pedido está na lista e se pertence ao cliente
            let pedido = listaPedidos.find(p => p.idUnico == idPedido);
            if (pedido == false) {
                console.log('Pedido não encontrado.');
                continue;
            }
            if (pedido.idCliente != id) {
                console.log('Este pedido não pertence a você.');
                continue;
            }
            if (pedido.status != 'realizado') {
                console.log('O pedido ainda não foi entregue.');
                continue;
            }
            confirmacaoAvaliacao = true; // pedido pode ser avaliado
            // encontra o cliente que esta avaliando
            let cliente = listaClientes.find(c => c.idUnico == id);
            let nomeClienteAvaliando = cliente ? cliente.nome : '';
            // loop para obter a avaliação
            let confirmacao2 = false;
            while (confirmacao2 == false) {
                let avaliacaoInicial = input.question('Digite sua avaliação, de 1 a 5: ');
                if (isNaN(avaliacaoInicial) || parseInt(avaliacaoInicial) < 1 || parseInt(avaliacaoInicial) > 5) {
                    console.log('Digite um número válido entre 1 e 5.');
                    continue;
                }
                let avaliacaoNum = parseInt(avaliacaoInicial);
                let comentario = '';
                // loop para obter o comentário
                let confirmacao = false;
                while (confirmacao == false) {
                    let escolhaMaisAvaliacao = input.question('Deseja fazer algum comentário sobre o pedido? (s/n): ');
                    if (escolhaMaisAvaliacao != 's' && escolhaMaisAvaliacao != 'n') {
                        console.log('Digite uma resposta válida.');
                        continue;
                    }
                    if (escolhaMaisAvaliacao == 's') {
                        comentario = input.question('Digite o comentário sobre o pedido: ');
                    }
                    let avaliacaoFinalPedido = `${avaliacaoNum}. ${comentario}`;
                    listaAvaliacao.push(new Avaliacao(nomeClienteAvaliando, idPedido, avaliacaoFinalPedido));
                    confirmacao = true; // comentário adicionado, encerra o loop de comentário
                }
                confirmacao2 = true; // avaliação concluída, encerra o loop de avaliação
            }
        }
    }
    //metodo para o cliente visualizar as avaliacoes
    visualizarAvaliacao() {
        for (let avaliacao of listaAvaliacao) {
                console.log(`Nome do Cliente: ${avaliacao.nomeDoCliente} \nID do Pedido: ${avaliacao.idDoPedido} \nAvaliacao: ${avaliacao.avaliar} \n`);
        }
    }
    //metodo para o funcionario poder mexer na sua conta (ver dados, modificar dados,ver lista de pedidos, etc)
    //tem argumento o id do funcionario logado
    funcionarioLogado(id) {
        //atribuindo uma variavel a classe sistema
        var iniciarLoginFunc = new Sistema()
        //loop para manter o usuario no menu ate que ele digite uma opcao correta
        while (true){
            console.log('-------------- Sua conta (Funcionario) --------------\n');
            console.log('O que voce gostaria de fazer:\n');
            console.log('1 - Ver Meus Dados');
            console.log('2 - Modificar Meus Dados');
            console.log('3 - Ver Lista de Pedidos');
            console.log('4 - Ver Lista de Produtos');
            console.log('5 - Ver Lista de Clientes');
            console.log('6 - Mudar Status do Pedido');
            console.log('7 - Adicionar Produto');
            console.log('8 - Editar Produto');
            console.log('9 - Excluir Produto');
            console.log('10 - Sair da conta\n');
            let escolha = input.question('Digite uma opcao: ');
            if (escolha != '1' && escolha != '2' && escolha != '3' && escolha != '4' && escolha != '5' && escolha != '6' && escolha != '7' && escolha != '8' && escolha != '9' && escolha != '10') {
                console.log('Digite uma opcao valida.\n');
                continue//se entrar no if, o continue faz voltar ao menu
            }
            if (escolha == '1') {
                console.log('-------------- Seus Dados --------------\n');
                iniciarLoginFunc.verDadosFunc(id);
                continue
            }
            if (escolha == '2') {
                console.log('-------------- Modificar Dados --------------\n');
                iniciarLoginFunc.modificarDadosFunc(id);
                continue
            }
            if (escolha == '3') {
                console.log('-------------- Lista de Pedidos --------------\n');
                iniciarLoginFunc.verListaPedidos();
                continue
            }
            if (escolha == '4') {
                console.log('-------------- Lista de Produtos --------------\n');
                iniciarLoginFunc.verListaProdutos();
                continue
            }
            if (escolha == '5') {
                console.log('-------------- Lista de Clientes --------------\n');
                iniciarLoginFunc.verListaClientes();
                continue
            }
            if (escolha == '6') {
                console.log('-------------- Alterar Status do Pedido --------------\n');
                iniciarLoginFunc.modificarStatusPedido();
                continue
            }
            if (escolha == '7') {
                console.log('-------------- Adicionar Produto --------------\n');
                iniciarLoginFunc.adicionarProduto();
                continue
            }
            if (escolha == '8') {
                console.log('-------------- Alterar Produto --------------\n');
                iniciarLoginFunc.alterarProduto();
                continue
            }
            if (escolha == '9') {
                console.log('-------------- Excluir Produto --------------\n');
                iniciarLoginFunc.removerProduto();
                continue
            }
            if (escolha == '10') {
                console.log('Voce saiu da conta com sucesso!\n');
                break
            }
        }
    }
    //metodo para o cliente poder mexer na sua conta (ver dados, modificar dados,ver lista de pedidos, etc)
    clienteLogado(id) {
        //atribuindo uma variavel a classe sistema
        var iniciarLoginCliente = new Sistema()
        //loop para manter o usuario no menu ate que ele digite uma opcao correta
        while (true){
            console.log('-------------- Sua conta (Cliente) --------------\n');
            console.log('O que voce gostaria de fazer:\n');
            console.log('1 - Ver Meus Dados');
            console.log('2 - Modificar Meus Dados');
            console.log('3 - Ver Lista de Produtos');
            console.log('4 - Fazer Pedido');
            console.log('5 - Cancelar Pedido');
            console.log('6 - Ver Meus Pedidos');
            console.log('7 - Avaliar Pedido');
            console.log('8 - Visualizar Avaliacoes');
            console.log('9 - Sair da conta\n');
            let escolha = input.question('Digite uma opcao: ');
            if (escolha != '1' && escolha != '2' && escolha != '3' && escolha != '4' && escolha != '5' && escolha != '6' && escolha != '7' && escolha != '8' && escolha != '9') {
                console.log('Digite uma opcao valida.\n');
                continue//se entrar no if, o continue faz voltar ao menu
            }
            if (escolha == '1') {
                console.log('-------------- Seus Dados --------------\n');
                iniciarLoginCliente.verDadosCliente(id);
                continue
            }
            if (escolha == '2') {
                console.log('-------------- Modificar Dados --------------\n');
                iniciarLoginCliente.modificarDadosCliente(id);
                continue
            }
            if (escolha == '3') {
                console.log('-------------- Lista de Produtos --------------\n');
                iniciarLoginCliente.verListaProdutos();
                continue
            }
            if (escolha == '4') {
                console.log('-------------- Fazer Pedido --------------\n');
                iniciarLoginCliente.fazerPedido(id);
                continue
            }
            if (escolha == '5') {
                console.log('-------------- Cancelar Pedido --------------\n');
                iniciarLoginCliente.cancelarPedido(id);
                continue
            }
            if (escolha == '6') {
                console.log('-------------- Lista de seus Pedidos --------------\n');
                iniciarLoginCliente.verPedidosCliente(id);
                continue
            }
            if (escolha == '7') {
                console.log('-------------- Avaliar Pedido --------------\n');
                iniciarLoginCliente.avaliarPedido(id);
                continue
            }
            if (escolha == '8') {
                console.log('-------------- Visualizar Avaliacoes --------------\n');
                iniciarLoginCliente.visualizarAvaliacao();
                continue
            }
            if (escolha == '9') {
                console.log('Voce saiu da conta com sucesso!\n');
                break
            }
        }
    }
    //metodo para o cadastro do usuario
    cadastrar() {
        //loop para manter o usuario no menu ate que ele digite uma opcao correta
        while (true) {
            console.log('Como voce deseja se cadastrar?\n');
            console.log('1 - Funcionario');
            console.log('2 - Cliente');
            console.log('3 - Voltar ao menu principal\n');
            let escolha = input.question('Digite a opcao: ');
            console.log();
            //este if garante que o usuario so consiga prosseguir se digitar a opcao correta
            if (escolha != '1' && escolha != '2' && escolha != '3') {
                console.log('Digite uma opcao valida.\n');
                continue //caso entre aqui o usuario volta para o menu por conta do continue
            }
            //parte do codigo para o cadastro de funcionario
            if (escolha == '1') {
        
                console.log('-------------- Cadastrar como Funcionario --------------\n')
                
                //variaveis que armazenam as informacoes perguntadas ao usuario
                let nome = input.question('Digite o seu nome: ');
                while (true) { //loop para garantir que o usuario digite o cpf corretamente e um cpf nao repetido
                    var cpfFuncionario = input.question('Digite o seu CPF: ');
                    //verifica se o CPF tem exatamente 11 digitos e se eh composto apenas por numeros
                    if (!/^\d{11}$/.test(cpfFuncionario)) {
                        console.log('O CPF deve ter exatamente 11 digitos e conter apenas numeros.');
                        continue; //pede o CPF novamente
                    }
                    let confirmacao = false; //inicializa como falso
                    //verifica se o CPF esta na lista de funcionários
                    for (let funcionario of listaFuncionarios) {
                        if (funcionario.cpf == cpfFuncionario) {
                            console.log('Este CPF já está cadastrado como funcionario.');
                            confirmacao = true;
                            break; //sai do loop de funcionários
                        }
                    }
                    //verifica se o CPF está na lista de clientes
                    if (confirmacao == false) {
                        for (let cliente of listaClientes) {
                            if (cliente.cpf == cpfFuncionario) {
                                console.log('Este CPF já está cadastrado como cliente.');
                                confirmacao = true;
                                break; //sai do loop de clientes
                            }
                        }
                    }
                    //se o CPF não está cadastrado, sai do loop
                    if (confirmacao == false) {
                        break;
                    }
                }
                function validarEmail(email) {
                    //verifica se o e-mail contém exatamente um arroba e se ha letras antes e depois do arroba
                    let regex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
                    let partes = email.split('@');
                    //verifica se ha exatamente um arroba e se a estrutura esta correta
                    if (partes.length !== 2 || !regex.test(email)) {
                        return false;
                    }
                    return true;
                }
                while (true) { //loop para garantir que o usuário digite um e-mail válido e não cadastrado
                    var emailFuncionario = input.question('Digite o seu e-mail: ');
                    if (!validarEmail(emailFuncionario)) {
                        console.log('Email invalido. O email deve conter pelo menos uma letra antes do arroba e uma letra seguido de ponto e outra letra depois do @ (Ex: a@a.a).');
                        continue; //pede o e-mail novamente
                    }
                    let confirmacao = false; //inicializa como falso
                    //verifica se o email está na lista de funcionários
                    for (let funcionario of listaFuncionarios) {
                        if (funcionario.email === emailFuncionario) {
                            console.log('Este email ja esta cadastrado como funcionario.');
                            confirmacao = true;
                            break; // Sai do loop de funcionários
                        }
                    }
                    //verifica se o email está na lista de clientes
                    if (confirmacao == false) {
                        for (let cliente of listaClientes) {
                            if (cliente.email === cpfFuncionario) {
                                console.log('Este email ja esta cadastrado como cliente.');
                                confirmacao = true;
                                break; //sai do loop de clientes
                            }
                        }
                    }
                    //se o e-mail não está cadastrado, sai do loop
                    if (confirmacao == false) {
                        break;
                    }
                }
                while (true) { //loop para garantir que o usuário digite uma senha com pelo menos 6 dígitos
                    var senhaFuncionario = input.question('Digite a sua senha: ');
                    //verifica se a senha tem pelo menos 6 dígitos
                    if (senhaFuncionario.length < 6) {
                        console.log('A senha deve ter pelo menos 6 digitos.');
                        continue; //pede a senha novamente
                    }
                    //se a senha eh valida, sai do loop
                    break;
                }
                //armazenando os dadoas na listaFuncionario, assim essa lista se torna uma lista de objetos do tipo funcionario
                listaFuncionarios.push(new Funcionario(idUnicoFunc.toString(), nome, cpfFuncionario, emailFuncionario, senhaFuncionario));
                idUnicoFunc++; // alterando o id para o proximo funcionario
                console.log('Cadastrado com sucesso!\n')
                console.log('Voce foi redirecionado ao menu principal')
                break // quebra o loop
            }
            //parte do codigo para o cadastro de cliente
            //mesma linha de raciocionio da parte do codigo de cadastro de funcionario
            if (escolha == '2') {
                console.log('-------------- Cadastrar como Cliente --------------\n');
                let nome = input.question('Digite o seu nome: ');
                while (true) { //loop para garantir que o usuario digite o cpf corretamente e um cpf nao repetido
                    var cpfCliente = input.question('Digite o seu CPF: ');
                    //verifica se o CPF tem exatamente 11 digitos e se eh composto apenas por numeros
                    if (!/^\d{11}$/.test(cpfCliente)) {
                        console.log('O CPF deve ter exatamente 11 digitos e conter apenas numeros.');
                        continue; //pede o CPF novamente
                    }
                    let confirmacao = false; //inicializa como falso
                    //verifica se o CPF esta na lista de funcionários
                    for (let funcionario of listaFuncionarios) {
                        if (funcionario.cpf == cpfCliente) {
                            console.log('Este CPF já está cadastrado como funcionario.');
                            confirmacao = true;
                            break; //sai do loop de funcionários
                        }
                    }
                    //verifica se o CPF está na lista de clientes
                    if (confirmacao == false) {
                        for (let cliente of listaClientes) {
                            if (cliente.cpf == cpfCliente) {
                                console.log('Este CPF já está cadastrado como cliente.');
                                confirmacao = true;
                                break; //sai do loop de clientes
                            }
                        }
                    }
                    //se o CPF não está cadastrado, sai do loop
                    if (confirmacao == false) {
                        break;
                    }
                }
                function validarData(data) {
                    //expressao regular para verificar o formato DD/MM/YYYY
                    let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                    if (!regex.test(data)) {
                        return false; //formato invalido
                    }
                    //divide a data em dia, mes e ano
                    let [dia, mes, ano] = data.split('/').map(Number);
                    //verifica o ano
                    if (ano >= 2024) {
                        return false; //ano invalido
                    }
                    //verifica o mes
                    if (mes < 1 || mes > 12) {
                        return false; //mes invalido
                    }
                    // Verifica o dia
                    if (dia < 1 || dia > 31) {
                        return false; //dia invalido
                    }
                    //verifica se o dia eh valido para o mes especifico
                    let diasNoMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (dia > diasNoMes[mes - 1]) {
                        return false; // Dia inválido para o mês
                    }
                    return true; //data valida
                }
                while (true) { // Loop para garantir que o usuário digite uma data de nascimento válida
                    var dataNascimento = input.question('Digite a sua data de nascimento (DD/MM/YYYY): ');
                    if (validarData(dataNascimento)) {
                        break; //sai do loop se a data for valida
                    } else {
                        console.log('Data invalida. Certifique-se de usar o formato DD/MM/YYYY e que a data seja válida.');
                    }
                }
                function validarEmail(email) {
                    //verifica se o e-mail contém exatamente um arroba e se ha letras antes e depois do arroba
                    let regex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
                    let partes = email.split('@');
                    //verifica se ha exatamente um arroba e se a estrutura esta correta
                    if (partes.length !== 2 || !regex.test(email)) {
                        return false;
                    }
                    return true;
                }
                while (true) { //loop para garantir que o usuário digite um e-mail válido e não cadastrado
                    var emailCliente = input.question('Digite o seu e-mail: ');
                    if (!validarEmail(emailCliente)) {
                        console.log('Email invalido. O email deve conter pelo menos uma letra antes do arroba e uma letra seguido de ponto e outra letra depois do @ (Ex: a@a.a).');
                        continue; //pede o e-mail novamente
                    }
                    let confirmacao = false; //inicializa como falso
                    //verifica se o email está na lista de funcionários
                    for (let funcionario of listaFuncionarios) {
                        if (funcionario.email === emailCliente) {
                            console.log('Este email ja esta cadastrado como funcionario.');
                            confirmacao = true;
                            break; // Sai do loop de funcionários
                        }
                    }
                    //verifica se o email está na lista de clientes
                    if (confirmacao == false) {
                        for (let cliente of listaClientes) {
                            if (cliente.email === emailClientes) {
                                console.log('Este email ja esta cadastrado como cliente.');
                                confirmacao = true;
                                break; //sai do loop de clientes
                            }
                        }
                    }
                    //se o e-mail não está cadastrado, sai do loop
                    if (confirmacao == false) {
                        break;
                    }
                }
                while (true) { //loop para garantir que o usuário digite uma senha com pelo menos 6 dígitos
                    var senhaCliente = input.question('Digite a sua senha: ');
                    //verifica se a senha tem pelo menos 6 dígitos
                    if (senhaCliente.length < 6) {
                        console.log('A senha deve ter pelo menos 6 digitos.');
                        continue; //pede a senha novamente
                    }
                    //se a senha eh valida, sai do loop
                    break;
                }
                listaClientes.push(new Cliente(idUnicoCliente.toString(), nome, dataNascimento, cpfCliente, emailCliente, senhaCliente));
                idUnicoCliente++;
                console.log('Cadastrado com sucesso!')
                console.log('Voce foi redirecionado ao menu\n')
            }
            if (escolha == '3') {
                break
            }
        }
    }
}
//atribuindo uma variavel a classe sistema
var iniciarSistema = new Sistema()
//codigo para o menu principal, aqui o usuario podera acessar todos os metodos ds classe sistema
//loop para garantir que o usuario digite uma opcao correta
while (true) {

    console.log('Escolha uma das opcoes: \n')
    console.log('1 - Fazer Login')
    console.log('2 - Fazer Cadastro')
    console.log('3 - Sair do Programa\n')
    let escolha = input.question('Digite a opcao desejada: ');
    console.log()

    if (escolha != '1' && escolha != '2' && escolha != '3') {

        console.log('Digite uma opcao valida.\n')
        continue//se entrar no if, o continue faz voltar ao menu
    }
    //parte do codigo para o usuario acessar o login
    if (escolha == '1') {

        console.log('-------------- Fazer Login --------------\n');
        iniciarSistema.fazerLogin();
    }
    //parte do codigo para o usuario acessar o cadastro
    if (escolha == '2') {

        console.log('-------------- Fazer Cadastro --------------\n')
        iniciarSistema.cadastrar();
        continue
    }
    //parte do codigo para o usuario sair do programa
    if (escolha == '3') {

        console.log('Programa encerrado.\n')
        break //break encerra o loop
    }
}