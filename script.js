const GITHUB_XLSX_URL = "https://raw.githubusercontent.com/yourusername/yourrepo/main/data.xlsx";

fetch(GITHUB_XLSX_URL)
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
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
  })
  .catch(error => console.error("Error fetching Excel file:", error));
