# Neutral Kit — group

Container para agrupamento de buttons e icon-buttons.
Aceita mistura de `.piece-button` e `.piece-icon-button` no mesmo grupo.
O comportamento de seleção é gerenciado pelo `toggle.js` do core.

## Estrutura

```html
<div class="piece-group">
  <!-- filhos com .piece-toggle -->
</div>
```

## Single-select (padrão)

Apenas um item ativo por vez. Comportamento gerenciado automaticamente pelo `toggle.js`.

```html
<div class="piece-group">
    <button class="piece-button piece-toggle piece-surface piece-medium
      background-color-auto-04
      background-color-auto-11-active
      text-color-auto-20
      text-color-auto-00-active">
        <span class="piece-ripple"></span>
        <span class="piece-label">Opção A</span>
    </button>
    <button class="piece-button piece-toggle piece-surface piece-medium
      background-color-auto-04
      background-color-auto-11-active
      text-color-auto-20
      text-color-auto-00-active">
        <span class="piece-ripple"></span>
        <span class="piece-label">Opção B</span>
    </button>
</div>
```

## Multi-select

Adicione `.piece-multi` ao grupo — cada item togla independentemente.

```html
<div class="piece-group piece-multi">
    <button class="piece-button piece-toggle piece-surface piece-medium ...">
        <span class="piece-ripple"></span>
        <span class="piece-label">Bold</span>
    </button>
    <button class="piece-icon-button piece-toggle piece-surface piece-medium ...">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon">format_italic</span>
    </button>
</div>
```

## Misturando button e icon-button

`.piece-group` aceita qualquer combinação no mesmo container.

```html
<div class="piece-group">
    <button class="piece-icon-button piece-toggle piece-surface piece-medium ...">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon">format_align_left</span>
    </button>
    <button class="piece-button piece-toggle piece-surface piece-medium ...">
        <span class="piece-ripple"></span>
        <span class="piece-label">Centro</span>
    </button>
    <button class="piece-icon-button piece-toggle piece-surface piece-medium ...">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon">format_align_right</span>
    </button>
</div>
```

## Regras

- Os filhos diretos devem ter `.piece-toggle` para o `toggle.js` funcionar
- `.piece-multi` no grupo ativa multi-select — sem ele é sempre single-select
- Não aninha `.piece-group` dentro de outro `.piece-group`
- Tamanhos dos filhos devem ser consistentes dentro do mesmo grupo
