# Neutral Kit — switch

Toggle visual que representa um estado ligado/desligado.
Estado controlado por `.piece-actived` via `toggle.js` — sem `<input>` necessário.

## Elemento HTML

`<button>` — obrigatório como raiz.
Usar `<button class="piece-toggle">` garante acessibilidade nativa (Tab, Space, Enter),
cursor nativo e permite que o `ripple.js` dispare (o clique cai no `<button>`,
que tem `.piece-ripple` como filho direto).
Nunca usar `<label>` + `<input>` — o switch não é um elemento de formulário.

## Estrutura mínima

```html
<button class="piece-switch piece-surface piece-toggle
               background-color-auto-02 background-color-auto-11-active
               border-color-auto-08    border-color-auto-11-active
               ripple-color-auto-14    ripple-color-auto-02-active">
    <span class="piece-ripple"></span>
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-02-active
                 text-color-auto-02       text-color-auto-11-active"></span>
</button>
```

## Variantes de ícone no indicador

O CSS adapta automaticamente o tamanho do indicador com base nos ícones presentes.

### Sem ícone

Indicador começa pequeno (16px) no OFF, cresce no ON (24px).

```html
<button class="piece-switch piece-surface piece-toggle ...">
    <span class="piece-ripple"></span>
    <span class="piece-indicator piece-surface piece-parent ..."></span>
</button>
```

### Só ON (apenas .piece-true)

Indicador começa pequeno (16px) no OFF, mostra ícone e cresce no ON.

```html
<button class="piece-switch piece-surface piece-toggle ...">
    <span class="piece-ripple"></span>
    <span class="piece-indicator piece-surface piece-parent ...">
        <span class="material-symbols-rounded piece-icon piece-true" translate="no">check</span>
    </span>
</button>
```

### Só OFF (apenas .piece-false)

Indicador começa médio (24px) mostrando ícone no OFF, mantém tamanho no ON sem ícone.

```html
<button class="piece-switch piece-surface piece-toggle ...">
    <span class="piece-ripple"></span>
    <span class="piece-indicator piece-surface piece-parent ...">
        <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
    </span>
</button>
```

### Ambos (piece-false + piece-true)

Indicador médio (24px) o tempo todo. Ícones trocam conforme o estado.

```html
<button class="piece-switch piece-surface piece-toggle ...">
    <span class="piece-ripple"></span>
    <span class="piece-indicator piece-surface piece-parent ...">
        <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
        <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check</span>
    </span>
</button>
```

## Tokens — referência

| Elemento   | Token                             | Papel                      |
|------------|-----------------------------------|----------------------------|
| Switch     | `background-color-auto-02`        | fundo OFF                  |
| Switch     | `background-color-auto-11-active` | fundo ON (accent)          |
| Switch     | `border-color-auto-08`            | borda OFF                  |
| Switch     | `border-color-auto-11-active`     | borda ON (accent)          |
| Switch     | `ripple-color-auto-14`            | ripple no OFF              |
| Switch     | `ripple-color-auto-02-active`     | ripple no ON               |
| Indicador  | `background-color-auto-12`        | cor do thumb OFF           |
| Indicador  | `background-color-auto-02-active` | cor do thumb ON            |
| Indicador  | `text-color-auto-02`              | cor do ícone OFF           |
| Indicador  | `text-color-auto-11-active`       | cor do ícone ON            |

## piece-true / piece-false no switch

O switch gerencia piece-true/false internamente via `.piece-actived`.
Não depende nem interfere com o surface.css.
Aplique piece-true/false **somente nos ícones dentro do `.piece-indicator`**.

## Regras

- SEMPRE usar `<button>` como raiz — nunca `<label>`, `<div>` ou qualquer outro elemento
- SEMPRE adicionar `piece-toggle` ao `<button>` — é o que toggle.js observa para gerenciar `.piece-actived`
- SEMPRE ter `.piece-ripple` como primeiro filho direto do `<button>`
- NUNCA usar `<input type="checkbox">` — o switch não é um elemento de formulário
- NUNCA usar o atributo HTML `disabled` — use `.piece-disabled` (controlado pelo disabled.js)
- `.piece-surface` obrigatório no switch e no `.piece-indicator`
- `.piece-parent` obrigatório no `.piece-indicator` para receber tokens de cor do switch pai
- piece-true/false aplicados apenas nos ícones do indicador, nunca no indicador em si
