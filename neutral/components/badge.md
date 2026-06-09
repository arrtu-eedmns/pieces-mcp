# Neutral Kit — badge

Indicador visual posicionado sobre o elemento pai.
Por padrão usa `position: absolute` — ancora automaticamente ao pai com `position: relative`.
`.piece-surface` já define `position: relative`, então nenhum wrapper extra é necessário.

## Elemento HTML

`<span>` — filho direto do elemento âncora.

## Estrutura mínima

```html
<!-- Overlay padrão — ancora ao canto superior direito do pai -->
<button class="piece-surface piece-icon-button ...">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon" translate="no">notifications</span>
    <span class="piece-badge piece-surface background-color-auto-11 text-color-auto-00">3</span>
</button>
```

## Variantes

### Default — contador numérico (16×16)

```html
<span class="piece-badge piece-surface background-color-auto-11 text-color-auto-00">9</span>
```

### Small — dot indicador (6×6, sem texto)

```html
<span class="piece-badge piece-small piece-surface background-color-auto-11"></span>
```

### Large — texto longo, "99+", ícone + texto

```html
<span class="piece-badge piece-large piece-surface background-color-auto-11 text-color-auto-00">99+</span>

<!-- Com ícone -->
<span class="piece-badge piece-large piece-surface background-color-auto-11 text-color-auto-00">
    <span class="material-symbols-rounded piece-icon" translate="no">star</span>
    Pro
</span>
```

### Pill — border-radius máximo, combinável com large

```html
<span class="piece-badge piece-large piece-pill piece-surface background-color-auto-11 text-color-auto-00">Novo</span>
<span class="piece-badge piece-large piece-pill piece-surface background-color-auto-05 text-color-auto-16">Beta</span>
```

### Inline — fluxo normal (exceção)

Use `.piece-inline` quando o badge precisa fluir junto ao conteúdo,
por exemplo dentro de um item de menu ou linha de lista.

```html
<div class="menu-item">
    <span>Notificações</span>
    <span class="piece-badge piece-large piece-inline piece-surface background-color-auto-11 text-color-auto-00">12</span>
</div>
```

## Posicionamento

O badge ancora no canto superior direito do pai por padrão (`top: -4px; right: -4px`).
Para outros cantos ou offsets, sobrescreva via CSS custom no contexto do componente pai.

```css
/* exemplo: badge no canto inferior esquerdo */
.meu-componente .piece-badge {
    top: auto;
    bottom: -4px;
    right: auto;
    left: -4px;
}
```

## Tokens — referência

| Uso           | Token sugerido                                    |
|---------------|---------------------------------------------------|
| Notificação   | `background-color-auto-11 text-color-auto-00`     |
| Neutro/label  | `background-color-auto-05 text-color-auto-16`     |
| Dot presença  | `background-color-auto-11` (sem text token)       |

## badge.js

O `badge.js` é obrigatório quando o badge está dentro de um elemento com `overflow: hidden`
(ex: `piece-button`, `piece-icon-button`). Sem ele, o badge é cortado pelo overflow do pai.

**Como funciona:** converte `.piece-badge` de `position: absolute` para `position: fixed`,
calculando `top` e `right` via `getBoundingClientRect()` do elemento pai.
Reposiciona automaticamente no scroll, resize e quando novos badges são adicionados ao DOM.

O badge com `.piece-inline` é ignorado pelo JS — permanece no fluxo normal.

```html
<script src="badge.js"></script>
```

## Regras

- SEMPRE ter `.piece-surface` no badge para os tokens de cor funcionarem
- SEMPRE carregar `badge.js` quando o badge estiver dentro de elementos com `overflow: hidden`
- O pai já deve ter `position: relative` — `.piece-surface` garante isso automaticamente
- `.piece-small` nunca tem texto — é exclusivamente um dot indicador
- `.piece-pill` deve ser combinado com `.piece-large` — não faz sentido com `.piece-small`
- `.piece-inline` é a exceção — use apenas quando o badge precisa estar no fluxo normal
- Para ícone dentro do badge, use sempre `.piece-icon` com `material-symbols-rounded`
