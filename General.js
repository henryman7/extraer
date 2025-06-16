// Función para obtener el usuario actual sin el dominio
function getCurrentUser() {
  const email = Session.getActiveUser().getEmail();
  const currentUser = email.replace("@bbva.com", ""); // Eliminar el dominio
  return currentUser;
}

// Función para obtener el ID del issue basado en el usuario y el issueKey
function getIssueId(issueKey) {
  const currentUser = getCurrentUser(); // Obtener el usuario actual
  // Simulación de un ID basado en el issueKey y el usuario
  return `ID-${issueKey}-${currentUser}`;
}
