module.exports = {
    id: "notion",
    name: "Notion Style",
    file: "notion.css",
    description: "Variante de estilo inspirada no Notion. Sobrescreve apenas o border-radius e sombras. Compatível com todos os componentes pieces — basta adicionar .piece-notion ao componente. Projetos sem .piece-notion não são afetados.",

    philosophy: `
O Notion tem um visual limpo e focado em conteúdo:
- Border-radius baixo (4–8px) — quase quadrado, sem pill shapes
- Hover sutil — apenas mudança de fundo, sem transformações
- Sombras leves e discretas
- Compacto — alturas menores que o MD3
- Sem elevação agressiva`,

    usage: `
Adicione .piece-notion ao componente desejado:

<!-- Padrão MD3 (não muda) -->
<button class="piece-button piece-medium piece-surface ...">

<!-- Notion -->
<button class="piece-button piece-notion piece-medium piece-surface ...">

Todos os outros tokens de cor, tamanho e interação funcionam normalmente.
Apenas o border-radius e sombras são sobrescritos.`,

    borderRadius: {
        "extra-small": "4px (MD3: 16px)",
        "small":       "4px (MD3: 20px)",
        "medium":      "6px (MD3: 28px)",
        "large":       "8px (MD3: 48px)",
        "extra-large": "8px (MD3: 68px)",
    },

    supportedComponents: [
        "piece-button         — .piece-button.piece-notion",
        "piece-icon-button    — .piece-icon-button.piece-notion",
        "piece-checkbox       — .piece-checkbox.piece-notion",
        "piece-FAB            — .piece-FAB.piece-notion",
        "piece-menu           — .piece-menu.piece-notion",
        "piece-text-field     — .piece-text-field.piece-notion",
        "piece-textarea       — .piece-textarea.piece-notion",
        "piece-switch         — .piece-switch.piece-notion (indicador quadrado)",
        "piece-snackbar       — .piece-snackbar.piece-notion",
        "piece-toast          — .piece-toast.piece-notion",
        "piece-tooltip        — .piece-tooltip.piece-notion (22px altura, 3px radius)",
        "piece-navigation     — .piece-navigation.piece-notion",
        "piece-badge          — .piece-badge.piece-notion (3px radius)",
        "piece-split-button   — .piece-split-button.piece-notion",
    ],

    notes: [
        "piece-radio NÃO tem variante notion — radio é sempre circular por natureza",
        "O piece-notion só sobrescreve border-radius e sombra — cores e tamanhos vêm do pieces normalmente",
        "piece-menu.piece-notion tem sombra mais sutil: box-shadow 1px 3px ao invés de 4px",
        "piece-text-field.piece-notion tem alturas reduzidas (32–48px vs 40–64px)",
        "piece-tooltip.piece-notion tem 22px de altura e radius 3px",
        "piece-switch.piece-notion tem indicador quadrado (border-radius 3px)",
    ],

    examples: {
        button: `
<button class="piece-button piece-notion piece-medium piece-surface
               background-color-auto-04 background-color-auto-06-hover
               text-color-auto-18 ripple-color-auto-18">
    <span class="piece-label">Continuar</span>
    <span class="piece-ripple"></span>
</button>`,

        buttonFilled: `
<button class="piece-button piece-notion piece-small piece-surface
               background-color-auto-11 background-color-auto-12-hover
               text-color-auto-00 ripple-color-auto-00
               piece-primary">
    <span class="piece-label">Publicar</span>
    <span class="piece-ripple"></span>
</button>`,

        iconButton: `
<button class="piece-icon-button piece-notion piece-small piece-surface
               background-color-auto-00 background-color-auto-04-hover
               text-color-auto-18 ripple-color-auto-18">
    <span class="material-symbols-rounded piece-icon" translate="no">more_horiz</span>
    <span class="piece-ripple"></span>
</button>`,

        menu: `
<div class="piece-menu piece-notion piece-surface background-color-auto-02">
    <ul>
        <li class="piece-surface background-color-auto-04-hover text-color-auto-18 ripple-color-auto-18">
            <span class="material-symbols-rounded piece-menu-icon" translate="no">edit</span>
            <span class="piece-menu-label">Renomear</span>
            <span class="piece-ripple"></span>
        </li>
        <li class="piece-surface background-color-auto-04-hover text-color-auto-18 ripple-color-auto-18">
            <span class="material-symbols-rounded piece-menu-icon" translate="no">content_copy</span>
            <span class="piece-menu-label">Duplicar</span>
            <span class="piece-ripple"></span>
        </li>
        <li class="piece-surface background-color-auto-04-hover text-color-auto-11 ripple-color-auto-11 piece-primary">
            <span class="material-symbols-rounded piece-menu-icon" translate="no">delete</span>
            <span class="piece-menu-label">Excluir</span>
            <span class="piece-ripple"></span>
        </li>
    </ul>
</div>`,

        textField: `
<div class="piece-text-field piece-notion piece-surface">
    <fieldset class="piece-field-outline piece-surface border-color-auto-08 border-color-auto-16-hover">
        <legend><span>Título</span></legend>
        <div class="piece-field-container">
            <input type="text" placeholder="" required>
            <span class="piece-label text-color-auto-12">Título</span>
        </div>
    </fieldset>
</div>`,

        checkbox: `
<label class="piece-checkbox piece-notion piece-small piece-surface
              background-color-auto-00 background-color-auto-04-hover
              background-color-auto-11-active
              text-color-auto-18 text-color-auto-00-active
              ripple-color-auto-18 piece-primary">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check_box</span>
    <input type="checkbox" class="piece-controller">
</label>`,
    }
}
