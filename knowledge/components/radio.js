module.exports = {
    id: "radio",
    name: "Radio",
    file: "radio.css",
    description: "Botão de seleção exclusiva. Idêntico ao checkbox em estrutura mas sempre circular (border-radius 136px em todos os tamanhos). Usado com input[type=radio] e mesmo name para exclusividade.",

    structure: `
<label class="piece-radio {size} piece-surface
              {background} {background-hover}
              {text-color} {ripple-color}">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">radio_button_checked</span>
    <input type="radio" name="{grupo}" class="piece-controller">
</label>`,

    requiredClasses: ["piece-radio", "piece-surface"],

    sizes: {
        "piece-extra-small": "32×32px — ícone 20px, sempre circular",
        "piece-small":       "40×40px — ícone 24px, sempre circular",
        "piece-medium":      "56×56px — ícone 24px, sempre circular (padrão)",
        "piece-large":       "96×96px — ícone 32px, sempre circular",
        "piece-extra-large": "136×136px — ícone 40px, sempre circular",
    },

    widthModifiers: {
        "piece-narrow": "Largura reduzida",
        "piece-wide":   "Largura aumentada",
    },

    notes: [
        "Diferença do checkbox: border-radius sempre 136px (completamente circular)",
        "Agrupe radios com mesmo name para seleção exclusiva nativa",
        "O input[type=radio] fica hidden via .piece-controller { display: none }",
        "Ícone ativo recebe FILL automático",
        "piece-actived não funciona para exclusividade — use input[type=radio] para isso",
    ],

    examples: {
        group: `
<label class="piece-radio piece-small piece-surface
              background-color-auto-00 background-color-auto-04-hover
              background-color-auto-11-active
              text-color-auto-18 text-color-auto-00-active
              ripple-color-auto-18 piece-primary">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">radio_button_checked</span>
    <input type="radio" name="opcao" class="piece-controller" checked>
</label>

<label class="piece-radio piece-small piece-surface
              background-color-auto-00 background-color-auto-04-hover
              background-color-auto-11-active
              text-color-auto-18 text-color-auto-00-active
              ripple-color-auto-18 piece-primary">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">radio_button_checked</span>
    <input type="radio" name="opcao" class="piece-controller">
</label>`,
    }
}
