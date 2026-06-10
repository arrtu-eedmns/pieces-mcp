# Pieces — JS Core

⚠️ LEIA ESTE ARQUIVO ANTES DE USAR QUALQUER COMPONENTE DE KIT.
Os JS do core controlam comportamentos que todos os kits dependem.

Os arquivos JS do Pieces Core são independentes entre si.
Cada um tem uma única responsabilidade e age via event delegation global (sem init manual).
Devem ser carregados como `<script>` separados ou via barrel (`pieces.js`).

---

## ripple.js

**Responsabilidade:** efeito visual de onda (ripple) ao clicar.

**Como funciona:** escuta `click` globalmente. Se o elemento clicado tem um filho
direto com classe `.piece-ripple`, cria um `<span>` animado a partir da posição exata do clique.
Remove o elemento ao fim da animação.

**Como usar:**
```html
<button class="piece-surface ...">
    <span class="piece-ripple"></span>
    Texto
</button>
```
Basta ter `.piece-ripple` como filho direto — o JS detecta automaticamente.

---

## disabled.js

**Responsabilidade:** bloquear interação em elementos desabilitados.

**Como funciona:** escuta `click` em fase de **captura** (antes de qualquer handler do elemento).
Se o clique atingiu algo dentro de `.piece-disabled`, cancela propagação e default.

**REGRA ABSOLUTA:** nunca use o atributo HTML `disabled` em elementos com Pieces.
O atributo nativo quebra comportamentos já definidos pelo surface.

```js
// correto — controlado pelo JS
elemento.classList.add('piece-disabled')
elemento.classList.remove('piece-disabled')
```

---

## interactive.js

**Responsabilidade:** abrir/fechar elementos interativos (dropdown, popover, menu).

**Como funciona:** escuta `click` globalmente. Para cada `.piece-interactive`:
- clique **dentro** → adiciona `.piece-actived` (abre)
- clique **fora** → remove `.piece-actived` (fecha)
- clique em `.piece-not-interactive` → força fechamento mesmo que seja filho

**Padrão para dropdown:**
```html
<div class="piece-interactive piece-surface ...">
    <button>Abrir menu</button>
    <ul class="piece-surface ...">
        <!-- aparece quando .piece-actived está no pai -->
    </ul>
</div>
```

**NÃO use para toggle buttons** — o `interactive` desativa ao clicar fora,
comportamento errado para botões que devem permanecer ativos.

---

## toggle.js

**Responsabilidade:** alternar `.piece-actived` em botões toggle e grupos de seleção.

**Três comportamentos automáticos baseados no contexto HTML:**

### 1. Toggle independente (sem grupo)
```html
<button class="piece-toggle piece-surface ...">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded">bookmark</span>
</button>
```
Clique alterna `.piece-actived` livremente.

### 2. Grupo single-select (exclusivo)
```html
<div class="piece-group">
    <button class="piece-toggle piece-surface ...">A</button>
    <button class="piece-toggle piece-surface ...">B</button>
    <button class="piece-toggle piece-surface ...">C</button>
</div>
```
Clique em um remove `.piece-actived` de todos e adiciona apenas no clicado.
Comportamento equivalente ao radio nativo — mas para UI sem formulário.

### 3. Grupo multi-select
```html
<div class="piece-group piece-multi">
    <button class="piece-toggle piece-surface ...">Negrito</button>
    <button class="piece-toggle piece-surface ...">Itálico</button>
    <button class="piece-toggle piece-surface ...">Sublinhado</button>
</div>
```
Cada botão alterna independentemente dentro do grupo.
Comportamento equivalente ao checkbox nativo — mas para UI sem formulário.

**Regra:** `.piece-toggle` no botão + `.piece-group` (opcional) no pai.
O CSS usa `.piece-actived` para aplicar o visual de estado ativo.

---

## tooltip.js

**Responsabilidade:** posicionar tooltips com `position:fixed` no lado com mais espaço.

**Como funciona:** mouseenter/mouseleave globais. Detecta `.piece-tooltip` filho direto
e o posiciona automaticamente — preferindo vertical, caindo em horizontal se necessário.
Esconde no scroll. Reposiciona no resize.

**Como usar:**
```html
<button class="piece-surface ...">
    Hover em mim
    <span class="piece-tooltip piece-surface background-color-inverse-00 text-color-inverse-25">
        Texto do tooltip
    </span>
</button>
```

---

## piece-css-generator.js

**Responsabilidade:** gerar dinamicamente todas as classes de token CSS.

Gera as classes `background-color-auto-XX`, `text-color-auto-XX`, `border-color-auto-XX`,
sufixos de estado (`-hover`, `-active`, `-hover-active`), alpha (`piece-{property}-alpha-XX`),
blur (`piece-blur-XX`) e injetar no `<head>` via `<style>`.

Use `sistema_de_cores` para documentação completa do sistema de tokens.

---

## Ordem de carregamento recomendada

`piece-css-generator.js` deve ser carregado **sem `defer`**, antes dos demais scripts no `<head>`.
Isso garante que o observer inicia imediatamente — observando `document.documentElement`
antes mesmo do `<body>` existir — eliminando FOUC em MPA e SPA.

```html
<head>
  <!-- 1. Gerador: blocking, sem defer — inicia o observer durante o parse do HTML -->
  <script src="piece-css-generator.js"></script>

  <!-- 2. Demais utilitários: defer — baixam em paralelo, executam após o parse -->
  <script defer src="ripple.js"></script>
  <script defer src="disabled.js"></script>
  <script defer src="interactive.js"></script>
  <script defer src="toggle.js"></script>
  <script defer src="tooltip.js"></script>
</head>
```

> **Por que blocking?** O observer de `piece-css-generator.js` dispara conforme o parser adiciona
> elementos ao DOM. Se carregado com `defer`, executa só após o parse completo — os tokens CSS
> chegariam tarde demais, causando flash de conteúdo sem estilo (FOUC).

---

## Resumo de responsabilidades

| Arquivo             | Classe HTML           | Comportamento                  |
|---------------------|-----------------------|--------------------------------|
| ripple.js           | `.piece-ripple`       | efeito de onda no clique       |
| disabled.js         | `.piece-disabled`     | bloqueia eventos               |
| interactive.js      | `.piece-interactive`  | abre/fecha (dropdown/popover)  |
| toggle.js           | `.piece-toggle`       | alterna estado (toggle/group)  |
| tooltip.js          | `.piece-tooltip`      | posiciona tooltip com fixed    |
| piece-css-generator | (gerador)             | cria todas as classes de token |
