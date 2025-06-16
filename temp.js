function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Jira Issue ID");
}

function getIssueIdFromJira(issueKey) {
  const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;

  try {
    const response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true,
      // Si se requiere autenticación, descomenta y usa esto:
      // headers: { "Authorization": "Bearer TU_TOKEN" }
    });

    const status = response.getResponseCode();
    const body = response.getContentText();

    if (status !== 200) {
      return `❌ Error ${status}: No se pudo obtener el issue`;
    }

    const match = body.match(/"id"\s*:\s*"(\d+)"/);
    const id = match ? match[1] : null;

    return id ? `✅ ID: ${id}` : "❌ ID no encontrado en la respuesta";

  } catch (e) {
    return "🚨 Error al conectar: " + e.message;
  }
}



<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script>
      function fetchIssueId() {
        const issueKey = document.getElementById("iusses").value.trim();
        const output = document.getElementById("id_iusses");
        const log = document.getElementById("log");

        log.textContent = "🔄 Enviando al servidor...";
        output.value = "";

        if (!issueKey) {
          log.textContent += "\n⚠️ Por favor, escribe una historia.";
          return;
        }

        google.script.run
          .withSuccessHandler(function(respuesta) {
            log.textContent += "\n📬 Respuesta del servidor recibida.";
            output.value = respuesta;
          })
          .withFailureHandler(function(err) {
            log.textContent += "\n🚨 Error en servidor: " + err.message;
            output.value = "Error";
          })
          .getIssueIdFromJira(issueKey);
      }
    </script>
  </head>
  <body>
    <h2>🔎 Extraer ID de Jira desde el Servidor</h2>

    <label for="iusses">Historia:</label><br>
    <input id="iusses" type="text" placeholder="Ej: ABC-123"><br>

    <button onclick="fetchIssueId()">Obtener ID</button><br><br>

    <label for="id_iusses">Resultado:</label><br>
    <input id="id_iusses" type="text" readonly><br>

    <div id="log" style="margin-top: 20px; background: #f0f0f0; padding: 10px; font-family: monospace;">
      📝 Log de ejecución...
    </div>
  </body>
</html>
