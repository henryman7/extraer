function populateInputs() {
  const mainSelect = document.getElementById("mainSelect");
  const subHUSelect = document.getElementById("subHUSelect");
  const inputsContainer = document.getElementById("inputsContainer");
  const equipoValue = document.getElementById("equipo")?.value || "";

  const selectedMainOption = mainSelect.value;
  const selectedSubHU = subHUSelect.value;

  inputsContainer.innerHTML = ""; // limpiar inputs previos

  if (selectedMainOption && selectedSubHU) {
    const data = JSON.parse(document.getElementById("sub-task").textContent);
    const subHUArray = data[selectedMainOption] || [];
    const selected = subHUArray.find(item => item.subHU === selectedSubHU);

    if (selected) {
      selected.SubTask.forEach(task => {
        const summaryInput = document.createElement("input");
        summaryInput.value = task.Summary;
        summaryInput.readOnly = true;

        const descriptionInput = document.createElement("input");
        descriptionInput.value = task.Description;
        descriptionInput.readOnly = true;

        const labelsInput = document.createElement("input");
        labelsInput.value = task.Labels + (equipoValue && equipoValue !== "Seleccione" ? ` ${equipoValue}` : "");
        labelsInput.readOnly = true;

        inputsContainer.appendChild(summaryInput);
        inputsContainer.appendChild(descriptionInput);
        inputsContainer.appendChild(labelsInput);
        inputsContainer.appendChild(document.createElement("br"));
      });
    }
  }
}
