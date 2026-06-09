# Neutral Kit — radio

Input radio estilizado como icon-button. Usa `<input type="radio">` real —
o valor participa de formulário e o browser garante exclusividade pelo `name`.
Estado controlado pelo browser via `:has(input:checked)`, sem JS adicional.

## Quando usar

Use quando o valor precisa ser enviado num `<form>` ou lido via `FormData`.
Para seleção de UI sem formulário, use `icon-button` com `.piece-toggle` e `.piece-group`.

## Elemento HTML

`<label>` + `<input type="radio" class="piece-controller">` oculto.

## Estrutura

```html
<label class="piece-icon-button piece-surface
  background-color-auto-04
  background-color-auto-06-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active
  text-color-auto-20
  text-color-auto-00-active">
    <input type="radio" name="alinhamento" value="left" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_align_left</span>
</label>
```

## Grupo (single-select nativo)

O atributo `name` garante que apenas um do grupo fique selecionado.
Sem JS. O browser controla.

```html
<label class="piece-icon-button piece-surface ...">
    <input type="radio" name="alinhamento" value="left" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_align_left</span>
</label>

<label class="piece-icon-button piece-surface ...">
    <input type="radio" name="alinhamento" value="center" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_align_center</span>
</label>

<label class="piece-icon-button piece-surface ...">
    <input type="radio" name="alinhamento" value="right" class="piece-controller">
    <span class="material-symbols-rounded piece-icon">format_align_right</span>
</label>
```

## Regras

- `name` idêntico em todos os radios do grupo — obrigatório para exclusividade
- `class="piece-controller"` no input — o CSS usa esta classe para ocultar visualmente
- `.piece-surface` obrigatório no `<label>`
- NUNCA use `.piece-toggle` aqui — o estado é do browser, não do toggle.js
