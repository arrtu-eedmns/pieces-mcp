module.exports = {
    id: "fab",
    name: "FAB",
    file: "FAB.css",
    description: "Floating Action Button. Botão flutuante de ação principal. Variante extended inclui label.",

    structure: `
<!-- FAB simples (só ícone) -->
<button class="piece-FAB piece-surface piece-s-40
               {background} {background-hover}
               {text-color} {ripple-color}
               {palette}">
    <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>
    <span class="piece-ripple"></span>
</button>

<!-- FAB Extended (ícone + label) -->
<button class="piece-FAB piece-extended piece-surface piece-s-40
               {background} {background-hover}
               {text-color} {ripple-color}
               {palette}">
    <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>
    <span class="piece-label">{texto}</span>
    <span class="piece-ripple"></span>
</button>`,

    requiredClasses: ["piece-FAB", "piece-surface"],

    modifiers: {
        "piece-extended": "Variante com label — largura se expande para acomodar o texto",
    },

    examples: {
        primary: `
<button class="piece-FAB piece-surface piece-s-40
               background-color-auto-11 background-color-auto-12-hover
               text-color-auto-00 ripple-color-auto-00
               piece-primary">
    <span class="material-symbols-rounded piece-icon" translate="no">add</span>
    <span class="piece-ripple"></span>
</button>`,

        extended: `
<button class="piece-FAB piece-extended piece-surface piece-s-40
               background-color-auto-06 background-color-auto-07-hover
               text-color-auto-20 ripple-color-auto-00
               piece-secondary">
    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
    <span class="piece-label">Editar</span>
    <span class="piece-ripple"></span>
</button>`,
    }
}
