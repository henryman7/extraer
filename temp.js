{"expand":"renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations","id":"11874536","self":"https://jira.globaldevtools.bbva.com/rest/api/2/issue/11874536","k


SOLUCION
 <!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script>
      async function fetchIssueId() {
        const issueKey = document.getElementById("iusses").value.trim();

        if (!issueKey) {
          alert("Por favor, ingresa una historia.");
          return;
        }

        const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;

        try {
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include' // 🔑 para mantener sesión del usuario
          });

          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          const id = data.id || "ID no encontrado";
          document.getElementById("id_iusses").value = id;

        } catch (err) {
          alert("❌ No se pudo obtener el ID. Detalle: " + err.message);
        }
      }
    </script>
  </head>
  <body>
    <h1>Extraer ID del Issue</h1>

    <label for="iusses">Historia:</label>
    <input id="iusses" type="text" placeholder="Ej: ABC-123" />

    <button onclick="fetchIssueId()">Obtener ID</button>

    <br><br>
    <label for="id_iusses">ID de la Historia:</label>
    <input id="id_iusses" type="text" readonly />
  </body>
</html>






headers: {
  'Authorization': 'Bearer TU_TOKEN',
  'Accept': 'application/json'
}
