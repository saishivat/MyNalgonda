document.getElementById('fileInput').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    const tbody = document.querySelector("#eventTable tbody");
    tbody.innerHTML = "";

    rows.slice(1).forEach(row => {
      const tr = document.createElement("tr");
      row.forEach((cell, i) => {
        const td = document.createElement("td");
        if (i === 7 && cell) {
          const img = document.createElement("img");
          img.src = cell;
          td.appendChild(img);
        } else {
          td.textContent = cell || "";
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  };
  reader.readAsArrayBuffer(e.target.files[0]);
});
