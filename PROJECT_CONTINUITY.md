# Hoard SafraBr - Documentacao de Continuidade

## 1) Visao Geral
- Projeto web estatico (HTML/CSS/JS) para catalogo de itens do jogo *Farming and Friends*.
- Possui duas superficies:
  - Publica: `index.html` + `script.js` + `style.css`
  - Admin local: `admin.html` (uso em `localhost`) para manutencao de catalogo e precos.
- Nao ha build step, framework ou dependencias npm. Servido direto por Apache/XAMPP.

## 2) Arquitetura de Dados
- O catalogo foi separado em dados fixos + dados dinamicos de mercado.

### 2.1 Arquivos de dados
- `data/items.json`
  - Arquivo ofuscado (base64 no campo `payload`), consumido pela pagina publica.
  - Estrutura externa: `{ schemaVersion, payload }`.
- `data/items.decoded.json`
  - Versao legivel do catalogo fixo.
  - Contem `items[]` com metadados de item e `pricing` fixo para nao-especiais.
- `data/items.market.json`
  - Dados dinamicos de mercado para itens especiais.
  - Estrutura: `{ schemaVersion: 1, pricing: { [itemId]: { history[], lastUpdate, valueStatus, robux } } }`.

### 2.2 Regra de separacao atual
- Itens **nao especiais** (`access.special=false`):
  - Preco fixo em `items.decoded.json` em `item.pricing.value`.
- Itens **especiais** (`access.special=true`):
  - Historico em `items.market.json` em `pricing[itemId].history`.
  - Campo `lastUpdate` atualizado quando ha novo registro de preco.

### 2.3 Numeros atuais (snapshot)
- Total de itens: `174`
- Especiais: `90`
- Nao especiais (fixos): `84`
- Entradas em `items.market.json`: `90` (apenas especiais)
- SeedBoxes: `32` (`18` especiais + `14` nao especiais)

## 3) Fluxo da Pagina Publica
- Arquivo principal: `script.js`.
- Carregamento:
  1. `fetch('data/items.json')` -> decode do payload
  2. `fetch('data/items.market.json')`
  3. Merge por `item.id`
- Preco exibido:
  - Se existir historico em `market.history`, calcula **mediana** (`calculateMedian`) e marca origem `market`.
  - Senao usa fallback fixo (`item.pricing.value`) e marca origem `fixed`.
- Rotulo dinamico de preco:
  - `Valor` para fixo
  - `Valor sugerido` para origem mercado
  - Itens com `Valor sugerido` exibem `*` no preco com tooltip explicativo (informativo/comunidade).

## 4) Fluxo do Admin Local
- Arquivo principal: `admin.html`.
- Restricao:
  - Funciona apenas em `localhost/127.0.0.1`.
- Funcionalidades:
  - Cadastro/edicao de item no catalogo fixo (estado local).
  - Secao separada de preco:
    - Select com itens especiais
    - Campo de preco observado
    - Botao para adicionar no vetor `history`
    - `lastUpdate` preenchido automaticamente com data atual (`YYYY-MM-DD`).
  - Export de arquivos:
    - `items.json` (ofuscado)
    - `items.market.json` (texto legivel)
  - Persistencia em servidor local (quando disponivel):
    - Botao `Salvar no servidor`
    - Auto-save ao registrar preco
    - Exibe status de sucesso/erro.

## 5) Endpoint Local de Persistencia
- Arquivo: `save-data.php` (uso local, opcional para versionamento remoto).
- Contrato `POST` JSON:
  - `catalogEncoded`
  - `catalogDecoded`
  - `market`
- Arquivos escritos:
  - `data/items.json`
  - `data/items.decoded.json`
  - `data/items.market.json`
- Retorno:
  - `{ ok: true }` em sucesso
  - `{ ok: false, error }` em falha com HTTP adequado.

## 6) Scripts de Suporte
- `scripts/items-payload.ps1`
  - `-Mode decode`: converte `items.json` -> `items.decoded.json`
  - `-Mode encode`: converte `items.decoded.json` -> `items.json`
  - Valida JSON antes de gravar.

## 7) Regras de Negocio Consolidadas
- Catalogo publico prioriza leitura de dados ofuscados + mercado.
- Historico de preco serve para robustez contra outliers; referencia atual usa mediana.
- `valueStatus` esperado:
  - `known` quando existe valor/historico
  - `none` quando nao ha preco.
- Idiomas suportados: `pt-BR` e `en`.
- Categorias normalizadas por alias em `resolveCategoryKey`.

## 8) Pontos Criticos
- `save-data.php` e local-only:
  - Se nao existir no host, admin nao persiste via botao; apenas exporta.
  - Decisao atual: pode ficar fora da `main` e ser mantido local.
- `items.json` e `items.decoded.json` precisam estar sincronizados.
- Mudancas de schema devem atualizar:
  - `script.js` (normalizacao/merge/render)
  - `admin.html` (edicao/export)
  - `scripts/items-payload.ps1` (quando afetar empacotamento).

## 9) Checklist Rapido para Novos Chats
1. Confirmar branch atual (`development`).
2. Verificar sincronismo:
   - `items.decoded.json` <-> `items.json`
   - especiais em `items.market.json`.
3. Testar fluxo:
   - Abrir `index.html` via servidor e validar rotulo `Valor` vs `Valor sugerido`.
   - Abrir `admin.html` em `localhost`, registrar preco e confirmar `lastUpdate`.
4. Se persistencia local for exigida, garantir endpoint `save-data.php` funcional no Apache.
5. Antes de merge para `main`, revisar arquivos que sao apenas de suporte local.

## 10) Escopo Atual de Deploy
- O site publicado precisa principalmente de:
  - `index.html`, `style.css`, `script.js`
  - `data/items.json`, `data/items.market.json`
  - assets `img/` e `favicon_io/`
- `admin.html` e `save-data.php` sao ferramentas operacionais; uso recomendado local.

## 11) Atualizacoes Recentes (mar/2026)
- Catalogo e dados:
  - Categoria `SeedBoxes` alimentada pela primeira vez:
    - 18 especiais (com historico inicial em `items.market.json`)
    - 14 comuns (somente `pricing` fixo em `items.decoded.json`)
  - Conversoes para especiais:
    - `maltex-p680-ah` e `nsh` normalizados como especiais no padrao atual (sem `pricing` em decoded; entrada em market com `valueStatus: none`).
    - `actives7`, `na-cr10` e `vintage-harvester` convertidos para especiais e adicionados ao market.
  - Renomeacao:
    - `s4204`/`S4204` atualizado para `4204`.
- Filtro de especiais:
  - Rotulo atualizado para `Somente itens especiais` (`pt-BR`) e `Special items only` (`en`).
  - Checkbox convertido para visual de toggle (liga/desliga), mantendo a mesma logica de filtro (`specialFilter`).
- Ordenacao de listagem (publico):
  - Ordem fixa por categoria (TreeCutters -> Tractors -> Plows -> Cultivators -> Seeders -> SeedBoxes -> Harvesters -> Trucks -> Trailers -> Misc).
  - Dentro da categoria: ordem alfabetica natural por nome (`numeric: true`).
- Barra de estatisticas/lista:
  - Adicionado seletor de ordenacao:
    - `Categoria + nome` (padrao)
    - `Maior preco primeiro`
    - `Menor preco primeiro`
  - Layout: controle a esquerda e contador de resultados a direita.
- Idioma:
  - Seletor atualizado para `Portugues` e `English` com bandeiras no rotulo (observacao: renderizacao de bandeira em `select` nativo depende do SO/browser).
  - Subtitulo do topo passou a usar prefixo traduzivel (`subtitlePrefix`) + link fixo para o jogo:
    - `https://www.roblox.com/pt/games/2772610559/Farming-and-Friends`
    - abre em nova aba (`target="_blank"`).
- Sticky da busca:
  - Mantido comportamento por classe `.is-sticky` com `position: fixed` (controle no `handleScrollUiState`).
  - Ajuste para evitar regressao de visibilidade quando rola a pagina.
- Tema visual (sem alterar estrutura funcional):
  - Refresh de UI em `style.css` com base neutra (estilo mais proximo de interfaces Roblox).
  - Estados interativos com destaque em azul (foco de campos, hover/focus de card, toggle ativo).
  - `stat-fill` recebeu gradiente com maior destaque visual.
- Atalhos flutuantes (publicidade discreta):
  - Bloco fixo `quick-links` acima do `backToTopBtn` no canto inferior direito.
  - Links atuais: Discord, Camisa oficial, YouTube.
  - Comportamento:
    - Desktop: icone compacto + expande texto em `hover/focus`.
    - Mobile: mantem formato compacto circular (sem expansao de texto).
  - Cores por atalho:
    - Discord (azul), YouTube (vermelho), Camisa (verde).
- Marca d'agua nas imagens dos itens:
  - `VoZona` adicionada via CSS pseudo-elemento em `.item-image::after`.
  - Estilo atual: texto discreto no centro, em diagonal (timbrado), sem bloquear interacao.
- Compartilhamento e navegacao (mantidos ativos):
  - Botao de compartilhar evoluiu para menu de acoes (icone de tres pontos):
    - `Compartilhar link` (ativo, com feedback de copia)
    - `Anunciar este item` (placeholder: `Em breve`)
    - `Relatar preco` (placeholder: `Em breve`)
  - Estrutura pronta para formularios externos (Google Forms ou similar):
    - `ACTION_FORM_LINKS` em `script.js` permite configurar URL por acao.
    - Quando vazio, acao permanece em modo placeholder.
  - Abertura de item por query string `?item=...`.
  - Botao `Voltar ao topo` com exibicao por scroll.

## 12) Commits Recentes (branch `development`)
- `c0d5bd3` - Atualiza SeedBoxes, corrige especiais e ordenacao por categoria/nome
- `33d47f5` - Atualiza filtro de especiais com toggle e bandeiras no seletor de idioma
- `1e78ffb` - Refina UI com tema neutro e destaques interativos
