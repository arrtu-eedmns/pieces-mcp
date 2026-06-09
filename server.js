#!/usr/bin/env node
/**
 * Pieces MCP Server — stdio local, CommonJS
 *
 * Lê os arquivos do design system diretamente do filesystem.
 * NUNCA faz chamadas HTTP. Sem loops, sem reconexões.
 *
 * Dependências em C:\pieces-mcp\node_modules (NODE_PATH no settings.json)
 *
 * Ferramentas expostas:
 *   listar_componentes       — lista todos os arquivos CSS de componentes
 *   buscar_componente        — retorna o CSS de um componente específico
 *   buscar_core              — retorna pieces.css, theme.css ou surface.css
 *   buscar_estilo            — busca uma classe ou regra CSS no design system
 *   explicar_classe          — explica como usar uma classe do Pieces
 *   sistema_de_cores         — documenta o sistema de cores HSL
 */

"use strict";

const { readFileSync, readdirSync, existsSync } = require("fs");
const { join, extname }                         = require("path");

const SDK_PATH = "C:/pieces-mcp/node_modules/@modelcontextprotocol/sdk/dist/cjs";

const { Server }               = require(`${SDK_PATH}/server/index.js`);
const { StdioServerTransport } = require(`${SDK_PATH}/server/stdio.js`);
const {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} = require(`${SDK_PATH}/types.js`);

/* ---------- CAMINHOS ---------- */
const SRC       = join(__dirname, "..", "..", "src");
const CSS_DIR   = join(SRC, "css", "pieces");
const JS_DIR    = join(SRC, "js", "pieces");
const KITS_DIR  = __dirname;               // pieces/mcp/
const CORE_DIR  = join(__dirname, "core"); // pieces/mcp/core/
const KITS_SKIP = new Set(["core", "node_modules"]);

const CORE_FILES = ["pieces.css", "theme.css", "surface.css"];

/* ---------- CACHE (carregado uma vez na inicialização) ---------- */
const cssCache = new Map();
const jsCache  = new Map();

for (const file of readdirSync(CSS_DIR)) {
    if (extname(file) === ".css") cssCache.set(file, readFileSync(join(CSS_DIR, file), "utf8"));
}
for (const file of readdirSync(JS_DIR)) {
    if (extname(file) === ".js")  jsCache.set(file,  readFileSync(join(JS_DIR,  file), "utf8"));
}

/* ---------- HELPERS ---------- */
const text = content  => ({ content: [{ type: "text", text: content }] });
const err  = msg      => ({ content: [{ type: "text", text: `Erro: ${msg}` }], isError: true });

/* ---------- SERVER ---------- */
const server = new Server(
    { name: "pieces", version: "1.0.0" },
    { capabilities: { tools: {} } }
);

/* ---------- LISTA DE FERRAMENTAS ---------- */
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "listar_componentes",
            description: "Lista todos os componentes CSS disponíveis no Pieces Design System.",
            inputSchema: { type: "object", properties: {}, required: [] },
        },
        {
            name: "buscar_componente",
            description: "Retorna o CSS completo de um componente. Use o nome sem extensão (ex: 'button', 'card', 'text-field').",
            inputSchema: {
                type: "object",
                properties: { nome: { type: "string", description: "Nome do componente (sem .css)" } },
                required: ["nome"],
            },
        },
        {
            name: "buscar_core",
            description: "Retorna um dos arquivos core: 'pieces' (entry + variáveis raiz), 'theme' (paletas de cor), ou 'surface' (classe base .piece-surface).",
            inputSchema: {
                type: "object",
                properties: {
                    arquivo: { type: "string", enum: ["pieces", "theme", "surface"], description: "Qual arquivo core retornar" },
                },
                required: ["arquivo"],
            },
        },
        {
            name: "buscar_estilo",
            description: "Busca uma string/classe/seletor CSS em todos os arquivos do Pieces. Retorna os trechos onde aparece.",
            inputSchema: {
                type: "object",
                properties: { query: { type: "string", description: "Texto ou classe a buscar (ex: '.piece-button', 'piece-large')" } },
                required: ["query"],
            },
        },
        {
            name: "explicar_classe",
            description: "Explica o que uma classe do Pieces faz e como usá-la, com base no CSS-generator e nos arquivos fonte.",
            inputSchema: {
                type: "object",
                properties: { classe: { type: "string", description: "Nome da classe (ex: 'background-color-auto-08', 'piece-blur-04')" } },
                required: ["classe"],
            },
        },
        {
            name: "sistema_de_cores",
            description: "PRÉ-REQUISITO — leia antes de qualquer kit ou componente. Documenta o surface, tokens (00-25), temas (auto/light/dark/inverse), canais, harmonias, alpha, blur e todas as regras do sistema Pieces.",
            inputSchema: { type: "object", properties: {}, required: [] },
        },
        {
            name: "sistema_js",
            description: "PRÉ-REQUISITO — leia antes de usar componentes. Documenta todos os JS do Core: ripple, disabled, interactive, toggle, tooltip, piece-css-generator. Responsabilidades, classes HTML e regras.",
            inputSchema: { type: "object", properties: {}, required: [] },
        },
        {
            name: "listar_kit",
            description: "Lista os kits disponíveis (sem parâmetro) ou os componentes de um kit específico (ex: 'neutral', 'md3').",
            inputSchema: {
                type: "object",
                properties: { kit: { type: "string", description: "Nome do kit (opcional). Sem valor lista todos os kits." } },
                required: [],
            },
        },
        {
            name: "componente",
            description: "Retorna a documentação completa de um componente de um kit. Ex: kit='neutral', nome='icon-button'.",
            inputSchema: {
                type: "object",
                properties: {
                    kit:  { type: "string", description: "Nome do kit (ex: neutral, md3, fluent)" },
                    nome: { type: "string", description: "Nome do componente (ex: icon-button, radio, checkbox)" },
                },
                required: ["kit", "nome"],
            },
        },
    ],
}));

/* ---------- HANDLERS ---------- */
server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const { name, arguments: args = {} } = req.params;

    /* ---- listar_componentes ---- */
    if (name === "listar_componentes") {
        const css = [...cssCache.keys()].sort();
        const js  = [...jsCache.keys()].sort();
        const out = [
            "## CSS — Componentes",
            ...css.map(f => `- ${f.replace(".css", "")}`),
            "",
            "## JS — Utilitários",
            ...js.map(f => `- ${f.replace(".js", "")}`),
        ].join("\n");
        return text(out);
    }

    /* ---- buscar_componente ---- */
    if (name === "buscar_componente") {
        const key = args.nome.endsWith(".css") ? args.nome : `${args.nome}.css`;
        if (!cssCache.has(key)) {
            const available = [...cssCache.keys()].map(f => f.replace(".css", "")).join(", ");
            return err(`Componente "${args.nome}" não encontrado.\nDisponíveis: ${available}`);
        }
        return text(`/* ${key} */\n\n${cssCache.get(key)}`);
    }

    /* ---- buscar_core ---- */
    if (name === "buscar_core") {
        const key = `${args.arquivo}.css`;
        if (!CORE_FILES.includes(key)) return err("arquivo deve ser 'pieces', 'theme' ou 'surface'.");
        if (!cssCache.has(key))        return err(`${key} não encontrado no cache.`);
        return text(`/* ${key} */\n\n${cssCache.get(key)}`);
    }

    /* ---- buscar_estilo ---- */
    if (name === "buscar_estilo") {
        const { query } = args;
        const results = [];
        for (const [file, content] of cssCache) {
            const lines = content.split("\n");
            const matches = [];
            lines.forEach((line, i) => {
                if (line.toLowerCase().includes(query.toLowerCase())) {
                    const start   = Math.max(0, i - 2);
                    const end     = Math.min(lines.length - 1, i + 3);
                    const snippet = lines.slice(start, end + 1).map((l, idx) => `${start + idx + 1}: ${l}`).join("\n");
                    matches.push(snippet);
                }
            });
            if (matches.length > 0) results.push(`### ${file}\n\`\`\`css\n${matches.join("\n---\n")}\n\`\`\``);
        }
        if (results.length === 0) return text(`Nenhum resultado para "${query}".`);
        return text(`## Resultados para "${query}"\n\n${results.join("\n\n")}`);
    }

    /* ---- explicar_classe ---- */
    if (name === "explicar_classe") {
        const { classe } = args;

        const colorMatch = classe.match(
            /^(?<property>background|text|border|box-shadow|ripple|scrollbar-[\w-]+)-color-(?<theme>auto|light|dark|inverse)-(?<token>[\d]+)(?:-(?<suffix>hover|active|hover-active|loading))?$/
        );
        const alphaMatch = classe.match(
            /^piece-(?<property>background|text|border|box-shadow|ripple|scrollbar-[\w-]+)-alpha-(?<token>\d{2})(?:-(?<suffix>hover|active|hover-active|loading))?$/
        );
        const blurMatch = classe.match(
            /^piece-blur-(?<token>\d{2})(?:-(?<suffix>hover|active|hover-active|loading))?$/
        );

        if (colorMatch) {
            const { property, theme, token, suffix } = colorMatch.groups;
            const n = Number(token);
            const lightness = n * 4;

            const themeExplain = {
                auto:    `Adapta ao tema global.\n  - No light: lightness = 100% − ${lightness}% = ${100 - lightness}%\n  - No dark:  lightness = 0% + ${lightness}% = ${lightness}%`,
                inverse: `Inverte o tema atual.\n  - No light: age como dark (lightness = ${lightness}%)\n  - No dark:  age como light (lightness = ${100 - lightness}%)`,
                light:   `Travado no esquema claro. Lightness = ${100 - lightness}% sempre, independente do tema global.`,
                dark:    `Travado no esquema escuro. Lightness = ${lightness}% sempre, independente do tema global.`,
            }[theme] || "";

            const suffixExplain = {
                undefined:      "Sempre aplicado (default).",
                hover:          "Aplicado quando o mouse está sobre o elemento.",
                active:         "Aplicado quando o elemento tem `.piece-actived` ou input está checked.",
                "hover-active": "Aplicado quando tem `.piece-actived` E o mouse está sobre o elemento.",
                loading:        "Aplicado quando está dentro de `.piece-loading-controller`.",
            }[suffix] || "";

            const pairNote = n % 2 === 0
                ? `Token par — convenção: este é o estado **default**. O hover natural seria o token \`${String(n + 1).padStart(2, "0")}\`.`
                : `Token ímpar — convenção: este é o estado **hover** do token \`${String(n - 1).padStart(2, "0")}\`.`;

            return text([
                `## Classe: \`${classe}\``,
                "",
                `**Tipo:** Cor de propriedade — gerada dinamicamente pelo piece-css-generator.js`,
                `**Propriedade:** \`${property}\` → seta \`--piece-${property}-color\``,
                `**Tema:** \`${theme}\` — ${themeExplain}`,
                `**Token:** \`${token}\` → ${lightness}% de offset de lightness`,
                `**Par de tokens:** ${pairNote}`,
                suffix ? `**Estado:** ${suffixExplain}` : `**Estado:** default — ${suffixExplain}`,
                "",
                "**Requer:** \`.piece-surface\` no elemento.",
                "",
                "**Exemplo:**",
                "```html",
                `<div class="piece-surface ${classe}">...</div>`,
                "```",
                "",
                "**Todos os estados desta classe:**",
                `- \`${property}-color-${theme}-${token}\` — default`,
                `- \`${property}-color-${theme}-${token}-hover\` — hover`,
                `- \`${property}-color-${theme}-${token}-active\` — .piece-actived`,
                `- \`${property}-color-${theme}-${token}-hover-active\` — .piece-actived + hover`,
            ].join("\n"));
        }

        if (alphaMatch) {
            const { property, token, suffix } = alphaMatch.groups;
            const alpha = (Number(token) * 4 / 100).toFixed(2);
            const pct   = Number(token) * 4;

            const suffixExplain = {
                undefined:      "Sempre aplicado (default).",
                hover:          "Aplicado quando o mouse está sobre o elemento.",
                active:         "Aplicado quando o elemento tem `.piece-actived`.",
                "hover-active": "Aplicado quando tem `.piece-actived` E o mouse está sobre o elemento.",
            }[suffix] || "";

            return text([
                `## Classe: \`${classe}\``,
                "",
                `**Tipo:** Alpha de propriedade — controla o canal A do HSLA`,
                `**Propriedade:** \`${property}\` → seta \`--piece-${property}-a\``,
                `**Token:** \`${token}\` → alpha = \`${alpha}\` (${pct}% de opacidade)`,
                suffix ? `**Estado:** ${suffixExplain}` : `**Estado:** default — ${suffixExplain}`,
                "",
                "**IMPORTANTE:** Nunca use `opacity:` no CSS para controlar transparência de cores.",
                "O alpha por propriedade afeta apenas aquela cor, sem vazar para filhos ou texto.",
                "",
                "**Requer:** \`.piece-surface\` no elemento.",
                "",
                "**Exemplo:**",
                "```html",
                `<div class="piece-surface background-color-auto-02 ${classe}">`,
                `  <!-- fundo com ${pct}% de opacidade -->`,
                `</div>`,
                "```",
            ].join("\n"));
        }

        if (blurMatch) {
            const { token, suffix } = blurMatch.groups;
            const px = Number(token) * 2;

            return text([
                `## Classe: \`${classe}\``,
                "",
                `**Tipo:** Blur de backdrop — aplica blur no background do elemento`,
                `**Token:** \`${token}\` → \`blur(${px}px)\` via backdrop-filter`,
                suffix ? `**Estado:** \`${suffix}\`` : "**Estado:** default",
                "",
                "**IMPORTANTE:** Nunca use `backdrop-filter` ou `filter: blur()` diretamente no CSS.",
                "Use sempre a classe de token.",
                "",
                "⚠️ \`backdrop-filter\` cria um containing block. Elementos \`position: fixed\`",
                "dentro deste elemento podem se comportar de forma inesperada.",
                "",
                "**Requer:** \`.piece-surface\` no elemento.",
                "",
                "**Exemplo típico (glass effect):**",
                "```html",
                `<div class="piece-surface ${classe} piece-background-alpha-04">`,
                `  <!-- blur(${px}px) com fundo semi-transparente -->`,
                `</div>`,
                "```",
            ].join("\n"));
        }

        const inFiles = [...cssCache.keys()].filter(f => cssCache.get(f).includes(classe));
        if (inFiles.length > 0) {
            return text(`## Classe: \`${classe}\`\nEncontrada em: ${inFiles.join(", ")}\n\nUse \`buscar_estilo\` para ver o CSS completo.`);
        }

        return text([
            `## Classe: \`${classe}\``,
            "",
            "Não reconhecida como classe do CSS Generator nem encontrada nos arquivos fonte.",
            "",
            "**Padrões válidos:**",
            "- Cor:   `{property}-color-{auto|light|dark|inverse}-{00–25}[-hover|-active|-hover-active]`",
            "- Alpha: `piece-{property}-alpha-{00–25}[-hover|-active|-hover-active]`",
            "- Blur:  `piece-blur-{00–25}[-hover|-active|-hover-active]`",
            "",
            "**Propriedades suportadas:** background, text, border, box-shadow, ripple,",
            "scrollbar-track-outline, scrollbar-thumb-background, scrollbar-thumb-border",
        ].join("\n"));
    }

    /* ---- sistema_de_cores ---- */
    if (name === "sistema_de_cores") {
        const f = join(CORE_DIR, "surface.md");
        if (!existsSync(f)) return err("core/surface.md não encontrado.");
        return text(readFileSync(f, "utf8"));
    }

    /* ---- sistema_js ---- */
    if (name === "sistema_js") {
        const f = join(CORE_DIR, "js.md");
        if (!existsSync(f)) return err("core/js.md não encontrado.");
        return text(readFileSync(f, "utf8"));
    }

    /* ---- listar_kit ---- */
    if (name === "listar_kit") {
        const { kit } = args;

        if (!kit) {
            const kits = readdirSync(KITS_DIR, { withFileTypes: true })
                .filter(d => d.isDirectory() && !KITS_SKIP.has(d.name))
                .map(d => d.name);
            if (kits.length === 0) return text("Nenhum kit encontrado.");
            return text(`## Kits disponíveis\n\n${kits.map(k => `- ${k}`).join("\n")}\n\nUse \`listar_kit(kit: "...")\` para ver os componentes de um kit.`);
        }

        const kitPath      = join(KITS_DIR, kit);
        const compPath     = join(kitPath, "components");
        const guidelinesFile = join(kitPath, "guidelines.md");

        if (!existsSync(kitPath)) return err(`Kit "${kit}" não encontrado.`);

        const lines = [`## ${kit}`];

        if (existsSync(guidelinesFile)) {
            lines.push("\n**Diretrizes disponíveis:** use `componente(kit, \"guidelines\")` para ler.");
        }

        if (existsSync(compPath)) {
            const components = readdirSync(compPath)
                .filter(f => f.endsWith(".md"))
                .map(f => f.replace(".md", ""));
            if (components.length > 0) {
                lines.push(`\n### Componentes\n${components.map(c => `- ${c}`).join("\n")}`);
                lines.push(`\nUse \`componente(kit: "${kit}", nome: "...")\` para ver a documentação.`);
            } else {
                lines.push("\nNenhum componente documentado ainda.");
            }
        } else {
            lines.push("\nPasta components/ não encontrada.");
        }

        return text(lines.join("\n"));
    }

    /* ---- componente ---- */
    if (name === "componente") {
        const { kit, nome } = args;
        const kitPath = join(KITS_DIR, kit);
        if (!existsSync(kitPath)) return err(`Kit "${kit}" não encontrado.`);

        // "guidelines" lê o arquivo raiz do kit
        if (nome === "guidelines") {
            const guidelinesFile = join(kitPath, "guidelines.md");
            if (!existsSync(guidelinesFile)) return err(`Kit "${kit}" não possui guidelines.md.`);
            return text(readFileSync(guidelinesFile, "utf8"));
        }

        // componentes ficam em kit/components/
        const filePath = join(kitPath, "components", `${nome}.md`);
        if (!existsSync(filePath)) {
            const compPath = join(kitPath, "components");
            const available = existsSync(compPath)
                ? readdirSync(compPath).filter(f => f.endsWith(".md")).map(f => f.replace(".md", ""))
                : [];
            return err(`Componente "${nome}" não encontrado no kit "${kit}".\nDisponíveis: ${available.join(", ") || "nenhum"}`);
        }
        return text(readFileSync(filePath, "utf8"));
    }

    return err(`Ferramenta desconhecida: ${name}`);
});

/* ---------- START ---------- */
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch(e => { process.stderr.write(e.message + "\n"); process.exit(1); });
