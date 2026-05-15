module.exports = {
    id: "css-generator",
    name: "CSS Generator",
    file: "piece-css-generator.js",
    description: "Script obrigatório que gera dinamicamente o CSS das classes de cor, alpha e blur do pieces. Sem ele nenhuma classe como background-color-auto-11, text-color-auto-18 ou piece-blur-04 funciona.",

    howItWorks: `
O pieces NÃO usa CSS pré-compilado para as classes de cor — ele gera sob demanda via JS.

1. No carregamento da página, o script faz um scan de todos os elementos (querySelectorAll('*'))
2. Para cada classe encontrada que corresponde ao padrão de cor/alpha/blur, gera o CSS correspondente
3. Injeta o CSS num <style id="dynamic-styles"> no <head>
4. Um MutationObserver monitora alterações no DOM e classes adicionadas dinamicamente

Isso significa que só é gerado CSS para as classes que realmente existem no HTML —
nenhum CSS desnecessário é carregado.`,

    classPatterns: {
        "background-color-auto-08":    "Cor: {property}-color-{theme}-{token}",
        "text-color-inverse-12":       "Cor: propriedade-color-tema-token",
        "piece-background-alpha-06":   "Alpha: piece-{property}-alpha-{token}",
        "piece-blur-04":               "Blur: piece-blur-{token}",
    },

    tokenResolution: `
Token → valor CSS:
- token numérico (ex: 08) → valor = token × 4 = 32%
- theme auto    → calc(var(--piece-theme) var(--piece-theme-operator) 32%)
- theme inverse → calc(var(--piece-theme-inverse) var(--piece-theme-operator-inverse) 32%)
- theme light   → 100% - 32% = 68% (fixo)
- theme dark    → 32% (fixo)

Alpha:
- token × 4 / 100 = valor decimal (ex: 06 → 0.24)

Blur:
- token × 2 = px (ex: 04 → 8px, backdrop-filter: blur(8px))`,

    suffixes: `
As classes suportam sufixos de estado gerados automaticamente:
- background-color-auto-08          → sempre ativo
- background-color-auto-08-hover    → ativo no :hover
- background-color-auto-08-active   → ativo quando piece-actived ou input:checked
- background-color-auto-08-hover-active → ativo no hover quando actived/checked
- background-color-auto-08-loading  → ativo quando .piece-loading-controller está ativo`,

    supportedProperties: [
        "background",
        "text",
        "border",
        "box-shadow",
        "ripple",
        "scrollbar-track-outline",
        "scrollbar-thumb-background",
        "scrollbar-thumb-border",
    ],

    installation: `
OBRIGATÓRIO em todo projeto que usa o pieces.

<!-- No <head>, após o pieces.css -->
<script src="src/js/pieces/piece-css-generator.js"></script>

Ou no final do <body> antes do fechamento </body>.
Deve ser carregado ANTES de qualquer interação do usuário para evitar flash sem estilo.`,

    notes: [
        "É o arquivo mais importante do pieces — sem ele o sistema de cores não funciona",
        "Gera CSS só para classes que existem no HTML — eficiente e sem desperdício",
        "O MutationObserver garante que elementos adicionados via JS também tenham o CSS gerado",
        "Suporta classes com sufixos de estado: -hover, -active, -hover-active, -loading",
        "Token não numérico (ex: background-color-auto-primary) → usa como CSS var: var(--primary)",
        "O <style id='dynamic-styles'> pode ser inspecionado no DevTools para ver o CSS gerado",
    ],
}
