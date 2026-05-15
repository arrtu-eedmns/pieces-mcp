module.exports = {
    id: "split-button",
    name: "Split Button",
    file: "split-button.css",
    description: "Botão dividido em duas partes: ação principal (leading) e seta/menu (trailing). O trailing abre um menu ao ser clicado e rotaciona o ícone 180°.",

    structure: `
<div class="piece-split-button {size} piece-interactive piece-surface">

    <!-- Parte principal -->
    <div class="piece-leading-button piece-surface {background} {background-hover} {text-color} {ripple-color}">
        <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>
        <span class="piece-label">{texto}</span>
        <span class="piece-ripple"></span>
    </div>

    <!-- Parte seta/menu -->
    <div class="piece-trailing-button piece-surface {background} {background-hover} {text-color} {ripple-color}"
         onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
        <span class="piece-ripple"></span>
    </div>

    <!-- Menu dropdown — opcional -->
    <div class="piece-menu piece-surface background-color-auto-02">
        <ul>
            <li class="piece-surface background-color-auto-04-hover text-color-auto-18 ripple-color-auto-18">
                <span class="piece-menu-label">Opção 1</span>
                <span class="piece-ripple"></span>
            </li>
        </ul>
    </div>

</div>`,

    requiredClasses: ["piece-split-button"],

    sizes: {
        "piece-extra-small": "32px altura — leading padding 0 10px 0 12px, trailing 0 14px 0 12px",
        "piece-small":       "40px altura — leading padding 0 12px 0 16px",
        "piece-medium":      "56px altura — leading padding 0 24px (padrão)",
        "piece-large":       "96px altura — leading padding 0 48px",
        "piece-extra-large": "136px altura — leading padding 0 64px",
    },

    modifiers: {
        "piece-elevated": "Adiciona box-shadow em ambas as partes",
    },

    howItWorks: `
- Quando .piece-actived está no container, o ícone do trailing rotaciona 180° (seta vira para cima)
- O menu .piece-menu dentro do .piece-interactive abre automaticamente via menu.css
- O leading e trailing são elementos separados com border-radius assimétrico
- No estado ativo, o trailing fica completamente arredondado`,

    notes: [
        "Use piece-interactive no container para integração com o menu",
        "O ícone do trailing deve ser keyboard_arrow_down para a rotação fazer sentido",
        "As cores do leading e trailing devem ser iguais para visual coeso",
        "O menu é opcional — o split-button pode funcionar sem menu (só como botão dividido)",
    ],

    examples: {
        withMenu: `
<div class="piece-split-button piece-medium piece-interactive">

    <div class="piece-leading-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00 piece-primary">
        <span class="material-symbols-rounded piece-icon" translate="no">save</span>
        <span class="piece-label">Salvar</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-trailing-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00 piece-primary"
         onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-menu piece-surface background-color-auto-02">
        <ul>
            <li class="piece-surface background-color-auto-04-hover text-color-auto-18 ripple-color-auto-18">
                <span class="piece-menu-label">Salvar como...</span>
                <span class="piece-ripple"></span>
            </li>
            <li class="piece-surface background-color-auto-04-hover text-color-auto-18 ripple-color-auto-18">
                <span class="piece-menu-label">Salvar cópia</span>
                <span class="piece-ripple"></span>
            </li>
        </ul>
    </div>

</div>`,
    }
}
