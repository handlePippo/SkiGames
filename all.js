const gameWrapper = document.getElementById("gamesWrapper");
const input = document.getElementById("inputSearch");
const genresWrapper = document.getElementById("genresWrapper");
const btnFilter = document.getElementById("buttonFilter");

const url = "./data/data.json";

const showItems = async (link) => {
  const response = await axios.get(link);
  const data = response.data.results;
  input.placeholder = `Cerca il tuo gioco preferito tra ben ${data.length} giochi!`;

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const showGames = async (array) => {
    await sleep(1000)
    gameWrapper.innerHTML = "";
    array.forEach((el) => {
      let div = document.createElement("div");
      div.classList.add("col-12", "col-md-3", "mb-3", "firstDiv");
      div.innerHTML = `
        <div class="card bg-transparent rounded-0 border-numbers-custom p-3 card-game-shadow h-100 mx-auto" style="width: 18rem;">
          <img class="card-img-top rounded-0" src="${el.background_image
        }" alt="${el.name}">
          <div class="card-body">
            <h5 class="card-title font-primary second ">${el.name.length <= 10 ? el.name : el.name.slice(0, 14) + "[. . .]"
        }</h5>
            <img src="./media/play-station.png" alt="">
            <img src="./media/xbox-30.png" alt="">
            <img src="./media/windows.png" alt="">
            <hr>
            <div class="d-flex justify-content-between align-items-center">
              <p class="lead font-secondary accent">Released:</p>
              <p class="font-secondary accent fst-italic">${el.released}</p>
            </div>
            <a href="#" class="btn-cta rounded-0 px-4 font-secondary">Vai al gioco</a>
          </div>
        </div>
    </div>`;
      gameWrapper.appendChild(div);
    });
  };

  showGames(data);

  const filtraItems = (array, gameName) => {
    const gamesFilter = array.filter((el) => {
      return el.name.match(new RegExp(gameName, "gi"));
    });
    console.log(gamesFilter);
    return gamesFilter;
  };

  input.addEventListener("input", (e) =>
    showGames(filtraItems(data, e.target.value))
  );

  const container = [];

  data
    .map((el) => el.genres)
    .map((el) => el.map((el) => el.name))
    .forEach((el) => container.push(...el));

  const filteredGenres = container.reduce((acc, el) => {
    if (!acc.includes(el)) {
      acc.push(el);
    }
    return acc;
  }, []);

  filteredGenres.forEach((el) => {
    let option = document.createElement("option");
    option.setAttribute("id", el);
    option.setAttribute("value", el);
    option.dataset.categoria = "categoria";
    option.innerHTML = `${el}`;
    genresWrapper.append(option);
  });

  const elementCategory = document.querySelectorAll("[data-categoria]");
  elementCategory.forEach((el) => {
    el.addEventListener("click", () => {
      showGames(searchByCategories(data, el.id))
    })
  });

  btnFilter.addEventListener("click", () => {
    showGames(data)
  });


  const searchByCategories = (array, categories) => {
    const filter = array.filter(el => {
      return el.genres.find(el => el.name === categories)
    })
    return filter
  }
};

window.addEventListener("DOMContentLoaded", () => showItems(url));
