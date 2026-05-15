module.exports = {
    id: "fab-menu",
    name: "FAB Menu",
    file: "FAB-menu.css",
    description: "Menu flutuante expandível com FAB toggle. Fixado bottom:16px right:16px. Ao ativar, exibe itens com label acima do botão principal.",

    structure: `
<div class="piece-FAB-menu piece-actived">  <!-- piece-actived para abrir -->

    <!-- Itens do menu (ocultos por padrão) -->
    <div>
        <div class="menu-item piece-surface background-color-auto-04 background-color-auto-06-hover
                    text-color-auto-18 ripple-color-auto-18">
            <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
            <span class="piece-label">Editar</span>
            <span class="piece-ripple"></span>
        </div>
        <div class="menu-item piece-surface background-color-auto-04 background-color-auto-06-hover
                    text-color-auto-18 ripple-color-auto-18">
            <span class="material-symbols-rounded piece-icon" translate="no">share</span>
            <span class="piece-label">Compartilhar</span>
            <span class="piece-ripple"></span>
        </div>
    </div>

    <!-- Botão toggle principal -->
    <div class="piece-toggle-button piece-surface background-color-auto-11 text-color-auto-00 piece-primary">
        <span class="material-symbols-rounded piece-icon piece-true"  translate="no">add</span>
        <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
    </div>

</div>`,

    requiredClasses: ["piece-FAB-menu"],

    howItWorks: `
- position: absolute, bottom:16px, right:16px — fixado no canto inferior direito
- Sem .piece-actived: apenas o toggle-button visível, ícone piece-true (ex: add)
- Com .piece-actived: itens aparecem acima, toggle-button fica circular, ícone piece-false (ex: close)
- Os itens ficam em <div> direto filho do piece-FAB-menu — display:none por padrão, display:grid com actived
- pointer-events controlado: o container é none, os menu-item são all`,

    itemStructure: `
Cada .menu-item:
- height: 56px
- border-radius: 56px (pílula)
- padding-inline: 24px
- grid-auto-flow: column
- gap: 8px
- .piece-label — font-size: 16px, font-weight: 500`,

    notes: [
        "O toggle button tem 56×56px, border-radius: 16px (fechado) → 100% (aberto)",
        "Controle via JS: element.classList.toggle('piece-actived')",
        "Os ícones piece-false/piece-true do toggle estão invertidos: false=close, true=add (intencionalmente)",
        "Use position:relative no container pai para o absolute funcionar corretamente",
    ],

    examples: {
        basic: `
<div style="position:relative; min-height: 200px">

    <div class="piece-FAB-menu" id="fab-menu">
        <div>
            <div class="menu-item piece-surface background-color-auto-06 background-color-auto-08-hover
                        text-color-auto-20 ripple-color-auto-20"
                 onclick="alert('Novo arquivo')">
                <span class="material-symbols-rounded piece-icon" translate="no">description</span>
                <span class="piece-label">Novo arquivo</span>
            </div>
            <div class="menu-item piece-surface background-color-auto-06 background-color-auto-08-hover
                        text-color-auto-20 ripple-color-auto-20"
                 onclick="alert('Nova pasta')">
                <span class="material-symbols-rounded piece-icon" translate="no">folder</span>
                <span class="piece-label">Nova pasta</span>
            </div>
        </div>

        <div class="piece-toggle-button piece-surface background-color-auto-11 text-color-auto-00 piece-primary"
             onclick="document.getElementById('fab-menu').classList.toggle('piece-actived')">
            <span class="material-symbols-rounded piece-icon piece-true"  translate="no">add</span>
            <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
        </div>
    </div>

</div>`,
    }
}
