export default {
  USER_NOT_FOUND: 'Usuário não encontrado!',
  WRONG_PASSWORD: 'Senha incorreta!',
  USER_ALREADY_EXISTS: 'Usuário já existe!',
  LOGIN_FIELDS_EMPTY: 'Campo(s) de login vazios!',
  PROJECT_NOT_FOUND: 'Projeto não encontrado!',
  PROJECT_ALREADY_EXISTS: 'Projeto já existe!',
  TIME_TRACKER_ALREADY_RUNNING: 'Já existe um time tracker em execução!',
  TIME_TRACKER_NOT_RUNNING: 'Nenhum time tracker em execução!',
  COLLABORATOR_NOT_FOUND: 'Colaborador não encontrado!',
  COLLABORATOR_NOT_FOUND_FN: (CollaboratorName: string) =>
    `${CollaboratorName} não encontrado!`,
  TASK_NAME_DESCRIPTION_EMPTY: 'Nome e descrição da task não podem ser vazios!',
  TASK_NOT_FOUND: 'Task não encontrada!',
  PROJECT_NAME_NOT_VALID: 'O projeto deve ter um nome válido!',
};
