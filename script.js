//Relógio 
function atualizarRelogio(){
  
  const agora = new Date();
  
  const hora = agora.toLocaleTimeString("pt-BR");
  const data = agora.toLocaleDateString("pt-BR");
  
  document.getElementById("relogio").textContent = hora;
  
  document.getElementById("data").textContent = data;
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();

// Registrar Ponto // 

function registrar(tipo){
  const nome = document.getElementById("nome").value.trim();
  const linha = document.getElementById("linha").value.trim();
  const carro = document.getElementById("carro").value.trim();
  const escala = document.getElementById("escala").value.trim();
  if(nome === "" || linha === "" || carro === "" ||  escala === ""){
    alert("Preencha seus dados antes de bater o ponto.");
    
    return
  }
 
 
  const agora = new Date(); 
  const registro = {
    nome: nome,
    linha: linha,
    carro: carro,
    escala: escala,
    tipo: tipo,
    data: agora.toLocaleDateString("pt-BR"),
    hora: agora.toLocaleTimeString("pt-BR"),
  };
  
  let pontos =
  JSON.parse(localStorage.getItem("pontos")) || [];
  
  pontos.push(registro);
  
  localStorage.setItem(
    "pontos",
    JSON.stringify(pontos)
  );
  
  mostrarHistorico();
  
  alert(tipo + " registrada com sucesso!");
}

function mostrarHistorico() {
  
  const historico = document.getElementById("historico");
  
  const pontos = JSON.parse(localStorage.getItem("pontos")) || [];
  
  if (pontos.length === 0) {
     
    historico.innerHTML = "Nenhum ponto registrado.";
    
    return;
  }
  
  historico.innerHTML = "";
  
  pontos.reverse().forEach(ponto =>{
    
    const div = document.createElement("div");
    
    div.className = "registro";
    
    div.innerHTML = `
     
     <strong>${ponto.tipo}</strong><br>
     
     Motorista: ${ponto.nome}<br>
     
     Linha: ${ponto.linha}<br>
     
     Carro: ${ponto.carro}<br>
     
     Escala: ${ponto.escala}<br>
     
     Data: ${ponto.data}<br>
     
     Horario: ${ponto.hora}
    `;
    
    historico.appendChild(div);
    
  });
}

function limpar(
){
  
  if(confirm("Deseja apagar todo o historico?")){
  localStorage.removeItem("pontos");
  mostrarHistorico();
  }
}

mostrarHistorico();