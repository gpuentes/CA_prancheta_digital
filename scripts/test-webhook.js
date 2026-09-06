import https from 'https';

const url = process.env.VITE_N8N_WEBHOOK_URL || 'https://fila.online.des.br/webhook/ca-prancheta-alerta-critico';

console.log('📡 Disparando teste para:', url);

const samplePayload = {
  event: 'CRITICAL_OCCURRENCE',
  timestamp: new Date().toISOString(),
  payload: {
    occurrenceId: 'occ-test-' + Date.now(),
    student: {
      id: 's1',
      name: 'Gabriel Oliveira',
      class: '08 MB'
    },
    severity: 'error',
    destination: 'Diretoria',
    reasons: ['Corrida / Acidente'],
    details: 'Teste assíncrono de homologação de Webhook (TASK-SP3-01).',
    location: 'Pátio Principal',
    monitor: 'Guilherme Puentes (CTO)'
  },
  metadata: {
    source: 'prancheta-digital-pwa',
    version: '1.0',
    requireAcknowledgement: true
  }
};

const data = JSON.stringify(samplePayload, null, 2);

console.log('\n📦 Payload enviado:\n', data);

const u = new URL(url);

const req = https.request({
  hostname: u.hostname,
  port: u.port || 443,
  path: u.pathname + u.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('\n-----------------------------------------');
    console.log('HTTP Status Code:', res.statusCode);
    console.log('Resposta do n8n:');
    try {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      console.log(body);
    }
    console.log('-----------------------------------------');

    if (res.statusCode === 200) {
      console.log('✅ SUCESSO! O webhook de produção recebeu o alerta e respondeu 200 OK.');
      console.log('👉 Verifique no n8n a aba "Executions" para ver o fluxo processado.');
    } else if (res.statusCode === 404) {
      console.log('⚠️ ATENÇÃO: O webhook retornou 404 porque o workflow precisa ser ATIVADO no n8n.');
      console.log('👉 No editor do n8n, salve o fluxo (Ctrl+S) e ligue o toggle "Active" (topo direito).');
    }
  });
});

req.on('error', (err) => {
  console.error('❌ Erro de conexão:', err.message);
});

req.write(data);
req.end();
