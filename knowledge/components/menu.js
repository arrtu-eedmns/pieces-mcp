module.exports = {
    id: "menu",
    name: "Menu",
    file: "menu.css",
    description: "Menu dropdown com animação clip-path. Abre/fecha via piece-actived no container piece-interactive. O JS em interactive.js posiciona via getBoundingClientRect().",

    structure: `
<!-- Container interativo -->
<div class="piece-interactive">

    <!-- Trigger — qualquer elemento -->
    <button class="piece-icon-button piece-small piece-surface ..."
            onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">more_vert</span>
        <span class="piece-ripple"></span>
    </button>

    <!-- Menu -->
    <div class="piece-menu piece-surface background-color-auto-02">
        <ul>
            <li class="piece-surface background-color-auto-04-hover ripple-color-auto-18
                       text-color-auto-18">
                <span class="material-symbols-rounded piece-menu-icon" translate="no">edit</span>
                <span class="piece-menu-label">Editar</span>
                <span class="piece-ripple"></span>
            </li>
            <li class="piece-surface background-color-auto-04-hover ripple-color-auto-18
                       text-color-auto-18">
                <span class="material-symbols-rounded piece-menu-icon" translate="no">delete</span>
                <span class="piece-menu-label">Excluir</span>
                <span class="piece-ripple"></span>
            </li>
        </ul>
    </div>

</div>`,

    requiredClasses: ["piece-menu"],

    howItWorks: `
1. .piece-interactive é o container que controla abertura/fechamento
2. Quando .piece-interactive recebe .piece-actived, o .piece-menu aparece (clip-path animado)
3. O menu usa position:fixed — escapa de overflow:hidden e backdrop-filter
4. O JS (interactive.js) injeta top/left/minWidth automaticamente via getBoundingClientRect()
5. Sem o JS, o menu aparece mas sem posicionamento automático`,

    itemStructure: `
Cada item do menu pode ser <li> (ação simples) ou <label> (toggle/seleção):

- .piece-menu-icon     — ícone leading (20px), suporta piece-true/piece-false para toggle
- .piece-menu-label    — texto principal (flex:1)
- .piece-menu-trailing — texto ou badge trailing (font-size 12px, alinhado à direita)
- input (oculto)       — checkbox ou radio para toggle/seleção

Bordas dos itens:
  Primeiro: border-radius 12px 12px 4px 4px
  Último:   border-radius 4px 4px 12px 12px
  Único:    border-radius 12px
  Ativo:    border-radius 12px (fully round)`,

    selectionTypes: `
── Seleção única (radio) ──────────────────────────────────────────────────────
Usar <label> + input[type=radio]. Apenas um item pode estar ativo por vez.
piece-false/piece-true controlam qual ícone aparece.

<label class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
    <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">radio_button_unchecked</span>
    <span class="material-symbols-rounded piece-menu-icon piece-true"  translate="no">radio_button_checked</span>
    <span class="piece-menu-label">Lista</span>
    <input type="radio" name="view" class="piece-controller" checked>
    <span class="piece-ripple"></span>
</label>

── Seleção múltipla (checkbox) ────────────────────────────────────────────────
Usar <label> + input[type=checkbox]. Múltiplos itens podem estar ativos.

<label class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
    <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">check_box_outline_blank</span>
    <span class="material-symbols-rounded piece-menu-icon piece-true"  translate="no">check_box</span>
    <span class="piece-menu-label">Títulos</span>
    <input type="checkbox" class="piece-controller" checked>
    <span class="piece-ripple"></span>
</label>`,

    trailingParts: `
── Trailing text ──────────────────────────────────────────────────────────────
Texto simples como atalho de teclado:

<span class="piece-menu-trailing">⌘E</span>

── Trailing badge ─────────────────────────────────────────────────────────────
Usar piece-badge dentro do piece-menu-trailing (sem position:absolute):

<span class="piece-menu-trailing">
    <span class="piece-badge piece-surface background-color-auto-11 text-color-auto-00">5</span>
</span>

<span class="piece-menu-trailing">
    <span class="piece-badge piece-large piece-surface background-color-auto-11 text-color-auto-00">99+</span>
</span>

<span class="piece-menu-trailing">
    <span class="piece-badge piece-small piece-surface background-color-auto-11"></span>
</span>`,

    modifiers: {
        "piece-gap": "Múltiplos grupos <ul> separados, cada um com sua própria sombra e border-radius",
    },

    groups: `
── Simples (um único <ul>) ────────────────────────────────────────────────────
<div class="piece-menu piece-surface background-color-auto-00">
    <ul>...</ul>
</div>

── piece-gap (múltiplos <ul> com sombra própria) ──────────────────────────────
<div class="piece-menu piece-gap piece-surface background-color-auto-00">
    <ul><!-- grupo 1 --></ul>
    <ul><!-- grupo 2 --></ul>
</div>

── Com divider (piece-divider dentro do <ul>) ─────────────────────────────────
<div class="piece-menu piece-surface background-color-auto-00">
    <ul>
        <li>...</li>
        <span class="piece-divider piece-surface background-color-auto-06"
              style="width:calc(100% - 24px); height:1px; margin:2px 12px"></span>
        <li>...</li>
    </ul>
</div>`,

    notes: [
        "Background principal do menu: background-color-auto-00 (não 02)",
        "Max-width: 280px por padrão",
        "Altura dos itens: 48px fixo",
        "Font-size dos itens: 14px",
        "Box-shadow: 0 0 4px 1px hsla(0,0%,0%,0.25) — não usa o sistema de cores pieces",
        "Fora do .piece-interactive, o menu renderiza estático no fluxo — útil para demos",
        "Para fechar ao clicar fora, usar interactive.js",
    ],

    examples: {
        simple: `
<div class="piece-interactive" style="position:relative">
    <button class="piece-icon-button piece-small piece-surface
                   background-color-auto-00 background-color-auto-04-hover
                   text-color-auto-18 ripple-color-auto-18"
            onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">more_vert</span>
        <span class="piece-ripple"></span>
    </button>
    <div class="piece-menu piece-surface background-color-auto-00">
        <ul>
            <li class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
                <span class="material-symbols-rounded piece-menu-icon" translate="no">edit</span>
                <span class="piece-menu-label">Editar</span>
                <span class="piece-menu-trailing">⌘E</span>
                <span class="piece-ripple"></span>
            </li>
            <li class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
                <span class="material-symbols-rounded piece-menu-icon" translate="no">delete</span>
                <span class="piece-menu-label">Excluir</span>
                <span class="piece-ripple"></span>
            </li>
        </ul>
    </div>
</div>`,

        withDivider: `
<div class="piece-menu piece-surface background-color-auto-00">
    <ul>
        <li class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
            <span class="material-symbols-rounded piece-menu-icon" translate="no">edit</span>
            <span class="piece-menu-label">Editar</span>
            <span class="piece-ripple"></span>
        </li>
        <span class="piece-divider piece-surface background-color-auto-06"
              style="width:calc(100% - 24px); height:1px; margin:2px 12px"></span>
        <li class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
            <span class="material-symbols-rounded piece-menu-icon" translate="no">delete</span>
            <span class="piece-menu-label">Excluir</span>
            <span class="piece-ripple"></span>
        </li>
    </ul>
</div>`,

        singleSelection: `
<div class="piece-menu piece-surface background-color-auto-00">
    <ul>
        <label class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
            <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">radio_button_unchecked</span>
            <span class="material-symbols-rounded piece-menu-icon piece-true"  translate="no">radio_button_checked</span>
            <span class="piece-menu-label">Lista</span>
            <input type="radio" name="view" class="piece-controller" checked>
            <span class="piece-ripple"></span>
        </label>
        <label class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
            <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">radio_button_unchecked</span>
            <span class="material-symbols-rounded piece-menu-icon piece-true"  translate="no">radio_button_checked</span>
            <span class="piece-menu-label">Grade</span>
            <input type="radio" name="view" class="piece-controller">
            <span class="piece-ripple"></span>
        </label>
    </ul>
</div>`,
    }
}
