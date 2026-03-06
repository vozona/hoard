const ALL_CATEGORY_VALUE = 'All';
const LANGUAGE_STORAGE_KEY = 'safrabr_language';
const VIEW_MODE_STORAGE_KEY = 'safrabr_view_mode';
const DEFAULT_SORT_MODE = 'category-name';
const ACTION_FORM_LINKS = {
  announce: '',
  reportPrice: ''
};
const CATEGORY_DISPLAY_ORDER = [
  'TreeCutters',
  'Tractors',
  'Plows',
  'Cultivators',
  'Seeders',
  'SeedBoxes',
  'Harvesters',
  'Trucks',
  'Trailers',
  'Misc'
];
const CATEGORY_SORT_INDEX = CATEGORY_DISPLAY_ORDER.reduce((accumulator, key, index) => {
  accumulator[key] = index;
  return accumulator;
}, Object.create(null));
const CATEGORY_LABELS = {
  All: { 'pt-BR': 'Todas as categorias', en: 'All categories' },
  TreeCutters: { 'pt-BR': 'Cortadores de Árvores', en: 'Tree Cutters' },
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
let currentViewMode = 'grid';

const I18N = {
  'pt-BR': {
    subtitlePrefix: 'Catálogo de Itens do',
    searchPlaceholder: 'Buscar por nome do item ou pacote...',
    clearSearchLabel: 'Limpar busca',
    levelLabel: 'Level',
    categoryLabel: 'Categoria',
    categoryFilterHintLabel: 'Filtrar por esta categoria',
    packageLabel: 'Pacote',
    speedLabel: 'Velocidade',
    rarityLabel: 'Raridade',
    rarityTier1: 'Comum',
    rarityTier2: 'Incomum',
    rarityTier3: 'Raro',
    rarityTier4: 'Muito raro',
    rarityTier5: 'Lendário',
    averageValueLabel: 'Valor',
    suggestedValueLabel: 'Valor sugerido',
    suggestedValueInfoLabel: 'Sobre valor sugerido',
    suggestedValueTooltip: 'Estes preços são apenas uma sugestão (não são oficiais!). Para chegar nesse valor, analisamos vários preços informados pela comunidade nas trocas entre jogadores e calculamos um valor médio mais justo. Lembre-se de que os valores podem mudar com o tempo, então use isso apenas como uma ajudinha na hora de fazer sua troca! Como referência prática, uma negociação pode variar cerca de 15% para cima ou para baixo.',
    relatedLabel: 'Relacionados',
    updatedAtLabel: 'Atualizado em',
    itemsSuffix: 'itens',
    indicatorLabel: 'Indicador {value} de {max}',
    footerCreditPrefix: 'Criado por',
    specialOnlyLabel: 'Somente itens especiais',
    cardHintLabel: 'Ver mais detalhes',
    shareButtonLabel: 'Compartilhar este item',
    shareCopiedLabel: 'Link copiado',
    moreActionsLabel: 'Mais ações',
    itemActionsMenuLabel: 'Opções do item',
    announceItemLabel: 'Tenho interesse',
    announceSoonLabel: 'Em breve',
    reportPriceLabel: 'Informar preço negociado',
    reportSoonLabel: 'Em breve',
    sortByLabel: 'Ordenar',
    sortFilterAriaLabel: 'Ordenação',
    viewModeLabel: 'Visualização',
    viewModeFilterAriaLabel: 'Modo de visualização',
    viewModeGrid: 'Grade',
    viewModeList: 'Lista',
    sortName: 'Nome',
    sortCategoryName: 'Categoria e nome',
    sortValueAsc: 'Menor preço primeiro',
    sortValueDesc: 'Maior preço primeiro',
    noItemsFound: 'Nenhum item encontrado. Ajuste sua busca ou filtros.',
    noItemsInCatalog: 'Nenhum item disponível no catálogo.',
    resultsCountLabel: '{shown} de {total} itens',
    noteSearchHintLabel: 'Usar esta nota na busca',
    quickLinkCommunityLabel: 'Comunidade',
    quickLinkShirtLabel: 'Camisa oficial',
    sortUpdatedDesc: 'Atualizado em (mais recente)',
    sortUpdatedAsc: 'Atualizado em (mais antigo)'
  },
  en: {
    subtitlePrefix: 'Item catalog for',
    searchPlaceholder: 'Search by item or pack name...',
    clearSearchLabel: 'Clear search',
    levelLabel: 'Level',
    categoryLabel: 'Category',
    categoryFilterHintLabel: 'Filter by this category',
    packageLabel: 'Bundle',
    speedLabel: 'Speed',
    rarityLabel: 'Rarity',
    rarityTier1: 'Common',
    rarityTier2: 'Uncommon',
    rarityTier3: 'Rare',
    rarityTier4: 'Very rare',
    rarityTier5: 'Legendary',
    averageValueLabel: 'Average value',
    suggestedValueLabel: 'Suggested value',
    suggestedValueInfoLabel: 'About suggested value',
    suggestedValueTooltip: 'These prices are only a suggestion (they are not official!). To estimate this value, we review several prices reported by the community in player-to-player trades and calculate a fairer average reference. Keep in mind values can change over time, so use this only as a helpful guide when making your trade. As a practical reference, a trade can vary by around 15% above or below this value.',
    relatedLabel: 'Related',
    updatedAtLabel: 'Updated on',
    itemsSuffix: 'items',
    indicatorLabel: 'Indicator {value} of {max}',
    footerCreditPrefix: 'Powered by',
    specialOnlyLabel: 'Special items only',
    cardHintLabel: 'View details',
    shareButtonLabel: 'Share this item',
    shareCopiedLabel: 'Link copied',
    moreActionsLabel: 'More actions',
    itemActionsMenuLabel: 'Item options',
    announceItemLabel: 'I am interested',
    announceSoonLabel: 'Soon',
    reportPriceLabel: 'Report trade price',
    reportSoonLabel: 'Soon',
    sortByLabel: 'Sort',
    sortFilterAriaLabel: 'Sort order',
    viewModeLabel: 'View',
    viewModeFilterAriaLabel: 'View mode',
    viewModeGrid: 'Grid',
    viewModeList: 'List',
    sortName: 'Name',
    sortCategoryName: 'Category and name',
    sortValueAsc: 'Lowest price first',
    sortValueDesc: 'Highest price first',
    noItemsFound: 'No items found. Try adjusting your search or filters.',
    noItemsInCatalog: 'No items available in the catalog.',
    resultsCountLabel: '{shown} of {total} items',
    noteSearchHintLabel: 'Use this note in search',
    quickLinkCommunityLabel: 'Community',
    quickLinkShirtLabel: 'Official shirt',
    sortUpdatedDesc: 'Updated on (newest)',
    sortUpdatedAsc: 'Updated on (oldest)'
  }
};

currentLanguage = getInitialLanguage();
currentViewMode = getInitialViewMode();

Promise.all([
  fetch('data/items.json').then(response => response.json()),
  fetch('data/items.market.json')
    .then(response => response.ok ? response.json() : ({ pricing: {} }))
    .catch(() => ({ pricing: {} }))
])
  .then(([itemsData, marketData]) => {
    const parsedItemsData = parseCatalogData(itemsData);
    const rawItems = Array.isArray(parsedItemsData) ? parsedItemsData : parsedItemsData.items || [];
    const marketMap = parseMarketData(marketData);

    allItems = rawItems.map(item => normalizeItem(item, marketMap[item.id] || {}));
    applyCatalogStateFromUrl();
    applyInterfaceLanguage();
    updateClearSearchVisibility();
    filterItems({ syncUrl: false });
    openItemFromUrl();
  })
  .catch(() => {
    applyInterfaceLanguage();
    renderItems([]);
  });

function parseCatalogData(data) {
  if (!data || typeof data !== 'object') {
    return { items: [] };
  }

  if (typeof data.payload === 'string' && data.payload.trim()) {
    try {
      const decoded = atob(data.payload);
      const parsed = JSON.parse(decoded);
      return parsed;
    } catch (error) {
      console.warn('Failed to decode catalog payload. Falling back to direct JSON.', error);
    }
  }

  return data;
}

function parseMarketData(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {};
  }

  const marketEntries = data.pricing && typeof data.pricing === 'object' ? data.pricing : {};
  return Object.entries(marketEntries).reduce((acc, [itemId, entry]) => {
    acc[itemId] = normalizeMarketEntry(entry);
    return acc;
  }, {});
}

function normalizeMarketEntry(entry) {
  const safeEntry = entry && typeof entry === 'object' ? entry : {};
  const history = Array.isArray(safeEntry.history)
    ? safeEntry.history.map(toNumberOrNull).filter(value => value !== null && value >= 0)
    : [];

  return {
    history,
    lastUpdate: firstNonEmptyText([safeEntry.lastUpdate]),
    valueStatus: firstNonEmptyText([safeEntry.valueStatus]),
    robux: toNumberOrNull(safeEntry.robux)
  };
}

function resolveSuggestedValue(valueHistory, fallbackValue) {
  if (Array.isArray(valueHistory) && valueHistory.length > 0) {
    return calculateMedian(valueHistory);
  }
  return fallbackValue;
}

function calculateMedian(values) {
  const numericValues = values
    .map(toNumberOrNull)
    .filter(value => value !== null)
    .sort((a, b) => a - b);

  const length = numericValues.length;
  if (length === 0) return null;

  const mid = Math.floor(length / 2);
  if (length % 2 === 1) {
    return numericValues[mid];
  }

  return Math.round((numericValues[mid - 1] + numericValues[mid]) / 2);
}

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage && I18N[savedLanguage]) {
    return savedLanguage;
  }
  return 'pt-BR';
}

function getInitialViewMode() {
  const savedMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
  if (savedMode === 'list' || savedMode === 'grid') {
    return savedMode;
  }
  return 'grid';
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

  const sortFilter = document.getElementById('sortFilter');
  if (sortFilter) {
    sortFilter.setAttribute('aria-label', t('sortFilterAriaLabel'));
  }

  const viewModeFilter = document.getElementById('viewModeFilter');
  if (viewModeFilter) {
    viewModeFilter.setAttribute('aria-label', t('viewModeFilterAriaLabel'));
    viewModeFilter.value = currentViewMode;
  }
}

function normalizeItem(item, marketEntry = {}) {
  const rawCategory = firstNonEmptyText([
    item.classification?.category,
    item.categoria,
    item.category
  ]);
  const rawSpeed = firstDefinedValue([
    item.classification?.speed,
    item.velocidade,
    item.speed
  ]);
  const rawSpeedMin = firstDefinedValue([
    item.classification?.speedMin,
    item.speedMin,
    item.classification?.speedRange?.min,
    item.speedRange?.min
  ]);
  const rawSpeedMax = firstDefinedValue([
    item.classification?.speedMax,
    item.speedMax,
    item.classification?.speedRange?.max,
    item.speedRange?.max
  ]);
  const rawRarity = firstDefinedValue([
    item.classification?.rarity,
    item.raridade,
    item.rarity
  ]);
  const rawRarityMin = firstDefinedValue([
    item.classification?.rarityMin,
    item.rarityMin,
    item.classification?.rarityRange?.min,
    item.rarityRange?.min
  ]);
  const rawRarityMax = firstDefinedValue([
    item.classification?.rarityMax,
    item.rarityMax,
    item.classification?.rarityRange?.max,
    item.rarityRange?.max
  ]);

  const normalizedMarket = normalizeMarketEntry(marketEntry);
  const hasMarketHistory = normalizedMarket.history.length > 0;
  const fallbackValue = toNumberOrNull(firstDefinedValue([item.pricing?.value, item.valor, item.value]));
  const resolvedValue = resolveSuggestedValue(normalizedMarket.history, fallbackValue);

  return {
    id: item.id || '',
    name: item.display?.name || item.nome || item.name || 'Unnamed item',
    image: item.display?.image || item.imagem || item.image || 'img/default.jpg',
    level: toNumberOrNull(firstDefinedValue([item.classification?.level, item.nivel, item.level])),
    category: rawCategory || '',
    categoryKey: rawCategory ? resolveCategoryKey(rawCategory) : '',
    speed: toNumberOrNull(rawSpeed),
    speedMin: toNumberOrNull(rawSpeedMin),
    speedMax: toNumberOrNull(rawSpeedMax),
    rarity: toNumberOrNull(rawRarity),
    rarityMin: toNumberOrNull(rawRarityMin),
    rarityMax: toNumberOrNull(rawRarityMax),
    value: resolvedValue,
    valueHistory: normalizedMarket.history,
    valueSource: hasMarketHistory ? 'market' : 'fixed',
    valueStatus: firstNonEmptyText([normalizedMarket.valueStatus, item.pricing?.valueStatus]) || (resolvedValue === null ? 'none' : 'known'),
    robux: toNumberOrNull(firstDefinedValue([normalizedMarket.robux, item.pricing?.robux, item.robux])),
    lastUpdate: firstNonEmptyText([normalizedMarket.lastUpdate, item.pricing?.lastUpdate, item.ultima_atualizacao, item.lastUpdate]) || '',
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
  const viewMode = getSelectedViewMode();
  container.className = viewMode === 'list' ? 'items-list' : 'items-grid';
  container.innerHTML = '';
  updateResultsCount(items.length, allItems.length);

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

  if (viewMode === 'list') {
    renderListView(items, container, packageMap);
    return;
  }

  items.forEach(item => {
    const slot = document.createElement('div');
    slot.classList.add('item-slot');

    const card = document.createElement('div');
    card.classList.add('item-card');
    card.dataset.itemId = item.id;
    card.title = t('cardHintLabel');

    card.innerHTML = `
      ${renderShareButton(item)}
      <div class="item-preview">
        <div class="item-image" role="img" aria-label="${escapeHtml(item.name)}" style="${getItemImageStyle(item.image)}"></div>
        <div class="item-name">${escapeHtml(item.name)}</div>
      </div>
      <div class="item-details">
        ${renderLevelRow(item)}
        ${renderCategoryRow(item)}
        ${renderRarityRow(item)}
        ${renderSpeedRow(item)}
        ${renderValueRow(item)}
        ${renderPackageRow(item, packageMap)}
        ${renderRelatedItems(item, packageMap)}
        ${renderItemNotes(item)}
        ${renderUpdateRow(item)}
      </div>
    `;

    const actionsToggle = card.querySelector('.item-actions-toggle');
    const actionsMenu = card.querySelector('.item-actions-menu');
    const shareAction = card.querySelector('[data-action="share"]');
    const announceAction = card.querySelector('[data-action="announce"]');
    const reportPriceAction = card.querySelector('[data-action="report-price"]');
    const valueInfoButton = card.querySelector('.value-info-btn');
    const valueTooltip = card.querySelector('.value-tooltip');
    if (actionsToggle) {
      actionsToggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !card.classList.contains('actions-open');
        closeAllItemActionMenus(card);
        card.classList.toggle('actions-open', willOpen);
        actionsToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }
    if (actionsMenu) {
      actionsMenu.addEventListener('click', event => {
        event.stopPropagation();
      });
    }
    if (shareAction) {
      shareAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleShareClick(item, shareAction);
      });
    }
    if (announceAction) {
      announceAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleAnnounceClick(item, announceAction);
      });
    }
    if (reportPriceAction) {
      reportPriceAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleReportPriceClick(item, reportPriceAction);
      });
    }
    if (valueInfoButton) {
      valueInfoButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const valueRow = valueInfoButton.closest('.item-row--value');
        const ownerCard = valueInfoButton.closest('.item-card');
        if (!valueRow) return;
        const willOpen = !valueRow.classList.contains('tooltip-open');
        closeAllValueTooltips(card);
        valueRow.classList.toggle('tooltip-open', willOpen);
        if (ownerCard) ownerCard.classList.toggle('value-tooltip-open', willOpen);
        valueInfoButton.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }
    if (valueTooltip) {
      valueTooltip.addEventListener('click', event => {
        event.stopPropagation();
      });
    }
    card.querySelectorAll('.item-note-btn').forEach(noteButton => {
      noteButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const query = firstNonEmptyText([noteButton.dataset.noteQuery]);
        if (!query) return;
        applyNoteSearchQuery(query);
      });
    });
    card.querySelectorAll('.item-category-btn').forEach(categoryButton => {
      categoryButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const categoryKey = firstNonEmptyText([categoryButton.dataset.categoryKey]);
        if (!categoryKey) return;
        applyCategoryFilter(categoryKey);
      });
    });

    card.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');
      setExpandedCard(card, !wasExpanded);
    });

    slot.appendChild(card);
    container.appendChild(slot);
  });
}

function getSelectedViewMode() {
  const viewModeFilter = document.getElementById('viewModeFilter');
  const selectedMode = viewModeFilter?.value;
  if (selectedMode === 'list' || selectedMode === 'grid') {
    return selectedMode;
  }
  return currentViewMode === 'list' ? 'list' : 'grid';
}

function renderListView(items, container, packageMap) {
  items.forEach(item => {
    const hasCategoryKey = Boolean(item.categoryKey);
    const categoryLabel = hasCategoryKey
      ? getCategoryLabel(item.categoryKey)
      : firstNonEmptyText([item.category, '-']);
    
    // Modificação: Criar duas versões da categoria - uma para visualização normal e outra para expandida
    const categoryValueNormal = hasCategoryKey
      ? `<span class="item-list-category-text">${escapeHtml(categoryLabel)}</span>`
      : `<span class="item-list-category-text">${escapeHtml(categoryLabel)}</span>`;
    
    const categoryValueExpanded = hasCategoryKey
      ? `<button type="button" class="item-category-btn item-category-btn--inline" data-category-key="${escapeHtml(item.categoryKey)}" title="${escapeHtml(t('categoryFilterHintLabel'))}" aria-label="${escapeHtml(t('categoryFilterHintLabel'))}">${escapeHtml(categoryLabel)}</button>`
      : `<span class="item-list-category-text">${escapeHtml(categoryLabel)}</span>`;
    
    const valueLabel = item.valueSource === 'market' ? t('suggestedValueLabel') : t('averageValueLabel');
    const valueDisplay = item.value !== null ? escapeHtml(formatPrice(item.value)) : '-';
    const updatedAtDate = item.lastUpdate ? escapeHtml(formatDate(item.lastUpdate)) : '';

    const row = document.createElement('article');
    row.className = 'item-list-row';
    row.dataset.itemId = item.id;
    row.innerHTML = `
      ${renderShareButton(item)}
      <div class="item-list-thumb" role="img" aria-label="${escapeHtml(item.name)}" style="${getItemImageStyle(item.image)}"></div>
      <div class="item-list-main">
        <h3 class="item-list-name">${escapeHtml(item.name)}</h3>
        <div class="item-list-meta">
          <span class="item-list-meta-label">${t('categoryLabel')}</span>
          <!-- Versão normal (não expandida) -->
          <span class="category-normal">${categoryValueNormal}</span>
          <!-- Versão expandida (inicialmente oculta) -->
          <span class="category-expanded" style="display: none;">${categoryValueExpanded}</span>
        </div>
      </div>
      <div class="item-list-value">
        <div class="item-list-value-main">
          <small class="item-list-value-label">${item.value !== null ? escapeHtml(valueLabel) : '&nbsp;'}</small>
          <span class="item-list-value-number">${valueDisplay}</span>
        </div>
        <div class="item-list-updated">
          <small class="item-list-updated-label">${t('updatedAtLabel')}</small>
          <span class="item-list-updated-date">${updatedAtDate || '&nbsp;'}</span>
        </div>
      </div>
      <div class="item-list-details">
        ${renderLevelRow(item)}
        ${renderRarityRow(item)}
        ${renderSpeedRow(item)}
        ${renderPackageRow(item, packageMap)}
        ${renderRelatedItems(item, packageMap)}
        ${renderItemNotes(item)}
      </div>
    `;

    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.setAttribute('aria-expanded', 'false');

    row.querySelectorAll('.item-category-btn').forEach(categoryButton => {
      categoryButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const categoryKey = firstNonEmptyText([categoryButton.dataset.categoryKey]);
        if (!categoryKey) return;
        applyCategoryFilter(categoryKey);
      });
    });
    
    row.querySelectorAll('.item-note-btn').forEach(noteButton => {
      noteButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const query = firstNonEmptyText([noteButton.dataset.noteQuery]);
        if (!query) return;
        applyNoteSearchQuery(query);
      });
    });
    
    const actionsToggle = row.querySelector('.item-actions-toggle');
    const actionsMenu = row.querySelector('.item-actions-menu');
    const shareAction = row.querySelector('[data-action="share"]');
    const announceAction = row.querySelector('[data-action="announce"]');
    const reportPriceAction = row.querySelector('[data-action="report-price"]');
    
    if (actionsToggle) {
      actionsToggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !row.classList.contains('actions-open');
        closeAllItemActionMenus(row);
        row.classList.toggle('actions-open', willOpen);
        actionsToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }
    
    if (actionsMenu) {
      actionsMenu.addEventListener('click', event => {
        event.stopPropagation();
      });
    }
    
    if (shareAction) {
      shareAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleShareClick(item, shareAction);
      });
    }
    
    if (announceAction) {
      announceAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleAnnounceClick(item, announceAction);
      });
    }
    
    if (reportPriceAction) {
      reportPriceAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleReportPriceClick(item, reportPriceAction);
      });
    }
    
    row.querySelectorAll('.value-info-btn').forEach(valueInfoButton => {
      valueInfoButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const valueRow = valueInfoButton.closest('.item-row--value');
        if (!valueRow) return;
        const willOpen = !valueRow.classList.contains('tooltip-open');
        closeAllValueTooltips();
        valueRow.classList.toggle('tooltip-open', willOpen);
        valueInfoButton.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });

    row.addEventListener('click', () => {
      const willExpand = !row.classList.contains('expanded');
      setExpandedListRow(row, willExpand);
      
      // Modificação: Alternar entre versão normal e expandida da categoria
      const categoryNormal = row.querySelector('.category-normal');
      const categoryExpanded = row.querySelector('.category-expanded');
      if (categoryNormal && categoryExpanded) {
        if (willExpand) {
          categoryNormal.style.display = 'none';
          categoryExpanded.style.display = 'inline';
        } else {
          categoryNormal.style.display = 'inline';
          categoryExpanded.style.display = 'none';
        }
      }
    });
    
    row.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      const willExpand = !row.classList.contains('expanded');
      setExpandedListRow(row, willExpand);
      
      // Modificação: Alternar entre versão normal e expandida da categoria
      const categoryNormal = row.querySelector('.category-normal');
      const categoryExpanded = row.querySelector('.category-expanded');
      if (categoryNormal && categoryExpanded) {
        if (willExpand) {
          categoryNormal.style.display = 'none';
          categoryExpanded.style.display = 'inline';
        } else {
          categoryNormal.style.display = 'inline';
          categoryExpanded.style.display = 'none';
        }
      }
    });

    container.appendChild(row);
  });
}

function setExpandedListRow(row, shouldExpand) {
  if (!row) return;
  document.querySelectorAll('.item-list-row.expanded').forEach(otherRow => {
    otherRow.classList.remove('expanded');
    otherRow.setAttribute('aria-expanded', 'false');
  });
  if (shouldExpand) {
    row.classList.add('expanded');
    row.setAttribute('aria-expanded', 'true');
  }
}

function updateResultsCount(shown, total) {
  const resultsCountEl = document.getElementById('resultsCount');
  if (!resultsCountEl) return;
  resultsCountEl.textContent = t('resultsCountLabel', {
    shown: String(shown),
    total: String(total)
  });
}

function setExpandedCard(card, shouldExpand) {
  if (!card) return;

  document.querySelectorAll('.item-card.expanded').forEach(otherCard => {
    otherCard.classList.remove('expanded');
  });

  if (shouldExpand) {
    card.classList.add('expanded');
  }
}

function getItemIdFromUrl() {
  const params = new URLSearchParams(window.location.search || '');
  const value = params.get('item');
  return value ? value.trim() : '';
}

function applyCatalogStateFromUrl() {
  const params = new URLSearchParams(window.location.search || '');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const specialFilter = document.getElementById('specialFilter');
  const sortFilter = document.getElementById('sortFilter');
  const viewModeFilter = document.getElementById('viewModeFilter');

  const requestedSearch = firstNonEmptyText([params.get('q')]);
  if (searchInput && requestedSearch) {
    searchInput.value = requestedSearch;
  }

  const requestedCategory = firstNonEmptyText([params.get('cat')]);
  if (categoryFilter && requestedCategory && hasSelectOptionValue(categoryFilter, requestedCategory)) {
    categoryFilter.value = requestedCategory;
  }

  const requestedSpecial = firstNonEmptyText([params.get('sp')]).toLowerCase();
  if (specialFilter && requestedSpecial) {
    specialFilter.checked = requestedSpecial === '1' || requestedSpecial === 'true';
  }

  const requestedSort = firstNonEmptyText([params.get('sort')]);
  if (sortFilter && requestedSort && hasSelectOptionValue(sortFilter, requestedSort)) {
    sortFilter.value = requestedSort;
  }

  const requestedView = firstNonEmptyText([params.get('view')]);
  if (requestedView === 'list' || requestedView === 'grid') {
    currentViewMode = requestedView;
    if (viewModeFilter) viewModeFilter.value = requestedView;
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, requestedView);
  }

  const requestedLanguage = firstNonEmptyText([params.get('lang')]);
  if (requestedLanguage && I18N[requestedLanguage]) {
    currentLanguage = requestedLanguage;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  }
}

function hasSelectOptionValue(selectElement, value) {
  if (!selectElement) return false;
  return Array.from(selectElement.options).some(option => option.value === value);
}

function findItemById(itemId) {
  const normalizedId = String(itemId || '').toLowerCase();
  return allItems.find(item => String(item.id || '').toLowerCase() === normalizedId) || null;
}

function openItemFromUrl() {
  const requestedId = getItemIdFromUrl();
  if (!requestedId) return;

  const targetItem = findItemById(requestedId);
  if (!targetItem) return;

  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const specialFilter = document.getElementById('specialFilter');

  if (searchInput) searchInput.value = '';
  if (categoryFilter) categoryFilter.value = ALL_CATEGORY_VALUE;
  if (specialFilter) specialFilter.checked = false;
  updateClearSearchVisibility();
  filterItems();

  const selectorId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
    ? CSS.escape(targetItem.id)
    : targetItem.id.replace(/["\\]/g, '\\$&');
  const card = document.querySelector(`.item-card[data-item-id="${selectorId}"]`);
  if (!card) {
    const listRow = document.querySelector(`.item-list-row[data-item-id="${selectorId}"]`);
    if (!listRow) return;
    setExpandedListRow(listRow, true);
    listRow.classList.add('is-shared-target');
    listRow.setAttribute('tabindex', '-1');
    listRow.focus({ preventScroll: true });
    listRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  document.querySelectorAll('.item-card.is-shared-target').forEach(sharedCard => {
    sharedCard.classList.remove('is-shared-target');
  });
  document.querySelectorAll('.item-list-row.is-shared-target').forEach(sharedRow => {
    sharedRow.classList.remove('is-shared-target');
  });
  setExpandedCard(card, true);
  card.classList.add('is-shared-target');
  card.setAttribute('tabindex', '-1');
  card.focus({ preventScroll: true });
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  const categoryLabel = item.categoryKey ? getCategoryLabel(item.categoryKey) : item.category;
  const categoryValueHtml = item.categoryKey
    ? `<button type="button" class="item-category-btn" data-category-key="${escapeHtml(item.categoryKey)}" title="${escapeHtml(t('categoryFilterHintLabel'))}" aria-label="${escapeHtml(t('categoryFilterHintLabel'))}">${escapeHtml(categoryLabel)}</button>`
    : `<strong>${escapeHtml(categoryLabel)}</strong>`;
  return `
    <div class="item-row">
      <span>${t('categoryLabel')}</span>
      ${categoryValueHtml}
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

function renderRarityRow(item) {
  if (item.rarity === null || item.rarity < 1) return '';
  const range = resolveRarityRange(item);
  if (!range) return '';
  const raritySummary = getRaritySummary(item.rarity, range.max);

  return `
    <div class="item-row">
      <span>${t('rarityLabel')}</span>
      <div class="stat-group stat-group--rarity" title="${escapeHtml(`${t('rarityLabel')}: ${raritySummary}`)}">
        ${generateBar(item.rarity, range.min, range.max, { barClass: 'stat-bar rarity-bar', fillClass: 'stat-fill rarity-fill' })}
        <small>${raritySummary}</small>
      </div>
    </div>
  `;
}

function renderValueRow(item) {
  if (item.value === null) return '';
  const isSuggestedValue = item.valueSource === 'market';
  const valueLabelKey = isSuggestedValue ? 'suggestedValueLabel' : 'averageValueLabel';
  const infoHtml = isSuggestedValue ? `
    <button type="button" class="value-info-btn" aria-label="${escapeHtml(t('suggestedValueInfoLabel'))}" aria-expanded="false">i</button>
  ` : '';
  const tooltipHtml = isSuggestedValue ? `
    <span class="value-tooltip" role="tooltip">${escapeHtml(t('suggestedValueTooltip'))}</span>
  ` : '';
  return `
    <div class="item-row item-row--value">
      <span class="value-label-wrap">${t(valueLabelKey)}</span>
      <span class="value-number-wrap">
        <strong>${formatPrice(item.value)}</strong>
        ${infoHtml}
        ${tooltipHtml}
      </span>
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
  const noteQuery = buildNoteSearchQuery(item.notes);
  const hintLabel = t('noteSearchHintLabel');
  return `
    <button type="button" class="item-note item-note-btn" data-note-query="${escapeHtml(noteQuery)}" title="${escapeHtml(hintLabel)}" aria-label="${escapeHtml(hintLabel)}">
      ${escapeHtml(item.notes)}
    </button>
  `;
}

function renderUpdateRow(item) {
  if (!item.lastUpdate) return '';
  return `<div class="item-meta">${t('updatedAtLabel')}: ${formatDate(item.lastUpdate)}</div>`;
}

function renderShareButton(item) {
  if (!item.id) return '';
  const shareLabel = t('shareButtonLabel');
  const actionsLabel = t('moreActionsLabel');
  const actionsMenuLabel = t('itemActionsMenuLabel');
  return `
    <div class="item-actions">
      <button type="button" class="item-actions-toggle" aria-haspopup="menu" aria-expanded="false" aria-label="${escapeHtml(actionsLabel)}" title="${escapeHtml(actionsLabel)}">${getItemActionsIconMarkup()}</button>
      <div class="item-actions-menu" role="menu" aria-label="${escapeHtml(actionsMenuLabel)}">
        <button type="button" class="item-action-btn" data-action="announce" data-default-label="${escapeHtml(t('announceItemLabel'))}" role="menuitem">${escapeHtml(t('announceItemLabel'))}</button>
        <button type="button" class="item-action-btn" data-action="share" data-default-label="${escapeHtml(shareLabel)}" role="menuitem">${escapeHtml(shareLabel)}</button>
        <button type="button" class="item-action-btn" data-action="report-price" role="menuitem">${escapeHtml(t('reportPriceLabel'))}</button>
      </div>
    </div>
  `;
}

async function handleShareClick(item, button) {
  if (!item || !item.id || !button) return;
  const shareUrl = buildItemShareUrl(item.id);
  const copied = await copyTextToClipboard(shareUrl);
  if (!copied) return;

  const defaultLabel = button.dataset.defaultLabel || t('shareButtonLabel');
  button.dataset.defaultLabel = defaultLabel;
  const copiedLabel = t('shareCopiedLabel');
  button.textContent = copiedLabel;
  button.classList.add('is-copied');

  window.setTimeout(() => {
    button.textContent = defaultLabel;
    button.classList.remove('is-copied');
  }, 1200);
}

function handleAnnounceClick(item, button) {
  if (!item || !button) return;
  const formUrl = buildActionFormUrl(ACTION_FORM_LINKS.announce, item, { action: 'announce' });
  if (formUrl) {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
    closeAllItemActionMenus();
    return;
  }
  showPendingActionFeedback(button, 'announceItemLabel', 'announceSoonLabel');
}

function handleReportPriceClick(item, button) {
  if (!item || !button) return;
  const formUrl = buildActionFormUrl(ACTION_FORM_LINKS.reportPrice, item, { action: 'report-price' });
  if (formUrl) {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
    closeAllItemActionMenus();
    return;
  }
  showPendingActionFeedback(button, 'reportPriceLabel', 'reportSoonLabel');
}

function showPendingActionFeedback(button, defaultLabelKey, pendingLabelKey) {
  if (!button) return;
  const defaultLabel = button.dataset.defaultLabel || t(defaultLabelKey);
  button.dataset.defaultLabel = defaultLabel;
  button.textContent = t(pendingLabelKey);
  button.classList.add('is-pending');

  window.setTimeout(() => {
    button.textContent = defaultLabel;
    button.classList.remove('is-pending');
  }, 1400);
}

function buildActionFormUrl(baseUrl, item, extraParams = {}) {
  const normalizedBaseUrl = String(baseUrl || '').trim();
  if (!normalizedBaseUrl) return '';

  try {
    const url = new URL(normalizedBaseUrl, window.location.href);
    url.searchParams.set('itemId', item.id || '');
    url.searchParams.set('itemName', item.name || item.id || '');
    url.searchParams.set('category', item.category || item.categoryKey || '');
    Object.entries(extraParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    });
    return url.toString();
  } catch (error) {
    console.warn('Invalid action form URL configured.', error);
    return '';
  }
}

function getItemActionsIconMarkup() {
  return `
    <svg class="item-actions-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="5" r="1.8" fill="currentColor"></circle>
      <circle cx="12" cy="12" r="1.8" fill="currentColor"></circle>
      <circle cx="12" cy="19" r="1.8" fill="currentColor"></circle>
    </svg>
  `;
}

function closeAllItemActionMenus(exceptCard = null) {
  document.querySelectorAll('.item-card.actions-open, .item-list-row.actions-open').forEach(element => {
    if (exceptCard && element === exceptCard) return;
    element.classList.remove('actions-open');
    const toggle = element.querySelector('.item-actions-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
}

function normalizeSearchText(noteText) {
  const text = String(noteText || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return text;
}

function isGenericSearchToken(token) {
  const genericTokens = new Set([
    'pack', 'bundle', 'item', 'items', 'set', 'kit',
    'veiculo', 'veiculos', 'vehicle', 'vehicles',
    'the', 'and', 'for', 'with', 'from',
    'de', 'do', 'da', 'dos', 'das', 'com', 'para'
  ]);
  return genericTokens.has(token);
}

function getRelevantSearchTokens(searchText) {
  const normalized = normalizeSearchText(searchText);
  if (!normalized) return [];
  return normalized
    .split(' ')
    .filter(token => token.length >= 3 && !isGenericSearchToken(token));
}

function itemMatchesSearch(item, rawSearch) {
  const normalizedSearch = normalizeSearchText(rawSearch);
  if (!normalizedSearch) return true;

  const normalizedName = normalizeSearchText(item?.name || '');
  if (normalizedName.includes(normalizedSearch)) return true;

  const relevantTokens = getRelevantSearchTokens(rawSearch);
  if (relevantTokens.length === 0) return false;

  const normalizedNotes = normalizeSearchText(item?.notes || '');
  if (!normalizedNotes) return false;

  return relevantTokens.every(token => normalizedNotes.includes(token));
}

function buildNoteSearchQuery(noteText) {
  const relevantTokens = getRelevantSearchTokens(noteText);
  if (relevantTokens.length === 0) {
    return String(noteText || '').trim();
  }
  return relevantTokens.slice(0, 4).join(' ');
}

function applyNoteSearchQuery(query) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput || !query) return;
  searchInput.value = query;
  updateClearSearchVisibility();
  filterItems();
  searchInput.focus();
}

function applyCategoryFilter(categoryKey) {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter || !categoryKey) return;
  categoryFilter.value = categoryKey;
  filterItems();
  categoryFilter.focus();
}

function closeAllValueTooltips(exceptCard = null) {
  document.querySelectorAll('.item-row--value.tooltip-open').forEach(row => {
    const card = row.closest('.item-card');
    if (exceptCard && card === exceptCard) return;
    row.classList.remove('tooltip-open');
    if (card) card.classList.remove('value-tooltip-open');
    const infoButton = row.querySelector('.value-info-btn');
    if (infoButton) infoButton.setAttribute('aria-expanded', 'false');
  });
}

function buildItemShareUrl(itemId) {
  const url = new URL(window.location.href);
  url.searchParams.set('item', itemId);
  return url.toString();
}

function syncCatalogStateToUrl() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const search = firstNonEmptyText([document.getElementById('searchInput')?.value]);
  const category = document.getElementById('categoryFilter')?.value || ALL_CATEGORY_VALUE;
  const specialOnly = document.getElementById('specialFilter')?.checked;
  const sortMode = document.getElementById('sortFilter')?.value || DEFAULT_SORT_MODE;
  const viewMode = getSelectedViewMode();

  if (search) params.set('q', search);
  else params.delete('q');

  if (category && category !== ALL_CATEGORY_VALUE) params.set('cat', category);
  else params.delete('cat');

  if (specialOnly === false) params.set('sp', '0');
  else params.delete('sp');

  if (sortMode && sortMode !== DEFAULT_SORT_MODE) params.set('sort', sortMode);
  else params.delete('sort');

  if (viewMode === 'list') params.set('view', 'list');
  else params.delete('view');

  if (currentLanguage && currentLanguage !== 'pt-BR') params.set('lang', currentLanguage);
  else params.delete('lang');

  const nextUrl = `${url.pathname}${params.toString() ? `?${params.toString()}` : ''}${url.hash || ''}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl !== currentUrl) {
    window.history.replaceState(null, '', nextUrl);
  }
}

async function copyTextToClipboard(text) {
  if (!text) return false;

  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fall back to legacy copy flow below.
    }
  }

  const tempInput = document.createElement('input');
  tempInput.value = text;
  tempInput.setAttribute('readonly', '');
  tempInput.style.position = 'absolute';
  tempInput.style.left = '-9999px';
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, tempInput.value.length);

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    copied = false;
  }

  tempInput.remove();
  return copied;
}

function generateBar(value, min, max, options = {}) {
  const barClass = firstNonEmptyText([options.barClass]) || 'stat-bar';
  const fillClass = firstNonEmptyText([options.fillClass]) || 'stat-fill';
  const safeValue = clampScale(value, min, max);
  const rangeSize = Math.max(1, max - min);
  const percentage = ((safeValue - min) / rangeSize) * 100;
  const ariaLabel = escapeHtml(t('indicatorLabel', { value: safeValue, max }));
  return `
    <div class="${escapeHtml(barClass)}" aria-label="${ariaLabel}">
      <div class="${escapeHtml(fillClass)}" style="width: ${percentage}%"></div>
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

function resolveRarityRange(item) {
  if (item.rarity === null || item.rarity < 1) return null;

  const min = 1;
  const configuredMax = toNumberOrNull(item.rarityMax);
  const max = resolveRarityScale(configuredMax, item.rarity);

  return { min, max };
}

function resolveRarityScale(configuredMax, rarityValue) {
  const baseValue = Math.max(toNumberOrNull(configuredMax) || 0, toNumberOrNull(rarityValue) || 0);
  return baseValue > 5 ? 10 : 5;
}

function getSpeedSummary(value, min, max) {
  return `${value}/${max}`;
}

function getRaritySummary(value, max) {
  const tierLabel = getRarityTierLabel(value, max);
  return tierLabel ? `${value}/${max} • ${tierLabel}` : `${value}/${max}`;
}

function getRarityTierLabel(value, max) {
  const safeValue = toNumberOrNull(value);
  const safeMax = toNumberOrNull(max);
  if (safeValue === null || safeMax === null || safeMax <= 0) return '';

  const ratio = Math.max(0, Math.min(1, safeValue / safeMax));
  const tier = Math.max(1, Math.min(5, Math.ceil(ratio * 5)));
  return t(`rarityTier${tier}`);
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
  const safePath = escapeCssUrl(imagePath || 'img/default.jpg');
  const fallbackPath = escapeCssUrl('img/default.jpg');
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

function filterItems(options = {}) {
  const shouldSyncUrl = options.syncUrl !== false;
  const search = document.getElementById('searchInput').value;
  const category = document.getElementById('categoryFilter').value;
  const specialOnly = document.getElementById('specialFilter').checked;
  const sortMode = document.getElementById('sortFilter')?.value || DEFAULT_SORT_MODE;

  const filtered = allItems.filter(item => {
    const matchSearch = itemMatchesSearch(item, search);
    const matchCategory = category === ALL_CATEGORY_VALUE || item.categoryKey === category;
    const matchSpecial = !specialOnly || item.special;
    return matchSearch && matchCategory && matchSpecial;
  });

  if (shouldSyncUrl) {
    syncCatalogStateToUrl();
  }

  renderItems(sortItemsForDisplay(filtered, sortMode));
}

function sortItemsForDisplay(items, sortMode = DEFAULT_SORT_MODE) {
  return [...items].sort((a, b) => {
    // Novas opções de ordenação por data
    if (sortMode === 'updated-desc') {
      const dateCompare = compareItemsByDate(a, b, 'desc');
      if (dateCompare !== 0) return dateCompare;
    } else if (sortMode === 'updated-asc') {
      const dateCompare = compareItemsByDate(a, b, 'asc');
      if (dateCompare !== 0) return dateCompare;
    } else if (sortMode === 'name') {
      const nameCompare = compareItemsByName(a, b);
      if (nameCompare !== 0) return nameCompare;
    } else if (sortMode === 'value-desc') {
      const valueCompare = compareItemsByValue(a, b, 'desc');
      if (valueCompare !== 0) return valueCompare;
    } else if (sortMode === 'value-asc') {
      const valueCompare = compareItemsByValue(a, b, 'asc');
      if (valueCompare !== 0) return valueCompare;
    }

    const categoryCompare = getCategorySortIndex(a) - getCategorySortIndex(b);
    if (categoryCompare !== 0) return categoryCompare;

    const nameCompare = compareItemsByName(a, b);
    if (nameCompare !== 0) return nameCompare;

    return String(a.id || '').localeCompare(String(b.id || ''), 'en', { sensitivity: 'base', numeric: true });
  });
}

// Nova função de comparação por data
function compareItemsByDate(a, b, direction) {
  const dateA = parseDate(a?.lastUpdate);
  const dateB = parseDate(b?.lastUpdate);
  const hasDateA = dateA !== null;
  const hasDateB = dateB !== null;

  if (hasDateA && hasDateB) {
    if (direction === 'asc') return dateA - dateB;
    return dateB - dateA;
  }
  if (hasDateA && !hasDateB) return -1; // Itens com data vêm antes
  if (!hasDateA && hasDateB) return 1;  // Itens sem data vão depois
  return 0;
}

// Função auxiliar para parsear datas
function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // Tenta parsear formato ISO (YYYY-MM-DD)
  if (dateStr.includes('-')) {
    const parsed = new Date(`${dateStr}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.getTime();
    }
  }
  
  // Tenta parsear formato brasileiro (DD/MM/YYYY)
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const parsed = new Date(year, month, day);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.getTime();
      }
    }
  }
  
  return null;
}

function compareItemsByName(a, b) {
  const nameA = String(a?.name || '');
  const nameB = String(b?.name || '');
  return nameA.localeCompare(nameB, currentLanguage, { sensitivity: 'base', numeric: true });
}

function compareItemsByValue(a, b, direction) {
  const valueA = toNumberOrNull(a?.value);
  const valueB = toNumberOrNull(b?.value);
  const hasValueA = valueA !== null;
  const hasValueB = valueB !== null;

  if (hasValueA && hasValueB) {
    if (direction === 'asc') return valueA - valueB;
    return valueB - valueA;
  }
  if (hasValueA && !hasValueB) return -1;
  if (!hasValueA && hasValueB) return 1;
  return 0;
}

function getCategorySortIndex(item) {
  const key = item?.categoryKey;
  if (Object.prototype.hasOwnProperty.call(CATEGORY_SORT_INDEX, key)) {
    return CATEGORY_SORT_INDEX[key];
  }
  return Number.MAX_SAFE_INTEGER;
}

document.getElementById('searchInput').addEventListener('input', filterItems);
document.getElementById('categoryFilter').addEventListener('change', filterItems);
document.getElementById('specialFilter').addEventListener('change', filterItems);
document.getElementById('sortFilter').addEventListener('change', filterItems);
document.getElementById('viewModeFilter').addEventListener('change', event => {
  currentViewMode = event.target.value === 'list' ? 'list' : 'grid';
  localStorage.setItem(VIEW_MODE_STORAGE_KEY, currentViewMode);
  filterItems();
});
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
let lastScrollY = window.scrollY || document.documentElement.scrollTop || 0;
let isSearchFloatingVisible = false;

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', handleScrollUiState, { passive: true });
window.addEventListener('resize', handleScrollUiState, { passive: true });
document.addEventListener('click', () => {
  closeAllItemActionMenus();
  closeAllValueTooltips();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeAllItemActionMenus();
    closeAllValueTooltips();
  }
});
handleScrollUiState();

function handleScrollUiState() {
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const canUseFloatingSearch = maxScrollY > 220;
  const scrollingUp = y < lastScrollY - 2;
  const scrollingDown = y > lastScrollY + 2;
  const showFloatingUi = y > 240;

  if (backToTopBtn) {
    backToTopBtn.classList.toggle('is-visible', showFloatingUi);
  }

  if (controlsSearch) {
    if (!canUseFloatingSearch || y <= 140) {
      isSearchFloatingVisible = false;
    } else if (scrollingUp) {
      isSearchFloatingVisible = true;
    } else if (scrollingDown) {
      isSearchFloatingVisible = false;
    }

    controlsSearch.classList.toggle('is-sticky', isSearchFloatingVisible);
  }

  lastScrollY = y;
}