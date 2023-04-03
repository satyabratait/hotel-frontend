const submitBtn = document.getElementById("submitButton");
const nextSwiper = document.querySelector(".swiper-button-next");
const prevSwiper = document.querySelector(".swiper-button-prev");
const swiperSlides = document.querySelectorAll(".roomsImages");
const aboutUsHeading = document.querySelector(".aboutUsPartOne h1");
const aboutUsContent = document.querySelector(".aboutUsPartOne p");
const backgroundImage = document.querySelector(".aboutUs");
const servicesImage = document.querySelectorAll(".servicesImage");
const servicesSubHeading = document.querySelectorAll(".servicesSubHeading");
const servicesCardHeading = document.querySelectorAll(".servicesCardHeading");
const servicesCardContent = document.querySelectorAll(".servicesCardContent");
const checkInOut = document.querySelectorAll("[type=date]");

let swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function nextData(datas) {
  nextSwiper.addEventListener("click", (e) => {
    nextData(datas);
  }),
    prevSwiper.addEventListener("click", (e) => {
      nextData(datas);
    });

  swiperSlides.forEach((slide, index) => {
    slide.src = datas.data[index].imageUrl;
  });

  for (let i = 0; i < swiperSlides.length; i++) {
    if (swiperSlides[i].classList.contains("swiper-slide-active")) {
      console.log(datas.data[i]);
      console.log(i);
      console.log(document.querySelector(".roomsImages"), "image");
      document.querySelector(".roomType").textContent = datas.data[i].roomType;
      document.querySelector(".roomPrice").textContent = datas.data[i].price;
      document.querySelector(".bedSize").textContent = datas.data[i].bedSize;
      document.querySelector(".roomCapacity").textContent =
        datas.data[i].capacity;
      document.querySelector(".roomSize").textContent = datas.data[i].size;
      document.querySelector(".roomView").textContent = datas.data[i].view;
    }
  }
}

if (submitBtn != null) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(roomForm.checkIn.value);
    console.log(roomForm.checkOut.value);
    console.log(roomForm.adults.value);
    console.log(roomForm.children.value);
    if (
      roomForm.checkIn.value.length > 0 &&
      roomForm.checkOut.value.length > 0 &&
      roomForm.adults.value.length > 0 &&
      roomForm.children.value.length > 0
    ) {
      fetch("http://127.0.0.1:8080", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: `id=${Date.now()}&checkInDate=${
          roomForm.checkIn.value
        }&checkOutDate=${roomForm.checkOut.value}&noOfAdults=${
          roomForm.adults.value
        }&noOfChildren=${roomForm.children.value}`,
      }).then((res) => {
        console.log("Request complete! response:", res);
        submitBtn.textContent = "✓";
        roomForm.checkIn.value = "";
        roomForm.checkOut.value = "";
        roomForm.adults.value = "";
        roomForm.children.value = "";
        setTimeout(() => {
          submitBtn.textContent = "Submit";
        }, 5000);
      });
    } else {
      alert("fields are empty");
    }
  });
}

function aboutUs(datas) {
  datas.data.forEach((data) => {
    aboutUsHeading.textContent = data.heading;
    aboutUsContent.textContent = data.content;
    backgroundImage.style.backgroundImage = `url(${data.imageUrl})`;
  });
}

function services(datas) {
  datas.data.forEach((data, index) => {
    servicesImage[index].src = data.imageUrl;
    servicesSubHeading[index].textContent = data.subHeading;
    servicesCardHeading[index].textContent = data.heading;
    servicesCardContent[index].textContent = data.content;
  });
}

async function GetAboutData() {
  await fetch("http://127.0.0.1:8080/top")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (aboutUsHeading != null) aboutUs(data);
    });
}

async function getCardData() {
  await fetch("http://127.0.0.1:8080/card")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (servicesImage != null) services(data);
    });
}

async function getRoomData() {
  await fetch("http://127.0.0.1:8080/slider")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (nextSwiper != null) nextData(data);
    });
}

if (checkInOut[0] != null && checkInOut[1] != null) {
  checkInOut[1].addEventListener("click", () => {
    if (roomForm.checkIn.value.trim().length > 0) {
      document
        .querySelectorAll("[type=date]")[1]
        .setAttribute("min", roomForm.checkIn.value);
    }
  });

  checkInOut[0].addEventListener("click", () => {
    if (roomForm.checkOut.value.trim().length > 0) {
      document
        .querySelectorAll("[type=date]")[0]
        .setAttribute("max", roomForm.checkOut.value);
    }
  });
}

(() => {
  GetAboutData();
  getCardData();
  getRoomData();
  let today = new Date().toISOString().split("T")[0];
  checkInOut.forEach((item) => {
    item.setAttribute("min", today);
  });
})();
