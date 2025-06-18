function populateInputs() {
  const mainSelect = document.getElementById("mainSelect");
  const subHUSelect = document.getElementById("subHUSelect");
  const inputsContainer = document.getElementById("inputsContainer");
  inputsContainer.innerHTML = ""; // Clear previous inputs

  const selectedMain = mainSelect.value;
  const selectedSubHU = subHUSelect.value;

  if (selectedMain && selectedSubHU) {
    const subHUData = jsonData[selectedMain].find(
      (item) => item.subHU === selectedSubHU
    );

    if (subHUData) {
      subHUData.SubTask.forEach((task) => {
        const subtaskGroup = document.createElement("div");
        subtaskGroup.className = "subtask-group";

        // Create input fields for Summary, Description, Labels
        ["Summary", "Description", "Labels"].forEach((field) => {
          const inputGroup = document.createElement("div");
          inputGroup.className = "input-group";

          const input = document.createElement("input");
          input.type = "text";
          if (field === "Labels") {
            const equipo = document.getElementById("equipo")?.value || "";
            input.value = task[field] + (equipo && equipo !== "Seleccione" ? ` ${equipo}` : "");
          } else {
            input.value = task[field];
          }
          input.readOnly = true;

          const copyButton = document.createElement("span");
          copyButton.className = "material-symbols-outlined";
          copyButton.textContent = "content_copy";
          copyButton.title = "Copiar";
          copyButton.style.cursor = "pointer";
          copyButton.onclick = () => navigator.clipboard.writeText(input.value);

          inputGroup.appendChild(input);
          inputGroup.appendChild(copyButton);
          subtaskGroup.appendChild(inputGroup);
        });

        // Add current user input
        const userGroup = document.createElement("div");
        userGroup.className = "input-group";

        const userInput = document.createElement("input");
        userInput.type = "text";
        userInput.value = currentUser;
        userInput.readOnly = true;

        const userCopyButton = document.createElement("span");
        userCopyButton.className = "material-symbols-outlined";
        userCopyButton.textContent = "content_copy";
        userCopyButton.title = "Copiar";
        userCopyButton.style.cursor = "pointer";
        userCopyButton.onclick = () => navigator.clipboard.writeText(userInput.value);

        userGroup.appendChild(userInput);
        userGroup.appendChild(userCopyButton);
        subtaskGroup.appendChild(userGroup);

        inputsContainer.appendChild(subtaskGroup);
      });
    }
  }
}
