module.exports = {
    id: "tooltip",
    name: "Tooltip",
    file: "tooltip.css",
    description: "Label flutuante de 24px altura. position:fixed, controlado por JS. Aparece ao adicionar .piece-visible.",

    structure: `
<span class="piece-tooltip piece-surface background-color-auto-18 text-color-auto-02">
    {texto}
</span>`,

    requiredClasses: ["piece-tooltip", "piece-surface"],

    howItWorks: `
- position: fixed — posicionado via JS (top/left injetados)
- opacity: 0 por padrão, opacity: 1 com .piece-visible
- pointer-events: none — não bloqueia cliques
- z-index: 200
- text-wrap: nowrap — não quebra linha
- Transição de opacity: 0.2s cubic-bezier(0.2,0,0,1)`,

    notes: [
        "Use background-color-auto-18 + text-color-auto-02 para máximo contraste (fundo invertido)",
        "O JS de tooltip.js gerencia o posicionamento e adiciona/remove .piece-visible",
        "font-size: 12px, font-weight: 500, border-radius: 4px",
        "Altura fixa: 24px com padding 0 8px",
    ],

    examples: {
        dark: `
<span class="piece-tooltip piece-surface background-color-auto-18 text-color-auto-02">
    Salvar arquivo
</span>`,
    }
}
