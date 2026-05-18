// ─── Pieces MCP — Cloudflare Worker ──────────────────────────────────────────
// Usa WebStandardStreamableHTTPServerTransport + Hono
// Funciona em qualquer runtime Web Standard: Cloudflare Workers, Deno, Bun, Node 18+

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'

// ─── Knowledge base ───────────────────────────────────────────────────────────
import colorSystem from './knowledge/color-system.js'

import cssGeneratorKnowledge from './knowledge/core/css-generator.js'
const core = { cssGenerator: cssGeneratorKnowledge }

import notionStyle from './knowledge/styles/notion.js'
const styles = { notion: notionStyle }

import surfaceComp    from './knowledge/components/surface.js'
import buttonComp     from './knowledge/components/button.js'
import iconButtonComp from './knowledge/components/icon-button.js'
import fabComp        from './knowledge/components/fab.js'
import fabMenuComp    from './knowledge/components/fab-menu.js'
import splitButtonComp from './knowledge/components/split-button.js'
import toastComp      from './knowledge/components/toast.js'
import snackbarComp   from './knowledge/components/snackbar.js'
import navigationComp from './knowledge/components/navigation.js'
import menuComp        from './knowledge/components/menu.js'
import groupButtonComp from './knowledge/components/group-button.js'
import tooltipComp    from './knowledge/components/tooltip.js'
import badgeComp      from './knowledge/components/badge.js'
import switchComp     from './knowledge/components/switch.js'
import checkboxComp   from './knowledge/components/checkbox.js'
import radioComp      from './knowledge/components/radio.js'
import textFieldComp  from './knowledge/components/text-field.js'
import textareaComp   from './knowledge/components/textarea.js'
import progressComp   from './knowledge/components/progress-indicator.js'
import dividerComp    from './knowledge/components/divider.js'
import tableComp      from './knowledge/components/table.js'
import toolbarComp    from './knowledge/components/toolbar.js'

const components = {
    surface:           surfaceComp,
    button:            buttonComp,
    iconButton:        iconButtonComp,
    fab:               fabComp,
    fabMenu:           fabMenuComp,
    splitButton:       splitButtonComp,
    toast:             toastComp,
    snackbar:          snackbarComp,
    navigation:        navigationComp,
    menu:              menuComp,
    groupButton:       groupButtonComp,
    tooltip:           tooltipComp,
    badge:             badgeComp,
    switch:            switchComp,
    checkbox:          checkboxComp,
    radio:             radioComp,
    textField:         textFieldComp,
    textarea:          textareaComp,
    progressIndicator: progressComp,
    divider:           dividerComp,
    table:             tableComp,
    toolbar:           toolbarComp,
}

// ─── Factory: cria um Server por request (stateless) ─────────────────────────
function createMcpServer() {
    const server = new Server(
        { name: 'pieces-mcp', version: '1.0.0' },
        { capabilities: { tools: {} } }
    )

    // ── Lista de ferramentas ──────────────────────────────────────────────────
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
                name: 'buscar_core',
                description: 'Retorna documentação de arquivos core do pieces (ex: css-generator). Explica como funcionam os scripts fundamentais como o gerador de CSS dinâmico.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID do core (ex: css-generator)'
                        }
                    },
                    required: ['id']
                }
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

    // ── Handlers ──────────────────────────────────────────────────────────────
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params

        // ── listar_componentes ────────────────────────────────────────────────
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

        // ── buscar_componente ─────────────────────────────────────────────────
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

            if (comp.structure)       sections.push(`\n## Estrutura HTML\n\`\`\`html${comp.structure}\`\`\``)
            if (comp.requiredClasses) sections.push(`\n## Classes obrigatórias\n${comp.requiredClasses.map(c => `• \`${c}\``).join('\n')}`)
            if (comp.howItWorks)      sections.push(`\n## Como funciona\n${comp.howItWorks}`)
            if (comp.sizes)           sections.push(`\n## Tamanhos\n${Object.entries(comp.sizes).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n')}`)
            if (comp.modifiers)       sections.push(`\n## Modificadores\n${Object.entries(comp.modifiers).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n')}`)
            if (comp.breakpoints)     sections.push(`\n## Breakpoints\n${Object.entries(comp.breakpoints).map(([k,v]) => `• **${k}**: ${v}`).join('\n')}`)
            if (comp.jsUtility)       sections.push(`\n## Utilitário JS\n\`\`\`js${comp.jsUtility}\`\`\``)

            if (comp.variants) {
                sections.push(`\n## Variantes`)
                Object.entries(comp.variants).forEach(([k, v]) => {
                    sections.push(`\n### ${k}\n${v.description}\n\`\`\`html\n<button ${v.example}>\n    ...\n</button>\`\`\``)
                })
            }

            if (comp.vsSnackbar || comp.vsToast) sections.push(`\n## Toast vs Snackbar\n${comp.vsSnackbar || comp.vsToast}`)
            if (comp.notes)   sections.push(`\n## Notas importantes\n${comp.notes.map(n => `• ${n}`).join('\n')}`)

            if (comp.examples) {
                sections.push(`\n## Exemplos prontos`)
                Object.entries(comp.examples).forEach(([k, v]) => {
                    sections.push(`\n### ${k}\n\`\`\`html${v}\`\`\``)
                })
            }

            return { content: [{ type: 'text', text: sections.join('\n') }] }
        }

        // ── explicar_classe ───────────────────────────────────────────────────
        if (name === 'explicar_classe') {
            const cls = args?.classe?.trim()
            if (!cls) return { content: [{ type: 'text', text: 'Informe o nome da classe.' }] }
            return { content: [{ type: 'text', text: explicarClasse(cls) }] }
        }

        // ── sistema_de_cores ──────────────────────────────────────────────────
        if (name === 'sistema_de_cores') {
            const sections = []

            sections.push(`# Pieces — Sistema de Cores\n${colorSystem.overview}`)
            sections.push(`## ⚠️ Tema — OBRIGATÓRIO\n${colorSystem.theme.description}\n\n**Classes:**\n` +
                Object.entries(colorSystem.theme.classes).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n') +
                `\n\n**Como funciona:**\n${colorSystem.theme.howItWorks}` +
                `\n\n**Uso:**\n\`\`\`html${colorSystem.theme.usage}\`\`\`` +
                `\n\n**Notas:**\n` + colorSystem.theme.notes.map(n => `• ${n}`).join('\n'))

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

        // ── buscar_core ───────────────────────────────────────────────────────
        if (name === 'buscar_core') {
            const id = args?.id?.toLowerCase().replace(/-([a-z])/g, (_, c) => c.toUpperCase())
            const item = core[id]

            if (!item) {
                return {
                    content: [{
                        type: 'text',
                        text: `Core "${args?.id}" não encontrado.\n\nDisponíveis: ${Object.keys(core).join(', ')}`
                    }]
                }
            }

            const sections = []
            sections.push(`# ${item.name} — ${item.file}`)
            sections.push(item.description)
            if (item.howItWorks)           sections.push(`\n## Como funciona\n${item.howItWorks}`)
            if (item.classPatterns)        sections.push(`\n## Padrões de classe\n` + Object.entries(item.classPatterns).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))
            if (item.tokenResolution)      sections.push(`\n## Resolução de tokens\n${item.tokenResolution}`)
            if (item.suffixes)             sections.push(`\n## Sufixos de estado\n${item.suffixes}`)
            if (item.supportedProperties)  sections.push(`\n## Propriedades suportadas\n` + item.supportedProperties.map(p => `• \`${p}\``).join('\n'))
            if (item.installation)         sections.push(`\n## Instalação\n${item.installation}`)
            if (item.notes)                sections.push(`\n## Notas\n` + item.notes.map(n => `• ${n}`).join('\n'))

            return { content: [{ type: 'text', text: sections.join('\n') }] }
        }

        // ── buscar_estilo ─────────────────────────────────────────────────────
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
            if (style.philosophy)           sections.push(`\n## Filosofia\n${style.philosophy}`)
            if (style.usage)                sections.push(`\n## Como usar\n${style.usage}`)
            if (style.borderRadius)         sections.push(`\n## Border Radius\n` + Object.entries(style.borderRadius).map(([k,v]) => `• \`${k}\` — ${v}`).join('\n'))
            if (style.supportedComponents)  sections.push(`\n## Componentes suportados\n` + style.supportedComponents.map(c => `• ${c}`).join('\n'))
            if (style.notes)                sections.push(`\n## Notas\n` + style.notes.map(n => `• ${n}`).join('\n'))
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

    return server
}

// ─── Explicador de classes ────────────────────────────────────────────────────
function explicarClasse(cls) {
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

    const alphaMatch = cls.match(/^piece-(?<prop>background|text|border|box-shadow|ripple|scrollbar[\w-]*)-alpha-(?<token>\d+)/)
    if (alphaMatch) {
        const { prop, token } = alphaMatch.groups
        const alpha = (Number(token) * 4 / 100).toFixed(2)
        return `\`${cls}\`\n\nDefine o alpha da propriedade **${prop}** para **${alpha}** (token ${token} × 4 / 100).\n\nUso típico: criar superfícies semi-transparentes.`
    }

    const blurMatch = cls.match(/^piece-blur-(?<token>\d+)/)
    if (blurMatch) {
        const px = Number(blurMatch.groups.token) * 2
        return `\`${cls}\`\n\nAplica \`backdrop-filter: blur(${px}px)\`.\n\nRequer fundo semi-transparente para o blur ser visível.`
    }

    if (['piece-primary','piece-secondary','piece-tertiary'].includes(cls)) {
        const desc = {
            'piece-primary':   'HUE base definido por --piece-main-color',
            'piece-secondary': 'HUE = primary + offset da paleta (ex: +120° no triádico)',
            'piece-tertiary':  'HUE = secondary + offset da paleta',
        }[cls]
        return `\`${cls}\`\n\nDefine \`--piece-h\` para o HUE correspondente (${desc}).\n\nCombine com \`background-color-auto-11\` para usar essa cor como destaque.`
    }

    if (cls === 'piece-surface')    return `\`piece-surface\`\n\nClasse base obrigatória do pieces.\n\n• Define background, color e border-color via variáveis CSS (hsla)\n• Cada filho .piece-surface reseta as vars automaticamente — não herda do pai\n• Ativa suporte a: alpha por propriedade, blur, skeleton, disabled, ripple\n• Todo componente do pieces começa com esta classe`
    if (cls === 'piece-border')     return `\`piece-border\`\n\nAtiva \`border: 1px solid\` usando a cor de borda configurada (via \`border-color-auto-XX\`).`
    if (cls === 'piece-disabled')   return `\`piece-disabled\`\n\nEstado desabilitado.\n\n• Fundo e texto cinza semi-transparente\n• \`pointer-events: none\` nos filhos\n• \`cursor: not-allowed\``
    if (cls === 'piece-ripple')     return `\`piece-ripple\`\n\nContainer do efeito ripple. Deve ser o **último filho** do elemento clicável.`
    if (cls === 'piece-actived')    return `\`piece-actived\`\n\nMarca o elemento como "ativo" via JS.\n\n• Ativa classes com sufixo \`-active\` e \`-hover-active\`\n• Equivalente ao :checked mas controlado por JS`
    if (cls === 'piece-controller') return `\`piece-controller\`\n\nInput (radio, checkbox, text) que controla o estado do pai .piece-surface.\n\n• \`checked\` → ativa classes \`-active\` no pai`
    if (cls === 'piece-icon')       return `\`piece-icon\`\n\nMarca um ícone Material Symbol dentro de um componente.`
    if (cls === 'piece-label')      return `\`piece-label\`\n\nTexto principal de um componente (botão, item de navegação, etc.).`

    return `\`${cls}\`\n\nClasse não reconhecida no knowledge base atual.\n\nDica: use \`sistema_de_cores\` para ver todos os tokens, ou \`listar_componentes\` para ver os componentes documentados.`
}

// ─── Hono app ─────────────────────────────────────────────────────────────────
const app = new Hono()

app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'mcp-session-id', 'Last-Event-ID', 'mcp-protocol-version'],
    exposeHeaders: ['mcp-session-id', 'mcp-protocol-version'],
}))

app.get('/', c => c.json({
    name: 'pieces-mcp',
    version: '1.0.0',
    description: 'MCP server para o design system Pieces',
    endpoint: '/mcp',
}))

app.get('/health', c => c.json({ status: 'ok', name: 'pieces-mcp' }))

// Endpoint MCP — cria server + transport frescos por request (stateless)
app.all('/mcp', async (c) => {
    const transport = new WebStandardStreamableHTTPServerTransport({
        sessionIdGenerator: undefined, // stateless
    })
    const server = createMcpServer()
    await server.connect(transport)
    return transport.handleRequest(c.req.raw)
})

export default app
