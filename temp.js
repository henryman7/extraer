Code

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle("Consulta de Issue Jira");
}

function getIssueIdConCredenciales(user, pass, issueKey) {
  const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;

  const auth = "Basic " + Utilities.base64Encode(`${user}:${pass}`);
  const headers = {
    "Authorization": auth,
    "Accept": "application/json"
  };

  const options = {
    method: "get",
    headers: headers,
    muteHttpExceptions: true
  };

  const log = [];

  try {
    log.push("🔄 Enviando petición a Jira...");
    const response = UrlFetchApp.fetch(url, options);
    const status = response.getResponseCode();
    const body = response.getContentText();

    log.push(`📡 HTTP ${status}`);

    if (status !== 200) {
      log.push(`❌ Error en respuesta: ${body}`);
      return { id: "", log };
    }

    const json = JSON.parse(body);
    const id = json.id || null;

    if (id) {
      log.push(`✅ ID extraído: ${id}`);
      return { id, log };
    } else {
      log.push("❌ ID no encontrado en JSON.");
      return { id: "", log };
    }

  } catch (e) {
    log.push(`🚨 Error en ejecución: ${e.message}`);
    return { id: "", log };
  }
}




index

<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      input, button { margin: 5px 0; padding: 6px; width: 100%; max-width: 400px; }
      #log { margin-top: 20px; padding: 10px; background: #f0f0f0; font-family: monospace; white-space: pre-wrap; }
    </style>
    <script>
      function consultarId() {
        const user = document.getElementById("user").value.trim();
        const pass = document.getElementById("pass").value.trim();
        const issueKey = document.getElementById("issueKey").value.trim();
        const logDiv = document.getElementById("log");
        const idField = document.getElementById("issueId");

        logDiv.textContent = "⏳ Consultando Jira...";
        idField.value = "";

        if (!user || !pass || !issueKey) {
          logDiv.textContent = "⚠️ Todos los campos son obligatorios.";
          return;
        }

        google.script.run
          .withSuccessHandler(function(respuesta) {
            logDiv.textContent = respuesta.log.join("\n");
            idField.value = respuesta.id || "No encontrado";
          })
          .withFailureHandler(function(error) {
            logDiv.textContent = "❌ Error en servidor: " + error.message;
          })
          .getIssueIdConCredenciales(user, pass, issueKey);
      }
    </script>
  </head>
  <body>
    <h2>🔐 Consulta de ID de Issue en Jira</h2>

    <label>Usuario Jira (sin @bbva.com)</label><br>
    <input type="text" id="user" placeholder="Ej: henry.bbv"><br>

    <label>Contraseña o API Key</label><br>
    <input type="password" id="pass"><br>

    <label>Clave de historia (Issue Key)</label><br>
    <input type="text" id="issueKey" placeholder="Ej: ABC-123"><br>

    <button onclick="consultarId()">Consultar ID</button>

    <label>ID extraído:</label><br>
    <input type="text" id="issueId" readonly><br>

    <div id="log">📝 Log de ejecución aparecerá aquí...</div>
  </body>
</html>

