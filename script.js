"use strict";
const submitBtn = document.querySelector("#submit-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
let tableBodyEl = document.querySelector("#myTable");
let tbody = document.querySelector("#tbody");
let healthy = document.querySelector("#healthy-btn");
let pet1 = document.querySelector(".pet1");
let pet2 = document.querySelector(".pet2");
const myForm = document.querySelector("#myForm");
const bmiBtn = document.querySelector("#bmi-btn");
const petArr = [];
const bmiArr = [];
let bmi = document.querySelector(".bmi");

let petArr2 = JSON.parse(getFromStorage("storage")) ?? [];
console.log(typeof petArr2);
let healthyArr = JSON.parse(getFromStorage("storageHealthy")) ?? [];

let row;

// thêm dữ liệu mới nhập hiện ra bảng
function renderTableData(petArr2) {
  tbody.innerHTML = "";
  console.log(petArr2);

  petArr2.forEach((petArr2) => {
    row = document.createElement("tr");
    const red = `<i class="bi bi-x-circle-fill"></i>`;
    const green = `<i class="bi bi-check-circle-fill"></i>`;

    row.innerHTML = `
  <th scope="row">${petArr2.id}</th>
  <td>${petArr2.name}</td>
  <td>${petArr2.age}</td>
  <td>${petArr2.type}</td>
  <td>${petArr2.weight} kg</td>
  <td>${petArr2.leng} cm</td>
  <td>${petArr2.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petArr2.color}"></i>
  </td>
  <td>${petArr2.vaccinated ? green : red}</td>
  <td>${petArr2.dewormed ? green : red}</td>
  <td>${petArr2.sterilixed ? green : red}</td>
 
  <td>${petArr2.date}</td>
  <td>
    <button class="btn btn-danger" onclick="deletePet('${
      petArr2.id
    }')" >Delete</button>
  </td>`;
    tbody.appendChild(row);
  });
}
// Lưu data
// lấy dữ liệu petArr
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
if (getFromStorage("storage")) {
  renderTableData(petArr2);
}

function isNaN(x) {
  // Ép kiểu Number cho biến x
  x = Number(x);
  // Nếu x là NaN, NaN != NaN trả về true, các trường hợp khác sẽ trả về false
  return x != x;
}
function validateData(data) {
  //check fields
  if (
    data.id == "" ||
    data.name == "" ||
    data.age == NaN ||
    data.weight == NaN ||
    data.leng == NaN
  ) {
    alert("You must fill all fields");
    return;
  }
  //check id
  for (let i = 0; i < petArr2.length; i++) {
    if (data.id == petArr2[i].id) {
      alert("ID must be unique!");
      return;
    }
  }
  console.log(data.age);

  if (isNaN(data.age) || data.age > 15 || data.age < 1) {
    console.log(data.age);
    alert("Age must be between 1 and 15!");
    return;
  }

  if (data.weight > 15 || data.weight < 1) {
    alert("Weight must be between 1 and 15!");
    return;
  }
  if (data.leng > 100 || data.leng < 1) {
    alert("Lenght must be between 1 and 100!");
    return;
  }
  if (data.type == "Select Type") {
    alert("Please select Type!");
    return;
  }
  if (data.breed == "Select Breed") {
    alert("Please select Breed!");
    return;
  }
  return true;
}
// lấy dữ liệu nhập từ form
submitBtn.addEventListener(`click`, function (e) {
  let data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    type: typeInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilixed: sterilizedInput.checked,
    date: new Date().toLocaleDateString("en-GB"),

    weight: weightInput.value,
    leng: lengthInput.value,
  };

  if (validateData(data)) {
    // xóa input
    function resetForm() {
      myForm.reset();
    }
    resetForm();

    function healthyCheck2() {
      if (data.vaccinated && data.dewormed && data.sterilixed) {
        healthyArr.push(data);
        saveToStorage("storageHealthy", healthyArr);
      }
    }
    healthyCheck2();

    // xoá dữ liệu đg hiện trên bảng thêm dữ liệu ng dùng mới nhập
    tbody.innerHTML = "";
    petArr2.push(data);

    renderTableData(petArr2);
    saveToStorage("storage", petArr2);
  }
});
console.log(petArr2);
console.log(healthyArr);
// Khi nhấn lại vào nút "Show All Pet" thì sẽ hiển thị lại toàn bộ các thú cưng đang có và nút bấm sẽ đổi lại thành "Show Healthy Pet".
healthy.addEventListener("click", function () {
  if (pet2.classList.contains("hide")) {
    pet2.classList.remove("hide");
    pet1.classList.add("hide");
    renderTableData(healthyArr);
    if (getFromStorage("storageHealthy")) {
      renderTableData(healthyArr);
    }
  } else {
    pet2.classList.add("hide");
    pet1.classList.remove("hide");
    renderTableData(petArr2);
  }
});

// Xoa funtion

function deletePet(petId) {
  const index = petArr2.findIndex((pet) => pet.id === petId);

  const index2 = healthyArr.findIndex((pet) => pet.id === petId);
  console.log(index2);
  if (confirm("Are you sure?")) {
    petArr2.splice(index, 1);

    saveToStorage("storage", petArr2);
    if (index2 >= 0) {
      healthyArr.splice(index2, 1);
      saveToStorage("storageHealthy", healthyArr);
    }
    renderTableData(petArr2);
  }
}

const sidebar = document.querySelector("#sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
