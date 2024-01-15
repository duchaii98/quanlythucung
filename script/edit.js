"use strict";

const table2 = document.querySelector(".table2");
const inputId = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilixedInput = document.getElementById("input-sterilized");
const containerForm = document.querySelector("#container-form");
const submitBtn = document.getElementById("submit-btn");
const myForm = document.querySelector("#myForm");
// ham tạo anima cho side bar
const sidebar = document.querySelector("#sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// hàm tạo bảng về thông tin thú cưng người dùng nhập
function talbeSearch(mang2) {
  if (mang2) {
    table2.innerHTML = "";
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
  <td>
    <button class="btn btn-warning">Edit</button>
  </td>`;
      table2.appendChild(row);
    });
  }
}
talbeSearch(mang2);
// hàm bắt sự kiện khi nhấn vào nút edit
const editList = document.querySelectorAll(".btn.btn-warning");
editList.forEach((btn) => {
  btn.addEventListener("click", function () {
    const id = this.parentElement.parentElement.children[0].innerHTML;
    editPet(id);
  });
});

// hàm chỉnh sửa dữ liệu thông tin của thú cưng lên form nhập
function editPet(id) {
  containerForm.classList.remove("hide");
  const pet = mang2.find((petItem) => petItem.id === id);

  inputId.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.leng;
  colorInput.value = pet.color;

  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilixedInput.checked = pet.sterilixed;
  renderBreed();
  breedInput.value = `${pet.breed}`;
}
// sự kiện nhấp chuột vào typeInput => sau đó hiện thị các loại thú cứng đúng với từng loại dog- cat
typeInput.addEventListener("click", renderBreed);

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

  if (isNaN(data.age) || data.age > 15 || data.age < 1) {
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
// hàm reset input
function resetForm() {
  myForm.reset();
}

submitBtn.addEventListener("click", function () {
  const data = {
    id: inputId.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: Number(weightInput.value),
    leng: Number(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilixed: sterilixedInput.checked,
  };
  const oke = validateData(data);
  if (oke) {
    let index = mang2.findIndex((pet) => pet.id === data.id);
    let index2 = mangHealthy.findIndex((pet) => pet.id === data.id);
    // hàm cập nhật lại thông tin của thú cưng
    data.date = mang2[index].date;
    mang2[index] = data;
    saveToStorage("storage", mang2);

    let healthy = Boolean(index2 >= 0);
    console.log(!healthy);
    function healthyCheck2(data) {
      if (data.vaccinated && data.dewormed && data.sterilixed && !healthy) {
        data.date = mang2[index].date;
        mangHealthy.push(data);
        saveToStorage("storageHealthy", mangHealthy);
        return;
      }
      if (healthy) {
        if (data.vaccinated && data.dewormed && data.sterilixed) {
          data.date = mang2[index].date;
          mangHealthy[index2] = data;
          saveToStorage("storageHealthy", mangHealthy);
        } else {
          mangHealthy.splice(index2, 1);
          saveToStorage("storageHealthy", mangHealthy);
        }
        return;
      }
    }

    resetForm();
    healthyCheck2(data);
    containerForm.classList.add("hide");
    talbeSearch(mang2);
  }
});
