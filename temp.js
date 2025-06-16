<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
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
          log.textContent += "\n⚠️ Historia vacía.";
          return;
        }

        const url = `https://jira.globaldevtools.bbva.com/rest/api/2/issue/${issueKey}`;
        log.textContent += `\n🌐 Consultando: ${url}`;

        try {
          const response = await fetch(url, {
            credentials: 'include'
          });

          log.textContent += `\n📡 Estado HTTP: ${response.status}`;

          const body = await response.text();
          log.textContent += `\n📥 Respuesta recibida: ${body.slice(0, 200)}...`;

          const match = body.match(/"id"\s*:\s*"(\d+)"/);
          const id = match ? match[1] : null;

          if (id) {
            log.textContent += `\n✅ ID extraído: ${id}`;
            output.value = id;
          } else {
            log.textContent += `\n❌ No se encontró ID en el contenido.`;
            output.value = "No encontrado";
          }

        } catch (err) {
          log.textContent += `\n🚨 Error en fetch: ${err.message}`;
        }
      }
    </script>
  </head>
  <body>
    <h2>Extraer ID desde Jira</h2>

    <label for="iusses">Historia (issue key):</label>
    <input id="iusses" type="text" placeholder="Ej: ABC-123" />

    <button onclick="fetchIssueId()">Extraer ID</button>

    <br><br>
    <label for="id_iusses">ID extraído:</label>
    <input id="id_iusses" type="text" readonly />

    <div id="log">📝 Log de ejecución aparecerá aquí...</div>
  </body>
</html>
