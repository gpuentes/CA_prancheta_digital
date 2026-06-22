export const mockStudents = [
  { id: 1, nomeCompleto: "João Pedro Silva", serie: "8º Ano", sala: 11, recorrente: false, foto: "https://i.pravatar.cc/150?img=11" },
  { id: 2, nomeCompleto: "Maria Fernanda Costa", serie: "1º EM", sala: 20, recorrente: true, foto: "https://i.pravatar.cc/150?img=5" },
  { id: 3, nomeCompleto: "Carlos Eduardo Souza", serie: "9º Ano", sala: 14, recorrente: false, foto: "https://i.pravatar.cc/150?img=12" },
  { id: 4, nomeCompleto: "Ana Clara Oliveira", serie: "6º Ano", sala: 9, recorrente: true, foto: "https://i.pravatar.cc/150?img=9" },
  { id: 5, nomeCompleto: "Pedro Henrique Santos", serie: "3º EM", sala: 24, recorrente: false, foto: "https://i.pravatar.cc/150?img=15" },
];

export const contextRules = [
  {
    time_window: "09:40-10:00",
    target_grades: ["6º Ano", "7º Ano", "8º Ano", "9º Ano"],
    classrooms: [9, 10, 11, 12, 13, 14, 15]
  },
  {
    time_window: "10:30-10:50",
    target_grades: ["1º EM", "2º EM", "3º EM"],
    classrooms: [20, 21, 22, 23, 24, 25]
  }
];

export const formatStudentName = (nomeCompleto) => {
  const parts = nomeCompleto.split(' ');
  if (parts.length === 1) return parts[0];
  const primeiroNome = parts[0];
  const ultimoSobrenome = parts[parts.length - 1];
  return `${primeiroNome} ${ultimoSobrenome}`;
};
