/**
 * Serviço isolado para disparo de webhooks assíncronos (Fire-and-forget).
 * Módulo segregado para respeitar limites de linha do model.js e SRP.
 */

export const webhookService = {
  /**
   * Envia um alerta crítico para a fila do n8n se a configuração estiver presente.
   * @param {Object} occurrence - O objeto da ocorrência recém criada
   * @param {Object} studentInfo - O objeto do estudante vinculado
   */
  async sendCriticalAlert(occurrence, studentInfo) {
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    
    // Fallback passivo: Se a URL não estiver no .env, não faz nada (não quebra UI)
    if (!webhookUrl) {
      console.info('[Webhook] VITE_N8N_WEBHOOK_URL não configurado. Disparo ignorado.');
      return;
    }

    try {
      // Montagem do Payload obedecendo o Schema Específico
      const payload = {
        event: "CRITICAL_OCCURRENCE",
        timestamp: new Date().toISOString(),
        payload: {
          occurrenceId: occurrence.id,
          student: studentInfo ? {
            id: studentInfo.id,
            name: `${studentInfo.firstName} ${studentInfo.lastName}`.trim(),
            class: studentInfo.classId || 'N/A'
          } : { id: 'N/A', name: 'Desconhecido', class: 'N/A' },
          severity: occurrence.severity,
          destination: occurrence.destination || occurrence.location, // Fallback location
          reasons: occurrence.reasons || [],
          details: occurrence.details || '',
          location: occurrence.location || '',
          monitor: occurrence.monitorName || 'Sistema'
        },
        metadata: {
          source: "prancheta-digital-pwa",
          version: "1.0",
          requireAcknowledgement: true
        }
      };

      // Disparo assíncrono isolado (não retornar o await para a interface)
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(err => {
        // Falhas de rede do PWA Offline não devem crashar a aplicação
        console.error('[Webhook] Falha de comunicação de rede no disparo:', err);
      });
      
    } catch (error) {
      // Captura segura de erros de parsing ou execução
      console.error('[Webhook] Falha interna ao montar payload do alerta:', error);
    }
  }
};
