const ALL_CATEGORY_VALUE = 'All';
const LANGUAGE_STORAGE_KEY = 'safrabr_language';
const VIEW_MODE_STORAGE_KEY = 'safrabr_view_mode';
const SEARCH_STORAGE_KEY = 'safrabr_search';
const CATEGORY_STORAGE_KEY = 'safrabr_category';
const SPECIAL_STORAGE_KEY = 'safrabr_special';
const DEFAULT_SORT_MODE = 'category-name';
const ACTION_FORM_LINKS = {
  announce: '',
  reportPrice: ''
};
const DEFAULT_ITEM_IMAGE = 'img/default.jpg';
const VALUE_RANGE_PERCENTAGE = 0.15;
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
  All: { 'pt-BR': 'Todas as categorias', en: 'All categories', es: 'Todas las categorías', pl: 'Wszystkie kategorie', fr: 'Toutes les catégories', hi: 'सभी श्रेणियां' },
  TreeCutters: { 'pt-BR': 'Cortadores de Árvores', en: 'Tree Cutters', es: 'Cortadoras de árboles', pl: 'Ścinarki do drzew', fr: "Coupeurs d'arbres", hi: 'पेड़ काटने वाली मशीनें' },
  Tractors: { 'pt-BR': 'Tratores', en: 'Tractors', es: 'Tractores', pl: 'Traktory', fr: 'Tracteurs', hi: 'ट्रैक्टर' },
  Harvesters: { 'pt-BR': 'Colheitadeiras', en: 'Harvesters', es: 'Cosechadoras', pl: 'Kombajny', fr: 'Moissonneuses', hi: 'हार्वेस्टर' },
  Trucks: { 'pt-BR': 'Caminhões', en: 'Trucks', es: 'Camiones', pl: 'Ciężarówki', fr: 'Camions', hi: 'ट्रक' },
  Trailers: { 'pt-BR': 'Reboques', en: 'Trailers', es: 'Remolques', pl: 'Przyczepy', fr: 'Remorques', hi: 'ट्रेलर' },
  Plows: { 'pt-BR': 'Arados', en: 'Plows', es: 'Arados', pl: 'Pługi', fr: 'Charrues', hi: 'हल' },
  Cultivators: { 'pt-BR': 'Cultivadores', en: 'Cultivators', es: 'Cultivadores', pl: 'Kultywatory', fr: 'Cultivateurs', hi: 'कल्टीवेटर' },
  Seeders: { 'pt-BR': 'Plantadeiras', en: 'Seeders', es: 'Sembradoras', pl: 'Siewniki', fr: 'Semoirs', hi: 'सीडर' },
  SeedBoxes: { 'pt-BR': 'Caixas de Sementes', en: 'Seed Boxes', es: 'Cajas de semillas', pl: 'Skrzynie nasienne', fr: 'Boîtes de graines', hi: 'बीज बॉक्स' },
  Misc: { 'pt-BR': 'Diversos', en: 'Misc', es: 'Varios', pl: 'Różne', fr: 'Divers', hi: 'विविध' }
};
const SUPPORTED_LOCALES = {
  'pt-BR': 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
  pl: 'pl-PL',
  fr: 'fr-FR',
  hi: 'hi-IN'
};
const LANGUAGE_ARIA_LABELS = {
  'pt-BR': 'Idioma',
  en: 'Language',
  es: 'Idioma',
  pl: 'Język',
  fr: 'Langue',
  hi: 'भाषा'
};
const NAVIGATION_LABELS = {
  previousItem: {
    'pt-BR': 'Item anterior',
    en: 'Previous item',
    es: 'Artículo anterior',
    pl: 'Poprzedni przedmiot',
    fr: 'Article précédent',
    hi: 'पिछला आइटम'
  },
  nextItem: {
    'pt-BR': 'Próximo item',
    en: 'Next item',
    es: 'Siguiente artículo',
    pl: 'Następny przedmiot',
    fr: 'Article suivant',
    hi: 'अगला आइटम'
  }
};
const CAPACITY_TRANSLATIONS = {
  en: [
    [/\bfardos redondos\b/gi, 'round bales'],
    [/\bfardo redondo\b/gi, 'round bale'],
    [/\blinhas\b/gi, 'rows'],
    [/\blinha\b/gi, 'row'],
    [/\btoras\b/gi, 'logs'],
    [/\btora\b/gi, 'log'],
    [/\bou\b/gi, 'or']
  ],
  es: [
    [/\bfardos redondos\b/gi, 'fardos redondos'],
    [/\bfardo redondo\b/gi, 'fardo redondo'],
    [/\blinhas\b/gi, 'filas'],
    [/\blinha\b/gi, 'fila'],
    [/\btoras\b/gi, 'troncos'],
    [/\btora\b/gi, 'tronco'],
    [/\bou\b/gi, 'o']
  ],
  pl: [
    [/\bfardos redondos\b/gi, 'okrągłych bel'],
    [/\bfardo redondo\b/gi, 'okrągła bela'],
    [/\blinhas\b/gi, 'rzędy'],
    [/\blinha\b/gi, 'rząd'],
    [/\btoras\b/gi, 'kłód'],
    [/\btora\b/gi, 'kłoda'],
    [/\bou\b/gi, 'lub']
  ],
  fr: [
    [/\bfardos redondos\b/gi, 'balles rondes'],
    [/\bfardo redondo\b/gi, 'balle ronde'],
    [/\blinhas\b/gi, 'rangs'],
    [/\blinha\b/gi, 'rang'],
    [/\btoras\b/gi, 'bûches'],
    [/\btora\b/gi, 'bûche'],
    [/\bou\b/gi, 'ou']
  ],
  hi: [
    [/\bfardos redondos\b/gi, 'गोल गांठें'],
    [/\bfardo redondo\b/gi, 'गोल गांठ'],
    [/\blinhas\b/gi, 'पंक्तियां'],
    [/\blinha\b/gi, 'पंक्ति'],
    [/\btoras\b/gi, 'लकड़ियां'],
    [/\btora\b/gi, 'लकड़ी'],
    [/\bou\b/gi, 'या']
  ]
};
let allItems = [];
let currentLanguage = 'pt-BR';
let currentViewMode = 'grid';
let carouselIndex = 0;
let currentFilteredItems = [];
const itemImageCache = new Map();

const I18N = {
  'pt-BR': {
    subtitlePrefix: 'Catálogo de Itens do',
    searchPlaceholder: 'Buscar por nome do item ou pacote...',
    clearSearchLabel: 'Limpar busca',
    levelLabel: 'Level',
    categoryLabel: 'Categoria',
    categoryFilterHintLabel: 'Filtrar por esta categoria',
    packageLabel: 'Pacote',
    robuxLabel: 'Robux',
    speedLabel: 'Velocidade',
    capacityLabel: 'Capacidade',
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
    valueRangeLabel: 'Faixa estimada',
    relatedLabel: 'Relacionados',
    updatedAtLabel: 'Atualizado em',
    itemsSuffix: 'itens',
    indicatorLabel: 'Indicador {value} de {max}',
    footerCreditPrefix: 'Criado por',
    specialOnlyLabel: 'Somente itens especiais',
    cardHintLabel: 'Ver mais detalhes',
    copyNameLabel: 'Copiar nome do item',
    nameCopiedLabel: 'Nome copiado',
    shareButtonLabel: 'Compartilhar este item',
    shareCopiedLabel: 'Link copiado',
    moreActionsLabel: 'Mais ações',
    itemActionsMenuLabel: 'Opções do item',
    announceItemLabel: 'Tenho interesse',
    announceSoonLabel: 'Em breve',
    closeLabel: 'Fechar',
    reportPriceLabel: 'Informar preço negociado',
    reportSoonLabel: 'Em breve',
    sortByLabel: 'Ordenar',
    sortFilterAriaLabel: 'Ordenação',
    viewModeLabel: 'Visualização',
    viewModeFilterAriaLabel: 'Modo de visualização',
    viewModeGrid: 'Grade',
    viewModeList: 'Lista',
    viewModeCard: 'Card',
    sortName: 'Nome',
    sortCategoryName: 'Categoria e Nome',
    sortValueAsc: 'Menor Preço',
    sortValueDesc: 'Maior Preço',
    sortLevelAsc: 'Menor Level',
    sortLevelDesc: 'Maior Level',
    sortRarityAsc: 'Menor Raridade',
    sortRarityDesc: 'Maior Raridade',
    sortUpdatedAsc: 'Menos Atualizado',
    sortUpdatedDesc: 'Mais Atualizado',
    noItemsFound: 'Nenhum item encontrado. Ajuste sua busca ou filtros.',
    noItemsInCatalog: 'Nenhum item disponível no catálogo.',
    resultsCountLabel: '{shown} de {total} itens',
    noteSearchHintLabel: 'Usar esta nota na busca',
    quickLinkLinksLabel: 'Links',
    quickLinkCommunityLabel: 'Comunidade',
    quickLinkShirtLabel: 'Camisa oficial'
  },
  en: {
    subtitlePrefix: 'Item catalog for',
    searchPlaceholder: 'Search by item or pack name...',
    clearSearchLabel: 'Clear search',
    levelLabel: 'Level',
    categoryLabel: 'Category',
    categoryFilterHintLabel: 'Filter by this category',
    packageLabel: 'Bundle',
    robuxLabel: 'Robux',
    speedLabel: 'Speed',
    capacityLabel: 'Capacity',
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
    valueRangeLabel: 'Estimated range',
    relatedLabel: 'Related',
    updatedAtLabel: 'Updated on',
    itemsSuffix: 'items',
    indicatorLabel: 'Indicator {value} of {max}',
    footerCreditPrefix: 'Powered by',
    specialOnlyLabel: 'Special items only',
    cardHintLabel: 'View details',
    copyNameLabel: 'Copy item name',
    nameCopiedLabel: 'Name copied',
    shareButtonLabel: 'Share this item',
    shareCopiedLabel: 'Link copied',
    moreActionsLabel: 'More actions',
    itemActionsMenuLabel: 'Item options',
    announceItemLabel: 'I am interested',
    announceSoonLabel: 'Soon',
    closeLabel: 'Close',
    reportPriceLabel: 'Report trade price',
    reportSoonLabel: 'Soon',
    sortByLabel: 'Sort',
    sortFilterAriaLabel: 'Sort order',
    viewModeLabel: 'View',
    viewModeFilterAriaLabel: 'View mode',
    viewModeGrid: 'Grid',
    viewModeList: 'List',
    viewModeCard: 'Card',
    sortName: 'Name',
    sortCategoryName: 'Category and name',
    sortValueAsc: 'Lowest Price',
    sortValueDesc: 'Highest Price',
    sortLevelAsc: 'Lowest Level',
    sortLevelDesc: 'Highest Level',
    sortRarityAsc: 'Lowest Rarity',
    sortRarityDesc: 'Highest Rarity',
    sortUpdatedAsc: 'Less Updated',
    sortUpdatedDesc: 'More Updated',
    noItemsFound: 'No items found. Try adjusting your search or filters.',
    noItemsInCatalog: 'No items available in the catalog.',
    resultsCountLabel: '{shown} of {total} items',
    noteSearchHintLabel: 'Use this note in search',
    quickLinkLinksLabel: 'Links',
    quickLinkCommunityLabel: 'Community',
    quickLinkShirtLabel: 'Official shirt'
  },
  es: {
    subtitlePrefix: 'Catálogo de artículos de',
    searchPlaceholder: 'Buscar por nombre del artículo o paquete...',
    clearSearchLabel: 'Limpiar búsqueda',
    levelLabel: 'Nivel',
    categoryLabel: 'Categoría',
    categoryFilterHintLabel: 'Filtrar por esta categoría',
    packageLabel: 'Paquete',
    robuxLabel: 'Robux',
    speedLabel: 'Velocidad',
    capacityLabel: 'Capacidad',
    rarityLabel: 'Rareza',
    rarityTier1: 'Común',
    rarityTier2: 'Poco común',
    rarityTier3: 'Raro',
    rarityTier4: 'Muy raro',
    rarityTier5: 'Legendario',
    averageValueLabel: 'Valor',
    suggestedValueLabel: 'Valor sugerido',
    suggestedValueInfoLabel: 'Sobre el valor sugerido',
    suggestedValueTooltip: 'Estos precios son solo una sugerencia (no son oficiales). Para estimar este valor, revisamos varios precios informados por la comunidad en intercambios entre jugadores y calculamos una referencia media más justa. Recuerda que los valores pueden cambiar con el tiempo, así que úsalo solo como ayuda al negociar. Como referencia práctica, una negociación puede variar cerca de un 15% hacia arriba o hacia abajo.',
    valueRangeLabel: 'Rango estimado',
    relatedLabel: 'Relacionados',
    updatedAtLabel: 'Actualizado el',
    itemsSuffix: 'artículos',
    indicatorLabel: 'Indicador {value} de {max}',
    footerCreditPrefix: 'Creado por',
    specialOnlyLabel: 'Solo artículos especiales',
    cardHintLabel: 'Ver más detalles',
    copyNameLabel: 'Copiar nombre del ítem',
    nameCopiedLabel: 'Nombre copiado',
    shareButtonLabel: 'Compartir este artículo',
    shareCopiedLabel: 'Enlace copiado',
    moreActionsLabel: 'Más acciones',
    itemActionsMenuLabel: 'Opciones del artículo',
    announceItemLabel: 'Me interesa',
    announceSoonLabel: 'Próximamente',
    closeLabel: 'Cerrar',
    reportPriceLabel: 'Informar precio negociado',
    reportSoonLabel: 'Próximamente',
    sortByLabel: 'Ordenar',
    sortFilterAriaLabel: 'Ordenación',
    viewModeLabel: 'Vista',
    viewModeFilterAriaLabel: 'Modo de vista',
    viewModeGrid: 'Cuadrícula',
    viewModeList: 'Lista',
    viewModeCard: 'Tarjeta',
    sortName: 'Nombre',
    sortCategoryName: 'Categoría y nombre',
    sortValueAsc: 'Precio más bajo',
    sortValueDesc: 'Precio más alto',
    sortLevelAsc: 'Nivel más bajo',
    sortLevelDesc: 'Nivel más alto',
    sortRarityAsc: 'Menor rareza',
    sortRarityDesc: 'Mayor rareza',
    sortUpdatedAsc: 'Menos actualizado',
    sortUpdatedDesc: 'Más actualizado',
    noItemsFound: 'No se encontró ningún artículo. Ajusta la búsqueda o los filtros.',
    noItemsInCatalog: 'No hay artículos disponibles en el catálogo.',
    resultsCountLabel: '{shown} de {total} artículos',
    noteSearchHintLabel: 'Usar esta nota en la búsqueda',
    quickLinkLinksLabel: 'Enlaces',
    quickLinkCommunityLabel: 'Comunidad',
    quickLinkShirtLabel: 'Camisa oficial'
  },
  pl: {
    subtitlePrefix: 'Katalog przedmiotów dla',
    searchPlaceholder: 'Szukaj według nazwy przedmiotu lub pakietu...',
    clearSearchLabel: 'Wyczyść wyszukiwanie',
    levelLabel: 'Poziom',
    categoryLabel: 'Kategoria',
    categoryFilterHintLabel: 'Filtruj według tej kategorii',
    packageLabel: 'Pakiet',
    robuxLabel: 'Robux',
    speedLabel: 'Prędkość',
    capacityLabel: 'Pojemność',
    rarityLabel: 'Rzadkość',
    rarityTier1: 'Zwykły',
    rarityTier2: 'Niezwykły',
    rarityTier3: 'Rzadki',
    rarityTier4: 'Bardzo rzadki',
    rarityTier5: 'Legendarny',
    averageValueLabel: 'Wartość',
    suggestedValueLabel: 'Sugerowana wartość',
    suggestedValueInfoLabel: 'O sugerowanej wartości',
    suggestedValueTooltip: 'Te ceny są tylko sugestią (nie są oficjalne). Aby oszacować tę wartość, analizujemy ceny zgłaszane przez społeczność w wymianach między graczami i obliczamy uczciwszą średnią referencyjną. Pamiętaj, że wartości mogą się zmieniać, więc traktuj to tylko jako pomoc przy wymianie. W praktyce cena transakcji może różnić się o około 15% w górę lub w dół.',
    valueRangeLabel: 'Szacowany zakres',
    relatedLabel: 'Powiązane',
    updatedAtLabel: 'Zaktualizowano',
    itemsSuffix: 'przedmiotów',
    indicatorLabel: 'Wskaźnik {value} z {max}',
    footerCreditPrefix: 'Stworzone przez',
    specialOnlyLabel: 'Tylko przedmioty specjalne',
    cardHintLabel: 'Zobacz więcej szczegółów',
    copyNameLabel: 'Kopiuj nazwę przedmiotu',
    nameCopiedLabel: 'Nazwa skopiowana',
    shareButtonLabel: 'Udostępnij ten przedmiot',
    shareCopiedLabel: 'Link skopiowany',
    moreActionsLabel: 'Więcej akcji',
    itemActionsMenuLabel: 'Opcje przedmiotu',
    announceItemLabel: 'Jestem zainteresowany',
    announceSoonLabel: 'Wkrótce',
    closeLabel: 'Zamknij',
    reportPriceLabel: 'Zgłoś cenę wymiany',
    reportSoonLabel: 'Wkrótce',
    sortByLabel: 'Sortuj',
    sortFilterAriaLabel: 'Sortowanie',
    viewModeLabel: 'Widok',
    viewModeFilterAriaLabel: 'Tryb widoku',
    viewModeGrid: 'Siatka',
    viewModeList: 'Lista',
    viewModeCard: 'Karta',
    sortName: 'Nazwa',
    sortCategoryName: 'Kategoria i nazwa',
    sortValueAsc: 'Najniższa cena',
    sortValueDesc: 'Najwyższa cena',
    sortLevelAsc: 'Najniższy poziom',
    sortLevelDesc: 'Najwyższy poziom',
    sortRarityAsc: 'Najniższa rzadkość',
    sortRarityDesc: 'Najwyższa rzadkość',
    sortUpdatedAsc: 'Najdawniej aktualizowane',
    sortUpdatedDesc: 'Najnowsza aktualizacja',
    noItemsFound: 'Nie znaleziono przedmiotów. Zmień wyszukiwanie lub filtry.',
    noItemsInCatalog: 'Brak przedmiotów w katalogu.',
    resultsCountLabel: '{shown} z {total} przedmiotów',
    noteSearchHintLabel: 'Użyj tej notatki w wyszukiwaniu',
    quickLinkLinksLabel: 'Linki',
    quickLinkCommunityLabel: 'Społeczność',
    quickLinkShirtLabel: 'Oficjalna koszulka'
  },
  fr: {
    subtitlePrefix: "Catalogue d'objets pour",
    searchPlaceholder: "Rechercher par nom d'objet ou de pack...",
    clearSearchLabel: 'Effacer la recherche',
    levelLabel: 'Niveau',
    categoryLabel: 'Catégorie',
    categoryFilterHintLabel: 'Filtrer par cette catégorie',
    packageLabel: 'Pack',
    robuxLabel: 'Robux',
    speedLabel: 'Vitesse',
    capacityLabel: 'Capacité',
    rarityLabel: 'Rareté',
    rarityTier1: 'Commun',
    rarityTier2: 'Peu commun',
    rarityTier3: 'Rare',
    rarityTier4: 'Très rare',
    rarityTier5: 'Légendaire',
    averageValueLabel: 'Valeur',
    suggestedValueLabel: 'Valeur suggérée',
    suggestedValueInfoLabel: 'À propos de la valeur suggérée',
    suggestedValueTooltip: "Ces prix sont seulement une suggestion (ils ne sont pas officiels). Pour estimer cette valeur, nous analysons plusieurs prix signalés par la communauté lors d'échanges entre joueurs et calculons une référence moyenne plus juste. Les valeurs peuvent changer avec le temps, utilisez donc cela uniquement comme aide lors de vos échanges. En pratique, une négociation peut varier d'environ 15% à la hausse ou à la baisse.",
    valueRangeLabel: 'Fourchette estimée',
    relatedLabel: 'Associés',
    updatedAtLabel: 'Mis à jour le',
    itemsSuffix: 'objets',
    indicatorLabel: 'Indicateur {value} sur {max}',
    footerCreditPrefix: 'Créé par',
    specialOnlyLabel: 'Objets spéciaux uniquement',
    cardHintLabel: 'Voir plus de détails',
    copyNameLabel: 'Copier le nom de l\'objet',
    nameCopiedLabel: 'Nom copié',
    shareButtonLabel: 'Partager cet objet',
    shareCopiedLabel: 'Lien copié',
    moreActionsLabel: "Plus d'actions",
    itemActionsMenuLabel: "Options de l'objet",
    announceItemLabel: 'Je suis intéressé',
    announceSoonLabel: 'Bientôt',
    closeLabel: 'Fermer',
    reportPriceLabel: "Signaler un prix d'échange",
    reportSoonLabel: 'Bientôt',
    sortByLabel: 'Trier',
    sortFilterAriaLabel: 'Tri',
    viewModeLabel: 'Vue',
    viewModeFilterAriaLabel: 'Mode de vue',
    viewModeGrid: 'Grille',
    viewModeList: 'Liste',
    viewModeCard: 'Carte',
    sortName: 'Nom',
    sortCategoryName: 'Catégorie et nom',
    sortValueAsc: 'Prix le plus bas',
    sortValueDesc: 'Prix le plus élevé',
    sortLevelAsc: 'Niveau le plus bas',
    sortLevelDesc: 'Niveau le plus élevé',
    sortRarityAsc: 'Rareté la plus basse',
    sortRarityDesc: 'Rareté la plus élevée',
    sortUpdatedAsc: 'Moins récent',
    sortUpdatedDesc: 'Plus récent',
    noItemsFound: 'Aucun objet trouvé. Ajustez votre recherche ou vos filtres.',
    noItemsInCatalog: 'Aucun objet disponible dans le catalogue.',
    resultsCountLabel: '{shown} sur {total} objets',
    noteSearchHintLabel: 'Utiliser cette note dans la recherche',
    quickLinkLinksLabel: 'Liens',
    quickLinkCommunityLabel: 'Communauté',
    quickLinkShirtLabel: 'Chemise officielle'
  },
  hi: {
    subtitlePrefix: 'आइटम कैटलॉग',
    searchPlaceholder: 'आइटम या पैक के नाम से खोजें...',
    clearSearchLabel: 'खोज साफ़ करें',
    levelLabel: 'लेवल',
    categoryLabel: 'श्रेणी',
    categoryFilterHintLabel: 'इस श्रेणी से फ़िल्टर करें',
    packageLabel: 'पैक',
    robuxLabel: 'Robux',
    speedLabel: 'गति',
    capacityLabel: 'क्षमता',
    rarityLabel: 'दुर्लभता',
    rarityTier1: 'सामान्य',
    rarityTier2: 'असामान्य',
    rarityTier3: 'दुर्लभ',
    rarityTier4: 'बहुत दुर्लभ',
    rarityTier5: 'लेजेन्डरी',
    averageValueLabel: 'मूल्य',
    suggestedValueLabel: 'सुझाया गया मूल्य',
    suggestedValueInfoLabel: 'सुझाए गए मूल्य के बारे में',
    suggestedValueTooltip: 'ये कीमतें केवल सुझाव हैं (आधिकारिक नहीं)। इस मूल्य का अनुमान लगाने के लिए हम खिलाड़ियों के बीच ट्रेड में समुदाय द्वारा बताई गई कई कीमतों की समीक्षा करते हैं और एक अधिक न्यायसंगत औसत संदर्भ निकालते हैं। याद रखें कि मूल्य समय के साथ बदल सकते हैं, इसलिए ट्रेड करते समय इसे केवल मदद के रूप में उपयोग करें। व्यावहारिक संदर्भ के रूप में, किसी सौदे में यह मूल्य लगभग 15% ऊपर या नीचे हो सकता है।',
    valueRangeLabel: 'अनुमानित सीमा',
    relatedLabel: 'संबंधित',
    updatedAtLabel: 'अपडेट किया गया',
    itemsSuffix: 'आइटम',
    indicatorLabel: '{max} में से {value} संकेतक',
    footerCreditPrefix: 'द्वारा बनाया गया',
    specialOnlyLabel: 'केवल विशेष आइटम',
    cardHintLabel: 'अधिक विवरण देखें',
    copyNameLabel: 'आइटम का नाम कॉपी करें',
    nameCopiedLabel: 'नाम कॉपी हुआ',
    shareButtonLabel: 'यह आइटम साझा करें',
    shareCopiedLabel: 'लिंक कॉपी हुआ',
    moreActionsLabel: 'अधिक कार्रवाइयां',
    itemActionsMenuLabel: 'आइटम विकल्प',
    announceItemLabel: 'मुझे रुचि है',
    announceSoonLabel: 'जल्द',
    closeLabel: 'बंद करें',
    reportPriceLabel: 'ट्रेड कीमत बताएं',
    reportSoonLabel: 'जल्द',
    sortByLabel: 'क्रमबद्ध करें',
    sortFilterAriaLabel: 'क्रम',
    viewModeLabel: 'दृश्य',
    viewModeFilterAriaLabel: 'दृश्य मोड',
    viewModeGrid: 'ग्रिड',
    viewModeList: 'सूची',
    viewModeCard: 'कार्ड',
    sortName: 'नाम',
    sortCategoryName: 'श्रेणी और नाम',
    sortValueAsc: 'सबसे कम कीमत',
    sortValueDesc: 'सबसे अधिक कीमत',
    sortLevelAsc: 'सबसे कम लेवल',
    sortLevelDesc: 'सबसे अधिक लेवल',
    sortRarityAsc: 'सबसे कम दुर्लभता',
    sortRarityDesc: 'सबसे अधिक दुर्लभता',
    sortUpdatedAsc: 'कम अपडेटेड',
    sortUpdatedDesc: 'अधिक अपडेटेड',
    noItemsFound: 'कोई आइटम नहीं मिला। अपनी खोज या फ़िल्टर बदलें।',
    noItemsInCatalog: 'कैटलॉग में कोई आइटम उपलब्ध नहीं है।',
    resultsCountLabel: '{shown} / {total} आइटम',
    noteSearchHintLabel: 'इस नोट को खोज में उपयोग करें',
    quickLinkLinksLabel: 'लिंक',
    quickLinkCommunityLabel: 'समुदाय',
    quickLinkShirtLabel: 'आधिकारिक शर्ट'
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
      const decoded = decodeBase64Utf8(data.payload);
      const parsed = JSON.parse(decoded);
      return parsed;
    } catch (error) {
      console.warn('Failed to decode catalog payload. Falling back to direct JSON.', error);
    }
  }

  return data;
}

function decodeBase64Utf8(payload) {
  const binary = atob(payload);
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
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
    robux: normalizeRobuxValue(safeEntry.robux)
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
  if (savedMode === 'list' || savedMode === 'grid' || savedMode === 'card') {
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
  languageSwitch.setAttribute('aria-label', getLanguageAriaLabel());

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

function getLanguageAriaLabel() {
  return LANGUAGE_ARIA_LABELS[currentLanguage] || LANGUAGE_ARIA_LABELS['pt-BR'];
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
  const rawCapacity = firstDefinedValue([
    item.classification?.capacity,
    item.capacidade,
    item.capacity
  ]);
  const rawCapacityMin = firstDefinedValue([
    item.classification?.capacityMin,
    item.capacityMin,
    item.classification?.capacityRange?.min,
    item.capacityRange?.min
  ]);
  const rawCapacityMax = firstDefinedValue([
    item.classification?.capacityMax,
    item.capacityMax,
    item.classification?.capacityRange?.max,
    item.capacityRange?.max
  ]);
  const normalizedCapacityValue = toNumberOrNull(rawCapacity);
  const capacityText = normalizedCapacityValue === null
    ? firstNonEmptyText([rawCapacity])
    : '';
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
    capacity: normalizedCapacityValue,
    capacityText,
    capacityMin: toNumberOrNull(rawCapacityMin),
    capacityMax: toNumberOrNull(rawCapacityMax),
    rarity: toNumberOrNull(rawRarity),
    rarityMin: toNumberOrNull(rawRarityMin),
    rarityMax: toNumberOrNull(rawRarityMax),
    value: resolvedValue,
    valueHistory: normalizedMarket.history,
    valueSource: hasMarketHistory ? 'market' : 'fixed',
    valueStatus: firstNonEmptyText([normalizedMarket.valueStatus, item.pricing?.valueStatus]) || (resolvedValue === null ? 'none' : 'known'),
    robux: normalizeRobuxValue(firstDefinedValue([normalizedMarket.robux, item.pricing?.robux, item.robux])),
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
    aliases: normalizeSearchAliases(firstDefinedValue([
      item.search?.aliases,
      item.aliases,
      item.alias,
      item.display?.aliases
    ])),
    notes: item.notes || item.description || ''
  };
}

function normalizeSearchAliases(rawAliases) {
  if (Array.isArray(rawAliases)) {
    return rawAliases
      .map(alias => String(alias || '').trim())
      .filter(Boolean);
  }

  if (typeof rawAliases === 'string') {
    return rawAliases
      .split(',')
      .map(alias => alias.trim())
      .filter(Boolean);
  }

  return [];
}

function getPrimaryAlias(item) {
  return firstNonEmptyText(getDisplayAliases(item));
}

function getDisplayAliases(item) {
  if (!Array.isArray(item?.aliases)) return [];

  const normalizedName = normalizeSearchText(item?.name || '');
  const seenAliases = new Set();

  return item.aliases
    .map(alias => String(alias || '').trim())
    .filter(alias => {
      const normalizedAlias = normalizeSearchText(alias);
      if (!normalizedAlias || normalizedAlias === normalizedName || seenAliases.has(normalizedAlias)) return false;
      seenAliases.add(normalizedAlias);
      return true;
    });
}

function renderItemName(item) {
  const rawName = item?.name || '';
  const name = escapeHtml(rawName);
  const copyLabel = t('copyNameLabel');
  const nameMarkup = `<button type="button" class="item-name-copy-btn" data-copy-item-name="${name}" title="${escapeHtml(copyLabel)}" aria-label="${escapeHtml(`${copyLabel}: ${rawName}`)}">${name}</button>`;
  const displayAliases = getDisplayAliases(item);
  const primaryAlias = firstNonEmptyText(displayAliases);
  const extraAliases = displayAliases.slice(1);

  if (!primaryAlias) return nameMarkup;

  if (extraAliases.length === 0) {
    return `${nameMarkup} <span class="item-alias">(${escapeHtml(primaryAlias)})</span>`;
  }

  const tooltipHtml = extraAliases
    .map(alias => `<span>${escapeHtml(alias)}</span>`)
    .join('');

  return `${nameMarkup} <span class="item-alias item-alias--has-tooltip" tabindex="0" aria-label="${escapeHtml([primaryAlias, ...extraAliases].join(', '))}">(${escapeHtml(primaryAlias)})<span class="item-alias-tooltip" role="tooltip" aria-hidden="true">${tooltipHtml}</span></span>`;
}

function renderItems(items) {
  const container = document.getElementById('itemsContainer');
  const viewMode = getSelectedViewMode();
  container.className = viewMode === 'list'
    ? 'items-list'
    : (viewMode === 'card' ? 'items-carousel' : 'items-grid');
  container.innerHTML = '';
  updateResultsCount(items.length, allItems.length, items);

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
    loadCatalogImages(container);
    return;
  }

  if (viewMode === 'card') {
    renderCarouselView(items, container, packageMap);
    return;
  }

  items.forEach(item => {
    const slot = document.createElement('div');
    slot.classList.add('item-slot');

    const card = document.createElement('div');
    card.classList.add('item-card');
    card.dataset.itemId = item.id;
    card.setAttribute('aria-label', t('cardHintLabel'));

    card.innerHTML = `
      ${renderShareButton(item)}
      <div class="item-preview">
        <div class="item-image catalog-image is-loading" role="img" aria-label="${escapeHtml(item.name)}" data-image-src="${escapeHtml(item.image)}"></div>
        <div class="item-name">${renderItemName(item)}</div>
      </div>
      <div class="item-details">
        ${renderLevelRow(item)}
        ${renderCategoryRow(item)}
        ${renderRarityRow(item)}
        ${renderSpeedRow(item)}
        ${renderCapacityRow(item)}
        ${renderRobuxRow(item)}
        ${renderValueRow(item)}
        ${renderPackageRow(item, packageMap)}
        ${renderRelatedItems(item, packageMap)}
        ${renderItemNotes(item)}
        ${renderUpdateRow(item)}
      </div>
    `;

    const actionsToggle = card.querySelector('.item-actions-toggle');
    const shareAction = card.querySelector('[data-action="share"]');
    const valueInfoButton = card.querySelector('.value-info-btn');
    const valueTooltip = card.querySelector('.value-tooltip');
    if (actionsToggle) {
      actionsToggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleShareClick(item, actionsToggle);
      });
    }
    if (shareAction && shareAction !== actionsToggle) {
      shareAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleShareClick(item, shareAction);
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
    bindCopyNameActions(card, item);
    bindAliasTooltipActions(card);
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

  loadCatalogImages(container);
}

function getSelectedViewMode() {
  const viewModeFilter = document.getElementById('viewModeFilter');
  const selectedMode = viewModeFilter?.value;
  if (selectedMode === 'list' || selectedMode === 'grid' || selectedMode === 'card') {
    return selectedMode;
  }
  return currentViewMode === 'list' || currentViewMode === 'card' ? currentViewMode : 'grid';
}

function renderCarouselView(items, container, packageMap) {
  carouselIndex = Math.max(0, Math.min(carouselIndex, items.length - 1));
  const item = items[carouselIndex];

  const carousel = document.createElement('section');
  carousel.className = 'item-carousel';
  carousel.setAttribute('aria-label', t('viewModeCard'));

  const previousButton = document.createElement('button');
  previousButton.type = 'button';
  previousButton.className = 'carousel-nav carousel-nav--previous';
  previousButton.setAttribute('aria-label', getNavigationLabel('previousItem'));
  previousButton.title = previousButton.getAttribute('aria-label');
  previousButton.innerHTML = '&#8249;';
  previousButton.disabled = items.length <= 1;

  const card = document.createElement('article');
  card.className = 'item-card item-carousel-card expanded';
  card.dataset.itemId = item.id;
  card.innerHTML = `
    ${renderShareButton(item)}
    <div class="item-carousel-media">
      <div class="item-image catalog-image is-loading" role="img" aria-label="${escapeHtml(item.name)}" data-image-src="${escapeHtml(item.image)}"></div>
    </div>
    <div class="item-carousel-body">
      <div class="item-name">${renderItemName(item)}</div>
      <div class="item-details">
        ${renderLevelRow(item)}
        ${renderCategoryRow(item)}
        ${renderRarityRow(item)}
        ${renderSpeedRow(item)}
        ${renderCapacityRow(item)}
        ${renderRobuxRow(item)}
        ${renderValueRow(item)}
        ${renderPackageRow(item, packageMap)}
        ${renderRelatedItems(item, packageMap)}
        ${renderItemNotes(item)}
        ${renderUpdateRow(item)}
      </div>
      <div class="carousel-position">${carouselIndex + 1} / ${items.length}</div>
    </div>
  `;

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'carousel-nav carousel-nav--next';
  nextButton.setAttribute('aria-label', getNavigationLabel('nextItem'));
  nextButton.title = nextButton.getAttribute('aria-label');
  nextButton.innerHTML = '&#8250;';
  nextButton.disabled = items.length <= 1;

  previousButton.addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + items.length) % items.length;
    syncCarouselItemToUrl(items[carouselIndex]);
    renderItems(items);
  });

  nextButton.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % items.length;
    syncCarouselItemToUrl(items[carouselIndex]);
    renderItems(items);
  });

  bindItemActions(card, item);
  const media = card.querySelector('.item-carousel-media');
  if (media) {
    media.appendChild(previousButton);
  }
  card.appendChild(nextButton);
  carousel.appendChild(card);
  container.appendChild(carousel);
  loadCatalogImages(container);
  preloadCarouselNeighborImages(items);
}

function getNavigationLabel(key) {
  const labels = NAVIGATION_LABELS[key] || {};
  return labels[currentLanguage] || labels['pt-BR'] || key;
}

function bindItemActions(root, item) {
  const actionsToggle = root.querySelector('.item-actions-toggle');
  const shareAction = root.querySelector('[data-action="share"]');

  if (actionsToggle) {
    actionsToggle.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      handleShareClick(item, actionsToggle);
    });
  }

  if (shareAction && shareAction !== actionsToggle) {
    shareAction.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      handleShareClick(item, shareAction);
    });
  }

  root.querySelectorAll('.value-info-btn').forEach(valueInfoButton => {
    valueInfoButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const valueRow = valueInfoButton.closest('.item-row--value');
      if (!valueRow) return;
      const willOpen = !valueRow.classList.contains('tooltip-open');
      closeAllValueTooltips(root);
      valueRow.classList.toggle('tooltip-open', willOpen);
      root.classList.toggle('value-tooltip-open', willOpen);
      valueInfoButton.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  root.querySelectorAll('.value-tooltip').forEach(tooltip => {
    tooltip.addEventListener('click', event => {
      event.stopPropagation();
    });
  });

  bindAliasTooltipActions(root);
  bindCopyNameActions(root, item);

  root.querySelectorAll('.item-note-btn').forEach(noteButton => {
    noteButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const query = firstNonEmptyText([noteButton.dataset.noteQuery]);
      if (query) applyNoteSearchQuery(query);
    });
  });

  root.querySelectorAll('.item-category-btn').forEach(categoryButton => {
    categoryButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const categoryKey = firstNonEmptyText([categoryButton.dataset.categoryKey]);
      if (categoryKey) applyCategoryFilter(categoryKey);
    });
  });
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
    
    const updatedAtDate = item.lastUpdate ? escapeHtml(formatDate(item.lastUpdate)) : '';

    const row = document.createElement('article');
    row.className = 'item-list-row';
    row.dataset.itemId = item.id;
    row.innerHTML = `
      ${renderShareButton(item)}
      <div class="item-list-thumb catalog-image is-loading" role="img" aria-label="${escapeHtml(item.name)}" data-image-src="${escapeHtml(item.image)}"></div>
      <div class="item-list-main">
        <h3 class="item-list-name">${renderItemName(item)}</h3>
        <div class="item-list-meta">
          <span class="item-list-meta-label">${t('categoryLabel')}</span>
          <!-- Versão normal (não expandida) -->
          <span class="category-normal">${categoryValueNormal}</span>
          <!-- Versão expandida (inicialmente oculta) -->
          <span class="category-expanded" style="display: none;">${categoryValueExpanded}</span>
        </div>
      </div>
      <div class="item-list-value">
        ${renderRobuxRow(item)}
        ${renderValueRange(item, { compact: true })}
        <div class="item-list-updated">
          <small class="item-list-updated-label">${t('updatedAtLabel')}</small>
          <span class="item-list-updated-date">${updatedAtDate || '&nbsp;'}</span>
        </div>
      </div>
      <div class="item-list-details">
        ${renderLevelRow(item)}
        ${renderRarityRow(item)}
        ${renderSpeedRow(item)}
        ${renderCapacityRow(item)}
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
    const shareAction = row.querySelector('[data-action="share"]');
    
    if (actionsToggle) {
      actionsToggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleShareClick(item, actionsToggle);
      });
    }
    
    if (shareAction && shareAction !== actionsToggle) {
      shareAction.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handleShareClick(item, shareAction);
      });
    }

    bindAliasTooltipActions(row);
    bindCopyNameActions(row, item);
    
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

function bindCopyNameActions(root, item) {
  root.querySelectorAll('.item-name-copy-btn').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      handleCopyNameClick(item, button);
    });

    button.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.stopPropagation();
    });
  });
}

async function handleCopyNameClick(item, button) {
  const itemName = firstNonEmptyText([item?.name, button?.dataset.copyItemName]);
  if (!itemName || !button) return;

  const copied = await copyTextToClipboard(itemName);
  if (!copied) return;

  const defaultLabel = button.dataset.defaultLabel || itemName;
  button.dataset.defaultLabel = defaultLabel;
  button.textContent = t('nameCopiedLabel');
  button.classList.add('is-copied');

  window.setTimeout(() => {
    button.textContent = defaultLabel;
    button.classList.remove('is-copied');
  }, 1100);
}

function bindAliasTooltipActions(root) {
  root.querySelectorAll('.item-alias--has-tooltip').forEach(alias => {
    alias.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
    });

    alias.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopPropagation();
    });
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

function updateResultsCount(shown, total, items = []) {
  const resultsCountEl = document.getElementById('resultsCount');
  if (!resultsCountEl) return;
  const searchQuery = firstNonEmptyText([document.getElementById('searchInput')?.value]);
  const valueTotal = searchQuery ? getItemsValueTotal(items) : 0;
  const totalSuffix = valueTotal > 0 ? ` (${formatCompactPrice(valueTotal)})` : '';
  resultsCountEl.textContent = `${t('resultsCountLabel', {
    shown: String(shown),
    total: String(total)
  })}${totalSuffix}`;
}

function getItemsValueTotal(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => {
    const value = toNumberOrNull(item?.value);
    return value !== null && value > 0 ? sum + value : sum;
  }, 0);
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
  if (searchInput) {
    if (requestedSearch) {
      searchInput.value = requestedSearch;
    } else if (localStorage.getItem(SEARCH_STORAGE_KEY)) {
      searchInput.value = localStorage.getItem(SEARCH_STORAGE_KEY);
    }
  }

  const requestedCategory = firstNonEmptyText([params.get('cat')]);
  if (categoryFilter) {
    if (requestedCategory && hasSelectOptionValue(categoryFilter, requestedCategory)) {
      categoryFilter.value = requestedCategory;
    } else if (localStorage.getItem(CATEGORY_STORAGE_KEY) && hasSelectOptionValue(categoryFilter, localStorage.getItem(CATEGORY_STORAGE_KEY))) {
      categoryFilter.value = localStorage.getItem(CATEGORY_STORAGE_KEY);
    }
  }

  const requestedSpecial = params.get('sp');
  if (specialFilter) {
    if (requestedSpecial !== null) {
      specialFilter.checked = requestedSpecial === '1' || requestedSpecial === 'true';
    } else if (localStorage.getItem(SPECIAL_STORAGE_KEY) !== null) {
      specialFilter.checked = localStorage.getItem(SPECIAL_STORAGE_KEY) === '1';
    }
  }

  const requestedSort = firstNonEmptyText([params.get('sort')]);
  if (sortFilter && requestedSort && hasSelectOptionValue(sortFilter, requestedSort)) {
    sortFilter.value = requestedSort;
  }

  const requestedView = firstNonEmptyText([params.get('view')]);
  if (requestedView === 'list' || requestedView === 'grid' || requestedView === 'card') {
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

  if (searchInput) searchInput.value = '';
  if (categoryFilter) categoryFilter.value = ALL_CATEGORY_VALUE;
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

function renderCapacityRow(item) {
  const capacityDetails = getCapacityDetails(item);
  if (!capacityDetails.primary && !capacityDetails.secondary) return '';

  const secondaryHtml = capacityDetails.secondary
    ? `<small>${escapeHtml(capacityDetails.secondary)}</small>`
    : '';

  return `
    <div class="item-row">
      <span>${t('capacityLabel')}</span>
      <div class="stat-group">
        <small>${escapeHtml(capacityDetails.primary)}</small>
        ${secondaryHtml}
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
  return `
    <div class="item-row item-row--value">
      <span class="value-label-wrap">${t(valueLabelKey)}</span>
      ${renderValueRange(item)}
    </div>
  `;
}

function renderValueRange(item, options = {}) {
  if (item.value === null) return '<span class="item-list-value-empty">&nbsp;</span>';
  const isSuggestedValue = item.valueSource === 'market';
  
  // Show range only for special items with suggested value
  if (!item.special || !isSuggestedValue) {
    return `<strong>${formatPrice(item.value)}</strong>`;
  }
  
  const valueRange = getEstimatedValueRange(item.value);
  const compactClass = options.compact ? ' value-range--compact' : '';
  const infoHtml = `
    <button type="button" class="value-info-btn" aria-label="${escapeHtml(t('suggestedValueInfoLabel'))}" aria-expanded="false">i</button>
  `;
  const tooltipHtml = `
    <span class="value-tooltip" role="tooltip">${escapeHtml(t('suggestedValueTooltip'))}</span>
  `;

  return `
    <div class="value-range${compactClass}" aria-label="${escapeHtml(`${t('valueRangeLabel')}: ${formatPrice(valueRange.low)} - ${formatPrice(valueRange.high)}`)}">
      <div class="value-range-track" aria-hidden="true">
        <span class="value-range-fill"></span>
        <span class="value-range-marker"></span>
      </div>
      <div class="value-range-values">
        <small title="${escapeHtml(formatPrice(valueRange.low))}">${formatCompactPrice(valueRange.low)}</small>
        <span class="value-number-wrap">
          <strong>${formatPrice(item.value)}</strong>
          ${infoHtml}
          ${tooltipHtml}
        </span>
        <small title="${escapeHtml(formatPrice(valueRange.high))}">${formatCompactPrice(valueRange.high)}</small>
      </div>
    </div>
  `;
}

function renderRobuxRow(item) {
  const robux = formatRobuxCost(item?.robux);
  if (!robux) return '';

  return `
    <div class="item-row item-row--robux">
      <span>${t('robuxLabel')}</span>
      <strong>${escapeHtml(robux)}</strong>
    </div>
  `;
}

function getEstimatedValueRange(value) {
  const numericValue = Math.max(0, toNumberOrNull(value) || 0);
  return {
    low: Math.max(0, Math.round(numericValue * (1 - VALUE_RANGE_PERCENTAGE))),
    high: Math.round(numericValue * (1 + VALUE_RANGE_PERCENTAGE))
  };
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
  return `
    <div class="item-actions">
      <button type="button" class="item-actions-toggle" data-action="share" data-default-label="${escapeHtml(shareLabel)}" aria-label="${escapeHtml(shareLabel)}" title="${escapeHtml(shareLabel)}">
        ${getItemActionsIconMarkup()}
        <span class="item-actions-toggle-label">${escapeHtml(shareLabel)}</span>
      </button>
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
  const labelElement = button.querySelector('.item-actions-toggle-label');

  if (labelElement) {
    labelElement.textContent = copiedLabel;
  } else {
    button.textContent = copiedLabel;
  }

  button.classList.add('is-copied', 'is-expanded');

  window.setTimeout(() => {
    if (labelElement) {
      labelElement.textContent = defaultLabel;
    } else {
      button.textContent = defaultLabel;
    }
    button.classList.remove('is-copied', 'is-expanded');
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
    <svg class="item-actions-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
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

  const normalizedAliases = Array.isArray(item?.aliases)
    ? item.aliases.map(alias => normalizeSearchText(alias)).filter(Boolean)
    : [];
  if (normalizedAliases.some(alias => alias.includes(normalizedSearch))) return true;

  const relevantTokens = getRelevantSearchTokens(rawSearch);
  if (relevantTokens.length === 0) return false;

  if (normalizedAliases.some(alias => relevantTokens.every(token => alias.includes(token)))) return true;

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

function syncCarouselItemToUrl(item) {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  if (item && item.id) {
    params.set('item', item.id);
  } else {
    params.delete('item');
  }
  const nextUrl = `${url.pathname}${params.toString() ? `?${params.toString()}` : ''}${url.hash || ''}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl !== currentUrl) {
    window.history.replaceState(null, '', nextUrl);
  }
}

function syncCatalogStateToUrl() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const search = firstNonEmptyText([document.getElementById('searchInput')?.value]);
  const category = document.getElementById('categoryFilter')?.value || ALL_CATEGORY_VALUE;
  const specialOnly = document.getElementById('specialFilter')?.checked;
  const sortMode = document.getElementById('sortFilter')?.value || DEFAULT_SORT_MODE;
  const viewMode = getSelectedViewMode();

  if (search) {
    params.set('q', search);
    localStorage.setItem(SEARCH_STORAGE_KEY, search);
  } else {
    params.delete('q');
    localStorage.removeItem(SEARCH_STORAGE_KEY);
  }

  if (category && category !== ALL_CATEGORY_VALUE) {
    params.set('cat', category);
    localStorage.setItem(CATEGORY_STORAGE_KEY, category);
  } else {
    params.delete('cat');
    localStorage.removeItem(CATEGORY_STORAGE_KEY);
  }

  params.set('sp', specialOnly ? '1' : '0');
  localStorage.setItem(SPECIAL_STORAGE_KEY, specialOnly ? '1' : '0');

  if (sortMode && sortMode !== DEFAULT_SORT_MODE) params.set('sort', sortMode);
  else params.delete('sort');

  if (viewMode === 'list' || viewMode === 'card') params.set('view', viewMode);
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

function getCapacityDetails(item) {
  const fixedCapacity = toNumberOrNull(item.capacity);
  const minCapacity = toNumberOrNull(item.capacityMin);
  const maxCapacity = toNumberOrNull(item.capacityMax);
  const textCapacity = translateCapacityText(firstNonEmptyText([item.capacityText]));
  const rangeCapacity = minCapacity !== null && maxCapacity !== null
    ? (minCapacity === maxCapacity ? `${minCapacity}` : `${minCapacity}-${maxCapacity}`)
    : (minCapacity !== null ? `${minCapacity}` : (maxCapacity !== null ? `${maxCapacity}` : ''));

  if (textCapacity && rangeCapacity) {
    return {
      primary: textCapacity,
      secondary: rangeCapacity
    };
  }

  if (fixedCapacity !== null) {
    return {
      primary: `${fixedCapacity}`,
      secondary: ''
    };
  }

  if (textCapacity) {
    return {
      primary: textCapacity,
      secondary: ''
    };
  }

  if (rangeCapacity) {
    return {
      primary: rangeCapacity,
      secondary: ''
    };
  }

  return {
    primary: '',
    secondary: ''
  };
}

function translateCapacityText(capacityText) {
  const text = firstNonEmptyText([capacityText]);
  const translations = CAPACITY_TRANSLATIONS[currentLanguage];
  if (!text || !translations) return text;

  return translations.reduce((translatedText, [pattern, replacement]) => {
    return translatedText.replace(pattern, replacement);
  }, text);
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
  const locale = getCurrentLocale();
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0
  }).format(value);
}

function formatCompactPrice(value) {
  const numericValue = toNumberOrNull(value);
  if (numericValue === null) return '-';

  const absValue = Math.abs(numericValue);
  const units = [
    { threshold: 1_000_000_000, suffix: 'B' },
    { threshold: 1_000_000, suffix: 'M' },
    { threshold: 1_000, suffix: 'K' }
  ];
  const unit = units.find(option => absValue >= option.threshold);

  if (!unit) {
    return formatPrice(numericValue);
  }

  const scaledValue = numericValue / unit.threshold;
  const maximumFractionDigits = Math.abs(scaledValue) < 10 ? 1 : 0;
  const locale = getCurrentLocale();
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits
  }).format(scaledValue)}${unit.suffix}`;
}

function formatRobuxCost(value) {
  const normalized = normalizeRobuxValue(value);
  if (!normalized) return '';

  return normalized
    .split(/\s*-\s*/)
    .map(part => {
      const numericPart = toNumberOrNull(part);
      return numericPart === null ? part : formatPrice(numericPart);
    })
    .join(' - ');
}

function formatDate(value) {
  if (!value) return '-';

  if (value.includes('-')) {
    const parsed = new Date(`${value}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      const locale = getCurrentLocale();
      return parsed.toLocaleDateString(locale);
    }
  }

  return value;
}

function getCurrentLocale() {
  return SUPPORTED_LOCALES[currentLanguage] || SUPPORTED_LOCALES['pt-BR'];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeCssUrl(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function loadCatalogImages(root = document) {
  root.querySelectorAll('.catalog-image[data-image-src]').forEach(element => {
    const imagePath = firstNonEmptyText([element.dataset.imageSrc]) || DEFAULT_ITEM_IMAGE;
    const cached = itemImageCache.get(imagePath);

    if (cached?.status === 'loaded') {
      element.style.backgroundImage = `url('${escapeCssUrl(imagePath)}')`;
      setCatalogImageState(element, 'loaded');
      return;
    }

    if (cached?.status === 'missing') {
      element.style.backgroundImage = `url('${escapeCssUrl(DEFAULT_ITEM_IMAGE)}')`;
      setCatalogImageState(element, 'missing');
      return;
    }

    setCatalogImageState(element, 'loading');
    preloadCatalogImage(imagePath)
      .then(loadedPath => {
        element.style.backgroundImage = `url('${escapeCssUrl(loadedPath)}')`;
        setCatalogImageState(element, 'loaded');
      })
      .catch(() => {
        element.style.backgroundImage = `url('${escapeCssUrl(DEFAULT_ITEM_IMAGE)}')`;
        setCatalogImageState(element, 'missing');
      });
  });
}

function preloadCarouselNeighborImages(items) {
  if (!Array.isArray(items) || items.length <= 1) return;
  const previousIndex = (carouselIndex - 1 + items.length) % items.length;
  const nextIndex = (carouselIndex + 1) % items.length;
  [items[previousIndex], items[nextIndex]].forEach(item => {
    const imagePath = firstNonEmptyText([item?.image]);
    if (imagePath) preloadCatalogImage(imagePath).catch(() => {});
  });
}

function preloadCatalogImage(imagePath) {
  const normalizedPath = firstNonEmptyText([imagePath]) || DEFAULT_ITEM_IMAGE;
  const cached = itemImageCache.get(normalizedPath);

  if (cached?.status === 'loaded') {
    return Promise.resolve(normalizedPath);
  }

  if (cached?.status === 'missing') {
    return Promise.reject(new Error('Image not found'));
  }

  if (cached?.promise) {
    return cached.promise;
  }

  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      itemImageCache.set(normalizedPath, { status: 'loaded' });
      resolve(normalizedPath);
    };
    image.onerror = () => {
      itemImageCache.set(normalizedPath, { status: 'missing' });
      reject(new Error('Image not found'));
    };
    image.src = normalizedPath;
  });

  itemImageCache.set(normalizedPath, { status: 'loading', promise });
  return promise;
}

function setCatalogImageState(element, state) {
  element.classList.toggle('is-loading', state === 'loading');
  element.classList.toggle('is-loaded', state === 'loaded');
  element.classList.toggle('is-missing', state === 'missing');
}

function firstDefinedValue(values) {
  return values.find(value => value !== undefined && value !== null && value !== '');
}

function firstNonEmptyText(values) {
  const value = values.find(candidate => typeof candidate === 'string' ? candidate.trim() : candidate);
  if (typeof value === 'string') return value.trim();
  return value || '';
}

function normalizeRobuxValue(value) {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'number') return value > 0 ? String(value) : '';
  if (typeof value !== 'string') return '';

  const normalized = value.trim();
  if (!normalized) return '';

  const rangeParts = normalized
    .split(/\s*-\s*/)
    .map(part => toNumberOrNull(part))
    .filter(part => part !== null && part > 0);

  if (rangeParts.length === 2) {
    return `${rangeParts[0]} - ${rangeParts[1]}`;
  }

  const numericValue = toNumberOrNull(normalized);
  return numericValue !== null && numericValue > 0 ? String(numericValue) : normalized;
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
  const effectiveSortMode = getSelectedViewMode() === 'card' && sortMode === DEFAULT_SORT_MODE
    ? 'level-asc'
    : sortMode;

  const filtered = allItems.filter(item => {
    const matchSearch = itemMatchesSearch(item, search);
    const matchCategory = category === ALL_CATEGORY_VALUE || item.categoryKey === category;
    const matchSpecial = !specialOnly || item.special;
    return matchSearch && matchCategory && matchSpecial;
  });

  if (shouldSyncUrl) {
    syncCatalogStateToUrl();
  }

  const sortedItems = sortItemsForDisplay(filtered, effectiveSortMode);
  currentFilteredItems = sortedItems;

  if (getSelectedViewMode() === 'card') {
    const requestedId = getItemIdFromUrl();
    const requestedIndex = requestedId
      ? sortedItems.findIndex(item => String(item.id || '').toLowerCase() === requestedId.toLowerCase())
      : -1;
    if (requestedIndex >= 0) {
      carouselIndex = requestedIndex;
    }
  }

  renderItems(sortedItems);
}

function sortItemsForDisplay(items, sortMode = DEFAULT_SORT_MODE) {
  return [...items].sort((a, b) => {
    // Novas opções de ordenação por level
    if (sortMode === 'level-desc') {
      const levelCompare = compareItemsByLevel(a, b, 'desc');
      if (levelCompare !== 0) return levelCompare;
    } else if (sortMode === 'level-asc') {
      const levelCompare = compareItemsByLevel(a, b, 'asc');
      if (levelCompare !== 0) return levelCompare;
    }
    
    // Novas opções de ordenação por raridade
    else if (sortMode === 'rarity-desc') {
      const rarityCompare = compareItemsByRarity(a, b, 'desc');
      if (rarityCompare !== 0) return rarityCompare;
    } else if (sortMode === 'rarity-asc') {
      const rarityCompare = compareItemsByRarity(a, b, 'asc');
      if (rarityCompare !== 0) return rarityCompare;
    }

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

function compareItemsByLevel(a, b, direction) {
  const levelA = toNumberOrNull(a?.level);
  const levelB = toNumberOrNull(b?.level);
  const hasLevelA = levelA !== null;
  const hasLevelB = levelB !== null;

  // Itens com level vêm antes de itens sem level
  if (hasLevelA && !hasLevelB) return -1;
  if (!hasLevelA && hasLevelB) return 1;
  
  // Se ambos não têm level, são considerados iguais
  if (!hasLevelA && !hasLevelB) return 0;
  
  // Ordenação direcional
  if (direction === 'asc') return levelA - levelB;
  return levelB - levelA;
}

function compareItemsByRarity(a, b, direction) {
  const rarityA = toNumberOrNull(a?.rarity);
  const rarityB = toNumberOrNull(b?.rarity);
  const hasRarityA = rarityA !== null && rarityA > 0;
  const hasRarityB = rarityB !== null && rarityB > 0;

  // Itens com raridade vêm antes de itens sem raridade
  if (hasRarityA && !hasRarityB) return -1;
  if (!hasRarityA && hasRarityB) return 1;
  
  // Se ambos não têm raridade, são considerados iguais
  if (!hasRarityA && !hasRarityB) return 0;
  
  // Ordenação direcional
  if (direction === 'asc') return rarityA - rarityB;
  return rarityB - rarityA;
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
  const selectedMode = event.target.value;
  currentViewMode = selectedMode === 'list' || selectedMode === 'card' ? selectedMode : 'grid';
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
    cortadoresdearvores: 'TreeCutters',
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
    return;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    if (getSelectedViewMode() !== 'card') return;
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;

    const activeElement = document.activeElement;
    const activeTag = activeElement?.tagName?.toLowerCase();
    const isTyping = activeElement?.isContentEditable
      || activeTag === 'input'
      || activeTag === 'textarea'
      || activeTag === 'select';

    if (isTyping) return;
    if (!Array.isArray(currentFilteredItems) || currentFilteredItems.length === 0) return;

    event.preventDefault();

    if (event.key === 'ArrowLeft') {
      carouselIndex = (carouselIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
    } else {
      carouselIndex = (carouselIndex + 1) % currentFilteredItems.length;
    }

    syncCarouselItemToUrl(currentFilteredItems[carouselIndex]);
    renderItems(currentFilteredItems);
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
