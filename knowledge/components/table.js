module.exports = {
    id: "table",
    name: "Table",
    file: "table.css",
    description: "Tabela com 5 variantes de altura de linha. Suporta HTML semântico (<table>, <thead>, etc.) ou classes utilitárias equivalentes.",

    structure: `
<table class="piece-table {size} piece-surface">
    <caption>Título da tabela</caption>
    <thead class="piece-surface background-color-auto-04">
        <tr>
            <th>Coluna 1</th>
            <th>Coluna 2</th>
            <th class="piece-center">Centro</th>
        </tr>
    </thead>
    <tbody>
        <tr class="piece-surface background-color-auto-02-hover">
            <td>Valor 1</td>
            <td>Valor 2</td>
            <td class="piece-center">X</td>
        </tr>
    </tbody>
    <tfoot class="piece-surface background-color-auto-04">
        <tr>
            <td>Total</td>
            <td>100</td>
            <td></td>
        </tr>
    </tfoot>
</table>`,

    requiredClasses: ["piece-table"],

    sizes: {
        "piece-extra-small": "tbody rows 40px, thead/tfoot 52px",
        "piece-small":       "tbody rows 43px, thead/tfoot 55px",
        "piece-medium":      "tbody rows 46px, thead/tfoot 58px (padrão)",
        "piece-large":       "tbody rows 49px, thead/tfoot 61px",
        "piece-extra-large": "tbody rows 52px, thead/tfoot 64px",
    },

    classAliases: `
Alternativas às tags HTML semânticas:
- .piece-head-group   = <thead>
- .piece-body         = <tbody>
- .piece-foot-group   = <tfoot>
- .piece-row          = <tr>
- .piece-head         = <th>
- .piece-col          = <td>
- .piece-foot         = <tfoot td>
- .piece-caption      = <caption>`,

    modifiers: {
        "piece-center":  "text-align: center na célula",
        "piece-justify": "text-align-last: justify na célula",
    },

    notes: [
        "border-collapse: separate + border-spacing: 1px — permite bordas arredondadas por célula",
        "width: 100% — ocupa toda a largura do container",
        "caption e .piece-caption: font-size 12px, font-weight 500",
        "th/.piece-head: padding 16px 8px, font-weight 900",
        "td/.piece-col: padding 4px 8px, font-weight 400",
        "Todos os filhos têm padding: 4px via * { padding: 4px !important }",
    ],

    examples: {
        basic: `
<table class="piece-table piece-medium piece-surface">
    <thead class="piece-surface background-color-auto-04 text-color-auto-20">
        <tr>
            <th>Nome</th>
            <th>Email</th>
            <th class="piece-center">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr class="piece-surface text-color-auto-18 background-color-auto-02-hover">
            <td>João Silva</td>
            <td>joao@email.com</td>
            <td class="piece-center">✓</td>
        </tr>
        <tr class="piece-surface text-color-auto-18 background-color-auto-02-hover">
            <td>Maria Santos</td>
            <td>maria@email.com</td>
            <td class="piece-center">✓</td>
        </tr>
    </tbody>
</table>`,
    }
}
