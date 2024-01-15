"use strict";
const sidebar = document.querySelector("#sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

const exportBtn = document.querySelector("#export-btn");
const importBtn = document.querySelector("#import-btn");
const fileInput = document.getElementById("input-file");

function saveDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("storage"), null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "mang2.json");
}
exportBtn.addEventListener("click", function () {
  const isExport = confirm("Bạn xác nhận chắc chắn Export");
  if (isExport) {
    saveDataToFile();
  }
});
