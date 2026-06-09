# Neutral Kit — checkbox

Input checkbox estilizado como icon-button. Usa `<input type="checkbox">` real —
o valor participa de formulário. Cada checkbox alterna independentemente.
Estado controlado pelo browser via `:has(input:checked)`, sem JS adicional.

## Quando usar

Use quando o valor precisa ser enviado num `<form>` ou lido via `FormData`.
Para seleção de UI sem formulário, use `icon-button` com `.piece-toggle` e `.piece-group.piece-multi`.

## Elemento HTML

`<label>` + `<input type="checkbox" class="piece-controller">` oculto.

## Estrutura

```html
<label class="piece-icon-button piece-surface
  background-color-auto-04
  background-color-auto-06-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active
  text-color-auto-20
  text-color-auto-00-active">
    <input type="checkbox" name="formato" value="bold" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_bold</span>
</label>
```

## Multi-select (checkboxes independentes)

Cada label é autônomo — não precisam de agrupador.
O browser gerencia o estado de cada um separadamente.

```html
<label class="piece-icon-button piece-surface ...">
    <input type="checkbox" name="formato" value="bold" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_bold</span>
</label>

<label class="piece-icon-button piece-surface ...">
    <input type="checkbox" name="formato" value="italic" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_italic</span>
</label>

<label class="piece-icon-button piece-surface ...">
    <input type="checkbox" name="formato" value="underline" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_underlined</span>
</label>
```

## Regras

- `class="piece-controller"` no input — o CSS usa esta classe para ocultar visualmente
- `.piece-surface` obrigatório no `<label>`
- NUNCA use `.piece-toggle` aqui — o estado é do browser, não do toggle.js
- Para leitura do valor: `new FormData(form)` ou `input.checked`
