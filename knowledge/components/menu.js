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
Cada item do menu pode ser <li> ou <label>:
- .piece-menu-icon     — ícone leading (20px), suporta piece-true/piece-false
- .piece-menu-label    — texto principal (flex:1)
- .piece-menu-trailing — texto/badge trailing (12px, alinhado à direita)
- input (oculto)       — para itens toggle/radio

Primeiro item: border-radius 12px 12px 4px 4px
Último item:   border-radius 4px 4px 12px 12px
Item único:    border-radius 12px
Item ativo:    border-radius 12px (fully round)`,

    modifiers: {
        "piece-gap": "Menu com múltiplos grupos <ul> separados, cada um com sua própria sombra",
    },

    notes: [
        "Max-width: 280px por padrão",
        "Altura dos itens: 48px fixo",
        "Font-size dos itens: 14px",
        "Box-shadow: 0 0 4px 1px hsla(0,0%,0%,0.25) — não usa o sistema de cores pieces",
        "Para fechar ao clicar fora, use o interactive.js ou implemente manualmente",
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

    <div class="piece-menu piece-surface background-color-auto-02">
        <ul>
            <li class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
                <span class="material-symbols-rounded piece-menu-icon" translate="no">edit</span>
                <span class="piece-menu-label">Editar</span>
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

        withToggle: `
<div class="piece-menu piece-surface background-color-auto-02">
    <ul>
        <label class="piece-surface background-color-auto-04-hover ripple-color-auto-18 text-color-auto-18">
            <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">bookmark_border</span>
            <span class="material-symbols-rounded piece-menu-icon piece-true"  translate="no">bookmark</span>
            <span class="piece-menu-label">Salvar</span>
            <input type="checkbox">
            <span class="piece-ripple"></span>
        </label>
    </ul>
</div>`,
    }
}
