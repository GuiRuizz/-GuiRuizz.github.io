function teste2() {
    var tipo = document.getElementById("tipoproduto");
    var tipoDado = tipo.options[tipo.selectedIndex].value;

    var qualidade = document.getElementById("qualidadeproduto");
    var qualidadeDado = qualidade.options[qualidade.selectedIndex].value;

    var marca = document.getElementById("marcaproduto");
    var marcaDado = marca.options[marca.selectedIndex].value;

    var quantidade = document.getElementById("quantidadeproduto").value;
    var precoMinimo;
    var precoMaximo;
    var precoQualidade;
    var precoFinal;

    // Definir os valores mínimo e máximo com base no tipo de dado selecionado
    switch (tipoDado) {
        case "Mijao":
            precoMaximo = 18;
            precoMinimo = 2;
            break;
        case "Body":
            precoMaximo = 28;
            precoMinimo = 5;
            break;
        case "Body M. Longa":
            precoMaximo = 30;
            precoMinimo = 5;
            break;
         case "Macacao":
            precoMaximo = 30;
            precoMinimo = 8;
            break;
         case "Body Vestido/Camisa":
            precoMaximo = 30;
            precoMinimo = 8;
            break;
         case "Legging":
            precoMaximo = 30;
            precoMinimo = 8;
            break;
         case "Bermuda/Shorts":
            precoMaximo = 30;
            precoMinimo = 8;
            break;
         case "Calça Moleton":
            precoMaximo = 32;
            precoMinimo = 12;
            break;
         case "Camiseta":
            precoMaximo = 32;
            precoMinimo = 12;
            break;
        case "Vestido":
            precoMaximo = 34;
            precoMinimo = 12;
            break;
        case "Camisa":
            precoMaximo = 34;
            precoMinimo = 12;
            break;
        case "Pijama":
            precoMaximo = 36;
            precoMinimo = 15;
            break;
        case "Jardineira":
            precoMaximo = 38;
            precoMinimo = 18;
            break;
        case "Calça Jeans":
            precoMaximo = 38;
            precoMinimo = 18;
            break;
        case "Blusa":
            precoMaximo = 40;
            precoMinimo = 22;
            break;
        case "Conjunto M. Curta":
            precoMaximo = 40;
            precoMinimo = 22;
            break;
        case "Conjunto M. Longa":
            precoMaximo = 45;
            precoMinimo = 25;
            break;
        case "Jaqueta":
            precoMaximo = 50;
            precoMinimo = 25;
            break;
        case "Saída Maternidade":
            precoMaximo = 80;
            precoMinimo = 30;
            break;
        case "Sandalia":
            precoMaximo = 30;
            precoMinimo = 10;
            break;
        case "Tenis":
            precoMaximo = 50;
            precoMinimo = 15;
            break;
        case "Sapatinho Bebe":
            precoMaximo = 20;
            precoMinimo = 8;
            break;
        case "Sapatilha":
            precoMaximo = 24;
            precoMinimo = 8;
            break;
        case "Bota":
            precoMaximo = 40;
            precoMinimo = 22;
            break;
        case "Chinelo":
            precoMaximo = 24;
            precoMinimo = 8;
            break;
        case "Bauche":
            precoMaximo = 38;
            precoMinimo = 15;
            break;
        default:
            precoMaximo = 0;
            precoMinimo = 0;
            break;
    }

    // Calcular o preço médio
    var precoMarca = precoMaximo / 2;

    // Definir o preço baseado na qualidade
    switch (qualidadeDado) {
        case "Regular":
            precoQualidade = precoMinimo;
            break;
        case "Bom":
            precoQualidade = precoMarca * 0.45;
            break;
        case "Muito Bom":
            precoQualidade = precoMarca * 0.75;
            break;
        case "Nunca Usado":
            precoQualidade = precoMarca;
            break;
        default:
            precoQualidade = 0;
            break;
    }

    // Calcular o preço final baseado na marca
    switch (marcaDado) {
        case "Nacional/Genérica":
            precoFinal = precoQualidade;
            break;
        case "Nacional Plus":
            precoFinal = precoMarca * 0.45 + precoQualidade;
            break;
        case "Importada":
            precoFinal = precoMarca * 0.75 + precoQualidade;
            break;
        case "Importada Plus":
            precoFinal = precoMarca + precoQualidade;
            break;
        default:
            precoFinal = 0;
            break;
    }

    // Adicionar 0.99 se o preço final for menor que 10
    if (precoFinal < 10) {
        precoFinal += 0.99;
    }
    var moeda = precoFinal.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    // Verificar se todos os campos obrigatórios foram preenchidos antes de prosseguir
    if (tipoDado == 0) {
        alert("Tipo do produto não pode estar em branco. Favor selecioná-lo!");
    } else if (qualidadeDado == 0) {
        alert("Qualidade do produto não pode estar em branco. Favor selecioná-la!");
    } else if (marcaDado == 0) {
        alert("Marca do produto não pode estar em branco. Favor selecioná-la!");
    } else if (quantidade == "" || quantidade == 0) {
        alert("Quantidade do produto não pode estar em branco ou zerada. Favor selecioná-la!");
    } else {
        cadastrarProduto(tipoDado, qualidadeDado, marcaDado, quantidade, moeda);
    }
    alert(moeda);
}

function cadastrarProduto(tipo, qualidade, marca, quantidade, moeda) {
    // Verificar se algum dos argumentos é null
    if (tipo === null || qualidade === null || marca === null || quantidade === null || moeda === null) {
        alert("Um ou mais campos estão vazios. Por favor, preencha todos os campos.");
        return;
    }

    // Criar o objeto novoProduto
    var novoProduto = {tipo: tipo, qualidade: qualidade, marca: marca, quantidade: quantidade, moeda: moeda};

    // Verificar se o armazenamento local é suportado pelo navegador
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos", JSON.stringify(produtos));
        location.reload();
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}

function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<body style=\"background-color:aqua;  margin: 100px;\">")
        document.write("<h1 style=\"margin-top: 100px;\">Histórico</h1>")
        document.write("<title>Histórico</title>")
        if (produtos == null)
            document.write("<h3 style=\"font-size:30px;\">Ainda não há nenhum item no estoque</h3>");
        else {
            produtos = JSON.parse(produtos);
            var valorTotalEstoque = 0; // Inicializa o valor total do estoque

            produtos.forEach(produto => {
                document.write("<ul style=\"background-color:aqua;list-style-type: none; width:680px; margin-top: 10px;  font-size:30px;\">");
                document.write("<li>Tipo do produto: " + produto.tipo + "</li>");
                document.write("<li>Qualidade do produto: " + produto.qualidade + "</li>");
                document.write("<li>Marca do produto: " + produto.marca + "</li>");
                document.write("<li>Quantidade no estoque: " + produto.quantidade + "</li>");
                document.write("<li>Preço Unitário: " + produto.moeda + "</li>");
                document.write("</ul>");

                // Extrai o valor numérico do preço unitário
                var precoUnitarioNumerico = parseFloat(produto.moeda.replace("R$", "").replace(",", ".").trim());
                // Calcula o valor total do produto
                var valorTotalProduto = precoUnitarioNumerico * produto.quantidade;
                // Soma ao valor total do estoque
                valorTotalEstoque += valorTotalProduto;
            });

            // Exibe o valor total do estoque após listar os produtos
            var moedaTotalEstoque = valorTotalEstoque.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
            document.write("<h3 style=\"font-size:30px;\">Valor Total do Histórico: " + moedaTotalEstoque + "</h3>");
        }
        document.write("</body>")
    } else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
}


function test3() {
    localStorage.clear();
}
