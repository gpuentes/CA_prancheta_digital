import React, { useState, useMemo } from 'react';
import { 
  makeStyles, Title2, Input, Card, Text, Badge, Button, Avatar 
} from '@fluentui/react-components';
import { SearchRegular, AlertUrgentRegular } from '@fluentui/react-icons';
import { mockStudents, contextRules, formatStudentName } from '../utils/mockData';

const useStyles = makeStyles({
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#faf9f8',
    minHeight: '100vh',
  },
  searchBox: {
    width: '100%',
    marginBottom: '10px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  studentCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f3f2f1'
    }
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  warning: {
    color: '#d13438',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontWeight: 'bold',
    fontSize: '12px'
  }
});

// Helper para testar se horário atual (HH:MM) está dentro da regra (HH:MM-HH:MM)
const isTimeInWindow = (currentTime, timeWindow) => {
  const [start, end] = timeWindow.split('-');
  return currentTime >= start && currentTime <= end;
};

export default function Monitor() {
  const styles = useStyles();
  const [searchQuery, setSearchQuery] = useState('');

  // Para simulação, fixamos o horário de busca do monitor às 09:45 (Recreio do EF)
  const currentTime = "09:45"; 

  // Algoritmo Preditivo (Contextual)
  const filteredStudents = useMemo(() => {
    // 1. Descobrir se há uma regra ativa no horário atual
    const activeRule = contextRules.find(rule => isTimeInWindow(currentTime, rule.time_window));
    
    let baseStudents = mockStudents;
    
    // 2. Se houver regra ativa, filtra a base (Busca Preditiva de Pátio)
    if (activeRule) {
      baseStudents = mockStudents.filter(student => activeRule.classrooms.includes(student.sala));
    }

    // 3. Aplica a busca em texto do Typeahead (Mínimo de 1 letra digitada)
    if (searchQuery.trim().length === 0) return [];
    
    return baseStudents.filter(student => 
      student.nomeCompleto.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentTime]);

  return (
    <div className={styles.container}>
      <Title2>Novo Chamado (Pátio)</Title2>
      <Text italic>Simulação: Horário atual é {currentTime}</Text>
      
      <Input
        className={styles.searchBox}
        placeholder="Buscar aluno (Mínimo 3 letras)..."
        contentBefore={<SearchRegular />}
        value={searchQuery}
        onChange={(e, data) => setSearchQuery(data.value)}
        size="large"
      />

      {searchQuery.length > 0 && (
        <div className={styles.list}>
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <Card key={student.id} className={styles.studentCard} appearance="outline">
                <Avatar image={{ src: student.foto }} size={48} name={student.nomeCompleto} />
                <div className={styles.info}>
                  <Text weight="semibold">
                    {formatStudentName(student.nomeCompleto)} - {student.serie}
                  </Text>
                  {student.recorrente && (
                    <div className={styles.warning}>
                      <AlertUrgentRegular />
                      <Text size={200}>RECORRENTE</Text>
                    </div>
                  )}
                </div>
                <Button appearance="primary" size="large">Autuar</Button>
              </Card>
            ))
          ) : (
            <Text>Nenhum aluno encontrado neste contexto.</Text>
          )}
        </div>
      )}
    </div>
  );
}
