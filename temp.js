const equipoValue = document.getElementById("equipo")?.value || "";
labelsInput.value = task.Labels + (equipoValue && equipoValue !== "Seleccione" ? ` ${equipoValue}` : "");



const equipoValue = document.getElementById("equipo")?.value || "";
labelsInput.value = task.Labels + (equipoValue && equipoValue !== "Seleccione" ? ` ${equipoValue}` : "");



const labelsInput = document.createElement("input");
const equipoValue = document.getElementById("equipo")?.value || "";
labelsInput.value = task.Labels + (equipoValue && equipoValue !== "Seleccione" ? ` ${equipoValue}` : "");
labelsInput.readOnly = true;
inputsContainer.appendChild(labelsInput);
