document.querySelectorAll('input[type="checkbox"]').forEach(item => {
    item.addEventListener('change', function () {
        const quantidadeInput = document.getElementById(`qtd${this.id.slice(-1)}`); // o slice(-1) pega o ultimo caraterar do id do checkbox
        // para habilitar ou desabilitar esse input
        quantidadeInput.disabled = !this.checked; // usado para habiliatar e
    });
});  
// usadno para verificar se o checkbox vai  esta habilitado ou desabilitado;

let cart = [];
document.querySelectorAll('input[type="checkbox"]').forEach(item => { // percoore tods os checkbox para adicionar ao carrinho
    item.addEventListener('change', atualizarCarrinho);
});
document.querySelectorAll('.quantidade').forEach(item => { // percorre todos o inputs de quantidade para atualizer oa valores
    item.addEventListener('input', atualizarCarrinho);
});

// função que atualizar carringo aparti dos checkbox e iinputs que foram selecionado e preeechido;
function atualizarCarrinho() {
    cart = [];
    let totalpreco = 0;
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(item => {
        const quantidade = document.getElementById(`qtd${item.id.slice(-1)}`).value;
        const preco = item.dataset.preco;
        cart.push({
            name: item.value,
            quantidade: quantidade,
            preco: preco
        });
        totalpreco += quantidade * preco;
    });

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.quantidade} x ${item.name} - R$${(item.quantidade * item.preco).toFixed(2)}`;
        cartItems.appendChild(li);
    });

    document.getElementById('totalpreco').textContent = totalpreco.toFixed(2);
}

//    mostra um resumo 
document.getElementById('finalizar').addEventListener('click', function () {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    document.querySelector('.cart').style.display = 'none';
    document.getElementById('resumo').style.display = 'block';

    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.quantidade} x ${item.name} - R$${(item.quantidade * item.preco).toFixed(2)}`;
        orderItems.appendChild(li);
    });

    document.getElementById('ordertotalpreco').textContent = document.getElementById('totalpreco').textContent;
});

 //   mostra as informaçoes do input de endereo e forma de pagamento;
document.getElementById('Confirmar').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const endereco = document.getElementById('endereco').value;
    const formapag = document.getElementById('formapag').value;

    if (!name || !endereco) {
        alert('Por favor, preencha seu nome e endereço.');
        return;
    }
    //   mostra as informaçoes do input de endereo e forma de pagamento;
    alert(`Pedido confirmado!\nNome: ${name}\nEndereço: ${endereco}\nForma de Pagamento: ${formapag}\nTotal: R$${document.getElementById('ordertotalpreco').textContent}`);
});

document.getElementById('cancelar').addEventListener('click', function () {
    if (confirm('Tem certeza que deseja cancelar o pedido?')) {
        location.reload();
    }
});
