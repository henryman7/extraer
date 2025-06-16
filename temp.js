function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Extraer ID desde JSON Jira")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function procesarTextoPegado(texto) {
  const log = [];

  if (!texto || texto.trim() === "") {
    log.push("⚠️ Texto vacío. No se puede procesar.");
    return { id: "", log };
  }

  log.push("🔄 Procesando texto recibido...");

  // Intentamos extraer el ID usando regex primero
  const match = texto.match(/"id"\s*:\s*"(\d+)"/);
  if (match) {
    const id = match[1];
    log.push(`✅ ID encontrado mediante regex: ${id}`);
    return { id, log };
  }

  // Si falla regex, intentar parsear como JSON
  try {
    const json = JSON.parse(texto);
    if (json.id) {
      log.push(`✅ ID encontrado en JSON parseado: ${json.id}`);
      return { id: json.id, log };
    } else {
      log.push("❌ No se encontró 'id' en el objeto JSON.");
    }
  } catch (e) {
    log.push("🚨 Error al parsear JSON: " + e.message);
  }

  return { id: "", log };
}










<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      textarea { width: 100%; height: 200px; font-family: monospace; }
      input { width: 300px; padding: 5px; }
      button { padding: 6px 12px; margin-top: 10px; }
      #log { margin-top: 20px; background: #f0f0f0; padding: 10px; font-family: monospace; white-space: pre-wrap; }
    </style>
    <script>
      function enviarAlServidor() {
        const texto = document.getElementById("respuesta_jira").value;
        const output = document.getElementById("id_extraido");
        const log = document.getElementById("log");

        log.textContent = "📡 Enviando texto al servidor...";

        google.script.run
          .withSuccessHandler(function(respuesta) {
            log.textContent = respuesta.log.join("\n");
            output.value = respuesta.id || "ID no encontrado";
          })
          .withFailureHandler(function(error) {
            log.textContent = "❌ Error del servidor: " + error.message;
            output.value = "Error";
          })
          .procesarTextoPegado(texto);
      }
    </script>
  </head>
  <body>
    <h2>📥 Pega el JSON de Jira y extrae el ID</h2>

    <p>1️⃣ Copia el contenido JSON de Jira<br>
    2️⃣ Pégalo aquí abajo<br>
    3️⃣ Clic en “Extraer ID desde servidor”</p>

    <textarea id="respuesta_jira" placeholder="Pega aquí el JSON..."></textarea><br>

    <button onclick="enviarAlServidor()">Extraer ID desde servidor</button><br><br>

    <label for="id_extraido">ID extraído:</label><br>
    <input id="id_extraido" type="text" readonly><br>

    <div id="log">📝 Esperando procesamiento...</div>
  </body>
</html>
