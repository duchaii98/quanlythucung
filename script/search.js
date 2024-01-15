"use strict";
const inputId = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.getElementById("input-type");
const myForm = document.getElementById("myForm");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilixedInput = document.getElementById("input-sterilized");
const resetBtn = document.getElementById("reset-btn");
const findBtn = document.getElementById("find-btn");
const containerForm = document.querySelector("#container-form");
const tbody = document.getElementById("tbody");

// ham tạo anima cho side bar
const sidebar = document.querySelector("#sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// hàm hiện thị thông tin về breed
function checkbreed() {
  // Nếu dữ liệu là dog
  if (typeInput.value === "Dog") {
    breedInput.innerHTML = "";
    // hàm lọc lấy mảng chứ dữ liệu về breed dog
    const mangBreedDog = mang.filter((value) => {
      return value.type === "Dog";
    });
    // hàm gọi option hiện ra để ng dùng chọn
    mangBreedDog.forEach((mangBreedDog) => {
      const option = document.createElement("option");
      option.innerHTML = `
      <option>${mangBreedDog.breed}</option>
      `;
      breedInput.appendChild(option);
    });
    // nếu là cat
  } else if (typeInput.value === "Cat") {
    breedInput.innerHTML = "";
    // hàm lọc lấy mảng chứ dữ liệu về breed cat
    const mangBreedCat = mang.filter((value) => {
      return value.type === "Cat";
    });
    // hàm gọi option hiện ra để ng dùng chọn
    mangBreedCat.forEach((mangBreedCat) => {
      const option = document.createElement("option");
      option.innerHTML = `
   
    <option>${mangBreedCat.breed}</option>
    `;
      breedInput.appendChild(option);
    });
  } else {
    breedInput.innerHTML = "";
    const option = document.createElement("option");
    option.innerHTML = `
<option>Select Breed</option>
`;
    breedInput.appendChild(option);
  }
}
// hàm hiện thị thông tin về những thú cưng hiện có
function talbeSearch(mang2) {
  if (mang2) {
    tbody.innerHTML = "";
    mang2.forEach(function (mang3) {
      let row = document.createElement("tr");
      const red = `<i class="bi bi-x-circle-fill"></i>`;
      const green = `<i class="bi bi-check-circle-fill"></i>`;

      row.innerHTML = `
  <th scope="row">${mang3.id}</th>
  <td>${mang3.name}</td>
  <td>${mang3.age}</td>
  <td>${mang3.type}</td>
  <td>${mang3.weight} kg</td>
  <td>${mang3.leng} cm</td>
  <td>${mang3.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${mang3.color}"></i>
  </td>
  <td>${mang3.vaccinated ? green : red}</td>
  <td>${mang3.dewormed ? green : red}</td>
  <td>${mang3.sterilixed ? green : red}</td>
 
  <td>${mang3.date}</td>
 `;
      tbody.appendChild(row);
    });
  }
}
talbeSearch(mang2);
// bắt sự kiện khi nhấn vào nút reset
resetBtn.addEventListener("click", function () {
  myForm.reset();

  talbeSearch(mang2);
});
// bắt sự kiện khi nhấn vào nút button
findBtn.addEventListener("click", function () {
  let petArrFind = mang2;
  console.log(petArrFind);
  if (inputId.value) {
    petArrFind = petArrFind.filter((pet) =>
      pet.id.toLowerCase().includes(inputId.value.toLowerCase())
    );
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) =>
      pet.name.toLowerCase().includes(nameInput.value.toLowerCase())
    );
  }
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  if (sterilixedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilixed === true);
  }
  talbeSearch(petArrFind);
});
