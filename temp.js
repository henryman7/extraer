<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script>
      async function abrirYExtraerID() {
        const issueKey = document.getElementById("iusses").value.trim();
        const output = document.getElementById("id_iusses");

        if (!issueKey) {
          alert("⚠️ Ingresa una historia.");
          return;
        }

        const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;

        try {
          const response = await fetch(url, {
            credentials: 'include'
          });

          const text = await response.text();

          const match = text.match(/"id"\s*:\s*"(\d+)"/);
          const id = match ? match[1] : "❌ ID no encontrado";

          output.value = id;
          console.log("✅ ID extraído:", id);

        } catch (err) {
          console.error("❌ Error en fetch:", err);
          output.value = "❌ Error: " + err.message;
        }
      }
    </script>
  </head>
  <body>
    <h2>Extraer ID desde Jira</h2>

    <label for="iusses">Historia (issue key):</label>
    <input id="iusses" type="text" placeholder="Ej: ABC-123" />

    <button onclick="abrirYExtraerID()">Extraer ID</button>

    <br><br>
    <label for="id_iusses">ID extraído:</label>
    <input id="id_iusses" type="text" readonly />
  </body>
</html>
