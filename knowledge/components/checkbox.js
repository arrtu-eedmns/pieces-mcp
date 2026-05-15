module.exports = {
    id: "checkbox",
    name: "Checkbox",
    file: "checkbox.css",
    description: "Botão de seleção com cantos quadrados (border-radius baixo). Estrutura idêntica ao icon-button mas com visual de checkbox. Suporta piece-true/piece-false para ícones customizados.",

    structure: `
<label class="piece-checkbox {size} piece-surface
              {background} {background-hover}
              {text-color} {ripple-color}">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check_box</span>
    <input type="checkbox" class="piece-controller">
</label>`,

    requiredClasses: ["piece-checkbox", "piece-surface"],

    sizes: {
        "piece-extra-small": "32×32px — ícone 20px, border-radius 8px",
        "piece-small":       "40×40px — ícone 24px, border-radius 10px",
        "piece-medium":      "56×56px — ícone 24px, border-radius 12px (padrão)",
        "piece-large":       "96×96px — ícone 32px, border-radius 20px",
        "piece-extra-large": "136×136px — ícone 40px, border-radius 28px",
    },

    widthModifiers: {
        "piece-narrow": "Largura reduzida (ex: small narrow = 32px)",
        "piece-wide":   "Largura aumentada (ex: small wide = 52px)",
    },

    notes: [
        "Diferença do icon-button: border-radius quadrado (não circular)",
        "O input[type=checkbox] fica hidden via .piece-controller { display: none }",
        "Ícone ativo recebe FILL automático via font-variation-settings",
        "piece-actived funciona como alternativa ao input:checked para controle via JS",
        "Use como label envolvendo o input para que o clique funcione nativamente",
    ],

    examples: {
        default: `
<label class="piece-checkbox piece-small piece-surface
              background-color-auto-00 background-color-auto-04-hover
              background-color-auto-11-active
              text-color-auto-18 text-color-auto-00-active
              ripple-color-auto-18
              piece-primary">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check_box</span>
    <input type="checkbox" class="piece-controller">
</label>`,

        indeterminate: `
<label class="piece-checkbox piece-small piece-surface
              background-color-auto-00 background-color-auto-04-hover
              text-color-auto-18 ripple-color-auto-18 piece-primary">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">indeterminate_check_box</span>
    <input type="checkbox" class="piece-controller">
</label>`,
    }
}
