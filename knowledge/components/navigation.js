module.exports = {
    id: "navigation",
    name: "Navigation",
    file: "navigation.css",
    description: "Barra de navegação. Adapta automaticamente: rail vertical no desktop (≥800px), barra horizontal no mobile (≤799px).",

    structure: `
<aside class="piece-navigation piece-bar-rail piece-floating piece-surface
              background-color-auto-02">

    <header>
        <!-- logo, menu toggle, FAB — opcionais -->
    </header>

    <div class="piece-items">
        <!-- item de navegação -->
        <label class="piece-item piece-surface piece-background-alpha-00
                      text-color-auto-21 piece-tertiary">
            <span class="piece-indicator piece-surface background-color-auto-04"></span>
            <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>
            <span class="piece-label">{nome}</span>
            <input type="radio" name="{grupo}" class="piece-controller" [{checked}]>
        </label>
    </div>

</aside>`,

    requiredClasses: ["piece-navigation", "piece-bar-rail", "piece-surface"],

    breakpoints: {
        "≤799px (mobile)": "Barra horizontal na base — height:64px, items em coluna horizontal",
        "800–1279px":       "Rail vertical compacto — só ícones, sem labels",
        "≥1280px":          "Rail vertical expandido — ícones + labels visíveis",
    },

    modifiers: {
        "piece-floating": "Rail com fundo próprio, flutuando sobre o conteúdo",
        "piece-rail":     "Versão compacta sem labels",
        "piece-bar-rail": "Adapta automaticamente entre barra e rail conforme breakpoint",
    },

    itemStructure: `
Cada item é um <label> com:
- .piece-indicator: o highlight/pill de fundo quando ativo
- .piece-icon: ícone Material Symbol
- .piece-label: texto do item (visível só no rail expandido)
- input[type=radio].piece-controller: controla o estado ativo`,
}
