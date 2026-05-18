module.exports = {
    id: "group-button",
    name: "Group Button",
    file: "group-button.css",
    description: "Container que agrupa piece-button em seleção exclusiva (radio) ou múltipla (checkbox). Itens nas pontas têm border-radius pill; item ativo fica totalmente arredondado.",

    structure: `
<!-- Container -->
<div class="piece-group-button">

    <!-- Cada item é piece-button com a tag correta conforme o caso de uso -->

    <!-- Com radio → <label> obrigatório -->
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="grupo" class="piece-controller" checked>
        <span class="material-symbols-rounded piece-icon" translate="no">view_list</span>
        <span class="piece-label">Lista</span>
        <span class="piece-ripple"></span>
    </label>

    <!-- Com JS (piece-actived) → qualquer tag semântica -->
    <button class="piece-button piece-small piece-surface
                   background-color-auto-04 background-color-auto-11-active
                   text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <span class="material-symbols-rounded piece-icon" translate="no">grid_view</span>
        <span class="piece-label">Grade</span>
        <span class="piece-ripple"></span>
    </button>

</div>`,

    requiredClasses: ["piece-group-button"],

    howItWorks: `
1. .piece-group-button é um inline-flex com gap de 2px
2. Cada filho direto deve ser um .piece-button
3. O border-radius dos itens é animado via transition: border-radius 0.15s ease
4. Primeiro item: pill à esquerda, quadrado à direita
5. Último item: quadrado à esquerda, pill à direita
6. Item ativo (:has(input:checked) ou .piece-actived): totalmente pill
7. Itens do meio: border-radius pequeno (--round)`,

    tagRules: `
A tag do item segue a semântica HTML — não é uma regra do pieces:

── input[type=radio] ou input[type=checkbox] ──────────────────────────────────
Usar <label>. O input fica display:none via piece-controller.
O <label> ativa/desativa o input nativamente ao clicar.

── Controlado via JS (piece-actived) ──────────────────────────────────────────
Qualquer tag funciona — fica a critério de quem usa conforme o contexto:
  • <button>  — ação clicável, melhor para acessibilidade geral
  • <a>       — navegação / link
  • <div>     — neutro, sem semântica
  • <span>    — inline, sem semântica
  • etc.`,

    contentModes: `
── Só ícone ───────────────────────────────────────────────────────────────────
<label class="piece-button piece-small piece-surface ...">
    <input type="radio" name="g" class="piece-controller">
    <span class="material-symbols-rounded piece-icon" translate="no">view_list</span>
    <span class="piece-ripple"></span>
</label>

── Ícone + texto ───────────────────────────────────────────────────────────────
<label class="piece-button piece-small piece-surface ...">
    <input type="radio" name="g" class="piece-controller">
    <span class="material-symbols-rounded piece-icon" translate="no">view_list</span>
    <span class="piece-label">Lista</span>
    <span class="piece-ripple"></span>
</label>

── Só texto ────────────────────────────────────────────────────────────────────
<label class="piece-button piece-small piece-surface ...">
    <input type="radio" name="g" class="piece-controller">
    <span class="piece-label">Lista</span>
    <span class="piece-ripple"></span>
</label>`,

    selectionTypes: `
── Single select (radio) ───────────────────────────────────────────────────────
input[type=radio] com mesmo name. Apenas um item ativo por vez.
Tag: <label>

── Multi select (checkbox) ─────────────────────────────────────────────────────
input[type=checkbox]. Múltiplos itens podem estar ativos simultaneamente.
Tag: <label>

── JS (piece-actived) ──────────────────────────────────────────────────────────
Toggle via classList.toggle('piece-actived'). Sem input.
Tag: qualquer elemento HTML semântico`,

    notes: [
        "Só funciona com piece-button — não existe group para piece-icon-button",
        "Todos os itens do grupo devem ter o mesmo tamanho (piece-small, piece-medium, etc.)",
        "O item ativo usa :has(input:checked) ou .piece-actived — ambos funcionam",
        "Não adicionar border-radius nos itens — o CSS do grupo controla tudo via --round e --fully-round",
        "piece-primary/secondary/tertiary vai no container pai ou body, não em cada item",
        "O gap entre itens é 2px fixo via --gap",
        "Ao usar radio: todos os <label> do grupo devem ter o mesmo name no input para exclusividade funcionar",
    ],

    examples: {
        iconOnly: `
<!-- Single select — só ícone -->
<div class="piece-group-button">
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view-icon" class="piece-controller" checked>
        <span class="material-symbols-rounded piece-icon" translate="no">view_list</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view-icon" class="piece-controller">
        <span class="material-symbols-rounded piece-icon" translate="no">grid_view</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view-icon" class="piece-controller">
        <span class="material-symbols-rounded piece-icon" translate="no">calendar_month</span>
        <span class="piece-ripple"></span>
    </label>
</div>`,

        iconAndText: `
<!-- Single select — ícone + texto -->
<div class="piece-group-button">
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view-full" class="piece-controller" checked>
        <span class="material-symbols-rounded piece-icon" translate="no">view_list</span>
        <span class="piece-label">Lista</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view-full" class="piece-controller">
        <span class="material-symbols-rounded piece-icon" translate="no">grid_view</span>
        <span class="piece-label">Grade</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="view-full" class="piece-controller">
        <span class="material-symbols-rounded piece-icon" translate="no">calendar_month</span>
        <span class="piece-label">Calendário</span>
        <span class="piece-ripple"></span>
    </label>
</div>`,

        textOnly: `
<!-- Single select — só texto -->
<div class="piece-group-button">
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="period" class="piece-controller" checked>
        <span class="piece-label">Dia</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="period" class="piece-controller">
        <span class="piece-label">Semana</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="radio" name="period" class="piece-controller">
        <span class="piece-label">Mês</span>
        <span class="piece-ripple"></span>
    </label>
</div>`,

        multiSelect: `
<!-- Multi select — checkbox — ícone + texto -->
<div class="piece-group-button">
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="checkbox" class="piece-controller" checked>
        <span class="material-symbols-rounded piece-icon" translate="no">format_bold</span>
        <span class="piece-label">Negrito</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="checkbox" class="piece-controller">
        <span class="material-symbols-rounded piece-icon" translate="no">format_italic</span>
        <span class="piece-label">Itálico</span>
        <span class="piece-ripple"></span>
    </label>
    <label class="piece-button piece-small piece-surface
                  background-color-auto-04 background-color-auto-11-active
                  text-color-auto-16 text-color-auto-00-active ripple-color-auto-16">
        <input type="checkbox" class="piece-controller">
        <span class="material-symbols-rounded piece-icon" translate="no">format_underlined</span>
        <span class="piece-label">Sublinhado</span>
        <span class="piece-ripple"></span>
    </label>
</div>`,

        jsControlled: `
<!-- JS (piece-actived) — botões semânticos -->
<div class="piece-group-button">
    <button class="piece-button piece-small piece-surface piece-actived
                   background-color-auto-04 background-color-auto-11-active
                   text-color-auto-16 text-color-auto-00-active ripple-color-auto-16"
            onclick="groupToggle(this)">
        <span class="material-symbols-rounded piece-icon" translate="no">view_list</span>
        <span class="piece-label">Lista</span>
        <span class="piece-ripple"></span>
    </button>
    <button class="piece-button piece-small piece-surface
                   background-color-auto-04 background-color-auto-11-active
                   text-color-auto-16 text-color-auto-00-active ripple-color-auto-16"
            onclick="groupToggle(this)">
        <span class="material-symbols-rounded piece-icon" translate="no">grid_view</span>
        <span class="piece-label">Grade</span>
        <span class="piece-ripple"></span>
    </button>
</div>`,
    }
}
