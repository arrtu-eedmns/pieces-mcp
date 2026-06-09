# Pieces — Sistema de Surface e Cores

⚠️ LEIA ESTE ARQUIVO ANTES DE USAR QUALQUER KIT OU COMPONENTE.
Todo o sistema Pieces é construído sobre o surface. Sem entender isso, nada funciona.

---

## O que é o Pieces

Pieces é um **sistema de estilização**, não uma biblioteca de componentes.
O único "componente" do Core é o `.piece-surface` — ele é a base que controla cores,
transparência e blur de qualquer elemento. A partir dele, desenvolvedores criam
seus próprios componentes usando **Kits** (MD3 Kit, Fluent Kit, Nexus Kit, Custom Kit...).

Kits são coleções independentes construídas sobre o Core. Cada kit tem sua
linguagem visual, mas todos falam a mesma língua por baixo: as variáveis do surface.

---

## Pré-requisito: .piece-surface

Todo o sistema de tokens só funciona em elementos que possuam a classe `.piece-surface`.
Sem ela, as variáveis CSS não existem e nenhuma classe de cor/alpha/blur terá efeito.

```html
<!-- CORRETO -->
<div class="piece-surface background-color-auto-02">...</div>

<!-- ERRADO — as classes de token não funcionam sem .piece-surface -->
<div class="background-color-auto-02">...</div>
```

---

## O que o surface controla

O surface gerencia as seguintes propriedades via tokens:

| Propriedade                    | Controla                        |
|--------------------------------|---------------------------------|
| `background`                   | cor de fundo                    |
| `text`                         | cor do texto                    |
| `border`                       | cor da borda                    |
| `box-shadow`                   | cor da sombra                   |
| `ripple`                       | cor do efeito ripple            |
| `scrollbar-track-outline`      | cor do trilho do scrollbar      |
| `scrollbar-thumb-background`   | cor do thumb do scrollbar       |
| `scrollbar-thumb-border`       | borda do thumb do scrollbar     |

**border:** `border-width` e `border-style` são definidos no CSS do kit.
A cor da borda vem sempre do token. Nunca defina `border-color` manualmente.
Nunca use `border: 1px solid` (shorthand) — use `border-width` + `border-style` separados
para não sobrescrever o `border-color` gerenciado pelo surface.

**box-shadow:** existe uma classe predefinida no surface (`.piece-box-shadow`).
Não declare a sombra — apenas aplique a classe e o token de cor.

---

## Anatomia da classe de cor

```
{property}-color-{theme}-{token}[-sufixo]

background-color-auto-02
text-color-auto-20
border-color-light-06
box-shadow-color-dark-04-hover
```

---

## Os 4 temas de classe

| Tema      | Comportamento                                                              |
|-----------|----------------------------------------------------------------------------|
| `auto`    | Adapta ao tema global (`.piece-light` ou `.piece-dark` do body). **Use na maioria dos casos.** |
| `light`   | Lightness travada no esquema claro, independente do tema global.           |
| `dark`    | Lightness travada no esquema escuro, independente do tema global.          |
| `inverse` | Inverte o tema atual. Útil para seções contrastantes (card escuro em página clara). |

**Regra:** use `auto` por padrão. Use `light`/`dark` só quando quiser travar um elemento
independentemente do tema. Use `inverse` para inverter uma seção sem mudar o tema global.

---

## Os 26 tokens de lightness (00–25)

O token é um número de dois dígitos de `00` a `25`.
A fórmula é: `token × 4 = % de lightness`.

| Token | Lightness | Referência no esquema light (auto)       |
|-------|-----------|------------------------------------------|
| 00    | 0%        | branco absoluto — reservado              |
| 02    | 8%        | **background padrão de superfície**      |
| 03    | 12%       | background hover                         |
| 06    | 24%       | **bordas, dividers**                     |
| 07    | 28%       | hover de borda                           |
| 11    | 44%       | **accent (cor de ação principal)**       |
| 12    | 48%       | accent hover                             |
| 20    | 80%       | **texto secundário**                     |
| 25    | 100%      | preto absoluto — reservado               |

> No esquema `light`, tokens baixos = mais claro. No esquema `dark`, se inverte.
> O `auto` é sempre responsivo: o mesmo token fica claro no light e escuro no dark.

**Convenção de pares:**
Tokens andam em duplas — `N` é o estado default, `N+1` é o hover.
```
00-01  02-03  04-05  06-07  08-09  10-11  12-13 ...
def    def    def    def    def    def    def
   hov    hov    hov    hov    hov    hov    hov
```

---

## Hierarquia visual de componentes

⚠️ A IA deve usar esses eixos conscientemente ao criar componentes.
Sem hierarquia, todos os botões e elementos interativos parecem ter o mesmo peso.

Pieces oferece **3 eixos independentes e combináveis** para comunicar importância visual.

---

### Eixo 1 — Canal de cor (hue)

`piece-primary` / `piece-secondary` / `piece-tertiary`

Muda o matiz do componente sem alterar elevação ou estilo.
Use canais diferentes para distinguir ações de natureza diferente na mesma tela.

---

### Eixo 2 — Elevação (token de lightness + sombra)

Quanto mais alto o token de background, mais o elemento "sobe" visualmente.
A sombra (`piece-box-shadow`) é uma variação — usa depth no lugar de cor.

```
bg-02              → base, se funde com a superfície
bg-06              → nível médio, visível mas discreto
bg-11              → ação principal, máximo destaque
piece-box-shadow   → flutuante, elevado acima da superfície via sombra
```

---

### Eixo 3 — Estilo visual (fill + stroke)

Padrão nomeado que combina fundo e borda. O `outlined` pode ou não ter fundo —
fill e stroke são modificadores independentes e combináveis.

| Estilo     | Fundo        | Borda       | Ênfase        |
|------------|--------------|-------------|---------------|
| `text`     | bg-02        | —           | mínima        |
| `outlined` | — ou bg-02–06 | border-06   | baixa–média   |
| `tonal`    | bg-06        | opcional    | média         |
| `filled`   | bg-11        | opcional    | máxima        |

> Esses estilos **não são classes** — são padrões de combinação de tokens já existentes.

**Transições entre estilos são válidas e comuns.**
Um componente pode começar `outlined` e ficar `elevated` (com sombra) no hover,
ou `text` em repouso e `tonal` ao passar o mouse. Os sufixos de estado
(`-hover`, `-active`, `-hover-active`) do surface cobrem isso nativamente.

---

### Cores semânticas

Pieces **não tem cores semânticas embutidas** (erro=vermelho, sucesso=verde, alerta=amarelo).
Para casos que exigem uma cor específica, manipule `--piece-h` diretamente
no elemento ou num ancestral.

---

### Nos kits e componentes

- `guidelines.md` de cada kit pode indicar qual hierarquia é **recomendada** para aquele kit
- O arquivo `.md` de cada componente pode detalhar ainda mais caso tenha necessidades específicas
- O usuário é livre para combinar os 3 eixos como quiser

---

## Hierarquia de texto — tokens em vez de opacity

**NUNCA use `opacity:` para criar texto secundário, labels ou placeholders.**
A opacidade afeta o elemento inteiro — filhos, backgrounds, borders — e não respeita o tema.

Hierarquia de leitura é feita escolhendo um token de texto mais próximo do background.
Quanto maior o token, mais o texto caminha em direção ao fundo e parece mais fraco.

### Referência com fundo token 02 (padrão)

| Token | Lightness (light) | Uso |
|-------|------------------|-----|
| `25`  | 0% — preto puro  | contraste máximo, raramente necessário |
| `22`  | 12%              | texto primário forte |
| `20`  | 20%              | **texto primário padrão** |
| `16`  | 36%              | texto secundário / label |
| `14`  | 44%              | texto terciário / placeholder — zona do accent |
| `10`  | 60%              | limite inferior — abaixo disso perde contraste acessível |

> Token `14` é a "zona do accent oposto": em light mode, 44% de lightness coincide com
> a faixa do accent (token 11 = 44%). Abaixo disso o texto começa a se confundir
> com elementos interativos e perde legibilidade.

### Regra prática

```html
<!-- ERRADO — opacity vaza para filhos e quebra no dark mode -->
<span style="opacity: .4">Label</span>

<!-- CORRETO — token mais próximo do fundo -->
<span class="piece-surface text-color-auto-16">Label</span>
```

### piece-surface é obrigatório em TODO elemento que usa tokens

Isso inclui textos auxiliares, labels, notas, placeholders — qualquer elemento
que precise de uma cor diferente da herdada precisa de `.piece-surface`.
Sem a classe, as variáveis CSS não existem e o token não tem efeito.

```html
<!-- ERRADO — sem piece-surface, text-color-auto-16 não funciona -->
<span class="text-color-auto-16">nota</span>

<!-- CORRETO -->
<span class="piece-surface text-color-auto-16">nota</span>
```

---

## Os 4 estados (sufixos de classe)

| Sufixo          | Quando se aplica                                               |
|-----------------|----------------------------------------------------------------|
| (nenhum)        | Sempre — estado default                                        |
| `-hover`        | Quando o mouse está sobre o elemento                           |
| `-active`       | Quando o elemento tem a classe `.piece-actived`                |
| `-hover-active` | Quando tem `.piece-actived` E o mouse está sobre o elemento    |

**Padrão para elemento selecionável (ex: botão toggle, chip):**
```html
<div class="piece-surface
  background-color-auto-06
  background-color-auto-07-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active">
  ...
</div>
```
- `06` = não selecionado (default)
- `07` = não selecionado + hover
- `11` = selecionado (`.piece-actived`)
- `12` = selecionado + hover

---

## Estado desabilitado

Use `.piece-disabled` — controlado pelo JS, que bloqueia eventos de interação.

**NUNCA use o atributo HTML `disabled`** em elementos com o sistema Pieces.
O atributo `disabled` nativo quebra comportamentos já definidos pelo surface.

### Regra para autores de kit — `:active` e `.piece-disabled`

O pseudo-estado CSS `:active` é aplicado pelo browser no `mousedown`, antes de qualquer JS.
Por isso, **todo seletor `:active` em CSS de kit deve ser guardado com `:not(.piece-disabled)`**
para evitar reações visuais (ex: animação de indicador) em elementos desabilitados.

```css
/* ❌ Errado — dispara mesmo em disabled */
&:active { ... }

/* ✅ Correto */
&:not(.piece-disabled):active { ... }
```

Isso se aplica a qualquer propriedade animada no `:active`: tamanho, margem, border-radius, etc.

---

## Alpha — .piece-{property}-alpha-{token}

Controla o canal **A** (transparência) do HSLA de uma propriedade específica.
Fórmula: `token × 4 / 100 = valor alpha` (00 = 0.00 transparente, 25 = 1.00 opaco).

```html
<div class="piece-surface
  background-color-auto-02
  piece-background-alpha-12">
  <!-- fundo com 48% de opacidade -->
</div>
```

**NUNCA use `opacity:` no CSS** para controlar transparência de cores do surface.
A propriedade `opacity` afeta o elemento inteiro (incluindo filhos e texto).
O alpha por propriedade controla apenas aquela cor, sem efeito colateral.

Sufixos de estado também se aplicam ao alpha:
`piece-background-alpha-12-hover`, `piece-border-alpha-06-active`, etc.

---

## Border e Box-Shadow — padrões estáticos e dinâmicos

### Ativar border e shadow

```html
<!-- border: ativa largura e estilo — a cor vem do token -->
<div class="piece-surface piece-border border-color-auto-06">

<!-- shadow: forma fixa (0 0 4px 0) — a cor vem do token -->
<div class="piece-surface piece-box-shadow box-shadow-color-auto-08">
```

**NUNCA use `border: 1px solid` (shorthand)** — sobrescreve o `border-color` gerenciado
pelo surface. Use sempre `piece-border` + `border-color-{theme}-{token}`.

---

### Border estático vs dinâmico

```html
<!-- ESTÁTICO — borda sempre visível -->
<button class="piece-surface piece-border
  border-color-auto-06">

<!-- DINÂMICO — borda aparece no hover (via alpha) -->
<button class="piece-surface piece-border
  border-color-auto-06
  piece-border-alpha-00
  piece-border-alpha-25-hover">

<!-- DINÂMICO — borda invisível pois tem a mesma cor do fundo; muda no hover -->
<button class="piece-surface piece-border
  background-color-auto-04
  border-color-auto-04
  border-color-auto-06-hover">
```

---

### Shadow estático vs dinâmico

```html
<!-- ESTÁTICO — sombra sempre visível -->
<button class="piece-surface piece-box-shadow
  box-shadow-color-auto-08">

<!-- DINÂMICO — sombra aparece no hover (via alpha) -->
<button class="piece-surface piece-box-shadow
  box-shadow-color-auto-08
  piece-box-shadow-alpha-00
  piece-box-shadow-alpha-25-hover">
```

---

### Transição outlined → elevated

Borda visível no default, sai e dá lugar à sombra no hover.
Puramente declarativo — sem JS, sem CSS extra.

```html
<button class="piece-surface piece-border piece-box-shadow
  background-color-auto-02
  border-color-auto-06
  piece-border-alpha-00-hover
  box-shadow-color-auto-08
  piece-box-shadow-alpha-00
  piece-box-shadow-alpha-25-hover">
```

| Estado  | Border                      | Shadow                       |
|---------|-----------------------------|------------------------------|
| default | `--piece-border-a: 1` → visível | `alpha-00` → invisível   |
| hover   | `alpha-00-hover` → some     | `alpha-25-hover` → aparece   |

---

## Blur — .piece-blur-{token}

Aplica `backdrop-filter: blur()` ao background do elemento.
Fórmula: `token × 2 = pixels` (ex: `piece-blur-06` = `blur(12px)`).

```html
<div class="piece-surface piece-blur-06 piece-background-alpha-04">
  <!-- efeito glass: blur no fundo com baixa opacidade -->
</div>
```

**NUNCA use `filter: blur()` ou `backdrop-filter` diretamente no CSS.**
Use sempre a classe de token.

⚠️ `backdrop-filter` cria um containing block — elementos `position: fixed`
dentro do elemento com blur podem se comportar de forma inesperada.

---

## Canais de cor — primary / secondary / tertiary

Canais controlam o **hue (H)** do HSLA. Trocando o canal, toda a cor do elemento
e seus filhos muda de matiz, mantendo os mesmos tokens de lightness e alpha.

```css
.piece-primary   → --piece-h = --piece-primary
.piece-secondary → --piece-h = --piece-secondary
.piece-tertiary  → --piece-h = --piece-tertiary
```

Essas classes são **herdadas de pai para filho**. Não é necessário repetir em cada
elemento — declare apenas onde quiser mudar o canal.

```html
<body class="piece-triade piece-light piece-primary">
  <!-- todos os filhos usam o canal primary por padrão -->

  <section class="piece-surface background-color-auto-02">
    <!-- herda primary do body -->

    <div class="piece-secondary piece-surface background-color-auto-02">
      <!-- aqui muda para secondary, filhos daqui também herdam secondary -->
    </div>
  </section>
</body>
```

---

## Canais por estado — troca de hue conforme interação

Além dos canais estáticos, é possível trocar o canal **conforme o estado do elemento**.
Isso permite que não apenas a lightness mude ao interagir, mas o próprio matiz da cor.

| Classe                          | Quando aplica o canal            |
|---------------------------------|----------------------------------|
| `.piece-primary-hover`          | ao passar o mouse                |
| `.piece-secondary-hover`        | ao passar o mouse                |
| `.piece-tertiary-hover`         | ao passar o mouse                |
| `.piece-primary-active`         | quando `.piece-actived`          |
| `.piece-secondary-active`       | quando `.piece-actived`          |
| `.piece-tertiary-active`        | quando `.piece-actived`          |
| `.piece-primary-hover-active`   | `.piece-actived` + hover         |
| `.piece-secondary-hover-active` | `.piece-actived` + hover         |
| `.piece-tertiary-hover-active`  | `.piece-actived` + hover         |

**O canal herdado do pai continua valendo** — a classe de estado sobrescreve apenas
quando o estado está ativo. Fora do estado, o hue volta ao herdado.

**Exemplo — botão toggle que muda de hue ao ser selecionado:**
```html
<button class="piece-icon-button piece-toggle piece-surface
  piece-secondary-active
  background-color-auto-06
  background-color-auto-07-hover
  background-color-auto-11-active
  background-color-auto-12-hover-active
  text-color-auto-20
  text-color-auto-00-active">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon">bookmark</span>
</button>
```

---

## Harmonias de cor — paletas

Normalmente aplicadas no `body`, propagam para todos os filhos.

| Classe                | Relação entre os canais                          |
|-----------------------|--------------------------------------------------|
| `.piece-triade`       | primary, +120°, +240° (triádica)                 |
| `.piece-analoga`      | primary, +30°, +90° (análoga)                    |
| `.piece-complementar` | primary, +120°, +150° (complementar)             |
| `.piece-mono`         | primary = secondary = tertiary (monocromática)   |
| `.piece-art`          | purple(270°), blue(230°), violet(300°) (fixo)    |

---

## Tema global — light / dark

Normalmente aplicados no `body`, propagam para todos os filhos.

```html
<body class="piece-triade piece-light">  <!-- tema claro -->
<body class="piece-triade piece-dark">   <!-- tema escuro -->
```

| Classe         | `--piece-theme` | Operador do `auto`     |
|----------------|-----------------|------------------------|
| `.piece-light` | `100%`          | subtrai o token        |
| `.piece-dark`  | `0%`            | soma o token           |

Com `auto`: no light, token 02 = `100% - 8%` = 92% lightness (quase branco).
Com `auto`: no dark, token 02 = `0% + 8%` = 8% lightness (quase preto).
O mesmo token, o mesmo elemento, aparências opostas — sem mudar nada no HTML.

---

## Elementos livres e chrome de página

⚠️ **Não existe elemento "fora do sistema" em contexto Pieces.**

Ao criar qualquer elemento — seja um componente de kit, um badge numérico, um header
de SPA, um wrapper de layout, um label auxiliar, qualquer coisa — se ele precisa de
cor, texto, transparência ou qualquer propriedade visual, deve seguir as mesmas regras
do surface. Não há exceção para "elementos de chrome", "decoração" ou "estrutura".

**Regra:** se o elemento existe na página e tem aparência visual, usa `.piece-surface` + tokens.

```html
<!-- ERRADO — badge criado "livremente" fora do sistema -->
<span style="background: currentColor; filter: invert(1); color: inherit;">1</span>

<!-- ERRADO — header com opacity manual -->
<h2 style="opacity: .4">Seção</h2>

<!-- CORRETO — badge usando o sistema -->
<span class="piece-surface background-color-auto-11 text-color-auto-00 ...">1</span>

<!-- CORRETO — título secundário usando token -->
<h2 class="piece-surface text-color-auto-14">Seção</h2>
```

Isso vale para qualquer elemento criado pela IA que não esteja documentado em nenhum kit:
o sistema de tokens é a única linguagem de estilização permitida.

---

## Resumo das regras absolutas

| ❌ Nunca faça                               | ✅ Faça assim                                    |
|---------------------------------------------|--------------------------------------------------|
| `opacity: 0.5` em qualquer elemento         | `piece-{property}-alpha-{token}`                 |
| `opacity:` para texto secundário/muted      | `text-color-auto-16` (token mais próximo do fundo) |
| `color: rgba(0,0,0,.4)` para texto fraco    | `piece-surface text-color-auto-14`               |
| `filter: blur(8px)`                         | `piece-blur-04`                                  |
| `backdrop-filter: blur()` no CSS            | `piece-blur-{token}`                             |
| `filter: invert(1)` para inverter cor       | tokens de cor no elemento e no filho             |
| `background: currentColor`                  | `background-color-{theme}-{token}`               |
| `color: inherit` para forçar herança        | token explícito no elemento com `.piece-surface` |
| `border-color: ...` manual                  | `border-color-{theme}-{token}`                   |
| `border: 1px solid` (shorthand)             | `border-width: 1px; border-style: solid;`        |
| `disabled="true"` em elementos Pieces       | `.piece-disabled` (controlado pelo JS)           |
| Tokens em elemento sem `.piece-surface`     | Sempre ter `.piece-surface` no elemento          |
| Labels/notas sem `.piece-surface`           | `<span class="piece-surface text-color-auto-16">` |
| Elemento visual sem tokens (chrome "livre") | Todo elemento visual usa `.piece-surface` + tokens |
