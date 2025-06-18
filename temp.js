<!DOCTYPE html>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    <?!= include('style') ?>
    <?!= include('jsonTask') ?>
    <style>
      .copy-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .copy-container input {
        flex-grow: 1;
        margin-right: 5px;
      }
      .copy-container .material-symbols-outlined {
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h1>Dynamic WebApp</h1>
    <div>
      <label for="tipo-solicitud">Tipo de solicitud:</label>
      <select name="tipo-solicitud" id="tipo-solicitud">
        <option value="Seleccione">Seleccione</option>
        <option value="1.FI_NVA">1.FI_NVA</option>
        <option value="1.FI_HIST">1.FI_HIST</option>
        <option value="1.FI_ACT">1.FI_ACT</option>
        <option value="1.FI_PRO">1.FI_PRO</option>
      </select>
    </div>

    <div>
      <label for="dominio">Dominio:</label>
      <select name="dominio" id="dominio">
        <option value="Seleccione">Seleccione</option>
        <option value="5.FINANCE">5.FINANCE</option>
        <option value="5.RISK">5.RISK</option>
        <option value="5.CS">5.CS</option>
        <option value="5.ENTERPRISE">5.ENTERPRISE</option>
        <option value="5.DOMINIO">5.DOMINIO</option>
        <option value="5.EXPERIENCIA_UNICA">5.EXPERIENCIA_UNICA</option>
      </select>
    </div>

    <div>
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

    <label for="mainSelect">Main Option:</label>
    <select id="mainSelect" onchange="populateSubHUSelect()"></select>

    <label for="subHUSelect">SubHU:</label>
    <select id="subHUSelect" onchange="populateInputs()"></select>

    <div id="inputsContainer"></div>

    <script>
      const jsonData = JSON.parse(document.getElementById("sub-task").textContent);

      function populateMainSelect() {
        const mainSelect = document.getElementById("mainSelect");
        mainSelect.innerHTML = "";
        Object.keys(jsonData).forEach(key => {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = key;
          mainSelect.appendChild(option);
        });
        populateSubHUSelect();
      }

      function populateSubHUSelect() {
        const selectedMain = document.getElementById("mainSelect").value;
        const subHUSelect = document.getElementById("subHUSelect");
        subHUSelect.innerHTML = "";
        if (jsonData[selectedMain]) {
          jsonData[selectedMain].forEach(item => {
            const option = document.createElement("option");
            option.value = item.subHU;
            option.textContent = item.subHU;
            subHUSelect.appendChild(option);
          });
          populateInputs();
        }
      }

      function populateInputs() {
        const selectedMain = document.getElementById("mainSelect").value;
        const selectedSubHU = document.getElementById("subHUSelect").value;
        const equipo = document.getElementById("equipo").value;
        const container = document.getElementById("inputsContainer");
        container.innerHTML = "";

        const selectedHU = jsonData[selectedMain].find(i => i.subHU === selectedSubHU);
        if (!selectedHU) return;

        selectedHU.SubTask.forEach((task, i) => {
          ["Summary", "Description", "Labels"].forEach(key => {
            const inputDiv = document.createElement("div");
            inputDiv.className = "copy-container";

            const input = document.createElement("input");
            input.type = "text";
            input.readOnly = true;
            input.value = key === "Labels" ? `${task[key]} | ${equipo}` : task[key];

            const icon = document.createElement("span");
            icon.className = "material-symbols-outlined";
            icon.textContent = "content_copy";
            icon.onclick = () => navigator.clipboard.writeText(input.value);

            inputDiv.appendChild(input);
            inputDiv.appendChild(icon);
            container.appendChild(inputDiv);
          });
        });
      }

      populateMainSelect();
    </script>

    <script src="https://apis.google.com/js/platform.js"></script>
    <?!= include('script') ?>
  </body>
</html>
