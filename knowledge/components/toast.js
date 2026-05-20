module.exports = {
    id: "toast",
    name: "Toast",
    file: "toast.css",
    description: "Notificação informativa simples. Centralizada na tela, sem ações. Use Snackbar quando precisar de botões.",

    structure: `
<div class="piece-toast piece-surface">
    <span class="material-symbols-rounded piece-icon" translate="no">{icon}</span>  <!-- opcional -->
    <span class="piece-label">{mensagem}</span>
</div>`,

    requiredClasses: ["piece-toast", "piece-surface"],

    positioning: `
position: fixed
bottom: 16px (ajustado automaticamente pelo PieceToast.show() em mobile)
left: 50% + translateX(-50%) → centralizado horizontalmente
pointer-events: none → não bloqueia cliques
z-index: 9999`,

    animations: {
        "piece-toast-enter": "Slide up + fade in (0.25s)",
        "piece-toast-exit":  "Slide down + fade out (0.25s)",
    },

    jsUtility: `
// PieceToast.show(message, icon?) — disponível globalmente via src/js/pieces/toast.js
// Detecta mobile via body.offsetWidth <= 799 (respeita classes screen-size-*)
// Posiciona acima da bottom bar (#m-aside) em mobile automaticamente

PieceToast.show('Arquivo salvo!', 'check_circle')
PieceToast.show('Erro ao conectar', 'error')
PieceToast.show('Mensagem simples') // sem ícone`,

    vsSnackbar: `
Toast:    só informativo, sem ações, centralizado, usa PieceToast.show()
Snackbar: pode ter botão de ação e fechar, fixado à esquerda, criado manualmente`,

    examples: {
        withIcon: `
<div class="piece-toast piece-surface">
    <span class="material-symbols-rounded piece-icon" translate="no">check_circle</span>
    <span class="piece-label">Salvo com sucesso!</span>
</div>`,

        withoutIcon: `
<div class="piece-toast piece-surface">
    <span class="piece-label">Conexão restaurada</span>
</div>`,

        viaJS: `
// Forma recomendada — usa o utilitário que posiciona corretamente
PieceToast.show('Salvo com sucesso!', 'check_circle')`,
    }
}
