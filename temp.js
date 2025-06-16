<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script>
      async function fetchIssueId() {
        const issueKey = document.getElementById("iusses").value.trim();
        const output = document.getElementById("id_iusses");
        const log = document.getElementById("log");

        log.textContent = "🔄 Iniciando búsqueda...";
        output.value = "";

        if (!issueKey) {
          log.textContent += "\n⚠️ Historia vacía.";
          return;
        }

        const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;
        log.textContent += `\n🌐 Consultando: ${url}`;

        try {
          const response = await fetch(url, { credentials: 'include' });
          log.textContent += `\n📡 Estado HTTP: ${response.status}`;

          const body = await response.text();
          log.textContent += `\n📥 Respuesta:\n${body.slice(0, 300)}...`;

          const match = body.match(/"id"\s*:\s*"(\d+)"/);
          const id = match ? match[1] : null;

          output.value = id || "ID no encontrado";
          log.textContent += id ? `\n✅ ID extraído: ${id}` : `\n❌ ID no encontrado`;

        } catch (err) {
          log.textContent += `\n🚨 Error: ${err.message}`;
          output.value = "Error";
        }
      }
    </script>
  </head>
  <body>
    <h2>🔎 Extraer ID de Jira</h2>

    <label for="iusses">Historia:</label><br>
    <input id="iusses" type="text" placeholder="Ej: ABC-123"><br>

    <button onclick="fetchIssueId()">Obtener ID</button><br><br>

    <label for="id_iusses">ID extraído:</label><br>
    <input id="id_iusses" type="text" readonly><br>

    <div id="log">📝 Log de ejecución...</div>
  </body>
</html>
