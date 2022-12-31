const container = document.querySelector(".container");
const cardAmount = 9;

const showModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close");

let bool = true;

let color1Arr = [];
let color2Arr = [];

function rndColor() {
  const x = Math.round(0xffffff * Math.random()).toString(16);
  const y = 6 - x.length;
  const z = "000000";
  const z1 = z.substring(0, y);
  const randomColor = "#" + z1 + x;
  return randomColor;
}

for (let i = 0; i < cardAmount; i++) {
  const color1 = rndColor();
  const color2 = rndColor();

  color1Arr.push(color1);
  color2Arr.push(color2);

  container.innerHTML += `
    <div class="card">
      <div class="card-header">
      <h3 class="card-id">00${i + 1}</h3>
      <button class="type">Linear</button>
      </div>
      <div class="card-body">
        <div
          class="gradient"
          style="background: linear-gradient(45deg, ${color1}, ${color2})"
        ></div>
      </div>
      <div class="card-footer">
        <div>
          <span class="color1">${color1}</span>
          <span class="color2">${color2}</span>
          </div>
        <button class="copy">Copy CSS</button>
      </div>
    </div>
`;
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("type")) {
    bool = !bool;
    const gradient =
      e.target.parentElement.parentElement.children[1].firstElementChild;
    const id =
      e.target.parentElement.parentElement.children[0].firstElementChild.innerText.substr(
        2
      ) - 1;
    console.log(id);

    if (bool === true) {
      gradient.style.background = `linear-gradient(45deg, ${color1Arr[id]}, ${color2Arr[id]})`;
      e.target.innerText = "Linear";
    } else {
      gradient.style.background = `radial-gradient(circle, ${color1Arr[id]}, ${color2Arr[id]})`;
      e.target.innerText = "Radial";
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("copy")) {
    const gradient =
      e.target.parentElement.parentElement.children[1].firstElementChild.style
        .background;
    navigator.clipboard.writeText("background: " + gradient + ";");
    e.target.innerText = "Copied!";

    setTimeout(() => {
      e.target.innerText = "Copy CSS";
    }, 2000);
  }
});

const openModal = function () {
  showModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  showModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
