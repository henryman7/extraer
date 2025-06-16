<script>
      function fetchIssueId() {
        const issueKey = document.getElementById("iusses").value;

        if (!issueKey) {
          alert("Por favor, ingresa una historia.");
          return;
        }

        // Llamada al servidor para obtener el ID
        google.script.run.withSuccessHandler(function(issueId) {
          document.getElementById("id_iusses").value = issueId;
        }).withFailureHandler(function(error) {
          alert("Error al obtener el ID: " + error.message);
        }).getIssueId(issueKey);
      }
</script>
