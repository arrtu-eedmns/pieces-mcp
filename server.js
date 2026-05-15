#!/usr/bin/env node
// ─── Pieces MCP Server ────────────────────────────────────────────────────────
// Fornece conhecimento do design system "pieces" para IAs (Claude, etc.)
// Protocolo: MCP via stdio

const { Server }   = require('@modelcontextprotocol/sdk/server/index.js')
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js')
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js')

// ─── Knowledge base ───────────────────────────────────────────────────────────
const colorSystem = require('./knowledge/color-system.js')

const styles = {
    notion: require('./knowledge/styles/notion.js'),
}

const components = {
    surface:           require('./knowledge/components/surface.js'),
    button:            require('./knowledge/components/button.js'),
    iconButton:        require('./knowledge/components/icon-button.js'),
    fab:               require('./knowledge/components/fab.js'),
    fabMenu:           require('./knowledge/components/fab-menu.js'),
    splitButton:       require('./knowledge/components/split-button.js'),
    toast:             require('./knowledge/components/toast.js'),
    snackbar:          require('./knowledge/components/snackbar.js'),
    navigation:        require('./knowledge/components/navigation.js'),
    menu:              require('./knowledge/components/menu.js'),
    tooltip:           require('./knowledge/components/tooltip.js'),
    badge:             require('./knowledge/components/badge.js'),
    switch:            require('./knowledge/components/switch.js'),
    checkbox:          require('./knowledge/components/checkbox.js'),
    radio:             require('./knowledge/components/radio.js'),
    textField:         require('./knowledge/components/text-field.js'),
    textarea:          require('./knowledge/components/textarea.js'),
    progressIndicator: require('./knowledge/components/progress-indicator.js'),
    divider:           require('./knowledge/components/divider.js'),
    table:             require('./knowledge/components/table.js'),
    toolbar:           require('./knowledge/components/toolbar.js'),
}

// ─── Server ───────────────────────────────────────────────────────────────────
const server = new Server(
    { name: 'pieces-mcp', version: '1.0.0' },
    { capabilities: { tools: {} } }
)

// ─── Lista de ferramentas ─────────────────────────────────────────────────────
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: 'listar_componentes',
            description: 'Lista todos os componentes disponíveis no design system pieces com uma breve descrição de cada um.',
            inputSchema: { type: 'object', properties: {} }
        },
        {
            name: 'buscar_componente',
            description: 'Retorna documentação completa de um componente: estrutura HTML, classes obrigatórias, variantes, exemplos prontos e notas de uso.',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'ID do componente (ex: button, fab, toast, snackbar, navigation, surface)'
                    }
                },
                required: ['id']
            }
        },
        {
            name: 'explicar_classe',
            description: 'Explica o que uma classe CSS do pieces faz. Ex: background-color-auto-11, piece-blur-08, piece-primary, piece-surface.',
            inputSchema: {
                type: 'object',
                properties: {
                    classe: {
                        type: 'string',
                        description: 'Nome exato da classe CSS (ex: background-color-auto-11)'
                    }
                },
                required: ['classe']
            }
        },
        {
            name: 'sistema_de_cores',
            description: 'Retorna documentação completa do sistema de cores do pieces: tokens, surface, alpha, blur, temas, paletas e roles de cor.',
            inputSchema: { type: 'object', properties: {} }
        },
        {
            name: 'buscar_estilo',
            description: 'Retorna documentação de um estilo/variante visual do pieces (ex: notion). Inclui quais componentes suporta, border-radius, exemplos prontos e notas.',
            inputSchema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'ID do estilo (ex: notion)'
                    }
                },
                required: ['id']
            }
        },
    ]
}))

// ─── Handlers ─────────────────────────────────────────────────────────────────
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params

    // ── listar_componentes ──────────────────────────────────────────────────
    if (name === 'listar_componentes') {
        const lista = Object.values(components).map(c =>
            `• ${c.id} (${c.file}) — ${c.description}`
        ).join('\n')

        return {
            content: [{
                type: 'text',
                text: `Componentes disponíveis no pieces:\n\n${lista}\n\n` +
                      `Use buscar_componente com o ID para ver HTML, classes e exemplos.\n` +
                      `Use sistema_de_cores para entender o sistema de tokens que todos compartilham.`
            }]
        }
    }

    // ── buscar_componente ───────────────────────────────────────────────────
    if (name === 'buscar_componente') {
        const id = args?.id?.toLowerCase().replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        const comp = components[id]

        if (!comp) {
            return {
                content: [{
                    type: 'text',
                    text: `Componente "${id}" não encontrado.\n\nDisponíveis: ${Object.keys(components).join(', ')}`
                }]
            }
        }

        const sections = []

        sections.push(`# ${comp.name} — ${comp.file}`)
        sections.push(comp.description)

        if (comp.structure) {
            sections.push(`\n## Estrutura HTML\n\`\`\`html${comp.structure}\`\`\``)
        }

        if (comp.requiredClasses) {
            sections.push(`\n## Classes obrigatórias\n${comp.requiredClasses.map(c => `• \`${c}\``).join('\n')}`)
        }

        if (comp.howItWorks) {
            sections.push(`\n## Como funciona\n${comp.howItWorks}`)
        }

        if (comp.sizes) {
            sections.push(`\n## Tamanhos\n${Object.entries(comp.sizes).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n')}`)
        }

        if (comp.variants) {
            sections.push(`\n## Variantes`)
            Object.entries(comp.variants).forEach(([k, v]) => {
                sections.push(`\n### ${k}\n${v.description}\n\`\`\`html\n<button ${v.example}>\n    ...\n</button>\`\`\``)
            })
        }

        if (comp.modifiers) {
            sections.push(`\n## Modificadores\n${Object.entries(comp.modifiers).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n')}`)
        }

        if (comp.breakpoints) {
            sections.push(`\n## Breakpoints\n${Object.entries(comp.breakpoints).map(([k,v]) => `• **${k}**: ${v}`).join('\n')}`)
        }

        if (comp.jsUtility) {
            sections.push(`\n## Utilitário JS\n\`\`\`js${comp.jsUtility}\`\`\``)
        }

        if (comp.vsSnackbar || comp.vsToast) {
            sections.push(`\n## Toast vs Snackbar\n${comp.vsSnackbar || comp.vsToast}`)
        }

        if (comp.notes) {
            sections.push(`\n## Notas importantes\n${comp.notes.map(n => `• ${n}`).join('\n')}`)
        }

        if (comp.examples) {
            sections.push(`\n## Exemplos prontos`)
            Object.entries(comp.examples).forEach(([k, v]) => {
                sections.push(`\n### ${k}\n\`\`\`html${v}\`\`\``)
            })
        }

        return {
            content: [{ type: 'text', text: sections.join('\n') }]
        }
    }

    // ── explicar_classe ─────────────────────────────────────────────────────
    if (name === 'explicar_classe') {
        const cls = args?.classe?.trim()
        if (!cls) {
            return { content: [{ type: 'text', text: 'Informe o nome da classe.' }] }
        }

        const explanation = explicarClasse(cls)
        return { content: [{ type: 'text', text: explanation }] }
    }

    // ── sistema_de_cores ────────────────────────────────────────────────────
    if (name === 'sistema_de_cores') {
        const sections = []

        sections.push(`# Pieces — Sistema de Cores\n${colorSystem.overview}`)

        sections.push(`## Surface\n${colorSystem.surface.description}\n\n**Modificadores:**\n` +
            Object.entries(colorSystem.surface.modifiers).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        sections.push(`## Tokens de Cor\n${colorSystem.colorTokens.description}\n\n**Escala de tokens:**\n` +
            Object.entries(colorSystem.colorTokens.scale).map(([k,v]) => `• token \`${k}\` → ${v}`).join('\n'))

        sections.push(`\n**Padrões comuns:**\n` +
            Object.entries(colorSystem.colorTokens.commonPatterns).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        sections.push(`\n**Sufixos de estado:**\n` +
            Object.entries(colorSystem.colorTokens.suffixes).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        sections.push(`## Alpha\n${colorSystem.alphaTokens.description}\n\n**Exemplos:**\n` +
            Object.entries(colorSystem.alphaTokens.examples).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        sections.push(`## Blur\n${colorSystem.blurTokens.description}\n\n**Exemplos:**\n` +
            Object.entries(colorSystem.blurTokens.examples).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        sections.push(`## Paletas\n${colorSystem.palettes.description}\n\n` +
            Object.entries(colorSystem.palettes.classes).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        sections.push(`## Roles de Cor\n${colorSystem.colorRoles.description}\n\n` +
            Object.entries(colorSystem.colorRoles.classes).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        sections.push(`## Estados\n` +
            Object.entries(colorSystem.states).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))

        return { content: [{ type: 'text', text: sections.join('\n\n') }] }
    }

    // ── buscar_estilo ───────────────────────────────────────────────────────
    if (name === 'buscar_estilo') {
        const id = args?.id?.toLowerCase()
        const style = styles[id]

        if (!style) {
            return {
                content: [{
                    type: 'text',
                    text: `Estilo "${id}" não encontrado.\n\nDisponíveis: ${Object.keys(styles).join(', ')}`
                }]
            }
        }

        const sections = []

        sections.push(`# ${style.name} — ${style.file}`)
        sections.push(style.description)

        if (style.philosophy) sections.push(`\n## Filosofia\n${style.philosophy}`)
        if (style.usage)      sections.push(`\n## Como usar\n${style.usage}`)

        if (style.borderRadius) {
            sections.push(`\n## Border Radius\n` +
                Object.entries(style.borderRadius).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))
        }

        if (style.supportedComponents) {
            sections.push(`\n## Componentes suportados\n` +
                style.supportedComponents.map(c => `• ${c}`).join('\n'))
        }

        if (style.notes) {
            sections.push(`\n## Notas\n` + style.notes.map(n => `• ${n}`).join('\n'))
        }

        if (style.examples) {
            sections.push(`\n## Exemplos`)
            Object.entries(style.examples).forEach(([k, v]) => {
                sections.push(`\n### ${k}\n\`\`\`html${v}\`\`\``)
            })
        }

        return { content: [{ type: 'text', text: sections.join('\n') }] }
    }

    return {
        content: [{ type: 'text', text: `Ferramenta "${name}" não reconhecida.` }],
        isError: true
    }
})

// ─── Explicador de classes ─────────────────────────────────────────────────────
function explicarClasse(cls) {

    // background-color-auto-11, text-color-light-04, etc.
    const colorMatch = cls.match(/^(?<prop>background|text|border|box-shadow|ripple|scrollbar[\w-]*)-color-(?<theme>auto|inverse|light|dark)-(?<token>\d+)(?:-(?<suffix>hover|active|hover-active|loading))?$/)
    if (colorMatch) {
        const { prop, theme, token, suffix } = colorMatch.groups
        const lightness = Number(token) * 4
        const themeDesc = {
            auto:    `adapta ao tema (claro/escuro automaticamente)`,
            inverse: `inverso do tema (escuro quando claro, claro quando escuro)`,
            light:   `sempre claro (ignora o tema)`,
            dark:    `sempre escuro (ignora o tema)`,
        }[theme]
        const suffixDesc = suffix ? `, ativado no estado: ${suffix}` : `, sempre ativo`
        const tokenNote = Number(token) === 11 ? ` (tom de destaque — usa o HUE de piece-primary/secondary/tertiary)` : ''

        return `\`${cls}\`\n\n` +
            `**Propriedade:** ${prop}\n` +
            `**Tema:** ${themeDesc}\n` +
            `**Lightness:** ${lightness}% (token ${token} × 4)${tokenNote}\n` +
            `**Quando ativo:** ${suffixDesc}\n\n` +
            `Esta classe seta \`--piece-${prop}-color\` para que o hsla() do .piece-surface renderize a cor correta.`
    }

    // piece-background-alpha-11, piece-border-alpha-06, etc.
    const alphaMatch = cls.match(/^piece-(?<prop>background|text|border|box-shadow|ripple|scrollbar[\w-]*)-alpha-(?<token>\d+)/)
    if (alphaMatch) {
        const { prop, token } = alphaMatch.groups
        const alpha = (Number(token) * 4 / 100).toFixed(2)
        return `\`${cls}\`\n\nDefine o alpha da propriedade **${prop}** para **${alpha}** (token ${token} × 4 / 100).\n\nUso típico: criar superfícies semi-transparentes. Ex: \`piece-background-alpha-11\` → fundo com 44% de opacidade.`
    }

    // piece-blur-08
    const blurMatch = cls.match(/^piece-blur-(?<token>\d+)/)
    if (blurMatch) {
        const px = Number(blurMatch.groups.token) * 2
        return `\`${cls}\`\n\nAplica \`backdrop-filter: blur(${px}px)\`.\n\nUso típico: painéis com efeito vidro/frosted glass. Requer que o elemento tenha um fundo semi-transparente para o blur ser visível.`
    }

    // piece-primary/secondary/tertiary
    if (['piece-primary','piece-secondary','piece-tertiary'].includes(cls)) {
        const desc = {
            'piece-primary':   'HUE base definido por --piece-main-color',
            'piece-secondary': 'HUE = primary + offset da paleta (ex: +120° no triádico)',
            'piece-tertiary':  'HUE = secondary + offset da paleta',
        }[cls]
        return `\`${cls}\`\n\nDefine \`--piece-h\` para o HUE correspondente (${desc}).\n\nEsta classe muda a "identidade de cor" do elemento e de todos os seus filhos. Combine com \`background-color-auto-11\` para usar essa cor como destaque.`
    }

    // piece-surface
    if (cls === 'piece-surface') {
        return `\`piece-surface\`\n\nClasse base obrigatória do pieces.\n\n` +
            `• Define background, color e border-color via variáveis CSS (hsla)\n` +
            `• Cada filho .piece-surface reseta as vars automaticamente — não herda do pai\n` +
            `• Ativa suporte a: alpha por propriedade, blur, skeleton, disabled, ripple\n` +
            `• Todo componente do pieces começa com esta classe`
    }

    // piece-border
    if (cls === 'piece-border') {
        return `\`piece-border\`\n\nAtiva \`border: 1px solid\` usando a cor de borda configurada (via \`border-color-auto-XX\`).\n\nSempre combine com uma classe de cor de borda, ex: \`border-color-auto-06\`.`
    }

    // piece-disabled
    if (cls === 'piece-disabled') {
        return `\`piece-disabled\`\n\nEstado desabilitado.\n\n• Aplica fundo e texto cinza semi-transparente\n• \`pointer-events: none\` em todos os filhos\n• \`cursor: not-allowed\`\n\nPreferível ao atributo HTML \`disabled\` pois funciona em qualquer elemento, não só em inputs.`
    }

    // piece-ripple
    if (cls === 'piece-ripple') {
        return `\`piece-ripple\`\n\nContainer do efeito ripple. Deve ser o **último filho** do elemento clicável.\n\n\`\`\`html\n<button class="piece-button ...">\n    ...\n    <span class="piece-ripple"></span>  <!-- sempre último -->\n</button>\`\`\`\n\nO JS em \`ripple.js\` detecta cliques e cria o efeito automaticamente.`
    }

    // piece-actived
    if (cls === 'piece-actived') {
        return `\`piece-actived\`\n\nMarca o elemento como "ativo" manualmente via JS.\n\n• Ativa classes com sufixo \`-active\` e \`-hover-active\`\n• Equivalente ao estado \`:checked\` do piece-controller, mas controlado por JS\n• Usado em menus, tabs, botões toggle`
    }

    // piece-controller
    if (cls === 'piece-controller') {
        return `\`piece-controller\`\n\nInput (radio, checkbox, text) que controla o estado do elemento pai .piece-surface.\n\n• \`checked\` → ativa classes \`-active\` no pai\n• Deve ser filho direto do .piece-surface que controla\n• Compatível com \`piece-true\` e \`piece-false\` para mostrar/ocultar conteúdo`
    }

    // piece-icon
    if (cls === 'piece-icon') {
        return `\`piece-icon\`\n\nMarca um ícone Material Symbol dentro de um componente.\n\nEm componentes com \`piece-true\`/\`piece-false\`, o ícone pode ser ocultado/mostrado conforme o estado do piece-controller.`
    }

    // piece-label
    if (cls === 'piece-label') {
        return `\`piece-label\`\n\nTexto principal de um componente (botão, item de navegação, etc.).\n\nEm alguns componentes (ex: navigation rail compacto), o label é ocultado visualmente mas permanece acessível.`
    }

    return `\`${cls}\`\n\nClasse não reconhecida no knowledge base atual.\n\nDica: use \`sistema_de_cores\` para ver todos os tokens disponíveis, ou \`listar_componentes\` para ver os componentes documentados.`
}

// ─── Start ────────────────────────────────────────────────────────────────────
async function main() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.error('✅ Pieces MCP server rodando via stdio')
}

main().catch(err => {
    console.error('❌ Erro fatal:', err)
    process.exit(1)
})
