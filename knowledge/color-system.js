// ─── Pieces — Sistema de Cores ───────────────────────────────────────────────
// Este é o CORAÇÃO do pieces. Todos os componentes dependem deste sistema.
// É agnóstico de estilo — funciona com MD3, Apple, Notion, qualquer visual.

module.exports = {

    overview: `
O pieces usa um sistema de cores baseado em HSL com tokens numéricos.
A classe .piece-surface é a base de TUDO — ela propaga variáveis CSS para
background, text, border, ripple, blur e scrollbar de forma encadeada.
Cada elemento filho que também for .piece-surface reseta os tokens
automaticamente, criando uma hierarquia de superfícies independentes.
`,

    theme: {
        description: `
OBRIGATÓRIO: piece-light ou piece-dark deve estar no elemento raiz (body ou html).
Sem um deles, as variáveis --piece-theme e --piece-theme-operator ficam indefinidas
e NENHUMA classe de cor funciona — tudo fica transparente/sem cor.`,

        classes: {
            "piece-light": "Tema claro — token 00 = branco, token 25 = preto. Adicionar no <body> ou <html>.",
            "piece-dark":  "Tema escuro — token 00 = preto, token 25 = branco. Adicionar no <body> ou <html>.",
        },

        howItWorks: `
piece-light define:
  --piece-theme: 100%               ← base de cálculo para tokens auto
  --piece-theme-inverse: 0%
  --piece-theme-operator: -         ← subtrai o token (claro fica mais escuro conforme token sobe)
  --piece-theme-operator-inverse: +

piece-dark define:
  --piece-theme: 0%
  --piece-theme-inverse: 100%
  --piece-theme-operator: +         ← soma o token (escuro fica mais claro conforme token sobe)
  --piece-theme-operator-inverse: -

Exemplo com background-color-auto-04 (token 04 = 16%):
  piece-light → calc(100% - 16%) = 84% lightness  (quase branco)
  piece-dark  → calc(0%   + 16%) = 16% lightness  (quase preto)`,

        usage: `
<!-- Tema claro fixo -->
<body class="piece-light">

<!-- Tema escuro fixo -->
<body class="piece-dark">

<!-- Trocar tema via JS -->
document.body.classList.toggle('piece-light')
document.body.classList.toggle('piece-dark')

<!-- Seguir preferência do sistema -->
const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
document.body.classList.add(dark ? 'piece-dark' : 'piece-light')`,

        notes: [
            "Sem piece-light ou piece-dark no body, NENHUMA cor funciona",
            "Pode ser aplicado em qualquer container, não só no body — cria um sub-tema",
            "piece-light e piece-dark podem coexistir em elementos diferentes na mesma página",
            "O tema escuro NO CSS do pieces usa MPSO como classe no html (legado) — piece-dark é o correto",
        ]
    },

    surface: {
        description: "Classe base obrigatória. Propaga todas as variáveis de cor, alpha e blur.",
        required: true,
        cssVars: {
            "--piece-h":              "HUE atual da superfície (herdado de piece-primary/secondary/tertiary)",
            "--piece-s":              "Saturação (herdado do tema)",
            "--piece-background-a":   "Alpha do background (0–1)",
            "--piece-text-a":         "Alpha do texto",
            "--piece-border-a":       "Alpha da borda",
            "--piece-ripple-a":       "Alpha do ripple",
            "--piece-blur":           "px de backdrop-filter blur",
        },
        modifiers: {
            "piece-border":    "Ativa border: 1px solid com a cor de borda configurada",
            "piece-box-shadow":"Ativa box-shadow suave",
            "piece-disabled":  "Estado desabilitado — cinza, sem eventos",
            "piece-skeleton":  "Estado skeleton loading — pulsa opacidade",
            "bg-dot":          "Background com padrão de pontos (usado em áreas de preview/demo)",
        }
    },

    colorTokens: {
        description: `
Classes de cor seguem o padrão: {property}-color-{theme}-{token}

property: background | text | border | box-shadow | ripple |
          scrollbar-track-outline | scrollbar-thumb-background | scrollbar-thumb-border

theme:    auto    → adapta ao tema claro/escuro automaticamente
          inverse → inverso do auto (escuro no claro, claro no escuro)
          light   → sempre claro (ignora tema)
          dark    → sempre escuro (ignora tema)

token:    00–25 → mapeia para 0%–100% de lightness (token × 4 = %)
          00 = mais escuro/próximo do tema, 25 = mais claro/oposto
`,
        scale: {
            "00": "0%  — extremo (preto no light, branco no dark)",
            "02": "8%",
            "04": "16%",
            "06": "24%",
            "08": "32%",
            "10": "40%",
            "11": "44% — tom de destaque/acento primário",
            "12": "48%",
            "13": "52%",
            "14": "56%",
            "16": "64%",
            "18": "72%",
            "20": "80%",
            "21": "84% — tom principal de texto",
            "22": "88%",
            "25": "100% — extremo oposto",
        },
        commonPatterns: {
            "background-color-auto-02": "Fundo principal (quase neutro)",
            "background-color-auto-04": "Fundo levemente elevado",
            "background-color-auto-06": "Fundo de card/chip",
            "background-color-auto-08": "Fundo de input/toggle",
            "background-color-auto-11": "Fundo de destaque/ativo — usa HUE do piece-primary/secondary/tertiary",
            "background-color-auto-13": "Hover do destaque",
            "background-color-inverse-00": "Fundo invertido — máximo contraste (usado no toast/snackbar)",
            "text-color-auto-21":  "Texto principal",
            "text-color-auto-18":  "Texto secundário",
            "text-color-auto-14":  "Texto terciário/placeholder",
            "text-color-auto-00":  "Texto sobre fundo de destaque (branco no light, preto no dark)",
            "text-color-inverse-25": "Texto sobre fundo invertido",
            "border-color-auto-06": "Borda sutil",
            "border-color-auto-08": "Borda média",
        },
        suffixes: {
            "base":         "Sempre ativo",
            "-hover":       "Ativo no :hover",
            "-active":      "Ativo quando piece-actived ou piece-controller:checked",
            "-hover-active":"Ativo no hover quando também ativo",
            "-loading":     "Ativo durante piece-loading-controller",
        }
    },

    alphaTokens: {
        description: `
Controla a transparência de uma propriedade específica.
Padrão: piece-{property}-alpha-{token}

token: 00–25 → mapeia para 0.00–1.00 de alpha (token × 4 / 100)
`,
        examples: {
            "piece-background-alpha-11": "Background com alpha 0.44 (semi-transparente)",
            "piece-background-alpha-06": "Background com alpha 0.24",
            "piece-border-alpha-08":     "Borda com alpha 0.32",
            "piece-ripple-alpha-00":     "Ripple totalmente transparente",
        }
    },

    blurTokens: {
        description: `
Ativa backdrop-filter blur.
Padrão: piece-blur-{token}

token × 2 = px de blur
`,
        examples: {
            "piece-blur-04": "blur(8px)",
            "piece-blur-08": "blur(16px) — usado em painéis flutuantes",
            "piece-blur-12": "blur(24px)",
        }
    },

    themes: {
        description: "Aplicado na raiz (body, container ou componente individual)",
        classes: {
            "piece-light": "Tema claro — --piece-theme: 100%",
            "piece-dark":  "Tema escuro — --piece-theme: 0%",
        }
    },

    palettes: {
        description: `
Define como primary, secondary e tertiary são derivados do HUE principal.
Aplicado no container raiz junto com piece-light/piece-dark.
`,
        classes: {
            "piece-triade":      "Secondary = primary+120°, tertiary = primary+240° — paleta triádica",
            "piece-analoga":     "Secondary = primary+30°,  tertiary = primary+90°  — paleta análoga",
            "piece-complementar":"Secondary = primary+120°, tertiary = primary+150° — complementar",
            "piece-mono":        "Todos os três com o mesmo HUE — monocromático",
            "piece-art":         "Preset fixo: primary=270°, secondary=230°, tertiary=300°",
        }
    },

    colorRoles: {
        description: "Aplicado em um elemento para mudar o HUE ativo nele e em seus filhos",
        classes: {
            "piece-primary":   "--piece-h = --piece-primary   (HUE base)",
            "piece-secondary": "--piece-h = --piece-secondary (HUE base + offset da paleta)",
            "piece-tertiary":  "--piece-h = --piece-tertiary  (HUE base + offset maior)",
        }
    },

    sizing: {
        description: "Controla o tamanho mínimo de elementos interativos",
        classes: {
            "piece-s-40": "--piece-s: 40px — tamanho padrão de elementos touch",
            "piece-s-48": "--piece-s: 48px",
        }
    },

    states: {
        "piece-actived":  "Estado ativo — ativa classes -active e -hover-active",
        "piece-disabled": "Estado desabilitado (via .piece-surface)",
        "piece-controller": "Input/checkbox/radio que controla o estado do pai (.piece-surface)",
        "piece-parent":     "Elemento filho que espelha o estado ativo do pai",
        "piece-true":       "Visível quando piece-controller está checked",
        "piece-false":      "Visível quando piece-controller NÃO está checked",
    }
}
