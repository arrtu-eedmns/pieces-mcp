# Neutral Kit — checkbox

Input checkbox estilizado como icon-button. Usa `<input type="checkbox">` real —
o valor participa de formulário. Cada checkbox alterna independentemente.
Estado controlado pelo browser via `:has(input:checked)`, sem JS adicional.

## Quando usar

Use **apenas** quando o valor precisa ser enviado num `<form>` ou lido via `FormData`.

> **Não confunda com toolbar/seleção visual de UI.**
> Exemplos de form corretos: canais de notificação (salvo no perfil), permissões de compartilhamento, preferências enviadas ao servidor.
> Exemplos errados: negrito/itálico num editor de texto, filtros visuais num painel — nesses casos use `icon-button` com `.piece-toggle` dentro de um `piece-group.piece-multi`.

## Elemento HTML

`<label>` + `<input type="checkbox" class="piece-controller">` oculto.
A classe raiz é `piece-checkbox` — **não** `piece-icon-button`.

## Estrutura

```html
<label class="piece-surface piece-checkbox piece-medium
  background-color-auto-04
  background-color-auto-06-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active
  text-color-auto-20
  text-color-auto-00-active">
    <input type="checkbox" name="notif" value="email" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">mail</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">mail</span>
</label>
```

## Multi-select (checkboxes independentes)

Cada label é autônomo — não precisam de agrupador.
O browser gerencia o estado de cada um separadamente.

```html
<!-- Canais de notificação — múltiplos podem ser selecionados -->
<label class="piece-surface piece-checkbox piece-medium ...">
    <input type="checkbox" name="notif" value="email" class="piece-controller" checked>
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">mail</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">mail</span>
</label>

<label class="piece-surface piece-checkbox piece-medium ...">
    <input type="checkbox" name="notif" value="push" class="piece-controller" checked>
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">notifications</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">notifications</span>
</label>

<label class="piece-surface piece-checkbox piece-medium ...">
    <input type="checkbox" name="notif" value="sms" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">sms</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">sms</span>
</label>
```

## Ícones distintos por estado

Use `piece-false` para o ícone inativo e `piece-true` para o ícone ativo.
O core gerencia a visibilidade automaticamente via `:has(input:checked)`.

```html
<label class="piece-surface piece-checkbox piece-medium ...">
    <input type="checkbox" name="campo" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check_box</span>
</label>
```

## Regras

- Classe raiz: `piece-checkbox` — NUNCA `piece-icon-button`
- `class="piece-controller"` no input — o CSS usa esta classe para ocultar o input
- `.piece-surface` obrigatório no `<label>`
- Sempre incluir `piece-false` e `piece-true` nos ícones
- NUNCA use `.piece-toggle` aqui — o estado é do browser, não do toggle.js
- NUNCA use para seleção visual de UI (toolbar, editor) — use `icon-button` + `piece-group.piece-multi`
- Para leitura do valor: `new FormData(form)` ou `input.checked`
