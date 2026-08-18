import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
  Textarea,
  Text,
  Badge,
  makeStyles,
} from '@fluentui/react-components';
import { EditRegular, DeleteRegular, AddRegular, DismissRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '12px',
    maxHeight: '350px',
    overflowY: 'auto',
  },
  templateItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '12px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'var(--bg-card)',
    borderRadius: '6px',
    border: '1px solid var(--color-brand)',
    marginTop: '12px',
  },
});

export default function QuickActionEditorModal({ isOpen, onClose }) {
  const styles = useStyles();
  const { state, addQuickActionTemplate, updateQuickActionTemplate, deleteQuickActionTemplate, currentUser } = useAuth();
  
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editLabel, setEditLabel] = useState('');
  const [editTemplate, setEditTemplate] = useState('');

  const canEdit = currentUser && ['admin', 'diretor', 'secretaria'].includes(currentUser.role);

  if (!canEdit) return null;

  const templates = state.quickActionTemplates || [];

  const handleStartEdit = (qa) => {
    setEditingId(qa.id);
    setIsCreating(false);
    setEditLabel(qa.label);
    setEditTemplate(qa.template);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setEditLabel('');
    setEditTemplate('');
  };

  const handleSave = () => {
    if (!editLabel.trim() || !editTemplate.trim()) return;
    if (isCreating) {
      addQuickActionTemplate(editLabel.trim(), editTemplate.trim());
    } else if (editingId) {
      updateQuickActionTemplate(editingId, editLabel.trim(), editTemplate.trim());
    }
    setEditingId(null);
    setIsCreating(false);
  };

  const handleDelete = (id) => {
    deleteQuickActionTemplate(id);
    if (editingId === id) setEditingId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e, data) => !data.open && onClose()}>
      <DialogSurface style={{ maxWidth: '540px', width: '90vw' }}>
        <DialogBody>
          <DialogTitle
            action={
              <Button appearance="subtle" aria-label="Fechar" icon={<DismissRegular />} onClick={onClose} />
            }
          >
            Gerenciar Botões de Ação Rápida
          </DialogTitle>
          <DialogContent>
            <Text size={200} style={{ color: 'var(--color-text-secondary)' }}>
              Edite os templates das frases para o balcão da secretaria. As alterações entram em vigor imediatamente.
            </Text>

            {/* List of current templates */}
            <div className={styles.listContainer}>
              {templates.map((qa) => (
                <div key={qa.id} className={styles.templateItem}>
                  <div className={styles.itemHeader}>
                    <Text weight="semibold">{qa.label}</Text>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<EditRegular />}
                        onClick={() => handleStartEdit(qa)}
                        title="Editar"
                      />
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<DeleteRegular />}
                        onClick={() => handleDelete(qa.id)}
                        title="Excluir"
                      />
                    </div>
                  </div>
                  <Text size={200} style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                    "{qa.template}"
                  </Text>
                </div>
              ))}
            </div>

            {/* Create or Edit Form */}
            {(isCreating || editingId) && (
              <div className={styles.formRow}>
                <Text weight="semibold" size={200}>
                  {isCreating ? 'Novo Botão de Ação Rápida' : 'Editar Botão'}
                </Text>
                <Input
                  placeholder="Título do Botão (ex: Ir à Biblioteca)"
                  value={editLabel}
                  onChange={(e, data) => setEditLabel(data.value)}
                />
                <Textarea
                  placeholder="Template do Chamado (ex: Monitor ir à biblioteca)"
                  value={editTemplate}
                  onChange={(e, data) => setEditTemplate(data.value)}
                  rows={2}
                />
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <Button size="small" onClick={() => { setIsCreating(false); setEditingId(null); }}>
                    Cancelar
                  </Button>
                  <Button size="small" appearance="primary" onClick={handleSave}>
                    Salvar Template
                  </Button>
                </div>
              </div>
            )}

            {!isCreating && !editingId && (
              <Button
                appearance="outline"
                icon={<AddRegular />}
                onClick={handleStartCreate}
                style={{ marginTop: '12px', width: '100%' }}
              >
                Adicionar Novo Template
              </Button>
            )}
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={onClose}>Concluído</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
