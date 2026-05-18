module.exports = {
    id: "split-button",
    name: "Split Button",
    file: "split-button.css",
    description: "Botão dividido em duas partes: ação principal (leading) e seta/menu (trailing). O trailing abre um menu ao ser clicado e rotaciona o ícone 180°.",

    structure: `
<div class="piece-split-button {size} piece-interactive">

    <!-- Parte principal — ícone é opcional -->
    <div class="piece-leading-button piece-surface {background} {background-hover} {text-color} {ripple-color}">
        <!-- opcional: <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span> -->
        <span class="piece-label">{texto}</span>
        <span class="piece-ripple"></span>
    </div>

    <!-- Parte seta/menu -->
    <div class="piece-trailing-button piece-surface {background} {background-hover} {text-color} {ripple-color}"
         onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
        <span class="piece-ripple"></span>
    </div>

    <!-- Menu dropdown -->
    <div class="piece-menu piece-surface background-color-auto-00">
        <ul>
            <li class="piece-surface background-color-auto-04-hover text-color-auto-18 ripple-color-auto-18">
                <span class="piece-menu-label">Opção 1</span>
                <span class="piece-ripple"></span>
            </li>
        </ul>
    </div>

</div>`,

    requiredClasses: ["piece-split-button"],

    howItWorks: `
- Quando .piece-actived está no container, o ícone do trailing rotaciona 180° (seta vira para cima)
- O menu .piece-menu dentro do .piece-interactive abre automaticamente via menu.css
- O leading e trailing são elementos separados com border-radius assimétrico
- No estado ativo, o trailing fica completamente arredondado`,

    contentModes: `
O leading suporta 3 modos de conteúdo — o piece-icon é opcional:

── Só ícone ────────────────────────────────────────────────────────────────────
<div class="piece-leading-button piece-surface ...">
    <span class="material-symbols-rounded piece-icon" translate="no">save</span>
    <span class="piece-ripple"></span>
</div>

── Ícone + texto ────────────────────────────────────────────────────────────────
<div class="piece-leading-button piece-surface ...">
    <span class="material-symbols-rounded piece-icon" translate="no">save</span>
    <span class="piece-label">Salvar</span>
    <span class="piece-ripple"></span>
</div>

── Só texto ─────────────────────────────────────────────────────────────────────
<div class="piece-leading-button piece-surface ...">
    <span class="piece-label">Salvar</span>
    <span class="piece-ripple"></span>
</div>`,

    iconNotes: `
── translate="no" ──────────────────────────────────────────────────────────────
Todo piece-icon usa translate="no" para evitar que tradutores automáticos (ex: Google Translate)
traduzam o nome do ícone e quebrem a exibição do Material Symbol:

<span class="material-symbols-rounded piece-icon" translate="no">save</span>

── piece-false / piece-true ────────────────────────────────────────────────────
piece-icon pode receber piece-false ou piece-true para alternar ícones por estado
sem precisar de JS:

  Sem piece-false/piece-true → ícone sempre visível
  piece-false                → visível apenas no estado inativo
  piece-true                 → visível apenas no estado ativo (:checked / .piece-actived)

Exemplo — leading que troca ícone ao ativar:
<div class="piece-leading-button piece-surface ...">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">save</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">check</span>
    <span class="piece-label">Salvar</span>
    <span class="piece-ripple"></span>
</div>`,

    sizes: {
        "piece-extra-small": "32px altura",
        "piece-small":       "40px altura",
        "piece-medium":      "56px altura (padrão recomendado)",
        "piece-large":       "96px altura",
        "piece-extra-large": "136px altura",
    },

    modifiers: {
        "piece-elevated": "Adiciona box-shadow em ambas as partes",
    },

    notes: [
        "piece-interactive no container é obrigatório para o menu funcionar",
        "O trailing deve sempre usar keyboard_arrow_down — o CSS rotaciona 180° ao abrir",
        "Leading e trailing devem ter as mesmas classes de cor para visual coeso",
        "piece-icon deve sempre ter translate=\"no\" para não quebrar em páginas traduzidas",
        "Use piece-false/piece-true no piece-icon para trocar ícones por estado sem JS",
        "O menu usa position:fixed via interactive.js — escapa de overflow:hidden",
    ],

    examples: {
        iconAndText: `
<div class="piece-split-button piece-medium piece-interactive">

    <div class="piece-leading-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00">
        <span class="material-symbols-rounded piece-icon" translate="no">save</span>
        <span class="piece-label">Salvar</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-trailing-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00"
         onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-menu piece-surface background-color-auto-00">
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

        iconOnly: `
<div class="piece-split-button piece-medium piece-interactive">

    <div class="piece-leading-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00">
        <span class="material-symbols-rounded piece-icon" translate="no">save</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-trailing-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00"
         onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-menu piece-surface background-color-auto-00">
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

        textOnly: `
<div class="piece-split-button piece-medium piece-interactive">

    <div class="piece-leading-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00">
        <span class="piece-label">Salvar</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-trailing-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00 ripple-color-auto-00"
         onclick="this.closest('.piece-interactive').classList.toggle('piece-actived')">
        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
        <span class="piece-ripple"></span>
    </div>

    <div class="piece-menu piece-surface background-color-auto-00">
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

        sizes: `
<!-- Referência de tamanhos — mesmo padrão para todos -->
<div class="piece-split-button piece-extra-small piece-interactive"> ... </div>
<div class="piece-split-button piece-small       piece-interactive"> ... </div>
<div class="piece-split-button piece-medium      piece-interactive"> ... </div>
<div class="piece-split-button piece-large       piece-interactive"> ... </div>
<div class="piece-split-button piece-extra-large piece-interactive"> ... </div>`,
    }
}
