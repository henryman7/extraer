function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle("Extractor de ID Jira");
}



<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      input[type="text"] { width: 300px; padding: 5px; }
      button { padding: 6px 12px; margin-top: 10px; }
      #log {
        margin-top: 20px;
        padding: 10px;
        background: #f0f0f0;
        border-left: 4px solid #2196F3;
        font-family: monospace;
        white-space: pre-wrap;
      }
    </style>
    <script>
      async function fetchIssueId() {
        const issueKey = document.getElementById("iusses").value.trim();
        const output = document.getElementById("id_iusses");
        const log = document.getElementById("log");

        log.textContent = "🔄 Iniciando búsqueda...";
        output.value = "";

        if (!issueKey) {
          log.textContent += "\n⚠️ Por favor ingresa una historia.";
          return;
        }

        const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;
        log.textContent += `\n🌐 Consultando: ${url}`;

        try {
          const response = await fetch(url, {
            credentials: 'include'
          });

          log.textContent += `\n📡 Estado HTTP: ${response.status}`;

          if (!response.ok) {
            log.textContent += `\n❌ Error: ${response.statusText}`;
            output.value = "Error al consultar";
            return;
          }

          const body = await response.text();
          log.textContent += `\n📥 Respuesta recibida:\n${body.slice(0, 300)}...`;

          const match = body.match(/"id"\s*:\s*"(\d+)"/);
          const id = match ? match[1] : null;

          if (id) {
            log.textContent += `\n✅ ID extraído: ${id}`;
            output.value = id;
          } else {
            log.textContent += `\n❌ No se encontró un ID válido.`;
            output.value = "ID no encontrado";
          }

        } catch (err) {
          log.textContent += `\n🚨 Error en fetch: ${err.message}`;
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
