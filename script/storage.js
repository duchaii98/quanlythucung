"use strict";

// hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// hàm lấy dữ liệu
function getFromStorage(key) {
  return localStorage.getItem(key);
}
// lưu dữ liệu breed và sau đó hiện thị ra theo từng loại dog hoặc cat
let mang = JSON.parse(getFromStorage("storageBreed"));

function renderBreed() {
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
// edit
// lưu dữ liệu về những thông tin người dùng nhập vào mảng2
let mang2 = JSON.parse(getFromStorage("storage"));
console.log(mang2);
let mangHealthy = JSON.parse(getFromStorage("storageHealthy"));
console.log(mangHealthy);
