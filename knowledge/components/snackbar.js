module.exports = {
    id: "snackbar",
    name: "Snackbar",
    file: "snackbar.css",
    description: "Notificação temporária com label e opcionalmente botão de ação e/ou fechar. Fixada no canto inferior.",

    structure: `
<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02">
    <span class="label">{mensagem}</span>

    <!-- botão de ação — opcional -->
    <button class="piece-button piece-small piece-surface piece-s-40
                   background-color-auto-18 background-color-auto-17-hover
                   text-color-auto-11 ripple-color-auto-11 piece-primary piece-text"
            type="button">
        <span class="piece-ripple"></span>
        <span class="piece-label">{ação}</span>
    </button>

    <!-- botão fechar — opcional -->
    <button class="piece-icon-button piece-surface piece-s-40 piece-extra-small
                   background-color-auto-18 background-color-auto-17-hover
                   text-color-auto-02 ripple-color-auto-02"
            type="button">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon" translate="no">close</span>
    </button>
</div>`,

    requiredClasses: ["piece-snackbar", "piece-surface"],

    colorGuide: {
        "background-color-auto-18": "Fundo invertido — máximo contraste",
        "text-color-auto-02":       "Texto e ícone fechar sobre fundo invertido",
        "text-color-auto-11":       "Texto do botão de ação — destaca sobre o fundo",
        "background-color-auto-17-hover": "Hover dos botões internos",
    },

    vsToast: `
Snackbar: pode ter botão de ação e fechar, fixado à esquerda (bottom:16px, left:16px)
Toast:    só informativo, sem ações, centralizado`,
}
