# Neutral Kit — radio

Input radio estilizado como icon-button. Usa `<input type="radio">` real —
o valor participa de formulário e o browser garante exclusividade pelo `name`.
Estado controlado pelo browser via `:has(input:checked)`, sem JS adicional.

## Quando usar

Use **apenas** quando o valor precisa ser enviado num `<form>` ou lido via `FormData`.

> **Não confunda com toolbar/seleção visual de UI.**
> Exemplos de form corretos: método de pagamento, formato de exportação, frequência de backup, preferência salva no servidor.
> Exemplos errados: alinhamento de texto num editor, seleção de view em toolbar — nesses casos use `icon-button` com `.piece-toggle` dentro de um `piece-group`.

## Elemento HTML

`<label>` + `<input type="radio" class="piece-controller">` oculto.
A classe raiz é `piece-radio` — **não** `piece-icon-button`.

## Estrutura

```html
<label class="piece-surface piece-radio piece-medium
  background-color-auto-04
  background-color-auto-06-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active
  text-color-auto-20
  text-color-auto-00-active">
    <input type="radio" name="formato" value="pdf" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">picture_as_pdf</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">picture_as_pdf</span>
</label>
```

## Grupo (single-select nativo)

O atributo `name` garante que apenas um do grupo fique selecionado.
Sem JS. O browser controla.

```html
<!-- Formato de exportação — apenas um pode ser selecionado -->
<label class="piece-surface piece-radio piece-medium ...">
    <input type="radio" name="formato" value="pdf" class="piece-controller" checked>
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">picture_as_pdf</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">picture_as_pdf</span>
</label>

<label class="piece-surface piece-radio piece-medium ...">
    <input type="radio" name="formato" value="csv" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">table_view</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">table_view</span>
</label>

<label class="piece-surface piece-radio piece-medium ...">
    <input type="radio" name="formato" value="img" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">image</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">image</span>
</label>
```

## Ícones distintos por estado

Use `piece-false` para o ícone inativo e `piece-true` para o ícone ativo.
O core gerencia a visibilidade automaticamente via `:has(input:checked)`.

```html
<label class="piece-surface piece-radio piece-medium ...">
    <input type="radio" name="grupo" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">radio_button_checked</span>
</label>
```

## Regras

- Classe raiz: `piece-radio` — NUNCA `piece-icon-button`
- `name` idêntico em todos os radios do grupo — obrigatório para exclusividade
- `class="piece-controller"` no input — o CSS usa esta classe para ocultar o input
- `.piece-surface` obrigatório no `<label>`
- Sempre incluir `piece-false` e `piece-true` nos ícones
- NUNCA use `.piece-toggle` aqui — o estado é do browser, não do toggle.js
- NUNCA use para seleção visual de UI (toolbar, editor) — use `icon-button` + `piece-group`
