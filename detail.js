const title = document.getElementById("title")
const playtime = document.getElementById("playtime")
const icons = document.getElementById("iconsWrapper")
const imgGame = document.getElementById("imgGame")
const screenWrapper = document.getElementById("screenWrapper")
const rating = document.getElementById("rating")
const recensioni = document.getElementById("recensioni")
const updated = document.getElementById("updated")
const genere = document.getElementById("genere")
const bgGame = document.getElementById("bg-game")

const url = "./data/data.json";

const showItems = async (link) => {
    const response = await axios.get(link);
    const data = response.data.results;

    const getGame = (gameName) => {
        return data.find(el => el.name === gameName)
    }

    const detail = getGame("Grounded");

    title.textContent = detail.name
    imgGame.src = detail.background_image
    playtime.textContent = `${Math.floor(300 + Math.random() * 50)} ore di gioco`

    if (detail.platforms.some(el => el.platform.name === "PlayStation 5" || detail.platforms.some(el => el.platform.name === "PlayStation 4"))) {
        let img = document.createElement('img');
        img.src = "./media/play-station.png"
        icons.append(img)
    }
    if (detail.platforms.some(el => el.platform.name === "PC" || detail.platforms.some(el => el.platform.name === "PC"))) {
        let img = document.createElement('img');
        img.src = "./media/windows.png"
        icons.append(img)
    }
    if (detail.platforms.some(el => el.platform.name === "Xbox One" || detail.platforms.some(el => el.platform.name === "Xbox Series S/X"))) {
        let img = document.createElement('img');
        img.src = "./media/xbox-30.png"
        icons.append(img)
    }
    if (detail.platforms.some(el => el.platform.name === "Nintendo Switch" || detail.platforms.some(el => el.platform.name === "Xbox Series S/X"))) {
        let img = document.createElement('img');
        img.src = "./media/nintendo.png"
        icons.append(img)
    }

    const mappedImg = detail.short_screenshots.map(el => {
        return el.image
    }).slice(3, 5)
    mappedImg.forEach(el => {
        let div = document.createElement("div")
        div.classList.add("col-6", "mb-3")
        div.innerHTML = `
        <img src="${el}" alt="img" class="img-fluid" style="opacity: 0.7">
        `
        screenWrapper.append(div)
    });

    genere.textContent = detail.genres.map(el => el.name)
    rating.textContent = detail.rating
    recensioni.textContent = detail.reviews_count
    updated.textContent = detail.updated.slice(0, 4)
    bgGame.style.background = `linear-gradient(rgba(0,0,0,8), rgba(0,0,0,0.8)), url("${detail.background_image}")`
    bgGame.style.backgroundSize = "cover"
    bgGame.style.backgroundPosition = "center"
    bgGame.style.repeat = "no-repeat"

}


window.addEventListener("DOMContentLoaded", () => showItems(url))