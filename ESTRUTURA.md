# Pieces MCP — Estrutura

Servidor MCP local (stdio). Lê arquivos do filesystem em tempo de execução.
Zero chamadas HTTP. Zero loops de reconexão.

---

## Arquivos

```
pieces/mcp/
├─ server.js                  ← entrada do servidor, só lógica de roteamento
├─ ESTRUTURA.md               ← este arquivo
│
├─ core/                      ← documentação do Pieces Core (pré-requisitos)
│   ├─ surface.md             ← surface, tokens, temas, canais, alpha, blur
│   └─ js.md                  ← ripple, disabled, interactive, toggle, tooltip
│
└─ neutral/                   ← Neutral Kit
    ├─ guidelines.md          ← filosofia visual e regras do kit
    └─ components/
        ├─ icon-button.md
        ├─ radio.md
        └─ checkbox.md
```

Para adicionar um novo kit: criar pasta irmã de `neutral/` com `guidelines.md` e `components/`.
O servidor detecta automaticamente — sem editar `server.js`.

---

## Ferramentas (tools)

### Pré-requisitos — ler antes de qualquer kit

| Tool | Arquivo lido | Descrição |
|------|-------------|-----------|
| `sistema_de_cores` | `core/surface.md` | Surface, tokens 00–25, temas, canais, harmonias, alpha, blur e regras absolutas |
| `sistema_js` | `core/js.md` | Todos os JS do core: ripple, disabled, interactive, toggle, tooltip, css-generator |

### Kits e componentes

| Tool | Parâmetros | Descrição |
|------|-----------|-----------|
| `listar_kit` | `kit?` | Sem parâmetro: lista todos os kits. Com kit: mostra guidelines + componentes disponíveis |
| `componente` | `kit, nome` | Lê `kit/components/{nome}.md`. Use `nome: "guidelines"` para ler as diretrizes do kit |

### Busca no código-fonte CSS/JS

| Tool | Parâmetros | Descrição |
|------|-----------|-----------|
| `listar_componentes` | — | Lista todos os arquivos CSS e JS de `src/css/pieces/` e `src/js/pieces/` |
| `buscar_componente` | `nome` | Retorna o CSS completo de um arquivo de componente pelo nome (sem `.css`) |
| `buscar_core` | `arquivo` | Retorna `pieces.css`, `theme.css` ou `surface.css` do src |
| `buscar_estilo` | `query` | Busca uma string/classe em todos os arquivos CSS do design system |
| `explicar_classe` | `classe` | Explica uma classe de token dinamicamente (cor, alpha, blur) com cálculo de lightness |

---

## Fluxo recomendado de uso

```
1. sistema_de_cores          → entender o surface antes de tudo
2. sistema_js                → entender os comportamentos JS
3. listar_kit()              → ver quais kits existem
4. listar_kit("neutral")     → ver o que o neutral tem
5. componente("neutral", "guidelines")   → filosofia do kit
6. componente("neutral", "icon-button")  → documentação do componente
```

---

## Como o servidor funciona

- **Transporte:** stdio (sem HTTP, sem porta, sem reconexão)
- **Cache CSS/JS:** todos os arquivos de `src/css/pieces/` e `src/js/pieces/` são carregados
  em memória na inicialização — leitura única, zero I/O por chamada nas buscas
- **Kits/Core:** lidos sob demanda via `readFileSync` quando chamados
- **`explicar_classe`:** única tool com lógica dinâmica — regex + cálculo de tokens,
  sem arquivo externo (conteúdo é gerado com variáveis, não é texto fixo)

---

## Dependências

SDK instalado em `C:\pieces-mcp\node_modules` (fora do Google Drive para evitar
problemas de extração em caminhos com espaços).

Configuração em `~/.claude/settings.json`:
```json
"pieces": {
  "type": "stdio",
  "command": "node",
  "args": ["D:\\Meu Drive\\NEXUS\\Nexus 5.0\\pieces\\mcp\\server.js"],
  "env": { "NODE_PATH": "C:\\pieces-mcp\\node_modules" }
}
```
