const submitBtn = document.getElementById("submitButton");
const nextSwiper = document.querySelector(".swiper-button-next");
const prevSwiper = document.querySelector(".swiper-button-prev");

let i = 0;

var swiper = new Swiper(".mySwiper", {
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
  const swiperSlides = document.querySelectorAll(".roomsImages");
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
      document.querySelector(".roomCapacity").textContent = datas.data[i].capacity;
      document.querySelector(".roomSize").textContent = datas.data[i].size;
      document.querySelector(".roomView").textContent = datas.data[i].view;
    }
  }
}

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

function aboutUs(datas) {
  console.log(datas);
  document.querySelector(".aboutUs-partOne h1").textContent =
    datas.data[0].heading;
  document.querySelector(".aboutUs-partOne p").textContent =
    datas.data[0].content;
  document.querySelector(
    ".aboutUs"
  ).style.backgroundImage = `url(${datas.data[0].imageUrl})`;
}

function services(datas) {
  console.log(datas.data[0].imageUrl);
  document.querySelector(".servicesFirstCard img").src = datas.data[0].imageUrl;
  document.querySelector(".servicesFirstCardSubHeading").textContent =
    datas.data[0].subHeading;
  document.querySelector(".servicesFirstCardHeading").textContent =
    datas.data[0].heading;
  document.querySelector(".servicesFirstCardContent").textContent =
    datas.data[0].content;

  document.querySelector(".servicesSecondCard img").src =
    datas.data[1].imageUrl;
  document.querySelector(".servicesSecondCardSubHeading").textContent =
    datas.data[1].subHeading;
  document.querySelector(".servicesSecondCardHeading").textContent =
    datas.data[1].heading;
  document.querySelector(".servicesSecondCardContent").textContent =
    datas.data[1].content;

  document.querySelector(".servicesThirdCard img").src = datas.data[2].imageUrl;
  document.querySelector(".servicesThirdCardSubHeading").textContent =
    datas.data[2].subHeading;
  document.querySelector(".servicesThirdCardHeading").textContent =
    datas.data[2].heading;
  document.querySelector(".servicesThirdCardContent").textContent =
    datas.data[2].content;

  document.querySelector(".servicesFourthCard img").src =
    datas.data[3].imageUrl;
  document.querySelector(".servicesFourthCardSubHeading").textContent =
    datas.data[3].subHeading;
  document.querySelector(".servicesFourthCardHeading").textContent =
    datas.data[3].heading;
  document.querySelector(".servicesFourthCardContent").textContent =
    datas.data[3].content;
}

async function GetAboutData() {
  await fetch("http://127.0.0.1:8080/top")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      aboutUs(data);
    });
}

async function getCardData() {
  await fetch("http://127.0.0.1:8080/card")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      services(data);
    });
}

async function getRoomData() {
  await fetch("http://127.0.0.1:8080/slider")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      nextData(data);
    });
}

(() => {
  GetAboutData();
  getCardData();
  getRoomData();
})();
