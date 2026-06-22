const unidadesMedida = ["g", "kg", "l", "ml"];

const conteinerReceitas = document.querySelector(".conteinerReceitas");
const botaoAdicionar = document.querySelector(".adicionarMais");
const botaoSalvar = document.querySelector(".botoes button:last-child");

const nomeReceita = document.querySelector('.conteinerReceita input[placeholder="Digite o nome da receita..."]');
const rendimento = document.querySelector(".blocoduplo input");
const unidadeRendimento = document.querySelector("#unidadeMedida");
const validade = document.querySelector('.conteinerReceita input[placeholder="Ex: 10 dias"]');
const descricao = document.querySelector(".conteinerReceita textarea");

function pegarInsumos(){
    return JSON.parse(localStorage.getItem("insumos")) || [];
}

function pegarReceitas(){
    return JSON.parse(localStorage.getItem("receitas")) || [];
}

function salvarReceitas(receitas){
    localStorage.setItem("receitas", JSON.stringify(receitas));
}

function numero(valor){
    return Number(String(valor || 0).replace(",", ".")) || 0;
}

function gerarOptions(lista){
    return lista.map(item => `<option value="${item}">${item}</option>`).join("");
}

function normalizarUnidade(unidade){
    return String(unidade || "").toLowerCase().trim();
}

function converterParaBase(quantidade, unidade){
    unidade = normalizarUnidade(unidade);
    quantidade = numero(quantidade);

    if(unidade === "kg"){
        return quantidade * 1000;
    }

    if(unidade === "g"){
        return quantidade;
    }

    if(unidade === "l"){
        return quantidade * 1000;
    }

    if(unidade === "ml"){
        return quantidade;
    }

    return quantidade;
}

function carregarInsumosOptions(){
    const insumos = pegarInsumos();

    return insumos.map(insumo => `
        <option value="${insumo.nome}">
            ${insumo.nome}
        </option>
    `).join("");
}

function criarBlocoInsumo(){
    const bloco = document.createElement("div");
    bloco.className = "blocoInsumo";

    bloco.innerHTML = `
        <div class="blocoReceita">
            <label>Insumo</label>
            <select class="selectInsumo">
                <option value="">Selecione um insumo...</option>
                ${carregarInsumosOptions()}
            </select>
        </div>

        <div class="linhaInsumo">
            <div class="blocoReceita">
                <label>Quantidade</label>
                <input type="number" class="inputQuantidade">
            </div>

            <div class="blocoReceita">
                <label>Unidade</label>
                <select class="selectUnidade">
                    ${gerarOptions(unidadesMedida)}
                </select>
            </div>
        </div>
    `;

    conteinerReceitas.insertBefore(bloco, botaoAdicionar);
}

function buscarInsumo(nomeInsumo){
    return pegarInsumos().find(insumo =>
        String(insumo.nome).toLowerCase().trim() ===
        String(nomeInsumo).toLowerCase().trim()
    );
}

function calcularCustoItemReceita(item){
    const insumoCadastrado = buscarInsumo(item.insumo);

    if(!insumoCadastrado){
        return 0;
    }

    const valorTotalInsumo = numero(insumoCadastrado.valor);
    const quantidadeTotalInsumo = numero(insumoCadastrado.quantidade);
    const unidadeTotalInsumo = insumoCadastrado.unidade;

    const quantidadeUsada = numero(item.quantidade);
    const unidadeUsada = item.unidade;

    const quantidadeTotalBase = converterParaBase(quantidadeTotalInsumo, unidadeTotalInsumo);
    const quantidadeUsadaBase = converterParaBase(quantidadeUsada, unidadeUsada);

    if(quantidadeTotalBase === 0){
        return 0;
    }

    const valorPorUnidadeBase = valorTotalInsumo / quantidadeTotalBase;

    return valorPorUnidadeBase * quantidadeUsadaBase;
}

function calcularCustoTotal(listaInsumos){
    let total = 0;

    listaInsumos.forEach(item => {
        total += calcularCustoItemReceita(item);
    });

    return total;
}

function limparFormulario(){
    nomeReceita.value = "";
    rendimento.value = "";
    unidadeRendimento.selectedIndex = 0;
    validade.value = "";
    descricao.value = "";

    document.querySelectorAll(".blocoInsumo").forEach(bloco => bloco.remove());

    criarBlocoInsumo();
}

function salvarReceita(){
    const blocos = document.querySelectorAll(".blocoInsumo");
    const listaInsumos = [];

    blocos.forEach(bloco => {
        const insumo = bloco.querySelector(".selectInsumo").value;
        const quantidade = bloco.querySelector(".inputQuantidade").value;
        const unidade = bloco.querySelector(".selectUnidade").value;

        if(insumo && quantidade){
            const item = {
                insumo,
                quantidade,
                unidade
            };

            const custoItem = calcularCustoItemReceita(item);

            item.custo = Number(custoItem.toFixed(2));

            listaInsumos.push(item);
        }
    });

    const custoTotalReceita = calcularCustoTotal(listaInsumos);
    const rendimentoReceita = numero(rendimento.value) || 1;
    const custoUnitarioReceita = custoTotalReceita / rendimentoReceita;

    const novaReceita = {
        id: Date.now(),
        produto: nomeReceita.value.trim(),
        rendimento: rendimento.value,
        unidadeRendimento: unidadeRendimento.value,
        validade: validade.value,
        descricao: descricao.value,
        insumos: listaInsumos,
        custoTotalReceita: Number(custoTotalReceita.toFixed(2)),
        custoUnitarioReceita: Number(custoUnitarioReceita.toFixed(2))
    };

    if(!novaReceita.produto || !novaReceita.rendimento || listaInsumos.length === 0){
        alert("Preencha o nome da receita, rendimento e pelo menos um insumo.");
        return;
    }

    const receitas = pegarReceitas();

    receitas.push(novaReceita);

    salvarReceitas(receitas);

    limparFormulario();

    alert("Receita salva com sucesso!");
}

botaoAdicionar.addEventListener("click", criarBlocoInsumo);

botaoSalvar.addEventListener("click", (event) => {
    event.preventDefault();
    salvarReceita();
});

document.querySelectorAll(".conteinerReceitas > .blocoReceita").forEach(item => item.remove());
document.querySelector(".conteinerReceitas > div")?.remove();

criarBlocoInsumo();