function Pessoa(altura, peso) {
    if (!altura || !peso) {
        throw new Error("Altura e peso são obrigatórios");
    }

    this.altura = altura;
    this.peso = peso;
}

function Nutricionista(altura, peso) {
    Pessoa.call(this, altura, peso);
    this.imc = function () {
        return this.peso / (this.altura * this.altura);
    };

    this.classificaIMC = function () {
        var imc = this.imc();
        if (imc < 18.5) {
            return "Abaixo do peso, procure um nutricionista!";
        }
        if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal, parabéns!";
        }
        if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso, cuidado para não ter problemas!";
        }

        return "Obesidade, procure um nutricionista!";
    };
}
Nutricionista.prototype = Object.create(Pessoa.prototype);
Nutricionista.prototype.constructor = Nutricionista;

function renderizaResultadoIMC(nutricionista) {
    document.getElementById("imc").innerText =
        nutricionista.imc().toFixed(2) + " - " + nutricionista.classificaIMC();
        destacaClassificacao(nutricionista.classificaIMC());
  
}

function renderizaTabelaIMC() {
    const intervalos = [
        { faixa: "Menor que 18.5 - ", classificacao: "Abaixo do peso, procure um nutricionista!" },
        { faixa: "18.5 - 24.9 - ", classificacao: "Peso normal, parabéns!" },
        { faixa: "25 - 29.9 - ", classificacao: "Sobrepeso, cuidado para não ter problemas!" },
        { faixa: "30 ou mais - ", classificacao: "Obesidade, procure um nutricionista!" },
    ];

    let html = "<table id='tabela'><thead><tr><th>Intervalo IMC - </th><th>Classificação</th></tr></thead><tbody>";
    intervalos.forEach(item => {
        html += `<tr data-classificacao="${item.classificacao}">
                    <td>${item.faixa}</td>
                    <td>${item.classificacao}</td>
                 </tr>`;
    });
    html += "</tbody></table>";

    document.getElementById("tabelaIMC").innerHTML = html;
}

function destacaClassificacao(classificacao) {
    document.querySelectorAll("#tabela tr").forEach(tr => {
        tr.classList.remove("destacado");
    });

    let linha = document.querySelector(#tabela tr[data-classificacao="${classificacao}"]);
    if (linha) {
        linha.classList.add("destacado");
    }
}

function actionCalcularIMCBuilder() {
    var alturaEl = document.getElementById("altura");
    var pesoEl = document.getElementById("peso");

    return function actionCalcularIMC(evt) {
        evt.preventDefault();

        var nutricionista = new Nutricionista(
            parseFloat(alturaEl.value),
            parseFloat(pesoEl.value)
        );
        console.log(Nutricionista.prototype.constructor);
        console.log(nutricionista instanceof Pessoa);

        renderizaResultadoIMC(nutricionista);
    }
}

window.onload = function () {
    document
        .getElementById("calcular")
        .addEventListener("click", actionCalcularIMCBuilder());
    renderizaTabelaIMC();        
};
