# Neutral Kit — icon-button

Botão de ícone. Não impõe cor própria — herda canal (primary/secondary/tertiary)
e tema do surface pai. Usa `.piece-toggle` + JS para estado; nunca usa checkbox interno.

## Elemento HTML

`<button>` — para ações de UI sem formulário.

## Estrutura mínima

```html
<button class="piece-icon-button piece-surface
  background-color-auto-04
  background-color-auto-06-hover
  text-color-auto-20">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon">more_vert</span>
</button>
```

## Com estado toggle

Adicione `.piece-toggle` — o `toggle.js` gerencia `.piece-actived` automaticamente.

```html
<button class="piece-icon-button piece-toggle piece-surface
  background-color-auto-04
  background-color-auto-06-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active
  text-color-auto-20
  text-color-auto-00-active">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon">bookmark</span>
</button>
```

## Com dois ícones (piece-true / piece-false)

`piece-false` aparece quando inativo, `piece-true` quando `.piece-actived`.

```html
<button class="piece-icon-button piece-toggle piece-surface ...">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon piece-false">bookmark</span>
    <span class="material-symbols-rounded piece-icon piece-true">bookmark</span>
</button>
```

## Tamanhos

| Classe              | Largura | Altura | Ícone |
|---------------------|---------|--------|-------|
| `piece-extra-small` | 24px    | 24px   | 14px  |
| `piece-small`       | 28px    | 28px   | 16px  |
| `piece-medium`      | 32px    | 32px   | 18px  |
| `piece-large`       | 40px    | 40px   | 20px  |
| `piece-extra-large` | 48px    | 48px   | 22px  |

Modificadores de largura: `piece-narrow` (mais estreito) / `piece-wide` (mais largo).

## Regras

- NUNCA coloque `<input>` dentro para controlar estado — use `.piece-toggle`
- NUNCA use `disabled` HTML — use `.piece-disabled` (controlado pelo JS)
- Sempre ter `.piece-ripple` como filho direto para o efeito de clique
- `.piece-surface` obrigatório para os tokens funcionarem
