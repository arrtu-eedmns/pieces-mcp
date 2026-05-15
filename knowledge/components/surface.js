module.exports = {
    id: "surface",
    name: "Surface",
    file: "surface.css",
    description: "Base de todos os componentes. Define o sistema de cor, alpha e blur para o elemento e seus filhos.",

    structure: `
<!-- Surface pode ser qualquer elemento HTML -->
<div class="piece-surface {palette} {theme}
            {background-color} {text-color}
            [{piece-border} {border-color}]
            [{piece-blur}]
            [{piece-background-alpha}]">
    <!-- filhos com piece-surface herdam e resetam as vars automaticamente -->
</div>`,

    requiredClasses: ["piece-surface"],

    howItWorks: `
1. .piece-surface define variáveis CSS para background, text, border, ripple, blur
2. background e color são aplicados automaticamente via hsla() usando essas vars
3. Classes como background-color-auto-11 apenas mudam o valor de --piece-background-color
4. O HUE vem de piece-primary/secondary/tertiary (que setam --piece-h)
5. Cada .piece-surface filho reseta as vars — não herda do pai, cria nova camada
`,

    layeringPattern: `
<!-- Camadas de superfície — cada nível é independente -->
<div class="piece-surface background-color-auto-02">  <!-- nível 0: fundo da página -->
    <div class="piece-surface background-color-auto-04">  <!-- nível 1: card -->
        <div class="piece-surface background-color-auto-06">  <!-- nível 2: input -->
        </div>
    </div>
</div>`,

    examples: {
        card: `
<div class="piece-surface background-color-auto-04
            piece-border border-color-auto-06
            text-color-auto-21"
     style="border-radius:16px; padding:16px;">
    Conteúdo do card
</div>`,

        glassPanel: `
<div class="piece-surface background-color-auto-00
            piece-background-alpha-08
            piece-blur-08
            piece-border piece-border-alpha-06 border-color-auto-00
            text-color-auto-21"
     style="border-radius:20px; padding:20px;">
    Painel com efeito vidro
</div>`,

        accentSection: `
<!-- piece-primary muda o HUE — background-color-auto-11 usa esse HUE -->
<div class="piece-surface piece-primary
            background-color-auto-11
            text-color-auto-00"
     style="border-radius:12px; padding:16px;">
    Seção destacada com cor primária
</div>`,
    }
}
