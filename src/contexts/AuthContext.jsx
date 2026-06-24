import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import AppModel from '../js/model.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const modelRef = useRef(null);

  // Initialize model once
  if (!modelRef.current) {
    modelRef.current = new AppModel();
  }

  const model = modelRef.current;
  const [state, setState] = useState(() => ({ ...model.state }));

  // Sync React state whenever model notifies
  useEffect(() => {
    const unsubscribe = model.subscribe((newState) => {
      setState({ ...newState });
    });
    return unsubscribe;
  }, [model]);

  // Force refresh helper
  const refresh = useCallback(() => {
    setState({ ...model.state });
  }, [model]);

  // ── Auth ──
  const login = useCallback((username, password) => {
    const result = model.login(username, password);
    if (result.success) refresh();
    return result;
  }, [model, refresh]);

  const logout = useCallback(() => {
    model.logout();
    refresh();
  }, [model, refresh]);

  // ── Students ──
  const searchStudents = useCallback((query) => {
    return model.searchStudents(query);
  }, [model]);

  const checkRecurrence = useCallback((studentId, motive) => {
    return model.checkRecurrence(studentId, motive);
  }, [model]);

  // ── Occurrences ──
  const addOccurrence = useCallback((studentId, reasons, details, location) => {
    const occ = model.addOccurrence(studentId, reasons, details, location);
    refresh();
    return occ;
  }, [model, refresh]);

  // ── Smart Paste ──
  const parseSmartPaste = useCallback((text) => {
    return model.parseSmartPaste(text);
  }, [model]);

  // ── Tickets ──
  const createTicket = useCallback((rawText) => {
    const ticket = model.createTicket(rawText);
    refresh();
    return ticket;
  }, [model, refresh]);

  const acceptTicket = useCallback((ticketId) => {
    model.acceptTicket(ticketId);
    refresh();
  }, [model, refresh]);

  const completeTicket = useCallback((ticketId, finalReasons, details) => {
    model.completeTicket(ticketId, finalReasons, details);
    refresh();
  }, [model, refresh]);

  // ── Dashboard ──
  const updateWidgetPositions = useCallback((orderedIds) => {
    model.updateWidgetPositions(orderedIds);
    refresh();
  }, [model, refresh]);

  // ── Settings ──
  const updateSettings = useCallback((settings) => {
    model.updateSettings(settings);
    refresh();
  }, [model, refresh]);

  // ── CMS ──
  const addCMSItem = useCallback((type, data) => {
    model.addCMSItem(type, data);
    refresh();
  }, [model, refresh]);

  const updateCMSItem = useCallback((type, id, data) => {
    model.updateCMSItem(type, id, data);
    refresh();
  }, [model, refresh]);

  const deleteCMSItem = useCallback((type, id) => {
    model.deleteCMSItem(type, id);
    refresh();
  }, [model, refresh]);

  // ── CSV ──
  const importStudentsCSV = useCallback((csvText) => {
    const result = model.importStudentsCSV(csvText);
    refresh();
    return result;
  }, [model, refresh]);

  const exportOccurrencesCSV = useCallback(() => {
    return model.exportOccurrencesCSV();
  }, [model]);

  const value = {
    // State
    state,
    currentUser: state.currentUser,
    isAuthenticated: !!state.currentUser,

    // Auth
    login,
    logout,

    // Students
    searchStudents,
    checkRecurrence,

    // Occurrences
    addOccurrence,

    // Smart Paste
    parseSmartPaste,

    // Tickets
    createTicket,
    acceptTicket,
    completeTicket,

    // Dashboard
    updateWidgetPositions,

    // Settings
    updateSettings,

    // CMS
    addCMSItem,
    updateCMSItem,
    deleteCMSItem,

    // CSV
    importStudentsCSV,
    exportOccurrencesCSV,

    // Utility
    refresh,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
