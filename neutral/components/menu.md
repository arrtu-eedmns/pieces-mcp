# Neutral Kit — menu

Menu contextual: lista de ações ancorada a um elemento gatilho.
Outlined — usa border, sem shadow.
Gerenciado por `interactive.js` (sem lógica manual).

## Dependências

- `piece-interactive` (core/interactive.js) — controla abertura/fechamento via `.piece-actived`
- `piece-ripple` (core/ripple.js) — efeito de clique nos itens
- `piece-surface` (core) — tokens de cor funcionam
- Ver: [core/js.md](../../core/js.md)

## Estrutura mínima

O `.piece-interactive` deve ter `position: relative` e `display: inline-flex` (ou `inline-block`)
para que o menu posicione corretamente abaixo do gatilho.

```html
<div class="piece-interactive" style="position:relative; display:inline-flex;">
    <!-- Gatilho: qualquer elemento -->
    <button class="piece-icon-button piece-surface piece-medium
        background-color-auto-00
        background-color-auto-04-hover
        text-color-auto-20">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon">more_vert</span>
    </button>

    <!-- Menu: visível quando .piece-interactive tem .piece-actived -->
    <ul class="piece-menu piece-surface piece-border
        background-color-auto-02
        border-color-auto-06">

        <li class="piece-menu-item piece-surface
            background-color-auto-00
            background-color-auto-04-hover
            text-color-auto-20">
            <span class="piece-ripple"></span>
            <span class="piece-menu-item-label">Editar</span>
        </li>

        <li class="piece-menu-item piece-surface
            background-color-auto-00
            background-color-auto-04-hover
            text-color-auto-20">
            <span class="piece-ripple"></span>
            <span class="piece-menu-item-label">Excluir</span>
        </li>
    </ul>
</div>
```

## Com ícone nos itens

```html
<li class="piece-menu-item piece-surface
    background-color-auto-00
    background-color-auto-04-hover
    text-color-auto-20">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon">edit</span>
    <span class="piece-menu-item-label">Editar</span>
</li>
```

## Com trailing (atalho de teclado, badge, ícone)

```html
<li class="piece-menu-item piece-surface
    background-color-auto-00
    background-color-auto-04-hover
    text-color-auto-20">
    <span class="piece-ripple"></span>
    <span class="piece-menu-item-label">Salvar</span>
    <span class="piece-menu-item-trailing piece-surface text-color-auto-14">⌘S</span>
</li>
```

## Com divider e subheader de seção

```html
<!-- Subheader de seção -->
<li class="piece-menu-section piece-surface text-color-auto-14">Ações</li>

<li class="piece-menu-item ...">...</li>

<!-- Divider -->
<li class="piece-menu-divider piece-surface border-color-auto-05"></li>

<li class="piece-menu-item ...">...</li>
```

## Posicionamento alternativo

Por padrão abre abaixo alinhado à esquerda. Use modificadores para alterar:

| Classe             | Comportamento                  |
|--------------------|-------------------------------|
| *(padrão)*         | Abaixo, alinhado à esquerda   |
| `piece-menu-top`   | Acima, alinhado à esquerda    |
| `piece-menu-end`   | Abaixo, alinhado à direita    |
| `piece-menu-top piece-menu-end` | Acima, à direita |

```html
<ul class="piece-menu piece-menu-end ...">...</ul>
```

## Como `interactive.js` controla a visibilidade

- Clique **dentro** do `.piece-interactive` → adiciona `.piece-actived` (menu abre)
- Clique **fora** → remove `.piece-actived` (menu fecha)
- O CSS usa `.piece-interactive.piece-actived > .piece-menu { display: flex }`

## Regras

- NUNCA use `display: none/block` manual para abrir/fechar — deixe o `interactive.js`
- NUNCA use `disabled` HTML nos itens — use `.piece-disabled`
- Sempre ter `.piece-ripple` como filho direto dos `.piece-menu-item`
- `.piece-surface` obrigatório em todos os elementos para os tokens funcionarem
- `.piece-menu-item-label` obrigatório: define o texto principal do item
- `.piece-menu-item-trailing` sempre após o label, com `margin-left: auto`
- `.piece-menu-divider` e `.piece-menu-section` não levam ripple (não são interativos)
