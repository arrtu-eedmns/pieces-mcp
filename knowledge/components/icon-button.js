module.exports = {
    id: "icon-button",
    name: "Icon Button",
    file: "icon-button.css",
    description: "Botão quadrado/circular com apenas um ícone. Suporta toggle, narrow/wide e os mesmos tamanhos do button.",

    structure: `
<!-- Simples — usa <button> -->
<button class="piece-icon-button {size} piece-surface
               {background} {background-hover}
               {text-color} {ripple-color}">
    <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>
    <span class="piece-ripple"></span>
</button>

<!-- Toggle — OBRIGATÓRIO usar <label>, não <button> -->
<!-- O input fica display:none — sem <label> o clique não chega ao input -->
<label class="piece-icon-button {size} piece-surface ...">
    <input type="checkbox" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">{icon-off}</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">{icon-on}</span>
    <span class="piece-ripple"></span>
</label>`,

    requiredClasses: ["piece-icon-button", "piece-surface"],

    sizes: {
        "piece-extra-small": "32×32px — ícone 20px, border-radius 16px",
        "piece-small":       "40×40px — ícone 24px, border-radius 20px",
        "piece-medium":      "56×56px — ícone 24px, border-radius 28px (padrão)",
        "piece-large":       "96×96px — ícone 32px, border-radius 48px",
        "piece-extra-large": "136×136px — ícone 40px, border-radius 68px",
    },

    widthModifiers: {
        "piece-narrow": "Largura menor que a altura — cria botão mais estreito (ex: small narrow = 32px largura)",
        "piece-wide":   "Largura maior que a altura — cria botão mais largo (ex: small wide = 52px largura)",
    },

    widthBySize: {
        "piece-extra-small": { default: "32px", narrow: "28px", wide: "40px" },
        "piece-small":       { default: "40px", narrow: "32px", wide: "52px" },
        "piece-medium":      { default: "56px", narrow: "48px", wide: "72px" },
        "piece-large":       { default: "96px", narrow: "64px", wide: "128px" },
        "piece-extra-large": { default: "136px", narrow: "104px", wide: "184px" },
    },

    toggleBehavior: `
Funciona igual ao piece-button — input oculto controla o estado:

- piece-false: ícone visível quando NÃO checado
- piece-true:  ícone visível quando checado
- Ícone ativo recebe FILL automático via font-variation-settings
- piece-actived: ativa estado manualmente via JS`,

    modifiers: {
        "piece-disabled": "Desabilitado",
        "piece-actived":  "Estado ativo manual via JS",
        "piece-narrow":   "Largura reduzida",
        "piece-wide":     "Largura aumentada",
    },

    notes: [
        "Não tem piece-label — use piece-button se precisar de texto",
        "O FILL do ícone é ativado automaticamente quando checked/actived",
        "Combine piece-narrow com pill shapes para criar chips/tags clicáveis",
        "piece-primary/secondary/tertiary devem estar no body ou container pai — NÃO repetir em cada botão",
        "Só adicione piece-secondary/tertiary num botão específico para sobrescrever o papel de cor local",
    ],

    examples: {
        simple: `
<button class="piece-icon-button piece-medium piece-surface
               background-color-auto-04 background-color-auto-06-hover
               text-color-auto-20 ripple-color-auto-20">
    <span class="material-symbols-rounded piece-icon" translate="no">close</span>
    <span class="piece-ripple"></span>
</button>`,

        toggle: `
<!-- <label> como raiz — obrigatório para o clique funcionar -->
<!-- piece-primary herdado do body — background-color-auto-11 usa esse HUE -->
<label class="piece-icon-button piece-small piece-surface
              background-color-auto-04 background-color-auto-06-hover
              background-color-auto-11-active
              text-color-auto-18 text-color-auto-00-active
              ripple-color-auto-18">
    <input type="checkbox" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">bookmark_border</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">bookmark</span>
    <span class="piece-ripple"></span>
</label>`,

        narrow: `
<!-- Botão estreito — útil em listas e tabelas -->
<button class="piece-icon-button piece-small piece-narrow piece-surface
               background-color-auto-00 background-color-auto-04-hover
               text-color-auto-18 ripple-color-auto-18">
    <span class="material-symbols-rounded piece-icon" translate="no">more_vert</span>
    <span class="piece-ripple"></span>
</button>`,
    }
}
