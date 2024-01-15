"use strict";
const submit = document.querySelector("#submit-btn");
const myForm = document.querySelector("#myForm");
const breedInput = document.querySelector("#input-breed");
const typeInput = document.querySelector("#input-type");
const arrBreed = JSON.parse(getFromStorage("storageBreed")) ?? [
  { num: 1, breed: "Tabby", type: "Cat" },
  { num: 2, breed: "Mixed Breed", type: "Cat" },
  { num: 3, breed: "Mixed Breed", type: "Dog" },
  { num: 4, breed: "Husky", type: "Dog" },
  { num: 5, breed: "Domestic Short Hair", type: "Cat" },
  { num: 6, breed: "Doberman Pinscher", type: "Dog" },
];
// let arrBreed = [];
const sidebar = document.querySelector("#sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
console.log(arrBreed);
console.log(typeof arrBreed);
const tbody = document.querySelector("#tbody");

// lưu data
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}

if (!getFromStorage("storageBreed")) {
  saveToStorage("storageBreed", arrBreed);
}
if (getFromStorage("storageBreed") && arrBreed) {
  renderTableData(arrBreed);
}

// Kiểm tra dữ liệu
function validate(data) {
  if (data.breed == "") {
    alert("Please select Breed!");
    return;
  }
  if (data.type == "Select Type") {
    alert("Please select Type!");
    return;
  }
  return true;
}
function clear() {
  myForm.reset();
}
// Tạo bảng
function renderTableData(arrBreed) {
  tbody.innerHTML = "";
  console.log(arrBreed);

  arrBreed.forEach(function (arrBreed, index) {
    let row = document.createElement("tr");

    row.innerHTML = `
  <td>${index + 1}</td>
  <td>${arrBreed.breed}</td>
  <td>${arrBreed.type}</td>
  <td> <button class="btn btn-danger" onclick="deletePet('${
    index + 1
  }')" >Delete</button>
  </td>`;
    tbody.appendChild(row);
  });
}
submit.addEventListener("click", function () {
  let data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  console.log(data);
  let check = validate(data);
  if (check) {
    clear();
    arrBreed.push(data);
    saveToStorage("storageBreed", arrBreed);
    renderTableData(arrBreed);
  }
});

// Xoa funtion
function deletePet(num) {
  if (confirm("Are you sure?")) {
    arrBreed.splice(`${num - 1}`, 1);
    renderTableData(arrBreed);
    saveToStorage("storageBreed", arrBreed);
  }
}
