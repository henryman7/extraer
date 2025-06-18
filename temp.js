
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f4f4f4;
    }
    label, select, input {
      display: block;
      margin-bottom: 10px;
    }
    .input-group {
      background-color: white;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .input-group input {
      width: 80%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .material-symbols-outlined {
      cursor: pointer;
      user-select: none;
    }
  </style>
</head>
<body>
  <label for="equipo">Equipo:</label>
  <select id="equipo">
    <option value="Seleccione">Seleccione</option>
    <option value="4.DIF3">4.DIF3</option>
    <option value="4.DIR3">4.DIR3</option>
    <option value="4.DIE3">4.DIE3</option>
    <option value="4.DICB3">4.DICB3</option>
    <option value="4.DICB4">4.DICB4</option>
  </select>

  <label for="mainSelect">Main Option:</label>
  <select id="mainSelect" onchange="populateSubHUSelect()"></select>

  <label for="subHUSelect">SubHU:</label>
  <select id="subHUSelect" onchange="populateInputs()"></select>

  <div id="inputsContainer"></div>

  <script>
    const jsonData = JSON.parse(document.getElementById('sub-task').textContent);

    const mainSelect = document.getElementById('mainSelect');
    const subHUSelect = document.getElementById('subHUSelect');
    const equipoSelect = document.getElementById('equipo');

    function populateMainSelect() {
      mainSelect.innerHTML = '';
      Object.keys(jsonData).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        mainSelect.appendChild(option);
      });
      populateSubHUSelect();
    }

    function populateSubHUSelect() {
      const selectedMain = mainSelect.value;
      subHUSelect.innerHTML = '';
      if (jsonData[selectedMain]) {
        jsonData[selectedMain].forEach(item => {
          const option = document.createElement('option');
          option.value = item.subHU;
          option.textContent = item.subHU;
          subHUSelect.appendChild(option);
        });
        populateInputs();
      }
    }

    function populateInputs() {
      const selectedMain = mainSelect.value;
      const selectedSubHU = subHUSelect.value;
      const equipoValue = equipoSelect.value;

      const container = document.getElementById('inputsContainer');
      container.innerHTML = '';

      const subItems = jsonData[selectedMain].find(i => i.subHU === selectedSubHU);
      if (!subItems) return;

      subItems.SubTask.forEach(task => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = `${task.Summary} - ${task.Description} [${task.Labels} | ${equipoValue}]`;
        input.readOnly = true;

        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.textContent = 'content_copy';
        icon.title = 'Copiar';
        icon.onclick = () => {
          navigator.clipboard.writeText(input.value);
        };

        inputGroup.appendChild(input);
        inputGroup.appendChild(icon);
        container.appendChild(inputGroup);
      });
    }

    populateMainSelect();
  </script>

  <!-- Este script debe estar incluido en tu HTML original para que funcione correctamente -->
  <script type="application/json" id="sub-task">
    {
      "Launchpad": [
        {
          "subHU": "Generación de templates",
          "SubTask": [
            {
              "Summary": "Solicitud de Documentación y Creación de Helix",
              "Description": "Solicitud de Documentación y creación de helix",
              "Labels": "DE_FABRICA DE_ING"
            },
            {
              "Summary": "Creación de Templates Au y Pro",
              "Description": "Creación de Templates en Au y Pro",
              "Labels": "DE_FABRICA DE_ING"
            }
          ]
        }
      ],
      "Distribuido": []
    }
  </script>
</body>
</html>
