module.exports = {
    id: "textarea",
    name: "Textarea",
    file: "textarea.css",
    description: "Campo de texto multilinha. Border-radius 16px, borda 1px que aumenta para 2px no foco.",

    structure: `
<div class="piece-textarea piece-surface">
    <div class="piece-surface border-color-auto-08">
        <!-- header opcional — aparece acima via order:-1 -->
        <div class="piece-surface background-color-auto-02 text-color-auto-14">
            {header}
        </div>
        <textarea placeholder="{placeholder}" rows="4"></textarea>
    </div>
</div>`,

    requiredClasses: ["piece-textarea", "piece-surface"],

    howItWorks: `
- Wrapper externo: .piece-textarea (display:grid)
- Wrapper interno (primeiro filho): border-radius 16px, border 1px
- Ao focar: border aumenta para 2px, padding do textarea reduz 1px para compensar
- O segundo filho do wrapper interno usa order:-1 — aparece acima do textarea
- O textarea tem resize:none, padding 17px (16px quando focado)`,

    notes: [
        "Não tem variantes de tamanho — controle a altura via rows ou height CSS",
        "O header (order:-1) pode conter toolbar, título ou qualquer elemento",
        "Use border-color-auto-08 no wrapper interno para a borda",
        "Padding 17px OFF / 16px ON foco — compensa o aumento da borda",
    ],

    examples: {
        simple: `
<div class="piece-textarea piece-surface">
    <div class="piece-surface border-color-auto-08">
        <textarea placeholder="Escreva aqui..." rows="4"></textarea>
    </div>
</div>`,

        withHeader: `
<div class="piece-textarea piece-surface">
    <div class="piece-surface border-color-auto-08">
        <div class="piece-surface background-color-auto-02 text-color-auto-14"
             style="padding: 8px 16px; font-size: 12px; font-weight: 500; border-radius: 14px 14px 0 0">
            Descrição
        </div>
        <textarea placeholder="Escreva a descrição..." rows="6"></textarea>
    </div>
</div>`,
    }
}
