let allItems = [];

fetch('data/items.json')
  .then(response => response.json())
  .then(data => {
    const rawItems = Array.isArray(data) ? data : data.items || [];
    allItems = rawItems.map(normalizeItem);
    renderItems(allItems);
  });

function normalizeItem(item) {
  return {
    id: item.id || '',
    name: item.display?.name || item.nome || item.name || 'Item sem nome',
    image: item.display?.image || item.imagem || item.image || 'img/placeholder.png',
    level: Number(item.classification?.level || item.nivel || item.level || 1),
    category: item.classification?.category || item.categoria || item.category || 'Misc',
    rarity: Number(item.classification?.rarity || item.raridade || item.rarity || 0),
    value: Number(item.pricing?.value || item.valor || item.value || 0),
    lastUpdate: item.pricing?.lastUpdate || item.ultima_atualizacao || item.lastUpdate || '',
    packageId: item.relations?.packageId || item.packageId || '',
    packageName: item.relations?.packageName || item.packageName || '',
    notes: item.notes || item.description || ''
  };
}

function renderItems(items) {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';
  const packageMap = new Map();

  items.forEach(item => {
    if (!item.packageId) return;
    const packageItems = packageMap.get(item.packageId) || [];
    packageItems.push(item);
    packageMap.set(item.packageId, packageItems);
  });

  items.forEach(item => {
    const slot = document.createElement('div');
    slot.classList.add('item-slot');

    const card = document.createElement('div');
    card.classList.add('item-card');

    card.innerHTML = `
      <div class="item-preview">
        <img src="${item.image}" alt="${escapeHtml(item.name)}">
        <div class="item-name">${escapeHtml(item.name)}</div>
      </div>
      <div class="item-details">
        <div class="item-row">
          <span>Level</span>
          <strong>${formatLevel(item.level)}</strong>
        </div>
        <div class="item-row">
          <span>Categoria</span>
          <strong>${escapeHtml(item.category)}</strong>
        </div>
        ${renderPackageRow(item, packageMap)}
        <div class="item-row">
          <span>Raridade</span>
          <div class="stat-group" title="Raridade: ${escapeHtml(getRarityLabel(item.rarity))} (${clampScale(item.rarity, 5)}/5)">
            ${generateBar(item.rarity, 5)}
            <small>${getRarityLabel(item.rarity)} (${clampScale(item.rarity, 5)}/5)</small>
          </div>
        </div>
        <div class="item-row">
          <span>Valor médio</span>
          <strong>${formatPrice(item.value)}</strong>
        </div>
        ${renderRelatedItems(item, packageMap)}
        ${renderItemNotes(item)}
        <div class="item-meta">Atualizado em: ${formatDate(item.lastUpdate)}</div>
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

    slot.appendChild(card);
    container.appendChild(slot);
  });
}

function renderPackageRow(item, packageMap) {
  if (!item.packageId) return '';

  const packageCount = packageMap.get(item.packageId)?.length || 0;
  const packageLabel = item.packageName || item.packageId;
  const countLabel = packageCount > 1 ? ` (${packageCount} itens)` : '';

  return `
    <div class="item-row">
      <span>Pacote</span>
      <strong>${escapeHtml(packageLabel)}${countLabel}</strong>
    </div>
  `;
}

function renderRelatedItems(item, packageMap) {
  if (!item.packageId) return '';

  const related = (packageMap.get(item.packageId) || [])
    .filter(packageItem => packageItem.id !== item.id)
    .map(packageItem => escapeHtml(packageItem.name));

  if (related.length === 0) return '';

  return `<div class="item-related">Relacionados: ${related.join(', ')}</div>`;
}

function renderItemNotes(item) {
  if (!item.notes) return '';
  return `<div class="item-note">${escapeHtml(item.notes)}</div>`;
}

function generateBar(value, max) {
  const safeValue = clampScale(value, max);
  const percentage = (safeValue / max) * 100;
  return `
    <div class="stat-bar" aria-label="Indicador ${safeValue} de ${max}">
      <div class="stat-fill" style="width: ${percentage}%"></div>
    </div>
  `;
}

function clampScale(value, max) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.max(0, Math.min(max, numeric));
}

function formatLevel(value) {
  return `${clampScale(value, 5)}/5`;
}

function getRarityLabel(value) {
  const rarity = clampScale(value, 5);
  if (rarity <= 1) return 'Muito comum';
  if (rarity <= 2) return 'Comum';
  if (rarity <= 3) return 'Incomum';
  if (rarity <= 4) return 'Raro';
  return 'Muito raro';
}

function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0
  }).format(value);
}

function formatDate(value) {
  if (!value) return '-';

  if (value.includes('-')) {
    const parsed = new Date(`${value}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('pt-BR');
    }
  }

  return value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.getElementById('searchInput').addEventListener('input', filterItems);
document.getElementById('categoryFilter').addEventListener('change', filterItems);

function filterItems() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const filtered = allItems.filter(item => {
    const matchName = item.name.toLowerCase().includes(search);
    const matchCategory = category === 'Todos' || item.category === category;
    return matchName && matchCategory;
  });

  renderItems(filtered);
}
