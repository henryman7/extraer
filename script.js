<script>
  let jsonData = {}; // JSON data from the embedded script
  let currentUser = ""; // Current user fetched from Apps Script

  // Fetch JSON data and current user on page load
  window.onload = async () => {
    // Parse JSON from the embedded script tag
    const jsonElement = document.getElementById("sub-task");
    jsonData = JSON.parse(jsonElement.textContent);

    // Fetch current user from Apps Script
    google.script.run.withSuccessHandler((user) => {
      currentUser = user.split("@")[0]; // Extract username
      populateMainSelect();
    }).getCurrentUser();
  };

  // Populate the main dropdown
  function populateMainSelect() {
    const mainSelect = document.getElementById("mainSelect");
    mainSelect.innerHTML = ""; // Clear previous options

    // Add default "Seleccione" option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccione";
    mainSelect.appendChild(defaultOption);

    // Add options from JSON data
    Object.keys(jsonData).forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      mainSelect.appendChild(option);
    });
  }

  // Populate the subHU dropdown based on the selected main option
  function populateSubHUSelect() {
    const mainSelect = document.getElementById("mainSelect");
    const subHUSelect = document.getElementById("subHUSelect");
    subHUSelect.innerHTML = ""; // Clear previous options

    // Add default "Seleccione" option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccione";
    subHUSelect.appendChild(defaultOption);

    const selectedMain = mainSelect.value;
    if (selectedMain && jsonData[selectedMain]) {
      jsonData[selectedMain].forEach((item) => {
        const option = document.createElement("option");
        option.value = item.subHU;
        option.textContent = item.subHU;
        subHUSelect.appendChild(option);
      });
    }
  }

  // Populate input fields dynamically based on the selected subHU
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
          const inputGroup = document.createElement("div");
          inputGroup.className = "input-group";

          // Create input fields
          ["Summary", "Description", "Labels"].forEach((field) => {
            const input = document.createElement("input");
            input.type = "text";
            if (field === "Labels") {
              const equipo = document.getElementById("equipo")?.value || "";
              input.value = task[field] + (equipo && equipo !== "Seleccione" ? ` ${equipo}` : "");
            } else {
              input.value = task[field];
            }
            input.readOnly = true;

            // Add copy button with tooltip
            const copyButton = document.createElement("span");
            copyButton.className = "material-symbols-outlined";
            copyButton.textContent = "content_copy";
            copyButton.title = "Copiar"; // Tooltip text
            copyButton.style.cursor = "pointer";
            copyButton.onclick = () => navigator.clipboard.writeText(input.value);

            inputGroup.appendChild(input);
            inputGroup.appendChild(copyButton);
          });

          // Add current user input
          const userInput = document.createElement("input");
          userInput.type = "text";
          userInput.value = currentUser;
          userInput.readOnly = true;

          // Add copy button for current user with tooltip
          const userCopyButton = document.createElement("span");
          userCopyButton.className = "material-symbols-outlined";
          userCopyButton.textContent = "content_copy";
          userCopyButton.title = "Copiar"; // Tooltip text
          userCopyButton.style.cursor = "pointer";
          userCopyButton.onclick = () =>
            navigator.clipboard.writeText(userInput.value);

          inputGroup.appendChild(userInput);
          inputGroup.appendChild(userCopyButton);

          inputsContainer.appendChild(inputGroup);
        });
      }
    }
  }
</script>
