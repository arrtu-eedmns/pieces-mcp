module.exports = {
    id: "progress-indicator",
    name: "Progress Indicator",
    file: "progressIndicator.css",
    description: "Indicador de progresso em barra ou círculo. Controlado por --piece-percentage (0%–100%). Suporta modo indeterminate animado.",

    structure: `
<!-- Barra -->
<div class="piece-progress-indicator piece-bar piece-surface background-color-auto-04">
    <div class="piece-indicator piece-surface background-color-auto-11 piece-primary"></div>
</div>

<!-- Círculo -->
<div class="piece-progress-indicator piece-circle piece-surface background-color-auto-04"
     style="width: 48px; height: 48px; --piece-track-width: 4px">
    <div class="piece-indicator piece-surface background-color-auto-11 piece-primary"></div>
</div>`,

    requiredClasses: ["piece-progress-indicator", "piece-surface"],

    cssVariables: {
        "--piece-percentage":  "Progresso de 0% a 100% (default: 0%)",
        "--piece-track-width": "Espessura do anel no círculo em px (default: 4px)",
    },

    variants: {
        "piece-bar":    "Barra horizontal — height: 4px, width: 100%, overflow: hidden",
        "piece-circle": "Círculo — tamanho via width/height, anel via mask radial-gradient + conic-gradient",
    },

    indeterminate: `
Adicione .piece-indeterminate para animação contínua:

Barra:   segmento de 40% desliza da esquerda para a direita (1.6s infinite)
Círculo: arco de 25% gira 360° (1s linear infinite)

<div class="piece-progress-indicator piece-bar piece-indeterminate piece-surface background-color-auto-04">
    <div class="piece-indicator piece-surface background-color-auto-11 piece-primary"></div>
</div>`,

    howItWorks: `
BARRA:
- Container com overflow:hidden e height:4px
- .piece-indicator tem width: var(--piece-percentage) com transition: width 0.3s
- Indeterminate: animação piece-bar-indeterminate translateX(-250% → 250%)

CÍRCULO:
- Container com mask: radial-gradient — cria o anel recortando o centro
- Track = background do container (ex: background-color-auto-04)
- Arco = .piece-indicator com conic-gradient usando as vars piece-surface
- O arco usa as mesmas CSS vars de cor do piece-surface (--piece-background-color-h, etc.)
- Indeterminate: arco fixo de 25% com animação de rotação`,

    modifiers: {
        "piece-indeterminate": "Animação contínua — ignora --piece-percentage",
        "piece-absolute":      "position: absolute — para posicionar sobre outros elementos",
    },

    notes: [
        "Controle o progresso via JS: element.style.setProperty('--piece-percentage', '75%')",
        "No círculo, o tamanho é livre — defina width/height via CSS",
        "O .piece-indicator no círculo usa as vars de cor do piece-surface do container",
        "Use background-color-auto-04 no container (track) e background-color-auto-11 no indicator (arco)",
        "piece-absolute útil para barra de loading no topo de um card ou página",
    ],

    examples: {
        bar: `
<div class="piece-progress-indicator piece-bar piece-surface background-color-auto-04"
     style="--piece-percentage: 65%">
    <div class="piece-indicator piece-surface background-color-auto-11 piece-primary"></div>
</div>`,

        barIndeterminate: `
<div class="piece-progress-indicator piece-bar piece-indeterminate piece-surface background-color-auto-04">
    <div class="piece-indicator piece-surface background-color-auto-11 piece-primary"></div>
</div>`,

        circle: `
<div class="piece-progress-indicator piece-circle piece-surface background-color-auto-04"
     style="width:48px; height:48px; --piece-percentage: 75%; --piece-track-width: 4px">
    <div class="piece-indicator piece-surface background-color-auto-11 piece-primary"></div>
</div>`,

        circleIndeterminate: `
<div class="piece-progress-indicator piece-circle piece-indeterminate piece-surface background-color-auto-04"
     style="width:48px; height:48px; --piece-track-width: 4px">
    <div class="piece-indicator piece-surface background-color-auto-11 piece-primary"></div>
</div>`,

        jsControl: `
// Atualizar progresso via JS
const bar = document.querySelector('.piece-progress-indicator')
bar.style.setProperty('--piece-percentage', '75%')`,
    }
}
