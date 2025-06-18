if (field === "Labels") {
  const equipo = document.getElementById("equipo")?.value || "";
  input.value = task[field] + (equipo && equipo !== "Seleccione" ? ` ${equipo}` : "");
} else {
  input.value = task[field];
}
