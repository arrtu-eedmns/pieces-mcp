# Neutral Kit — Diretrizes e Filosofia Visual

## O que é o Neutral Kit

O Neutral Kit é a coleção base de componentes do Pieces.
Não impõe identidade visual própria — herda completamente canal, tema e tokens do surface pai.
É o kit mais próximo do "HTML semântico estilizado": direto, compacto, sem ornamentos.

## Filosofia visual

### Camada baixa como padrão
O Neutral usa token `02` como superfície base em quase tudo.
Isso cria um visual de "chão" — os elementos ficam no mesmo plano visual que o fundo.
O destaque vem da interação (hover, active), não da elevação estática.

### Outline em vez de preenchimento
Bordas (`border-color-auto-06`) são usadas para delimitar elementos em vez de fundos sólidos.
O preenchimento (`background-color-auto-11`) aparece apenas no estado ativo/selecionado.
Resultado: visual arejado e compacto ao mesmo tempo.

### Compacidade
Espaçamentos menores, alturas reduzidas. O Neutral não ocupa mais espaço do que precisa.
Ideal para interfaces densas: barras de ferramentas, painéis laterais, menus compactos.

## Padrão de cores por estado

A convenção do Neutral Kit para elementos interativos:

| Estado           | Background         | Borda              |
|------------------|--------------------|--------------------|
| Default          | transparente / 02  | `06`               |
| Hover            | `04`               | `06` ou `07`       |
| Active/Selecionado | `11`             | `11`               |
| Active + Hover   | `12`               | `12`               |

O token `06` para borda default cria a "presença" do componente sem peso visual.
O salto direto para `11` no active é intencional — contraste imediato, sem meio-termo.

## Regras do kit

- NUNCA use `disabled` HTML — use `.piece-disabled` (JS)
- NUNCA use `opacity:` para cores — use `piece-{property}-alpha-{token}`
- NUNCA use `backdrop-filter` direto — use `piece-blur-{token}`
- Estado de toggle sempre via JS (`.piece-actived`) — sem checkbox como mecanismo de estado
- `.piece-surface` obrigatório em todo elemento que usa tokens
- `<input>` dentro de componente apenas quando há formulário real (radio/checkbox)
