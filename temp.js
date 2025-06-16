javascript:(function(){
  const match = document.body.innerText.match(/"id"\s*:\s*"(\d+)"/);
  if (match) {
    alert("✅ ID encontrado: " + match[1]);
  } else {
    alert("❌ No se encontró ningún ID.");
  }
})();
