#!/usr/bin/env node
'use strict';

const { readFileSync, readdirSync, existsSync } = require('fs');
const { join } = require('path');

const SDK_PATH = 'C:/pieces-mcp/node_modules/@modelcontextprotocol/sdk/dist/cjs';
const { Server } = require(SDK_PATH + '/server/index.js');
const { StdioServerTransport } = require(SDK_PATH + '/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require(SDK_PATH + '/types.js');

const KITS_DIR  = __dirname;
const CORE_DIR  = join(__dirname, 'core');
const KITS_SKIP = new Set(['core', 'node_modules', '.git']);

const text = c => ({ content: [{ type: 'text', text: c }] });
const err  = m => ({ content: [{ type: 'text', text: 'Erro: ' + m }], isError: true });

const server = new Server({ name: 'pieces', version: '2.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        { name: 'listar_kit',       description: 'Lista kits disponiveis (sem param) ou componentes de um kit.',                                                     inputSchema: { type: 'object', properties: { kit: { type: 'string' } }, required: [] } },
        { name: 'componente',       description: 'Retorna doc .md de um componente. Ex: kit=neutral, nome=button.',                                                  inputSchema: { type: 'object', properties: { kit: { type: 'string' }, nome: { type: 'string' } }, required: ['kit', 'nome'] } },
        { name: 'sistema_de_cores', description: 'PRE-REQUISITO - surface, tokens, hierarquia visual, border, box-shadow, alpha, blur.',                             inputSchema: { type: 'object', properties: {}, required: [] } },
        { name: 'sistema_js',       description: 'PRE-REQUISITO - ripple, disabled, interactive, toggle, tooltip, piece-css-generator.',                             inputSchema: { type: 'object', properties: {}, required: [] } },
        { name: 'explicar_classe',  description: 'Explica classe do Pieces: cor (background-color-auto-08), alpha (piece-background-alpha-06), blur (piece-blur-04).', inputSchema: { type: 'object', properties: { classe: { type: 'string' } }, required: ['classe'] } },
    ]
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const { name, arguments: args = {} } = req.params;

    if (name === 'listar_kit') {
        const { kit } = args;
        if (!kit) {
            const kits = readdirSync(KITS_DIR, { withFileTypes: true })
                .filter(d => d.isDirectory() && !KITS_SKIP.has(d.name)).map(d => d.name);
            return text('## Kits disponiveis\n\n' + kits.map(k => '- ' + k).join('\n') + '\n\nUse listar_kit(kit) para componentes.');
        }
        const kitPath  = join(KITS_DIR, kit);
        const compPath = join(kitPath, 'components');
        if (!existsSync(kitPath)) return err('Kit ' + kit + ' nao encontrado.');
        const out = ['## ' + kit];
        if (existsSync(join(kitPath, 'guidelines.md'))) out.push('\nDiretrizes: use componente(kit, guidelines).');
        if (existsSync(compPath)) {
            const comps = readdirSync(compPath).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
            out.push(comps.length > 0 ? '\n### Componentes\n' + comps.map(c => '- ' + c).join('\n') : '\nNenhum componente documentado.');
        }
        return text(out.join('\n'));
    }

    if (name === 'componente') {
        const { kit, nome } = args;
        const kitPath = join(KITS_DIR, kit);
        if (!existsSync(kitPath)) return err('Kit ' + kit + ' nao encontrado.');
        if (nome === 'guidelines') {
            const f = join(kitPath, 'guidelines.md');
            if (!existsSync(f)) return err('guidelines.md nao encontrado.');
            return text(readFileSync(f, 'utf8'));
        }
        const filePath = join(kitPath, 'components', nome + '.md');
        if (!existsSync(filePath)) {
            const compPath = join(kitPath, 'components');
            const available = existsSync(compPath) ? readdirSync(compPath).filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')) : [];
            return err('Componente ' + nome + ' nao encontrado. Disponiveis: ' + available.join(', '));
        }
        return text(readFileSync(filePath, 'utf8'));
    }

    if (name === 'sistema_de_cores') {
        const f = join(CORE_DIR, 'surface.md');
        if (!existsSync(f)) return err('core/surface.md nao encontrado.');
        return text(readFileSync(f, 'utf8'));
    }

    if (name === 'sistema_js') {
        const f = join(CORE_DIR, 'js.md');
        if (!existsSync(f)) return err('core/js.md nao encontrado.');
        return text(readFileSync(f, 'utf8'));
    }

    if (name === 'explicar_classe') {
        const { classe } = args;
        const cm = classe.match(/^(?<p>background|text|border|box-shadow|ripple|scrollbar-[\w-]+)-color-(?<t>auto|light|dark|inverse)-(?<n>[\d]+)(?:-(?<s>hover|active|hover-active|loading))?$/);
        if (cm) {
            const { p, t, n, s } = cm.groups;
            const l = Number(n) * 4;
            return text('Classe: ' + classe + '\nPropriedade: ' + p + '\nTema: ' + t + ' (light=' + (100-l) + '%, dark=' + l + '%)\nToken: ' + n + ' - ' + l + '% lightness offset\nEstado: ' + (s || 'default'));
        }
        const am = classe.match(/^piece-(?<p>[\w-]+)-alpha-(?<n>\d{2})(?:-(?<s>[\w-]+))?$/);
        if (am) {
            const { p, n, s } = am.groups;
            return text('Classe: ' + classe + '\nTipo: alpha\nPropriedade: ' + p + '\nAlpha: ' + (Number(n)*4/100).toFixed(2) + ' (' + Number(n)*4 + '%)\nEstado: ' + (s || 'default'));
        }
        const bm = classe.match(/^piece-blur-(?<n>\d{2})(?:-(?<s>[\w-]+))?$/);
        if (bm) return text('Classe: ' + classe + '\nTipo: blur\nValor: blur(' + Number(bm.groups.n)*2 + 'px)\nEstado: ' + (bm.groups.s || 'default'));
        return text('Classe ' + classe + ' nao reconhecida. Padroes: {prop}-color-{tema}-{00-25}, piece-{prop}-alpha-{00-25}, piece-blur-{00-25}');
    }

    return err('Ferramenta desconhecida: ' + name);
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch(e => { process.stderr.write(e.message + '\n'); process.exit(1); });
