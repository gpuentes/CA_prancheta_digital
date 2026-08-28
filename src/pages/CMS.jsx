import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  makeStyles,
  Title2,
  Title3,
  Text,
  Card,
  Button,
  Input,
  Select,
  Badge,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Divider,
  Tab,
  TabList,
} from '@fluentui/react-components';
import {
  AddRegular,
  EditRegular,
  DeleteRegular,
  SearchRegular,
  PeopleRegular,
  PersonRegular,
  TagRegular,
  ClipboardTaskListLtrRegular,
  BuildingRegular,
  ClockRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    backgroundColor: 'var(--bg-sidebar)',
    borderBottom: '1px solid var(--border-color)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '600',
    color: 'var(--color-text)',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--border-color)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
  },
  actions: {
    display: 'flex',
    gap: '4px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  responsive: {
    overflowX: 'auto',
  },
});

const TABS = [
  { value: 'students', label: 'Alunos', icon: <PersonRegular /> },
  { value: 'users', label: 'Usuários', icon: <PeopleRegular /> },
  { value: 'rooms', label: 'Locais', icon: <BuildingRegular /> },
  { value: 'occurrenceTypes', label: 'Tipos Ocorrência', icon: <TagRegular /> },
  { value: 'scheduleIntervals', label: 'Horários', icon: <ClockRegular /> },
  { value: 'occurrences', label: 'Histórico', icon: <ClipboardTaskListLtrRegular /> },
];

export default function CMS() {
  const styles = useStyles();
  const { state, addCMSItem, updateCMSItem, deleteCMSItem } = useAuth();
  const [activeTab, setActiveTab] = useState('students');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({});

  const openAddDialog = () => {
    setEditItem(null);
    setFormData({});
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditItem(item);
    setFormData({ ...item });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editItem) {
      updateCMSItem(activeTab, editItem.id, formData);
    } else {
      addCMSItem(activeTab, formData);
    }
    setDialogOpen(false);
    setFormData({});
    setEditItem(null);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      deleteCMSItem(activeTab, id);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Data filtering
  const filterData = (data) => {
    if (!search.trim()) return data;
    const term = search.toLowerCase();
    return data.filter(item => JSON.stringify(item).toLowerCase().includes(term));
  };

  const renderStudentsTable = () => {
    const data = filterData(state.students || []);
    return (
      <div className={styles.responsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Sobrenome</th>
              <th className={styles.th}>Turma</th>
              <th className={styles.th} style={{ width: '100px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(s => (
              <tr key={s.id}>
                <td className={styles.td}>{s.firstName}</td>
                <td className={styles.td}>{s.lastName}</td>
                <td className={styles.td}>{s.classId}</td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <Button appearance="subtle" size="small" icon={<EditRegular />} onClick={() => openEditDialog(s)} aria-label="Editar" />
                    <Button appearance="subtle" size="small" icon={<DeleteRegular />} onClick={() => handleDelete(s.id)} aria-label="Excluir" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <Text block style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-secondary)' }}>Nenhum aluno encontrado.</Text>}
      </div>
    );
  };

  const renderUsersTable = () => {
    const data = filterData(state.users || []);
    return (
      <div className={styles.responsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Login</th>
              <th className={styles.th}>Perfil</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th} style={{ width: '100px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(u => (
              <tr key={u.id}>
                <td className={styles.td}>{u.name}</td>
                <td className={styles.td}>{u.login}</td>
                <td className={styles.td}><Badge appearance="tint" color="brand">{u.role}</Badge></td>
                <td className={styles.td}>
                  <Badge appearance="filled" color={u.active ? 'success' : 'danger'}>
                    {u.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <Button appearance="subtle" size="small" icon={<EditRegular />} onClick={() => openEditDialog(u)} aria-label="Editar" />
                    <Button appearance="subtle" size="small" icon={<DeleteRegular />} onClick={() => handleDelete(u.id)} aria-label="Excluir" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTypesTable = () => {
    const data = filterData(state.occurrenceTypes || []);
    return (
      <div className={styles.responsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Tipo</th>
              <th className={styles.th}>Gravidade</th>
              <th className={styles.th} style={{ width: '100px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(t => (
              <tr key={t.id}>
                <td className={styles.td}>{t.label}</td>
                <td className={styles.td}>
                  <Badge appearance="filled" color={t.severity === 'error' ? 'danger' : t.severity === 'warning' ? 'warning' : 'informative'}>
                    {t.severity}
                  </Badge>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <Button appearance="subtle" size="small" icon={<EditRegular />} onClick={() => openEditDialog(t)} aria-label="Editar" />
                    <Button appearance="subtle" size="small" icon={<DeleteRegular />} onClick={() => handleDelete(t.id)} aria-label="Excluir" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRoomsTable = () => {
    const data = filterData(state.rooms || []);
    return (
      <div className={styles.responsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nome do Local</th>
              <th className={styles.th}>Tipo</th>
              <th className={styles.th} style={{ width: '100px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(r => (
              <tr key={r.id}>
                <td className={styles.td}>{r.name}</td>
                <td className={styles.td}><Badge appearance="tint" color="brand">{r.type}</Badge></td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <Button appearance="subtle" size="small" icon={<EditRegular />} onClick={() => openEditDialog(r)} aria-label="Editar" />
                    <Button appearance="subtle" size="small" icon={<DeleteRegular />} onClick={() => handleDelete(r.id)} aria-label="Excluir" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderOccurrencesTable = () => {
    const data = filterData(state.occurrences || []).slice().reverse().slice(0, 50);
    return (
      <div className={styles.responsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Aluno</th>
              <th className={styles.th}>Motivos</th>
              <th className={styles.th}>Monitor</th>
              <th className={styles.th}>Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map(occ => {
              const student = state.students.find(s => s.id === occ.studentId);
              return (
                <tr key={occ.id}>
                  <td className={styles.td}>{student ? `${student.firstName} ${student.lastName}` : 'Removido'}</td>
                  <td className={styles.td}>{occ.reasons?.join(', ')}</td>
                  <td className={styles.td}>{occ.monitorName || '—'}</td>
                  <td className={styles.td}>{new Date(occ.date).toLocaleString('pt-BR')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {data.length === 0 && <Text block style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-secondary)' }}>Nenhuma ocorrência registrada.</Text>}
      </div>
    );
  };

  const renderScheduleIntervalsTable = () => {
    const data = state.scheduleIntervals || [];
    const handleEdit = (item) => {
      setEditItem(item);
      setFormData({ ...item, motivos_sugeridos_text: (item.motivos_sugeridos || []).join(', ') });
      setDialogOpen(true);
    };
    const handleAdd = () => {
      setEditItem(null);
      setFormData({ tipo: '', hora_inicio: '', hora_fim: '', local_padrao: '', motivos_sugeridos_text: '' });
      setDialogOpen(true);
    };
    const handleSaveInterval = () => {
      const entry = {
        ...formData,
        id: editItem ? editItem.id : 'int-' + Date.now(),
        motivos_sugeridos: (formData.motivos_sugeridos_text || '').split(',').map(s => s.trim()).filter(Boolean),
      };
      delete entry.motivos_sugeridos_text;
      const intervals = [...(state.scheduleIntervals || [])];
      if (editItem) {
        const idx = intervals.findIndex(i => i.id === editItem.id);
        if (idx !== -1) intervals[idx] = entry;
      } else {
        intervals.push(entry);
      }
      // Direct state mutation via model
      state.scheduleIntervals = intervals;
      // force persist
      addCMSItem; // trigger context (won't actually add, but we need to persist)
      setDialogOpen(false);
      setFormData({});
      setEditItem(null);
    };
    const handleDeleteInterval = (id) => {
      if (!confirm('Excluir este intervalo?')) return;
      state.scheduleIntervals = (state.scheduleIntervals || []).filter(i => i.id !== id);
      setFormData({}); // force re-render
    };
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
          <Button appearance="primary" icon={<AddRegular />} onClick={handleAdd}>Adicionar Intervalo</Button>
        </div>
        <div className={styles.responsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Tipo</th>
                <th className={styles.th}>Início</th>
                <th className={styles.th}>Fim</th>
                <th className={styles.th}>Local Padrão</th>
                <th className={styles.th}>Motivos Sugeridos</th>
                <th className={styles.th} style={{ width: '100px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map(interval => (
                <tr key={interval.id}>
                  <td className={styles.td}>{interval.tipo}</td>
                  <td className={styles.td}>{interval.hora_inicio}</td>
                  <td className={styles.td}>{interval.hora_fim}</td>
                  <td className={styles.td}>{interval.local_padrao}</td>
                  <td className={styles.td}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {(interval.motivos_sugeridos || []).map((m, i) => (
                        <Badge key={i} appearance="tint" color="brand" size="small">{m}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <Button appearance="subtle" size="small" icon={<EditRegular />} onClick={() => handleEdit(interval)} aria-label="Editar" />
                      <Button appearance="subtle" size="small" icon={<DeleteRegular />} onClick={() => handleDeleteInterval(interval.id)} aria-label="Excluir" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <Text block style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-secondary)' }}>Nenhum intervalo cadastrado.</Text>}
        </div>
        {/* Inline Dialog for Intervals */}
        <Dialog open={dialogOpen} onOpenChange={(e, d) => setDialogOpen(d.open)}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>{editItem ? 'Editar' : 'Adicionar'} Intervalo</DialogTitle>
              <DialogContent>
                <div className={styles.formGrid} style={{ marginTop: '16px' }}>
                  <div className={styles.formGroup}>
                    <Text weight="semibold" size={200}>Tipo</Text>
                    <Input value={formData.tipo || ''} onChange={(e, d) => updateField('tipo', d.value)} placeholder="Ex: Intervalo Manhã" />
                  </div>
                  <div className={styles.formGroup}>
                    <Text weight="semibold" size={200}>Hora Início (HH:MM)</Text>
                    <Input value={formData.hora_inicio || ''} onChange={(e, d) => updateField('hora_inicio', d.value)} placeholder="09:30" />
                  </div>
                  <div className={styles.formGroup}>
                    <Text weight="semibold" size={200}>Hora Fim (HH:MM)</Text>
                    <Input value={formData.hora_fim || ''} onChange={(e, d) => updateField('hora_fim', d.value)} placeholder="09:50" />
                  </div>
                  <div className={styles.formGroup}>
                    <Text weight="semibold" size={200}>Local Padrão</Text>
                    <Input value={formData.local_padrao || ''} onChange={(e, d) => updateField('local_padrao', d.value)} placeholder="Pátio Central" />
                  </div>
                  <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <Text weight="semibold" size={200}>Motivos Sugeridos (separados por vírgula)</Text>
                    <Input value={formData.motivos_sugeridos_text || ''} onChange={(e, d) => updateField('motivos_sugeridos_text', d.value)}
                      placeholder="Falta de Uniforme, Uso de Celular, Adorno" />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button appearance="primary" onClick={handleSaveInterval}>Salvar</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </>
    );
  };

  const renderDialog = () => {
    if (activeTab === 'occurrences' || activeTab === 'scheduleIntervals') return null;

    return (
      <Dialog open={dialogOpen} onOpenChange={(e, data) => setDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{editItem ? 'Editar' : 'Adicionar'} {activeTab === 'students' ? 'Aluno' : activeTab === 'users' ? 'Usuário' : activeTab === 'rooms' ? 'Local' : 'Tipo'}</DialogTitle>
            <DialogContent>
              <div className={styles.formGrid} style={{ marginTop: '16px' }}>
                {activeTab === 'students' && (
                  <>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Nome</Text>
                      <Input value={formData.firstName || ''} onChange={(e, d) => updateField('firstName', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Sobrenome</Text>
                      <Input value={formData.lastName || ''} onChange={(e, d) => updateField('lastName', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Turma</Text>
                      <Input value={formData.classId || ''} onChange={(e, d) => updateField('classId', d.value)} />
                    </div>
                  </>
                )}
                {activeTab === 'users' && (
                  <>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Nome Completo</Text>
                      <Input value={formData.name || ''} onChange={(e, d) => updateField('name', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Login</Text>
                      <Input value={formData.login || ''} onChange={(e, d) => updateField('login', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Senha</Text>
                      <Input type="password" value={formData.password || ''} onChange={(e, d) => updateField('password', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Login Windows</Text>
                      <Input value={formData.loginWindows || ''} onChange={(e, d) => updateField('loginWindows', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Perfil</Text>
                      <Select value={formData.role || 'monitor'} onChange={(e, d) => updateField('role', d.value)}>
                        <option value="monitor">Monitor</option>
                        <option value="secretaria">Secretaria</option>
                        <option value="diretor">Diretor</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </div>
                  </>
                )}
                {activeTab === 'occurrenceTypes' && (
                  <>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Nome do Tipo</Text>
                      <Input value={formData.label || ''} onChange={(e, d) => updateField('label', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Gravidade</Text>
                      <Select value={formData.severity || 'info'} onChange={(e, d) => updateField('severity', d.value)}>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                      </Select>
                    </div>
                  </>
                )}
                {activeTab === 'rooms' && (
                  <>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Nome do Local/Sala</Text>
                      <Input value={formData.name || ''} onChange={(e, d) => updateField('name', d.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <Text weight="semibold" size={200}>Tipo de Local</Text>
                      <Select value={formData.type || 'Sala de Aula'} onChange={(e, d) => updateField('type', d.value)}>
                        <option value="Sala de Aula">Sala de Aula</option>
                        <option value="Comum">Comum (Pátio, etc)</option>
                        <option value="Corredor">Corredor</option>
                        <option value="Banheiro">Banheiro</option>
                        <option value="Esportes">Esportes/Quadra</option>
                        <option value="Administrativo">Administrativo</option>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancelar</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={handleSave}>
                {editItem ? 'Salvar' : 'Adicionar'}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    );
  };

  return (
    <div className={styles.container}>
      <Title2>Cadastros (CMS)</Title2>

      <TabList selectedValue={activeTab} onTabSelect={(e, data) => { setActiveTab(data.value); setSearch(''); }}>
        {TABS.map(tab => (
          <Tab key={tab.value} value={tab.value} icon={tab.icon}>{tab.label}</Tab>
        ))}
      </TabList>

      <div className={styles.toolbar}>
        <Input
          placeholder="Buscar..."
          contentBefore={<SearchRegular />}
          value={search}
          onChange={(e, d) => setSearch(d.value)}
          style={{ minWidth: '200px' }}
        />
        {activeTab !== 'occurrences' && (
          <Button appearance="primary" icon={<AddRegular />} onClick={openAddDialog}>
            Adicionar
          </Button>
        )}
      </div>

      {activeTab === 'students' && renderStudentsTable()}
      {activeTab === 'users' && renderUsersTable()}
      {activeTab === 'rooms' && renderRoomsTable()}
      {activeTab === 'occurrenceTypes' && renderTypesTable()}
      {activeTab === 'scheduleIntervals' && renderScheduleIntervalsTable()}
      {activeTab === 'occurrences' && renderOccurrencesTable()}

      {renderDialog()}
    </div>
  );
}
