import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  makeStyles,
  Card,
  Title3,
  Text,
  Badge,
  Button,
} from '@fluentui/react-components';
import { ClipboardTaskListLtrRegular, ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { padding: '20px' },
  header: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  ticketItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px',
    backgroundColor: 'var(--bg-sidebar)'
  },
  ticketInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px' }
});

export default function AbaCampainhaLista() {
  const styles = useStyles();
  const { state } = useAuth();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const tickets = useMemo(() => {
    return (state.tickets || []).slice().reverse();
  }, [state.tickets]);

  const totalPages = Math.max(1, Math.ceil(tickets.length / itemsPerPage));
  
  const currentTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tickets.slice(startIndex, startIndex + itemsPerPage);
  }, [tickets, currentPage, itemsPerPage]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RECEBIDO': return <Badge appearance="filled" color="warning">NOVO</Badge>;
      case 'ATENDENDO': return <Badge appearance="filled" color="brand">ATENDENDO</Badge>;
      case 'FECHADO': return <Badge appearance="filled" color="success">FECHADO</Badge>;
      default: return <Badge appearance="tint">{status}</Badge>;
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} appearance="outline">
        <div className={styles.header}>
          <ClipboardTaskListLtrRegular style={{ fontSize: '24px', color: 'var(--color-brand)' }} />
          <Title3>Histórico de Chamados (Campainha)</Title3>
        </div>

        {tickets.length === 0 ? (
          <Text style={{ color: 'var(--color-text-secondary)' }}>Nenhum chamado registrado ainda.</Text>
        ) : (
          <>
            <div className={styles.listContainer}>
              {currentTickets.map(ticket => (
                <div key={ticket.id} className={styles.ticketItem}>
                  <div className={styles.ticketInfo}>
                    <Text weight="semibold">{ticket.studentName} — {ticket.classId}</Text>
                    <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
                      {ticket.reasons?.join(', ')} → {ticket.destination}
                    </Text>
                    <Text size={100} style={{ color: 'var(--color-text-secondary)' }}>
                      {new Date(ticket.createdAt).toLocaleString('pt-BR')}
                    </Text>
                  </div>
                  <div>
                    {getStatusBadge(ticket.status)}
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Button 
                  icon={<ChevronLeftRegular />} 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  Anterior
                </Button>
                <Text weight="semibold">Página {currentPage} de {totalPages}</Text>
                <Button 
                  icon={<ChevronRightRegular />} 
                  iconPosition="after"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
