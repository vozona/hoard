let allItems = [];

fetch('data/items.json')
  .then(response => response.json())
  .then(data => {
    allItems = data;
    renderItems(allItems);
  });

function renderItems(items) {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';

  items.forEach(item => {
    const slot = document.createElement('div');
    slot.classList.add('item-slot');

    const card = document.createElement('div');
    card.classList.add('item-card');

    card.innerHTML = `
      <div class="item-preview">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="item-name">${item.nome}</div>
      </div>
      <div class="item-details">
        <div class="item-basic">
          Raridade: ${generateStars(item.raridade)}<br>
          Valor: ${formatPrice(item.valor)}
        </div>
        Categoria: ${item.categoria}<br>
        Estabilidade: ${item.estabilidade}<br>
        Demanda: ${generateStars(item.demanda)}<br>
        Última atualização: ${item.ultima_atualizacao}<br>
        <button class="suggest-btn" data-item="${item.nome}">
          Sugerir preço
        </button>
      </div>
    `;

    card.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');

      document.querySelectorAll('.item-card.expanded').forEach(otherCard => {
        otherCard.classList.remove('expanded');
      });

      if (!wasExpanded) {
        card.classList.add('expanded');
      }
    });

    const suggestButton = card.querySelector('.suggest-btn');
    suggestButton.addEventListener('click', event => {
      event.stopPropagation();
      suggestPrice(item.nome);
    });

    slot.appendChild(card);
    container.appendChild(slot);
  });
}

function generateStars(value) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += i < value ? '⭐' : '☆';
  }
  return stars;
}

function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function suggestPrice(itemName) {
  alert(`Sugestão de preço para: ${itemName}`);
}

document.getElementById('searchInput').addEventListener('input', filterItems);
document.getElementById('categoryFilter').addEventListener('change', filterItems);

function filterItems() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const filtered = allItems.filter(item => {
    const matchName = item.nome.toLowerCase().includes(search);
    const matchCategory = category === 'Todos' || item.categoria === category;
    return matchName && matchCategory;
  });

  renderItems(filtered);
}
