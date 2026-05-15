module.exports = {
    id: "button",
    name: "Button",
    file: "button.css",
    description: "Botão interativo com ripple. Suporta ícone, label, toggle e variantes de tamanho e estilo. Para botões só com ícone use piece-icon-button.",

    structure: `
<button class="piece-button {size} piece-surface
               {background} {background-hover}
               {text-color} {ripple-color}
               {palette}">
    <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>  <!-- opcional -->
    <span class="piece-label">{texto}</span>
    <span class="piece-ripple"></span>
</button>`,

    requiredClasses: ["piece-button", "piece-surface"],

    sizes: {
        "piece-extra-small": "32px altura — label 14px, ícone 20px, padding 12px",
        "piece-small":       "40px altura — label 14px, ícone 24px, padding 16px",
        "piece-medium":      "56px altura — label 16px, ícone 24px, padding 24px (padrão recomendado)",
        "piece-large":       "96px altura — label 24px, ícone 32px, padding 48px",
        "piece-extra-large": "136px altura — label 32px, ícone 40px, padding 64px",
    },

    variants: {
        filled: {
            description: "Fundo colorido — ação principal",
            example: `class="piece-button piece-medium piece-surface
                           background-color-auto-11 background-color-auto-12-hover
                           text-color-auto-00 ripple-color-auto-00
                           piece-primary"`
        },
        tonal: {
            description: "Fundo levemente colorido — ação secundária",
            example: `class="piece-button piece-medium piece-surface
                           background-color-auto-06 background-color-auto-07-hover
                           text-color-auto-18 ripple-color-auto-18
                           piece-secondary"`
        },
        text: {
            description: "Sem fundo — ação terciária/inline. Adicionar classe piece-text.",
            example: `class="piece-button piece-medium piece-surface piece-text
                           text-color-auto-18 ripple-color-auto-18
                           piece-secondary"`
        },
        outlined: {
            description: "Com borda, sem fundo. Adicionar classe piece-outlined.",
            example: `class="piece-button piece-medium piece-surface piece-outlined
                           border-color-auto-08
                           text-color-auto-18 ripple-color-auto-18
                           piece-secondary"`
        },
        elevated: {
            description: "Com sombra. Adicionar classe piece-elevated.",
            example: `class="piece-button piece-medium piece-surface piece-elevated
                           background-color-auto-04 background-color-auto-06-hover
                           text-color-auto-20 ripple-color-auto-00
                           box-shadow-color-auto-00
                           piece-primary"`
        },
    },

    modifiers: {
        "piece-disabled":  "Desabilitado — usar como classe, não atributo HTML disabled",
        "piece-text":      "Remove fundo quando não hover",
        "piece-outlined":  "Borda 1px solid, fundo transparente quando não hover",
        "piece-elevated":  "Adiciona box-shadow",
        "piece-actived":   "Estado ativo manual via JS — ativa classes -active",
    },

    toggleBehavior: `
O piece-button suporta toggle nativo via input[type=checkbox] ou input[type=radio] oculto.
OBRIGATÓRIO: usar <label> como raiz quando há piece-controller — o input fica display:none
e sem <label> o clique nunca chega ao input.

<label class="piece-button piece-medium piece-surface ...">
    <input type="checkbox" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">favorite_border</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">favorite</span>
    <span class="piece-label piece-false">Curtir</span>
    <span class="piece-label piece-true">Curtido</span>
    <span class="piece-ripple"></span>
</label>

- piece-false: visível quando NÃO checado
- piece-true:  visível quando checado
- Ícone ativo recebe FILL automático via font-variation-settings
- piece-label também suporta piece-false/piece-true para trocar o texto`,

    groupButton: `
piece-group-button agrupa botões com bordas adaptadas automaticamente:

<div class="piece-group-button">
    <button class="piece-button piece-small piece-surface ...">...</button>
    <button class="piece-button piece-small piece-surface ...">...</button>
    <button class="piece-button piece-small piece-surface ...">...</button>
</div>

- Primeiro botão: arredondado esquerda
- Último botão: arredondado direita
- Botões do meio: levemente arredondados
- Botão ativo (checked/piece-actived): totalmente arredondado`,

    notes: [
        "Sempre inclua piece-ripple como último filho",
        "piece-icon é opcional — se presente, fica antes do piece-label",
        "piece-primary/secondary/tertiary devem estar no body ou container pai — NÃO repetir em cada botão",
        "Só adicione piece-secondary/tertiary num botão específico para sobrescrever o papel de cor local",
        "background-color-auto-11 usa o HUE herdado do ancestral — tom de destaque",
        "Para botão só com ícone, use piece-icon-button (não piece-button)",
        "piece-s-40 NÃO é necessário no button — o tamanho vem das classes de size",
    ],

    examples: {
        primaryFilled: `
<!-- piece-primary está no body — herda automaticamente -->
<button class="piece-button piece-medium piece-surface
               background-color-auto-11 background-color-auto-12-hover
               text-color-auto-00 ripple-color-auto-00">
    <span class="material-symbols-rounded piece-icon" translate="no">save</span>
    <span class="piece-label">Salvar</span>
    <span class="piece-ripple"></span>
</button>`,

        secondaryTonal: `
<!-- piece-secondary aqui sobrescreve o HUE só neste botão -->
<button class="piece-button piece-small piece-surface piece-secondary
               background-color-auto-06 background-color-auto-07-hover
               text-color-auto-18 ripple-color-auto-18">
    <span class="piece-label">Cancelar</span>
    <span class="piece-ripple"></span>
</button>`,

        textButton: `
<button class="piece-button piece-medium piece-surface piece-text
               text-color-auto-18 ripple-color-auto-18">
    <span class="piece-label">Ver mais</span>
    <span class="piece-ripple"></span>
</button>`,

        toggleButton: `
<!-- <label> obrigatório — input fica display:none -->
<label class="piece-button piece-small piece-surface
              background-color-auto-04 background-color-auto-06-hover
              background-color-auto-11-active background-color-auto-12-active-hover
              text-color-auto-16 text-color-auto-00-active
              ripple-color-auto-16">
    <input type="checkbox" class="piece-controller">
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">favorite_border</span>
    <span class="material-symbols-rounded piece-icon piece-true"  translate="no">favorite</span>
    <span class="piece-label piece-false">Curtir</span>
    <span class="piece-label piece-true">Curtido</span>
    <span class="piece-ripple"></span>
</label>`,

        groupButton: `
<!-- Cada item é <label> para que o radio funcione nativamente -->
<div class="piece-group-button">
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view" class="piece-controller" checked>
        <span class="material-symbols-rounded piece-icon" translate="no">view_list</span>
        <span class="piece-label">Lista</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view" class="piece-controller">
        <span class="material-symbols-rounded piece-icon" translate="no">grid_view</span>
        <span class="piece-label">Grade</span>
        <span class="piece-ripple"></span>
    </label>
</div>`,
    }
}
