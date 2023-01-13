const gamesGenres = document.querySelector("#totalGenres");
const gamesCounter = document.querySelector("#totalGames");
const gamesPlatform = document.querySelector("#totalPlatforms");
const cardWrapper = document.querySelector("#gameCardWrapper");

const url = "./data/data.json";

ScrollReveal().reveal(".item", {
  delay: 10,
  distance: "-100px",
  duration: 1200,
  interval: 500,
});

const mostraItems = async (link) => {
  try {
    const response = await axios.get(link);
    const data = response.data.results;
    console.log(data);

    gamesCounter.textContent = data.length;

    let generi = [];
    data.forEach((element) => {
      element.genres.forEach((el) => {
        generi.push(el.name);
      });
    });
    const filteredGenres = new Set(generi);
    gamesGenres.textContent = filteredGenres.size;

    let platform = [];
    data.forEach((element) => {
      element.platforms.forEach((el) => {
        platform.push(el.platform.name);
      });
    });
    const filteredPlatforms = new Set(platform);
    gamesPlatform.innerText = filteredPlatforms.size;

    const mappedEl = data
      .map((el) => {
        return [el.name, el.background_image, new Date(el.released)];
      })
      .sort((a, b) => b[2] - a[2])
      .slice(0, 4);

    mappedEl.forEach((el) => {
      let div = document.createElement("div");
      div.classList.add("col-12", "col-md-3", "mb-3");
      div.innerHTML = `
        <div class="card bg-transparent rounded-0 border-numbers-custom p-3 card-game-shadow h-100 mx-auto" style="width: 18rem;">
          <img class="card-img-top rounded-0" src="${el[1]}" alt="${el[0]}">
          <div class="card-body">
            <h5 class="card-title font-primary second ">${
              el[0].length <= 10 ? el[0] : el[0].slice(0, 14) + "[. . .]"
            }</h5>
            <img src="./media/play-station.png" alt="">
            <img src="./media/xbox-30.png" alt="">
            <img src="./media/windows.png" alt="">
            <hr>
            <div class="d-flex justify-content-between align-items-center">
              <p class="lead font-secondary accent">Released:</p>
              <p class="font-secondary accent fst-italic">${el[2].toLocaleDateString(
                "it-IT"
              )}</p>
            </div>
            <a href="#" class="btn-cta rounded-0 px-4 font-secondary">Vai al gioco</a>
          </div>
        </div>
    </div>`;
      cardWrapper.append(div);
    });
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("DOMContentLoaded", mostraItems(url));
