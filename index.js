const root = document.querySelector(".root");
const submit = document.querySelector(".form");

const CoOrdinates = [];

const dda = (X1, Y1, X0, Y0) => {
  let dx = X1 - X0;
  let dy = Y1 - Y0;
  let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  let Xinc = dx / steps;
  let Yinc = dy / steps;
  X = X0;
  Y = Y0;
  for (let i = 0; i < steps; i++) {
    CoOrdinates.push({ x: Math.round(X), y: Math.round(Y) });

    X += Xinc * 1;
    Y += Yinc * 1;
  }
};

const bla = (X1, Y1, X2, Y2) => {
  let dx = X2 - X1;
  let dy = Y2 - Y1;

  let x = X1;
  let y = Y1;

  //this is the case when slope(m) < 1
  if (Math.abs(dx) > Math.abs(dy)) {
    CoOrdinates.push({ x, y });
    let pk = 2 * Math.abs(dy) - Math.abs(dx);

    for (let i = 0; i < Math.abs(dx); i++) {
      x = x + 1;
      if (pk < 0) pk = pk + 2 * Math.abs(dy);
      else {
        y = y + 1;
        pk = pk + 2 * Math.abs(dy) - 2 * Math.abs(dx);
      }
      CoOrdinates.push({ x, y });
    }
  } else {
    //this is the case when slope is greater than or equal to 1  i.e: m>=1
    CoOrdinates.push({ x, y });
    let pk = 2 * Math.abs(dx) - Math.abs(dy);

    for (let i = 0; i < Math.abs(dy); i++) {
      y = y + 1;
      if (pk < 0) pk = pk + 2 * Math.abs(dx);
      else {
        x = x + 1;
        pk = pk + 2 * Math.abs(dx) - 2 * Math.abs(dy);
      }

      CoOrdinates.push({ x, y });
    }
  }
};

const pixel = (x, y, color) => {
  const div = `<div class='${x}-${y} ${color}'></div>`;
  root.insertAdjacentHTML("beforeend", div);
};

const init = () => {
  root.innerHTML = "";
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      pixel(x, y, "white");
    }
  }
};

const draw = () => {
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      if (CoOrdinates.find((e) => e.x === x && e.y === y)) {
        pixel(x, y, "black");
      } else {
        pixel(x, y, "white");
      }
    }
  }
};

const plot = (e) => {
  e.preventDefault();
  console.log(e.target[0].value);
  root.innerHTML = "";
  x1 = parseInt(e.target[1].value);
  y1 = parseInt(e.target[2].value);
  x2 = parseInt(e.target[3].value);
  y2 = parseInt(e.target[4].value);
  CoOrdinates.length = 0;
  if (e.target[0].value === "dda") {
    dda(x1, y1, x2, y2);
  } else if (e.target[0].value === "bla") {
    bla(x1, y1, x2, y2);
  }

  draw();
};
init();
submit.addEventListener("submit", plot);
