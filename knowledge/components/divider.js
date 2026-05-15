module.exports = {
    id: "divider",
    name: "Divider",
    file: "divider.css",
    description: "Linha divisória mínima de 1px. Horizontal ou vertical conforme o contexto. A cor vem das classes do pieces.",

    structure: `
<!-- Horizontal -->
<span class="piece-divider piece-surface background-color-auto-06"
      style="width: 100%; height: 1px"></span>

<!-- Vertical -->
<span class="piece-divider piece-surface background-color-auto-06"
      style="width: 1px; height: 100%"></span>`,

    requiredClasses: ["piece-divider"],

    howItWorks: `
.piece-divider apenas garante display:block e dimensões mínimas (min-width:1px, min-height:1px).
A cor e as dimensões reais são definidas via classes do pieces e CSS inline ou classes utilitárias.`,

    notes: [
        "Use background-color-auto-06 para divisor sutil",
        "Use background-color-auto-08 para divisor mais visível",
        "Em flexbox/grid, o divider se adapta ao tamanho automaticamente se usar align-self:stretch",
    ],

    examples: {
        horizontal: `<span class="piece-divider piece-surface background-color-auto-06" style="width:100%; height:1px"></span>`,
        vertical:   `<span class="piece-divider piece-surface background-color-auto-06" style="width:1px; height:100%; align-self:stretch"></span>`,
    }
}
