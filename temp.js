Como hago que los input dinamicos que se general de <div id="inputsContainer"></div> se espacien en la horizantal mucho mejor

Index.html
<!DOCTYPE html>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
<?!= include('style') ?>
<?!= include('jsonTask') ?>
  </head>
  <body>
    <h1>Dynamic WebApp</h1>
  
  <div class="row">

  <div class="form-group">
    <label for="tipo-solicitud">Tipo de solicitud:</label>
    <select name="tipo-solicitud" id="tipo-solicitud">
      <option value="Seleccione">Seleccione</option>
      <option value="1.FI_NVA" selected>1.FI_NVA</option>
      <option value="1.FI_HIST">1.FI_HIST</option>
      <option value="1.FI_ACT">1.FI_ACT</option>
      <option value="1.FI_PRO">1.FI_PRO</option>
    </select>
  </div>
    
  <div class="form-group">
    <label for="dominio">Dominio:</label>
    <select name="dominio" id="dominio">
      <option value="Seleccione">Seleccione</option>
      <option value="5.FINANCE" selected>5.FINANCE</option>
      <option value="5.RISK">5.RISK</option>
      <option value="5.CS">5.CS</option>
      <option value="5.ENTERPRISE">5.ENTERPRISE</option>
      <option value="5.DOMINIO">5.DOMINIO</option>
      <option value="5.EXPERIENCIA_UNICA">5.EXPERIENCIA_UNICA</option>
    </select>
  </div>

  
  <div class="form-group">
    <label for="equipo">Equipo:</label>
    <select name="equipo" id="equipo">
      <option value="Seleccione">Seleccione</option>
      <option value="4.DIF3">4.DIF3</option>
      <option value="4.DIR3">4.DIR3</option>
      <option value="4.DIE3">4.DIE3</option>
      <option value="4.DICB3">4.DICB3</option>
      <option value="4.DICB4">4.DICB4</option>
    </select>
  </div>
  </div>

    <div class="row">
    <div class="form-group">
    <label for="mainSelect">Main Option:</label>
    <select id="mainSelect" onchange="populateSubHUSelect()"></select>
    </div>

    <div class="form-group">
    <label for="subHUSelect">SubHU:</label>
    <select id="subHUSelect" onchange="populateInputs()"></select>
    </div>
    </div>

    <div id="inputsContainer"></div>

    <script src="https://apis.google.com/js/platform.js"></script>

    <?!= include('script') ?>
  </body>
</html>

css:
<style>
  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f4f7fa;
    margin: 0;
    padding: 2rem;
    color: #333;
  }

  h1 {
    text-align: center;
    color: #1a73e8;
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }

  /* Layout en fila para grupos de select */
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    flex: 1;
    min-width: 180px;
  }

  label {
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
    font-size: 0.9rem;
  }

  select, input[type="text"] {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  select:focus, input[type="text"]:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }

  /* Input con botón copy */
  .input-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.8rem;
    max-width: 600px;
  }

  .input-group input {
    flex: 1;
    min-width: 0;
  }

  .material-symbols-outlined {
    font-size: 20px;
    color: #555;
    padding: 6px;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
  }

  .material-symbols-outlined:hover {
    background-color: #e0e0e0;
    color: #000;
  }

  /* Responsive para móviles */
  @media (max-width: 600px) {
    .row {
      flex-direction: column;
    }

    .input-group {
      flex-direction: column;
      align-items: stretch;
    }

    .input-group input {
      width: 100%;
    }
  }
</style>

script:
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
