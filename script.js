const ALL_CATEGORY_VALUE = 'All';
const LANGUAGE_STORAGE_KEY = 'safrabr_language';
const CATEGORY_LABELS = {
  All: { 'pt-BR': 'Todas as categorias', en: 'All categories' },
  TreeCutters: { 'pt-BR': 'Cortadores de Àrvores', en: 'Tree Cutters' },
  Tractors: { 'pt-BR': 'Tratores', en: 'Tractors' },
  Harvesters: { 'pt-BR': 'Colheitadeiras', en: 'Harvesters' },
  Trucks: { 'pt-BR': 'Caminhões', en: 'Trucks' },
  Trailers: { 'pt-BR': 'Reboques', en: 'Trailers' },
  Plows: { 'pt-BR': 'Arados', en: 'Plows' },
  Cultivators: { 'pt-BR': 'Cultivadores', en: 'Cultivators' },
  Seeders: { 'pt-BR': 'Plantadeiras', en: 'Seeders' },
  SeedBoxes: { 'pt-BR': 'Caixas de Sementes', en: 'Seed Boxes' },
  Misc: { 'pt-BR': 'Diversos', en: 'Misc' }
};
let allItems = [];
let currentLanguage = 'pt-BR';

const I18N = {
  'pt-BR': {
    subtitle: 'Catalogo de Itens do Farming and Friends',
    searchPlaceholder: 'Buscar item...',
    clearSearchLabel: 'Limpar busca',
    levelLabel: 'Level',
    categoryLabel: 'Categoria',
    packageLabel: 'Pacote',
    speedLabel: 'Velocidade',
    averageValueLabel: 'Valor',
    relatedLabel: 'Relacionados',
    updatedAtLabel: 'Atualizado em',
    itemsSuffix: 'itens',
    indicatorLabel: 'Indicador {value} de {max}',
    footerCreditPrefix: 'Criado por',
    specialOnlyLabel: 'Somente especiais',
    noItemsFound: 'Nenhum item encontrado. Ajuste sua busca ou filtros.',
    noItemsInCatalog: 'Nenhum item disponivel no catalogo.'
  },
  en: {
    subtitle: 'Farming and Friends Item Catalog',
    searchPlaceholder: 'Search item...',
    clearSearchLabel: 'Clear search',
    levelLabel: 'Level',
    categoryLabel: 'Category',
    packageLabel: 'Bundle',
    speedLabel: 'Speed',
    averageValueLabel: 'Average value',
    relatedLabel: 'Related',
    updatedAtLabel: 'Updated on',
    itemsSuffix: 'items',
    indicatorLabel: 'Indicator {value} of {max}',
    footerCreditPrefix: 'Powered by',
    specialOnlyLabel: 'Special only',
    noItemsFound: 'No items found. Try adjusting your search or filters.',
    noItemsInCatalog: 'No items available in the catalog.'
  }
};

currentLanguage = getInitialLanguage();

fetch('data/items.json')
  .then(response => response.json())
  .then(data => {
    const rawItems = Array.isArray(data) ? data : data.items || [];
    allItems = rawItems.map(normalizeItem);
    applyInterfaceLanguage();
    renderItems(allItems);
  })
  .catch(() => {
    applyInterfaceLanguage();
    renderItems([]);
  });

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage && I18N[savedLanguage]) {
    return savedLanguage;
  }
  return 'pt-BR';
}

function t(key, replacements = {}) {
  const dictionary = I18N[currentLanguage] || I18N['pt-BR'];
  let text = dictionary[key] || I18N['pt-BR'][key] || key;

  Object.entries(replacements).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, value);
  });

  return text;
}

function applyInterfaceLanguage() {
  document.documentElement.lang = currentLanguage;

  const languageSwitch = document.getElementById('languageSwitch');
  languageSwitch.value = currentLanguage;
  languageSwitch.setAttribute('aria-label', currentLanguage === 'en' ? 'Language' : 'Idioma');

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = t(key);
  });

  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (clearSearchBtn) {
    const clearLabel = t('clearSearchLabel');
    clearSearchBtn.setAttribute('aria-label', clearLabel);
    clearSearchBtn.setAttribute('title', clearLabel);
  }

  document.querySelectorAll('#categoryFilter option[data-category-key]').forEach(option => {
    const key = option.getAttribute('data-category-key');
    option.textContent = getCategoryLabel(key);
  });
}

function normalizeItem(item) {
  const rawCategory = firstNonEmptyText([
    item.classification?.category,
    item.categoria,
    item.category
  ]);
  const rawSpeed = firstDefinedValue([
    item.classification?.speed,
    item.velocidade,
    item.speed,
    item.classification?.rarity,
    item.raridade,
    item.rarity
  ]);
  const rawSpeedMin = firstDefinedValue([
    item.classification?.speedMin,
    item.speedMin,
    item.classification?.speedRange?.min,
    item.speedRange?.min,
    item.classification?.rarityMin,
    item.rarityMin,
    item.classification?.rarityRange?.min,
    item.rarityRange?.min
  ]);
  const rawSpeedMax = firstDefinedValue([
    item.classification?.speedMax,
    item.speedMax,
    item.classification?.speedRange?.max,
    item.speedRange?.max,
    item.classification?.rarityMax,
    item.rarityMax,
    item.classification?.rarityRange?.max,
    item.rarityRange?.max
  ]);

  return {
    id: item.id || '',
    name: item.display?.name || item.nome || item.name || 'Unnamed item',
    image: item.display?.image || item.imagem || item.image || 'img/placeholder.png',
    level: toNumberOrNull(firstDefinedValue([item.classification?.level, item.nivel, item.level])),
    category: rawCategory || '',
    categoryKey: rawCategory ? resolveCategoryKey(rawCategory) : '',
    speed: toNumberOrNull(rawSpeed),
    speedMin: toNumberOrNull(rawSpeedMin),
    speedMax: toNumberOrNull(rawSpeedMax),
    value: toNumberOrNull(firstDefinedValue([item.pricing?.value, item.valor, item.value])),
    lastUpdate: firstNonEmptyText([item.pricing?.lastUpdate, item.ultima_atualizacao, item.lastUpdate]) || '',
    special: toBoolean(
      item.access?.special
      ?? item.special
      ?? item.isSpecial
      ?? item.access?.premium
      ?? item.premium
      ?? item.isPremium
      ?? item.access?.limited
      ?? item.limited
      ?? item.isLimited
    ),
    packageId: item.relations?.packageId || item.packageId || '',
    packageName: item.relations?.packageName || item.packageName || '',
    notes: item.notes || item.description || ''
  };
}

function renderItems(items) {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';

  if (items.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = allItems.length === 0 ? t('noItemsInCatalog') : t('noItemsFound');
    container.appendChild(emptyState);
    return;
  }

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
        <div class="item-image" role="img" aria-label="${escapeHtml(item.name)}" style="${getItemImageStyle(item.image)}"></div>
        <div class="item-name">${escapeHtml(item.name)}</div>
      </div>
      <div class="item-details">
        ${renderLevelRow(item)}
        ${renderCategoryRow(item)}
        ${renderSpeedRow(item)}
        ${renderValueRow(item)}
        ${renderPackageRow(item, packageMap)}
        ${renderRelatedItems(item, packageMap)}
        ${renderItemNotes(item)}
        ${renderUpdateRow(item)}
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

function renderLevelRow(item) {
  if (item.level === null) return '';
  return `
    <div class="item-row">
      <span>${t('levelLabel')}</span>
      <strong>${formatLevel(item.level)}</strong>
    </div>
  `;
}

function renderCategoryRow(item) {
  if (!item.category) return '';
  return `
    <div class="item-row">
      <span>${t('categoryLabel')}</span>
      <strong>${escapeHtml(item.category)}</strong>
    </div>
  `;
}

function renderSpeedRow(item) {
  if (item.speed === null) return '';
  const range = resolveSpeedRange(item);
  if (!range) return '';
  const speedSummary = getSpeedSummary(item.speed, range.min, range.max);

  return `
    <div class="item-row">
      <span>${t('speedLabel')}</span>
      <div class="stat-group" title="${escapeHtml(`${t('speedLabel')}: ${speedSummary}`)}">
        ${generateBar(item.speed, range.min, range.max)}
        <small>${speedSummary}</small>
      </div>
    </div>
  `;
}

function renderValueRow(item) {
  if (item.value === null) return '';
  return `
    <div class="item-row">
      <span>${t('averageValueLabel')}</span>
      <strong>${formatPrice(item.value)}</strong>
    </div>
  `;
}

function renderPackageRow(item, packageMap) {
  if (!item.packageId) return '';

  const packageCount = packageMap.get(item.packageId)?.length || 0;
  const packageLabel = item.packageName || item.packageId;
  const countLabel = packageCount > 1 ? ` (${packageCount} ${t('itemsSuffix')})` : '';

  return `
    <div class="item-row">
      <span>${t('packageLabel')}</span>
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

  return `<div class="item-related">${t('relatedLabel')}: ${related.join(', ')}</div>`;
}

function renderItemNotes(item) {
  if (!item.notes) return '';
  return `<div class="item-note">${escapeHtml(item.notes)}</div>`;
}

function renderUpdateRow(item) {
  if (!item.lastUpdate) return '';
  return `<div class="item-meta">${t('updatedAtLabel')}: ${formatDate(item.lastUpdate)}</div>`;
}

function generateBar(value, min, max) {
  const safeValue = clampScale(value, min, max);
  const rangeSize = Math.max(1, max - min);
  const percentage = ((safeValue - min) / rangeSize) * 100;
  const ariaLabel = escapeHtml(t('indicatorLabel', { value: safeValue, max }));
  return `
    <div class="stat-bar" aria-label="${ariaLabel}">
      <div class="stat-fill" style="width: ${percentage}%"></div>
    </div>
  `;
}

function clampScale(value, min, max) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.max(min, Math.min(max, numeric));
}

function formatLevel(value) {
  return `${clampScale(value, 0, 5)}/5`;
}

function resolveSpeedRange(item) {
  if (item.speed === null) return null;

  const min = item.speedMin ?? 0;
  const fallbackMax = min === 0 ? 100 : item.speed;
  let max = item.speedMax ?? fallbackMax;

  if (max <= min) {
    max = item.speed > min ? item.speed : min + 1;
  }

  return { min, max };
}

function getSpeedSummary(value, min, max) {
  return `${value}/${max}`;
}

function formatPrice(value) {
  const locale = currentLanguage === 'en' ? 'en-US' : 'pt-BR';
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0
  }).format(value);
}

function formatDate(value) {
  if (!value) return '-';

  if (value.includes('-')) {
    const parsed = new Date(`${value}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      const locale = currentLanguage === 'en' ? 'en-US' : 'pt-BR';
      return parsed.toLocaleDateString(locale);
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

function getItemImageStyle(imagePath) {
  const safePath = escapeCssUrl(imagePath || 'img/placeholder.png');
  const fallbackPath = escapeCssUrl('img/placeholder.png');
  return `background-image: url('${safePath}'), url('${fallbackPath}');`;
}

function escapeCssUrl(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function firstDefinedValue(values) {
  return values.find(value => value !== undefined && value !== null && value !== '');
}

function firstNonEmptyText(values) {
  const value = values.find(candidate => typeof candidate === 'string' ? candidate.trim() : candidate);
  if (typeof value === 'string') return value.trim();
  return value || '';
}

function toNumberOrNull(value) {
  if (value === undefined || value === null || value === '') return null;
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
}

function filterItems() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const specialOnly = document.getElementById('specialFilter').checked;

  const filtered = allItems.filter(item => {
    const matchName = item.name.toLowerCase().includes(search);
    const matchCategory = category === ALL_CATEGORY_VALUE || item.categoryKey === category;
    const matchSpecial = !specialOnly || item.special;
    return matchName && matchCategory && matchSpecial;
  });

  renderItems(filtered);
}

document.getElementById('searchInput').addEventListener('input', filterItems);
document.getElementById('categoryFilter').addEventListener('change', filterItems);
document.getElementById('specialFilter').addEventListener('change', filterItems);
document.getElementById('languageSwitch').addEventListener('change', event => {
  const nextLanguage = I18N[event.target.value] ? event.target.value : 'pt-BR';
  currentLanguage = nextLanguage;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  applyInterfaceLanguage();
  filterItems();
});

const searchInputEl = document.getElementById('searchInput');
const clearSearchBtnEl = document.getElementById('clearSearchBtn');

if (searchInputEl && clearSearchBtnEl) {
  searchInputEl.addEventListener('input', updateClearSearchVisibility);
  clearSearchBtnEl.addEventListener('click', () => {
    searchInputEl.value = '';
    updateClearSearchVisibility();
    filterItems();
    searchInputEl.focus();
  });
  updateClearSearchVisibility();
}

function getCategoryLabel(key) {
  const labels = CATEGORY_LABELS[key];
  if (!labels) return key;
  return labels[currentLanguage] || labels['pt-BR'];
}

function resolveCategoryKey(rawCategory) {
  const normalized = String(rawCategory || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
  const compact = normalized.replace(/[^a-z0-9]+/g, '');

  const aliases = {
    treecutters: 'TreeCutters',
    treecuter: 'TreeCutters',
    cortadoresdearvore: 'TreeCutters',
    tractors: 'Tractors',
    trator: 'Tractors',
    tratores: 'Tractors',
    harvesters: 'Harvesters',
    colheitadeira: 'Harvesters',
    colheitadeiras: 'Harvesters',
    trucks: 'Trucks',
    caminhao: 'Trucks',
    caminhoes: 'Trucks',
    trailers: 'Trailers',
    reboque: 'Trailers',
    reboques: 'Trailers',
    plows: 'Plows',
    arado: 'Plows',
    arados: 'Plows',
    cultivators: 'Cultivators',
    cultivador: 'Cultivators',
    cultivadores: 'Cultivators',
    seeders: 'Seeders',
    planter: 'Seeders',
    planters: 'Seeders',
    plantadeira: 'Seeders',
    plantadeiras: 'Seeders',
    seedboxes: 'SeedBoxes',
    seed_boxes: 'SeedBoxes',
    caixasdesementes: 'SeedBoxes',
    misc: 'Misc',
    diversos: 'Misc',
    equipamentos: 'Misc'
  };

  return aliases[compact] || aliases[normalized] || 'Misc';
}

function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'sim';
  }
  return false;
}

function updateClearSearchVisibility() {
  if (!searchInputEl || !clearSearchBtnEl) return;
  const hasValue = searchInputEl.value.trim().length > 0;
  clearSearchBtnEl.classList.toggle('is-visible', hasValue);
}

const backToTopBtn = document.getElementById('backToTopBtn');
const controlsSearch = document.querySelector('.controls-search');

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', handleScrollUiState, { passive: true });
handleScrollUiState();

function handleScrollUiState() {
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  const showFloatingUi = y > 240;

  if (backToTopBtn) {
    backToTopBtn.classList.toggle('is-visible', showFloatingUi);
  }

  if (controlsSearch) {
    controlsSearch.classList.toggle('is-sticky', y > 120);
  }
}
