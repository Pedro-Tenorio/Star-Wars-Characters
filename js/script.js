let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    }catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document. createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                document.getElementById('modal').style.visibility = "visible"

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const contentModal = `<div class="character-image" style="background-image: url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg');"></div>
                <span class="character-details">Nome: ${character.name}</span>
                <span class="character-details">Altura: ${convertHeight(character.height)}</span>
                <span class="character-details">Peso: ${convertMass(character.mass)}</span>
                <span class="character-details">Cor dos olhos: ${convertColor(character.eye_color)}</span>
                <span class="character-details">Nascimento: ${convertBirthYear(character.birth_year)}</span>`
                
                modalContent.innerHTML += contentModal   
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        
        currentPageUrl = url

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar os personagens')
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar página anterior')
    }
}

function hideModal() {
    document.getElementById('modal').style.visibility = "hidden"
}

function convertColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hanzel: "avelã",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor
}

function convertHeight(height) {
    if(height === "unknown") {
        return "desconhecida"
    }

    return (height / 100).toFixed(2);
}

function convertMass(mass) {
    if(mass === "unknown") {
        return "desconhecida"
    }

    return `${mass} Kg`
}

function convertBirthYear(birthYear) {
    if(birthYear === "unknown") {
        return "desconhecida"
    }
    return birthYear
}