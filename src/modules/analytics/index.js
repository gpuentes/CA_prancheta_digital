import { initClarity } from './clarity';
import { initHotjar } from './hotjar';

/**
 * Função central para inicializar todas as ferramentas de auditoria e analytics.
 * Ela busca os IDs nas variáveis de ambiente (.env) para manter a segurança.
 */
export const initAnalytics = () => {
  // Pega as variáveis de ambiente carregadas pelo Vite
  const clarityId = import.meta.env.VITE_CLARITY_ID;
  const hotjarId = import.meta.env.VITE_HOTJAR_ID;
  const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION;

  // Inicializa o Microsoft Clarity se o ID existir
  if (clarityId) {
    initClarity(clarityId);
  }

  // Inicializa o Hotjar se os IDs existirem
  if (hotjarId && hotjarVersion) {
    initHotjar(hotjarId, hotjarVersion);
  }

  // Futuramente podemos adicionar Google Analytics aqui
  // const googleId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  // if (googleId) initGoogle(googleId);
};
