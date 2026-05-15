module.exports = {
    id: "switch",
    name: "Switch",
    file: "switch.css",
    description: "Toggle on/off. 52×32px fixo. Indicador animado que desliza com física cubic-bezier. Suporta ícones para estado on/off.",

    structure: `
<!-- Sem ícone -->
<div class="piece-switch piece-surface
            background-color-auto-04 background-color-auto-05-hover
            background-color-auto-11-active background-color-auto-12-active-hover
            border-color-auto-08 border-color-auto-11-active
            ripple-to-fg ripple-to-accent-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active"></span>
</div>

<!-- Com ícones — cor definida no container, não nos ícones -->
<div class="piece-switch piece-surface
            background-color-auto-04 background-color-auto-05-hover
            background-color-auto-11-active background-color-auto-12-active-hover
            border-color-auto-08 border-color-auto-11-active
            ripple-to-fg ripple-to-accent-active
            text-color-light-00 text-color-light-11-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active">
        <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
        <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check</span>
    </span>
</div>`,

    requiredClasses: ["piece-switch", "piece-surface"],

    dimensions: "52×32px fixo — não tem variantes de tamanho",

    indicatorBehavior: `
Sem ícone:
  - OFF: 16×16px, margem 6px 6px (esquerda)
  - ON:  24×24px, margem 2px 22px (direita)
  - :active OFF: 28×28px esticado para a esquerda
  - :active ON:  28×28px esticado para a direita

Com piece-false (ícone só no estado OFF):
  - OFF: começa grande (24×24px) — indica que há ação disponível
  - ON:  24×24px, deslocado para a direita

Com apenas piece-true (ícone só no estado ON):
  - OFF: começa pequeno (16×16px)
  - ON:  24×24px com ícone`,

    iconVariants: `
Existem 4 variantes de ícone — todos vão dentro do .piece-indicator:

A cor dos ícones NÃO é definida nos próprios spans — ela vem do container piece-switch via:
  text-color-light-00 text-color-light-11-active
Os ícones herdam a cor do pai automaticamente.

── Nenhum ─────────────────────────────────────────────────────────────────────
<div class="piece-switch piece-surface ...
            text-color-light-00 text-color-light-11-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active"></span>
</div>

── Só ON (piece-true) ─────────────────────────────────────────────────────────
Indicador pequeno no OFF, grande no ON com ícone.
<div class="piece-switch piece-surface ...
            text-color-light-00 text-color-light-11-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active">
        <span class="material-symbols-rounded piece-icon piece-true" translate="no">check</span>
    </span>
</div>

── Só OFF (piece-false) ───────────────────────────────────────────────────────
Indicador já começa grande no OFF (sinaliza que há ação).
<div class="piece-switch piece-surface ...
            text-color-light-00 text-color-light-11-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active">
        <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
    </span>
</div>

── Ambos ──────────────────────────────────────────────────────────────────────
<div class="piece-switch piece-surface ...
            text-color-light-00 text-color-light-11-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active">
        <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
        <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check</span>
    </span>
</div>`,

    notes: [
        "Usa <div> como raiz — não <label> nem <button>",
        "piece-primary é opcional: sem uma classe de paleta (piece-triade etc.) no container, não muda nada visualmente — o hue cai no padrão do :root (248)",
        "O input DEVE vir ANTES do .piece-indicator no HTML — o CSS usa :has(.piece-controller:checked) para estilizar o indicador",
        "O input DEVE ter class='piece-controller' — é ele que dispara o estado ativo",
        "O .piece-indicator DEVE ter piece-parent — espelha o estado ativo do pai",
        "ripple-to-fg e ripple-to-accent-active controlam a cor do ripple em cada estado",
        "background-color-auto-05-hover = hover no estado OFF | background-color-auto-12-active-hover = hover no estado ON",
        "piece-false e piece-true dentro do .piece-indicator controlam qual ícone aparece",
        "Ícones NÃO recebem text-color diretamente — a cor vem do container: text-color-light-00 (OFF) e text-color-light-11-active (ON)",
        "Usa border-style: solid + border-width: 2px — sempre defina border-color",
        "Transições com cubic-bezier(0.2,0,0,1) — animação suave e física",
    ],

    examples: {
        simple: `
<div class="piece-switch piece-surface piece-primary
            background-color-auto-04 background-color-auto-05-hover
            background-color-auto-11-active background-color-auto-12-active-hover
            border-color-auto-08 border-color-auto-11-active
            ripple-to-fg ripple-to-accent-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active"></span>
</div>`,

        checked: `
<div class="piece-switch piece-surface piece-primary
            background-color-auto-04 background-color-auto-05-hover
            background-color-auto-11-active background-color-auto-12-active-hover
            border-color-auto-08 border-color-auto-11-active
            ripple-to-fg ripple-to-accent-active">
    <input type="checkbox" class="piece-controller" checked>
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active"></span>
</div>`,

        withIcons: `
<div class="piece-switch piece-surface piece-secondary
            background-color-auto-04 background-color-auto-05-hover
            background-color-auto-11-active background-color-auto-12-active-hover
            border-color-auto-08 border-color-auto-11-active
            ripple-to-fg ripple-to-accent-active
            text-color-light-00 text-color-light-11-active">
    <input type="checkbox" class="piece-controller">
    <span class="piece-indicator piece-surface piece-parent
                 background-color-auto-12 background-color-auto-00-active">
        <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
        <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check</span>
    </span>
</div>`,
    }
}
