module.exports = {
    id: "navigation",
    name: "Navigation",
    file: "navigation.css",
    description: "Barra de navegação. Adapta automaticamente: rail vertical no desktop (≥800px), barra horizontal no mobile (≤799px).",

    structure: `
<!-- O <aside> precisa estar dentro de um container com container-type: inline-size -->
<aside class="piece-navigation piece-bar-rail piece-surface
              background-color-auto-02">

    <header>
        <!-- Menu toggle — visível apenas em ≥1280px (HD) -->
        <label class="piece-menu piece-icon-button piece-small piece-surface piece-text
                      text-color-auto-16 ripple-color-auto-16">
            <input type="checkbox" class="piece-controller">
            <span class="material-symbols-rounded piece-icon piece-false" translate="no">menu</span>
            <span class="material-symbols-rounded piece-icon piece-true"  translate="no">menu_open</span>
            <span class="piece-ripple"></span>
        </label>
    </header>

    <div class="piece-items">
        <!-- item ativo -->
        <label class="piece-item piece-surface text-color-auto-16 ripple-color-auto-16">
            <span class="piece-indicator piece-surface background-color-auto-11"></span>
            <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>
            <span class="piece-label">{nome}</span>
            <input type="radio" name="{grupo}" class="piece-controller" checked>
        </label>
        <!-- item inativo -->
        <label class="piece-item piece-surface text-color-auto-16 ripple-color-auto-16">
            <span class="piece-indicator piece-surface background-color-auto-11"></span>
            <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>
            <span class="piece-label">{nome}</span>
            <input type="radio" name="{grupo}" class="piece-controller">
        </label>
    </div>

</aside>`,

    requiredClasses: ["piece-navigation", "piece-bar-rail", "piece-surface"],

    containerQuery: "Usa @container (não @media). O elemento pai precisa ter container-type: inline-size definido.",

    breakpoints: {
        "≤799px (mobile)":   "Barra horizontal na base — height:64px, items em row, header oculto",
        "800–1279px (SVGA)": "Rail vertical — só ícones + label abaixo, menu toggle oculto",
        "≥1280px (HD+)":     "Rail vertical com menu toggle visível — quando checked expande para ícone + label inline",
    },

    expandedState: `
Quando .piece-menu > input:checked (apenas HD ≥1280px):
- Header mostra h1/h2 do app
- Items mudam para layout horizontal (ícone + label lado a lado)
- Indicador ocupa 100% do item com border-radius pill`,

    modifiers: {
        "piece-floating": "Rail com fundo próprio, flutuando sobre o conteúdo",
        "piece-bar-rail": "Adapta automaticamente entre barra e rail conforme breakpoint",
    },

    itemStructure: `
Cada item é um <label> com:
- .piece-indicator: highlight de fundo (transparent quando inativo, visível quando :checked)
- .piece-icon: ícone Material Symbol (branco quando :checked)
- .piece-label: texto (visível no rail expandido)
- input[type=radio].piece-controller: controla estado ativo
- .piece-label também fica branco quando :checked no estado expandido`,

    notes: [
        "O ícone ativo fica branco automaticamente via CSS (color: white em :checked)",
        "O piece-indicator é transparent quando inativo — a cor só aparece no hover e no estado ativo",
        "piece-menu deve ser um <label> com input[type=checkbox] dentro — não use <button>",
        "Todos os inputs[type=radio] do mesmo grupo devem ter o mesmo name",
        "O menu toggle é ocultado em 800–1279px (SVGA) pelo @container",
    ],
}
