# Neutral Kit — tooltip

Overlay de texto que aparece no hover do elemento âncora.
Posicionamento automático via `tooltip.js` — escolhe o lado com mais espaço disponível.
Visibilidade controlada por `.piece-actived` (adicionado/removido pelo JS).

## Elemento HTML

`<span>` — filho direto do elemento âncora.
O `tooltip.js` busca `:scope > .piece-tooltip` no elemento que recebe o hover.
Nunca aninhar o tooltip mais de um nível abaixo da âncora.

## Estrutura mínima

```html
<button class="piece-surface ...">
    <span class="piece-ripple"></span>
    Texto do botão
    <span class="piece-tooltip piece-surface
                 background-color-inverse-00
                 text-color-inverse-25">
        Dica de texto
    </span>
</button>
```

## Com piece-true / piece-false (tooltip por estado)

Quando o elemento âncora é um toggle, é possível ter dois tooltips —
um para cada estado. O `tooltip.js` encontra automaticamente o que
estiver visível no momento do hover.

```html
<button class="piece-surface piece-toggle piece-icon-button ...">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">bookmark_border</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">bookmark</span>
    <span class="piece-tooltip piece-surface piece-false
                 background-color-inverse-00 text-color-inverse-25">Salvar</span>
    <span class="piece-tooltip piece-surface piece-true
                 background-color-inverse-00 text-color-inverse-25">Salvo</span>
</button>
```

## Posicionamento

O `tooltip.js` prefere posicionamento vertical (abaixo ou acima).
Só cai para horizontal (direita ou esquerda) se não houver espaço suficiente
em nenhuma das direções verticais. O tooltip é clamped dentro do viewport.

## Tokens — referência

| Elemento | Token                    | Papel                              |
|----------|--------------------------|------------------------------------|
| Tooltip  | `background-color-inverse-00` | fundo — preto no light, branco no dark |
| Tooltip  | `text-color-inverse-25`       | texto — branco no light, preto no dark |

> O tema `inverse` cria contraste natural com a página sem depender do hue.

## opacity no tooltip

O tooltip usa `opacity: 0` (oculto) / `opacity: 1` via `.piece-actived` (visível)
para a animação de fade-in/fade-out.

Este é o **único caso permitido de `opacity`** no sistema Pieces:
animação de visibilidade de overlay (0 ↔ 1), onde o JS controla o estado
via classe e o CSS cuida da transição. Não use `opacity` para hierarquia de cor
ou para clarear elementos — para isso use os tokens de lightness ou alpha.

## Regras

- SEMPRE usar `<span>` como raiz do tooltip
- SEMPRE ser filho direto do elemento âncora — nunca aninhar mais fundo
- SEMPRE ter `.piece-surface` no tooltip para os tokens de cor funcionarem
- NUNCA usar `pointer-events` no tooltip (já é `none` por CSS)
- NUNCA usar `position: absolute` — o tooltip é sempre `position: fixed` (gerenciado pelo JS)
- NUNCA controlar visibilidade manualmente — deixar o `tooltip.js` gerenciar `.piece-actived`
- Com piece-true/false: aplicar as classes diretamente no `<span class="piece-tooltip">`, não em um wrapper
