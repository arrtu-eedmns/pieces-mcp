# Neutral Kit — button

Botão com label e ícone opcional. Não impõe cor própria — herda canal e tema do surface pai.
Nunca use somente ícone — para isso use `icon-button`.

## Elemento HTML

`<button>` — para ações de UI sem formulário.
`<a>` — quando o botão navega para outra página.

## Estrutura mínima

```html
<button class="piece-button piece-surface piece-medium
  background-color-auto-04
  background-color-auto-06-hover
  text-color-auto-20">
    <span class="piece-ripple"></span>
    <span class="piece-label">Label</span>
</button>
```

## Com ícone

O ícone é opcional. Sempre vem antes do label.

```html
<button class="piece-button piece-surface piece-medium
  background-color-auto-04
  background-color-auto-06-hover
  text-color-auto-20">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon">star</span>
    <span class="piece-label">Label</span>
</button>
```

## Com estado toggle

Adicione `.piece-toggle` — o `toggle.js` gerencia `.piece-actived` automaticamente.

```html
<button class="piece-button piece-toggle piece-surface piece-medium
  background-color-auto-04
  background-color-auto-06-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active
  text-color-auto-20
  text-color-auto-00-active">
    <span class="piece-ripple"></span>
    <span class="piece-label">Label</span>
</button>
```

## Com piece-true / piece-false

`piece-false` aparece quando inativo, `piece-true` quando `.piece-actived`.
Comportamento gerenciado pelo core — não requer CSS adicional no componente.

```html
<button class="piece-button piece-toggle piece-surface piece-medium ...">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon piece-false">star</span>
    <span class="material-symbols-rounded piece-icon piece-true">star</span>
    <span class="piece-label">Label</span>
</button>
```

## Group

Para agrupar buttons (e misturar com icon-buttons), use o componente `group`.
Ver: [neutral/components/group.md](./group.md)

## Tamanhos

| Classe              | Altura | Padding H | Gap | Label    | Ícone |
|---------------------|--------|-----------|-----|----------|-------|
| `piece-extra-small` | 24px   | 8px       | 4px | 11px     | 14px  |
| `piece-small`       | 28px   | 10px      | 4px | 12px     | 15px  |
| `piece-medium`      | 32px   | 12px      | 6px | 13px     | 16px  |
| `piece-large`       | 40px   | 16px      | 8px | 14px     | 18px  |
| `piece-extra-large` | 48px   | 20px      | 8px | 15px     | 20px  |

## Regras

- NUNCA coloque `<input>` dentro para controlar estado — use `.piece-toggle`
- NUNCA use `disabled` HTML — use `.piece-disabled` (controlado pelo JS)
- NUNCA use somente ícone sem label — use `icon-button` para isso
- Sempre ter `.piece-ripple` como filho direto para o efeito de clique
- `.piece-surface` obrigatório para os tokens funcionarem
- Ícone sempre antes do label quando ambos presentes
