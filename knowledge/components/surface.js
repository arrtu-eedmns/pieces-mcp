module.exports = {
    id: "surface",
    name: "Surface",
    file: "surface.css",
    description: "Base de todos os componentes. Define o sistema de cor, alpha e blur para o elemento e seus filhos.",

    structure: `
<!-- Surface pode ser qualquer elemento HTML -->
<div class="piece-surface {palette} {theme}
            {background-color} {text-color}
            [{piece-border} {border-color}]
            [{piece-blur}]
            [{piece-background-alpha}]">
    <!-- filhos com piece-surface herdam e resetam as vars automaticamente -->
</div>`,

    requiredClasses: ["piece-surface"],

    howItWorks: `
1. .piece-surface define variáveis CSS para background, text, border, ripple, blur
2. background e color são aplicados automaticamente via hsla() usando essas vars
3. Classes como background-color-auto-11 apenas mudam o valor de --piece-background-color
4. O HUE vem de piece-primary/secondary/tertiary (que setam --piece-h)
5. Cada .piece-surface filho reseta as vars — não herda do pai, cria nova camada
`,

    layeringPattern: `
<!-- Camadas de superfície — cada nível é independente -->
<div class="piece-surface background-color-auto-02">  <!-- nível 0: fundo da página -->
    <div class="piece-surface background-color-auto-04">  <!-- nível 1: card -->
        <div class="piece-surface background-color-auto-06">  <!-- nível 2: input -->
        </div>
    </div>
</div>`,

    controllerPattern: `
O piece-controller é um input que controla o estado ativo do .piece-surface pai.
Existem DOIS comportamentos dependendo do componente:

── 1. Display none (checkbox, radio, icon-button toggle) ──────────────────────
  O input fica oculto com display:none.
  O ELEMENTO RAIZ DEVE SER <label> para que o clique seja encaminhado ao input.
  Se for <div> ou <button>, o clique nunca chega ao input — o toggle não funciona.

  <label class="piece-checkbox piece-small piece-surface ...">
      <span class="piece-icon piece-false" ...>check_box_outline_blank</span>
      <span class="piece-icon piece-true"  ...>check_box</span>
      <input type="checkbox" class="piece-controller">   ← display:none
  </label>

── 2. Overlay transparente (switch) ───────────────────────────────────────────
  O input ocupa 100% do componente com position:absolute; opacity:0.
  O clique chega ao input diretamente — o elemento raiz pode ser <div>.

  <div class="piece-switch piece-surface ...">
      <input type="checkbox" class="piece-controller">   ← overlay 100%×100%
      <span class="piece-indicator ..."></span>
  </div>

── Checkbox COM texto (legenda) ───────────────────────────────────────────────
  Usar <label> externo + <span> no lugar do <label> interno:

  <label style="display:flex; gap:8px; align-items:center; cursor:pointer">
      <span class="piece-checkbox piece-small piece-surface ...">
          <span class="piece-icon piece-false" ...>check_box_outline_blank</span>
          <span class="piece-icon piece-true"  ...>check_box</span>
          <input type="checkbox" class="piece-controller">
      </span>
      <span>Aceitar termos</span>
  </label>

  NUNCA aninhe <label> dentro de <label> — HTML inválido.
`,

    activeStateMechanisms: `
Existem DOIS mecanismos para ativar o estado ativo de um .piece-surface.
Ambos produzem o mesmo resultado visual — ativam as classes -active e piece-true.

── 1. piece-controller (CSS puro, sem JS) ─────────────────────────────────────
  Um input[type=checkbox] filho com class="piece-controller".
  Quando checked, o CSS detecta via :has(>.piece-controller:checked) e ativa o estado.
  Clique nativo do HTML — não precisa de JS para funcionar.

  Quando usar: toggles, checkboxes, switches, qualquer estado que o usuário controla
               clicando diretamente no componente.

  <label class="piece-icon-button piece-small piece-surface ...">
      <input type="checkbox" class="piece-controller">   ← controla via clique
      <span class="piece-icon piece-false">favorite_border</span>
      <span class="piece-icon piece-true">favorite</span>
  </label>

── 2. piece-actived (JS, controle externo) ────────────────────────────────────
  Adicionar/remover a classe "piece-actived" no elemento via JavaScript.
  O CSS detecta via .piece-actived e ativa o mesmo estado.
  Não precisa de input — o controle é totalmente via JS.

  Quando usar: item de menu selecionado, aba ativa, item de navegação atual,
               qualquer estado controlado por lógica da aplicação (não pelo usuário
               clicando no próprio componente).

  // Ativar
  element.classList.add('piece-actived')

  // Desativar
  element.classList.remove('piece-actived')

  <li class="piece-actived piece-surface ...">   ← ativo via JS
      Item de menu selecionado
  </li>

── Comparação ─────────────────────────────────────────────────────────────────
  piece-controller → o próprio componente se controla (usuário clica nele)
  piece-actived    → a aplicação controla o componente (lógica externa decide)

  Podem coexistir: piece-actived pode ativar um componente que também tem
  piece-controller, útil para pré-selecionar estados.
`,

    visualStates: `
piece-true    → visível quando piece-controller:checked OU piece-actived
piece-false   → visível quando NÃO checked e NÃO actived
piece-parent  → filho direto que espelha o estado ativo do pai automaticamente
`,

    examples: {
        card: `
<div class="piece-surface background-color-auto-04
            piece-border border-color-auto-06
            text-color-auto-21"
     style="border-radius:16px; padding:16px;">
    Conteúdo do card
</div>`,

        glassPanel: `
<div class="piece-surface background-color-auto-00
            piece-background-alpha-08
            piece-blur-08
            piece-border piece-border-alpha-06 border-color-auto-00
            text-color-auto-21"
     style="border-radius:20px; padding:20px;">
    Painel com efeito vidro
</div>`,

        accentSection: `
<!-- piece-primary muda o HUE — background-color-auto-11 usa esse HUE -->
<div class="piece-surface piece-primary
            background-color-auto-11
            text-color-auto-00"
     style="border-radius:12px; padding:16px;">
    Seção destacada com cor primária
</div>`,
    }
}
