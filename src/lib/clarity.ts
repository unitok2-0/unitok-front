declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

/**
 * Correlaciona a sessão atual do Microsoft Clarity com o usuário logado.
 * Chama a API exposta pelo próprio snippet de rastreamento (sem depender
 * do pacote @microsoft/clarity) — ver snippet em `pages/_app.tsx`.
 */
export function identifyClarityUser(userId: string, attemptsLeft = 5) {
  if (typeof window === "undefined" || !userId) return;

  if (!window.clarity) {
    // O script (next/script strategy="afterInteractive") pode ainda não ter
    // carregado quando o usuário é resolvido; tenta novamente por alguns instantes.
    if (attemptsLeft <= 0) return;
    setTimeout(() => identifyClarityUser(userId, attemptsLeft - 1), 500);
    return;
  }

  window.clarity("identify", userId);
}
