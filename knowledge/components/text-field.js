module.exports = {
    id: "text-field",
    name: "Text Field",
    file: "text-field.css",
    description: "Campo de texto outlined com label flutuante, suporte a ícones leading/trailing, prefix/suffix e texto de suporte. O label sobe quando o campo está em foco ou preenchido.",

    structure: `
<div class="piece-text-field {size} piece-surface">

    <fieldset class="piece-field-outline piece-surface border-color-auto-08">

        <legend><span>{label}</span></legend>

        <div class="piece-field-container">
            <!-- ícone leading — opcional -->
            <span class="material-symbols-rounded piece-icon-leading text-color-auto-14" translate="no">{icon}</span>

            <!-- prefix — opcional, aparece só quando focado/preenchido -->
            <span class="piece-field-prefix text-color-auto-14">R$</span>

            <input type="text" placeholder="" required>

            <!-- suffix — opcional -->
            <span class="piece-field-suffix text-color-auto-14">kg</span>

            <!-- label flutuante -->
            <span class="piece-label text-color-auto-14">{label}</span>

            <!-- ícone trailing ou icon-button — opcional -->
            <button class="piece-icon-button piece-extra-small piece-surface ...">...</button>
        </div>

    </fieldset>

    <!-- texto de suporte — opcional -->
    <div class="piece-field-support">
        <span class="text-color-auto-14">{suporte}</span>
        <span class="text-color-auto-14">{contador}</span>
    </div>

</div>`,

    requiredClasses: ["piece-text-field", "piece-surface"],

    sizes: {
        "piece-extra-small": "Container 40px altura",
        "piece-small":       "Container 46px altura",
        "(sem modificador)": "Container 56px altura (padrão)",
        "piece-medium":      "Container 52px altura",
        "piece-large":       "Container 58px altura",
        "piece-extra-large": "Container 64px altura",
    },

    howItWorks: `
O label flutua para cima quando:
- O campo está em foco (:focus-within)
- O input está preenchido (input:valid — requer atributo 'required' no input)

O legend abre um espaço na borda para o label flutuante — funciona com border-style: solid.
O prefix/suffix aparecem com opacity:1 apenas quando focado/preenchido.

Se há ícone leading, o label inicia deslocado (left: 48px) para não sobrepor o ícone.`,

    notes: [
        "O input deve ter o atributo 'required' para o label flutuar ao preencher",
        "Use placeholder='' (vazio) para não conflitar com o label flutuante",
        "O fieldset precisa de border-color via classe do pieces (ex: border-color-auto-08)",
        "piece-icon-button dentro do container usa margin-right: -8px automático",
        "piece-field-support usa display:flex justify-content:space-between — esquerda: suporte, direita: contador",
    ],

    examples: {
        simple: `
<div class="piece-text-field piece-surface">
    <fieldset class="piece-field-outline piece-surface border-color-auto-08 border-color-auto-18-hover">
        <legend><span>Nome</span></legend>
        <div class="piece-field-container">
            <input type="text" placeholder="" required>
            <span class="piece-label text-color-auto-14">Nome</span>
        </div>
    </fieldset>
</div>`,

        withIcon: `
<div class="piece-text-field piece-surface">
    <fieldset class="piece-field-outline piece-surface border-color-auto-08 border-color-auto-18-hover">
        <legend><span>Buscar</span></legend>
        <div class="piece-field-container">
            <span class="material-symbols-rounded piece-icon-leading text-color-auto-14" translate="no">search</span>
            <input type="text" placeholder="" required>
            <span class="piece-label text-color-auto-14">Buscar</span>
        </div>
    </fieldset>
</div>`,

        withSupport: `
<div class="piece-text-field piece-surface">
    <fieldset class="piece-field-outline piece-surface border-color-auto-08">
        <legend><span>Email</span></legend>
        <div class="piece-field-container">
            <input type="email" placeholder="" required>
            <span class="piece-label text-color-auto-14">Email</span>
        </div>
    </fieldset>
    <div class="piece-field-support">
        <span class="text-color-auto-14">Digite seu email corporativo</span>
    </div>
</div>`,
    }
}
