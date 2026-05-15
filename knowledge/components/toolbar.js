module.exports = {
    id: "toolbar",
    name: "Toolbar",
    file: "toolbars.css",
    description: "Barra de ferramentas de 64px altura. O elemento .piece-floating dentro cria uma pílula arredondada com os botões.",

    structure: `
<div class="piece-toolbar">
    <div class="piece-floating piece-surface background-color-auto-02">
        <button class="piece-icon-button piece-small piece-surface
                       background-color-auto-00 background-color-auto-04-hover
                       text-color-auto-18 ripple-color-auto-18">
            <span class="material-symbols-rounded piece-icon" translate="no">format_bold</span>
            <span class="piece-ripple"></span>
        </button>
        <button class="piece-icon-button piece-small piece-surface
                       background-color-auto-00 background-color-auto-04-hover
                       text-color-auto-18 ripple-color-auto-18">
            <span class="material-symbols-rounded piece-icon" translate="no">format_italic</span>
            <span class="piece-ripple"></span>
        </button>
    </div>
</div>`,

    requiredClasses: ["piece-toolbar"],

    howItWorks: `
- .piece-toolbar: height 64px, container externo
- .piece-floating: display flex, align-items center, padding 8px, gap 4px
  height 64px, border-radius 64px (pílula), width min-content
- Os .piece-icon-button dentro têm min-width: 40px`,

    notes: [
        "A toolbar não tem cor própria — aplique piece-surface e cores no .piece-floating",
        "Use .piece-floating para criar a pílula arredondada",
        "Sem .piece-floating, a toolbar é apenas um container de 64px de altura",
    ],

    examples: {
        textEditor: `
<div class="piece-toolbar">
    <div class="piece-floating piece-surface background-color-auto-02 border-color-auto-06 piece-border">
        <button class="piece-icon-button piece-small piece-surface
                       background-color-auto-00 background-color-auto-11-active
                       text-color-auto-18 text-color-auto-00-active
                       ripple-color-auto-18 piece-primary">
            <input type="checkbox" class="piece-controller">
            <span class="material-symbols-rounded piece-icon" translate="no">format_bold</span>
            <span class="piece-ripple"></span>
        </button>
        <button class="piece-icon-button piece-small piece-surface
                       background-color-auto-00 background-color-auto-11-active
                       text-color-auto-18 text-color-auto-00-active
                       ripple-color-auto-18 piece-primary">
            <input type="checkbox" class="piece-controller">
            <span class="material-symbols-rounded piece-icon" translate="no">format_italic</span>
            <span class="piece-ripple"></span>
        </button>
        <span class="piece-divider piece-surface background-color-auto-06"
              style="width:1px; height:24px"></span>
        <button class="piece-icon-button piece-small piece-surface
                       background-color-auto-00 background-color-auto-04-hover
                       text-color-auto-18 ripple-color-auto-18">
            <span class="material-symbols-rounded piece-icon" translate="no">undo</span>
            <span class="piece-ripple"></span>
        </button>
    </div>
</div>`,
    }
}
