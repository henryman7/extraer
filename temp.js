.input-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.8rem;
}

.input-group input {
  flex: 1 1 220px;
  min-width: 180px;
  max-width: 280px;
}

.subtask-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}



modifica esto:

const inputGroup = document.createElement("div");
inputGroup.className = "input-group";

por

const subtaskGroup = document.createElement("div");
subtaskGroup.className = "subtask-group";


Y luego dentro del loop, reemplaza inputsContainer.appendChild(inputGroup); por:

inputsContainer.appendChild(subtaskGroup);



Y cada vez que crees un inputGroup (uno por input), asegúrate de anidarlo dentro del subtaskGroup:
Reemplaza:

inputGroup.appendChild(input);
inputGroup.appendChild(copyButton);
inputsContainer.appendChild(inputGroup);


por:
const inputGroup = document.createElement("div");
inputGroup.className = "input-group";
inputGroup.appendChild(input);
inputGroup.appendChild(copyButton);
subtaskGroup.appendChild(inputGroup);

