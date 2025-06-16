javascript:(function(){
  const texto = document.body.innerText;
  const match = texto.match(/"id"\s*:\s*"(\d+)"/);
  if (match) {
    const id = match[1];
    navigator.clipboard.writeText(id);
    alert("✅ ID encontrado y copiado: " + id);
  } else {
    alert("❌ No se encontró ningún ID (\"id\": \"xxxxx\") en esta página.");
  }
})();
