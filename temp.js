<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script>
      async function fetchIssueId() {
        const issueKey = document.getElementById("iusses").value.trim();
        const output = document.getElementById("id_iusses");

        if (!issueKey) {
          alert("⚠️ Por favor, ingresa una historia.");
          return;
        }

        const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;

        try {
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
          });

          if (!response.ok) {
            output.value = `❌ No encontrado (código ${response.status})`;
            return;
          }

          const data = await response.json();
          output.value = data.id || "⚠️ ID no encontrado";
        } catch (err) {
          output.value = "❌ Error: " + err.message;
          console.error("Error en fetchIssueId:", err);
        }
      }
    </script>
  </head>
  <body>
    <h2>Extraer ID desde Jira</h2>

    <label for="iusses">Historia:</label>
    <input id="iusses" type="text" placeholder="Ej: ABC-123" />

    <button onclick="fetchIssueId()">Obtener ID</button>

    <br><br>
    <label for="id_iusses">ID del Issue:</label>
    <input id="id_iusses" type="text" readonly />
  </body>
</html>
