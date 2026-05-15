module.exports = {
    id: "switch",
    name: "Switch",
    file: "switch.css",
    description: "Toggle on/off. 52×32px fixo. Indicador animado que desliza com física cubic-bezier. Suporta ícones para estado on/off.",

    structure: `
<!-- Sem ícone -->
<label class="piece-switch piece-surface
              background-color-auto-06 border-color-auto-10
              background-color-auto-11-active border-color-auto-11-active
              piece-primary">
    <span class="piece-indicator piece-surface background-color-auto-12 background-color-auto-00-active"></span>
    <input type="checkbox" class="piece-controller">
</label>

<!-- Com ícones -->
<label class="piece-switch piece-surface
              background-color-auto-06 border-color-auto-10
              background-color-auto-11-active border-color-auto-11-active
              piece-primary">
    <span class="piece-indicator piece-surface background-color-auto-12 background-color-auto-00-active">
        <span class="material-symbols-rounded piece-icon piece-false text-color-auto-12" translate="no">close</span>
        <span class="material-symbols-rounded piece-icon piece-true  text-color-auto-11" translate="no">check</span>
    </span>
    <input type="checkbox" class="piece-controller">
</label>`,

    requiredClasses: ["piece-switch", "piece-surface"],

    dimensions: "52×32px fixo — não tem variantes de tamanho",

    indicatorBehavior: `
Sem ícone:
  - OFF: 16×16px, margem 6px 6px (esquerda)
  - ON:  24×24px, margem 2px 22px (direita)
  - :active OFF: 28×28px esticado para a esquerda
  - :active ON:  28×28px esticado para a direita

Com piece-false (ícone no estado off):
  - OFF: começa grande (24×24px) — indica que há ação disponível
  - ON:  24×24px, deslocado para a direita

Com apenas piece-true (ícone só no estado on):
  - OFF: começa pequeno (16×16px)
  - ON:  24×24px com ícone`,

    notes: [
        "O input[type=checkbox] deve ser filho direto do .piece-switch",
        "O input fica invisível mas ocupa 100% da área — é ele que recebe o clique",
        "piece-false e piece-true dentro do .piece-indicator controlam qual ícone aparece",
        "Usa border-style: solid + border-width: 2px — sempre defina border-color",
        "Transições com cubic-bezier(0.2,0,0,1) — animação suave e física",
    ],

    examples: {
        simple: `
<label class="piece-switch piece-surface
              background-color-auto-06 border-color-auto-10
              background-color-auto-11-active border-color-auto-11-active
              piece-primary">
    <span class="piece-indicator piece-surface
                 background-color-auto-12 background-color-auto-00-active"></span>
    <input type="checkbox" class="piece-controller">
</label>`,

        withIcons: `
<label class="piece-switch piece-surface
              background-color-auto-06 border-color-auto-10
              background-color-auto-11-active border-color-auto-11-active
              piece-secondary">
    <span class="piece-indicator piece-surface
                 background-color-auto-12 background-color-auto-00-active">
        <span class="material-symbols-rounded piece-icon piece-false text-color-auto-12" translate="no">close</span>
        <span class="material-symbols-rounded piece-icon piece-true  text-color-auto-00" translate="no">check</span>
    </span>
    <input type="checkbox" class="piece-controller">
</label>`,
    }
}
