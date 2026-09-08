/**
 * seed.js — Carga Inicial de Dados (Seed) para Prisma & PostgreSQL
 * Baseado na planta física (docs/mapeamento_salas.md) e regras WUXIA-OPS
 */

export const LOCAIS_SEED = [
  // ─── PISO SUPERIOR ──────────────────────────────────────────────────────────
  // Corredor Esquerdo
  { codigo: 'SALA_24', nome: 'Sala 24', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Esquerdo' },
  { codigo: 'SALA_23', nome: 'Sala 23', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Esquerdo' },
  { codigo: 'SALA_22', nome: 'Sala 22', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Esquerdo' },
  { codigo: 'SALA_21', nome: 'Sala 21', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Esquerdo' },

  // Corredor Superior
  { codigo: 'ORIENT_F2_MED', nome: 'Orientação (Fund. II e Médio)', piso: 'SUPERIOR', tipo: 'ADMINISTRATIVO', ala: 'Corredor Superior' },
  { codigo: 'SALA_25', nome: 'Sala 25', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Superior' },
  { codigo: 'SALA_26', nome: 'Sala 26', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Superior' },
  { codigo: 'SALA_27', nome: 'Sala 27', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Superior' },
  { codigo: 'SALA_28', nome: 'Sala 28', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Superior' },
  { codigo: 'SALA_29', nome: 'Sala 29', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Superior' },

  // Corredor Direito
  { codigo: 'SALA_30', nome: 'Sala 30', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Direito' },
  { codigo: 'SALA_31', nome: 'Sala 31', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Direito' },
  { codigo: 'SALA_32', nome: 'Sala 32', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Direito' },
  { codigo: 'SALA_33', nome: 'Sala 33', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Direito' },
  { codigo: 'SALA_34', nome: 'Sala 34', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Corredor Direito' },

  // Bloco Central
  { codigo: 'SALA_18', nome: 'Sala 18', piso: 'SUPERIOR', tipo: 'SALA_AULA', ala: 'Bloco Central' },

  // ─── PISO INFERIOR (TÉRREO) ────────────────────────────────────────────────
  // Corredor Esquerdo
  { codigo: 'SALA_15', nome: 'Sala 15', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Esquerdo' },
  { codigo: 'SALA_14', nome: 'Sala 14', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Esquerdo' },
  { codigo: 'SALA_13', nome: 'Sala 13', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Esquerdo' },

  // Corredor Central (Acima do Centro de Pesquisa)
  { codigo: 'CPD', nome: 'C.P.D.', piso: 'INFERIOR', tipo: 'APOIO', ala: 'Corredor Central' },
  { codigo: 'SALA_20', nome: 'Sala 20', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Central' },
  { codigo: 'SALA_19', nome: 'Sala 19', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Central' },
  { codigo: 'SALA_17', nome: 'Sala 17', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Central' },
  { codigo: 'SALA_16', nome: 'Sala 16', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Central' },

  // Corredor Inferior (Entrada Principal / Rua Jales)
  { codigo: 'SALA_12', nome: 'Sala 12', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Inferior' },
  { codigo: 'SALA_11', nome: 'Sala 11', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Inferior' },
  { codigo: 'SALA_10', nome: 'Sala 10', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Inferior' },
  { codigo: 'SALA_09', nome: 'Sala 09', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Corredor Inferior' },

  // Bloco Direito (Pátio Infantil)
  { codigo: 'SALA_01', nome: 'Sala 01', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },
  { codigo: 'SALA_02', nome: 'Sala 02', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },
  { codigo: 'SALA_03', nome: 'Sala 03', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },
  { codigo: 'SALA_04', nome: 'Sala 04', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },
  { codigo: 'SALA_05', nome: 'Sala 05', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },
  { codigo: 'SALA_06', nome: 'Sala 06', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },
  { codigo: 'SALA_07', nome: 'Sala 07', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },
  { codigo: 'SALA_08', nome: 'Sala 08', piso: 'INFERIOR', tipo: 'SALA_AULA', ala: 'Pátio Infantil' },

  // ─── SALAS ADMINISTRATIVAS E APOIO ──────────────────────────────────────────
  { codigo: 'DIRECAO_GERAL', nome: 'Direção, Coordenação e Secretarias', piso: 'ADMINISTRATIVO', tipo: 'ADMINISTRATIVO', ala: 'Perto do Pátio' },
  { codigo: 'ADM_FUND_1', nome: 'ADM Fund I', piso: 'ADMINISTRATIVO', tipo: 'ADMINISTRATIVO', ala: 'Hall de Entrada' },
  { codigo: 'SALA_PROFESSORES', nome: 'Sala dos Professores', piso: 'ADMINISTRATIVO', tipo: 'APOIO', ala: 'Hall Administrativo' },
  { codigo: 'CENTRO_PESQUISA', nome: 'Centro de Pesquisa', piso: 'INFERIOR', tipo: 'LABORATORIO', ala: 'Corredor Central' },
  { codigo: 'VICE_DIRECAO', nome: 'Vice Direção', piso: 'ADMINISTRATIVO', tipo: 'ADMINISTRATIVO', ala: 'Hall Administrativo' },
  { codigo: 'CANTINA', nome: 'Cantina', piso: 'INFERIOR', tipo: 'APOIO', ala: 'Pátio Central' },

  // ─── BLOCOS ANEXOS (LADO DIREITO DA PLANTA) ─────────────────────────────────
  // Superior
  { codigo: 'ARQUIVO_MORTO', nome: 'Arquivo Morto', piso: 'BLOCO_ANEXO', tipo: 'APOIO', ala: 'Bloco Anexo Superior' },
  { codigo: 'CONTRA_TURNO_03', nome: 'Contra-turno 03', piso: 'BLOCO_ANEXO', tipo: 'SALA_AULA', ala: 'Bloco Anexo Superior' },
  { codigo: 'CONTRA_TURNO_02', nome: 'Contra-turno 02', piso: 'BLOCO_ANEXO', tipo: 'SALA_AULA', ala: 'Bloco Anexo Superior' },
  { codigo: 'CONTRA_TURNO_01', nome: 'Contra-turno 01', piso: 'BLOCO_ANEXO', tipo: 'SALA_AULA', ala: 'Bloco Anexo Superior' },

  // Inferior / Fundos
  { codigo: 'QUADRA', nome: 'Quadra Poliesportiva', piso: 'BLOCO_ANEXO', tipo: 'ESPORTIVO', ala: 'Fundos' },
  { codigo: 'BRINQUEDAO', nome: 'Brinquedão', piso: 'BLOCO_ANEXO', tipo: 'APOIO', ala: 'Pátio Infantil' },
  { codigo: 'MUSICA_PROJETO_VIDA', nome: 'Música (Projeto de Vida)', piso: 'BLOCO_ANEXO', tipo: 'SALA_AULA', ala: 'Fundos' },
  { codigo: 'DEPOSITO', nome: 'Depósito', piso: 'BLOCO_ANEXO', tipo: 'APOIO', ala: 'Fundos' },
  { codigo: 'LAB_CIENCIAS', nome: 'Laboratório de Ciências', piso: 'BLOCO_ANEXO', tipo: 'LABORATORIO', ala: 'Fundos' },
];

export const TIPO_OCORRENCIAS_SEED = [
  { label: 'Falta de Uniforme (Blusa)', categoria: 'UNIFORME', gravidade: 'LEVE' },
  { label: 'Uso de Celular', categoria: 'EQUIPAMENTO', gravidade: 'LEVE' },
  { label: 'Conversa em Excesso', categoria: 'CONDUTA', gravidade: 'LEVE' },
  { label: 'Corrida / Acidente', categoria: 'CONDUTA', gravidade: 'MEDIA' },
  { label: 'Adorno Inadequado', categoria: 'UNIFORME', gravidade: 'LEVE' },
  { label: 'Atraso de Entrada', categoria: 'CONDUTA', gravidade: 'LEVE' },
  { label: 'Desacato / Desobediência', categoria: 'CONDUTA', gravidade: 'GRAVE' },
  { label: 'Outro / Observação', categoria: 'OUTRO', gravidade: 'LEVE' },
];

export const QUICK_ACTIONS_SEED = [
  { label: 'Falta Uniforme (Blusa)', template: 'Aluno sem blusa encaminhado para coordenação.', destinoDefault: 'Coordenação', ordem: 1 },
  { label: 'Liberação Antecipada', template: 'Aluno liberado para ir embora com autorização da secretaria.', destinoDefault: 'Ir embora', ordem: 2 },
  { label: 'Uso Indevido Celular', template: 'Aluno utilizando aparelho celular em sala/corredor.', destinoDefault: 'Disciplinar', ordem: 3 },
  { label: 'Conversa e Dispersão', template: 'Aluno atrapalhando o andamento da aula.', destinoDefault: 'Disciplinar', ordem: 4 },
  { label: 'Atendimento Médico / Mal-estar', template: 'Aluno encaminhado para a enfermaria/orientação com queixa de dor.', destinoDefault: 'Orientação', ordem: 5 },
];

/**
 * Função de execução com PrismaClient
 */
export async function runSeed(prisma) {
  console.log('🌱 Iniciando Seed da Prancheta Digital...');

  // 1. Locais
  for (const loc of LOCAIS_SEED) {
    await prisma.local.upsert({
      where: { codigo: loc.codigo },
      update: loc,
      create: loc,
    });
  }
  console.log(`✓ ${LOCAIS_SEED.length} locais físicos sincronizados.`);

  // 2. Tipos de Ocorrência
  for (const tipo of TIPO_OCORRENCIAS_SEED) {
    await prisma.tipoOcorrencia.upsert({
      where: { label: tipo.label },
      update: tipo,
      create: tipo,
    });
  }
  console.log(`✓ ${TIPO_OCORRENCIAS_SEED.length} tipos de ocorrência sincronizados.`);

  // 3. Quick Actions
  for (const qa of QUICK_ACTIONS_SEED) {
    const existing = await prisma.quickAction.findFirst({ where: { label: qa.label } });
    if (!existing) {
      await prisma.quickAction.create({ data: qa });
    }
  }
  console.log(`✓ ${QUICK_ACTIONS_SEED.length} botões de ação rápida sincronizados.`);

  console.log('🏁 Seed concluído com sucesso!');
}
