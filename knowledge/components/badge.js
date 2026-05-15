module.exports = {
    id: "badge",
    name: "Badge",
    file: "badge.css",
    description: "Indicador numérico ou ponto que sobrepõe outros elementos. Três tamanhos: ponto, padrão e large com texto.",

    structure: `
<!-- Ponto (sem texto) -->
<span class="piece-badge piece-small piece-surface background-color-auto-11 piece-primary"></span>

<!-- Padrão 16×16px (número curto) -->
<span class="piece-badge piece-surface background-color-auto-11 text-color-auto-00 piece-primary">9</span>

<!-- Large (texto/número longo) -->
<span class="piece-badge piece-large piece-surface background-color-auto-11 text-color-auto-00 piece-primary">99+</span>`,

    requiredClasses: ["piece-badge", "piece-surface"],

    sizes: {
        "piece-small":        "6×6px — ponto, sem texto",
        "(sem modificador)":  "16×16px — número curto, aspect-ratio 1/1",
        "piece-large":        "16px altura, min 16px, max 34px largura — texto/número longo, padding 0 4px",
    },

    notes: [
        "Sempre posicione o badge com position:absolute sobre o elemento pai (que deve ter position:relative)",
        "font-size fixo em 11px, font-weight 500",
        "pointer-events: none — não bloqueia cliques",
        "Use piece-primary/secondary/tertiary + background-color-auto-11 para cor de destaque",
    ],

    examples: {
        notificationDot: `
<div style="position:relative; display:inline-block">
    <button class="piece-icon-button piece-medium piece-surface
                   background-color-auto-04 background-color-auto-06-hover
                   text-color-auto-18 ripple-color-auto-18">
        <span class="material-symbols-rounded piece-icon" translate="no">notifications</span>
        <span class="piece-ripple"></span>
    </button>
    <span class="piece-badge piece-small piece-surface background-color-auto-11 piece-primary"
          style="position:absolute; top:8px; right:8px"></span>
</div>`,

        notificationCount: `
<div style="position:relative; display:inline-block">
    <button class="piece-icon-button piece-medium piece-surface
                   background-color-auto-04 background-color-auto-06-hover
                   text-color-auto-18 ripple-color-auto-18">
        <span class="material-symbols-rounded piece-icon" translate="no">notifications</span>
        <span class="piece-ripple"></span>
    </button>
    <span class="piece-badge piece-large piece-surface background-color-auto-11 text-color-auto-00 piece-primary"
          style="position:absolute; top:4px; right:4px">3</span>
</div>`,
    }
}
