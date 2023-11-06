let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try{
        await loadCharacters(currentPageUrl);
    }catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener(click, loadNextPage)
    backButton.addEventListener(click, loadPreviousPage)
    
}

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';
    try {
        const response = await fetch(url);

        const responseJson = await response.json();

        for(character in responseJson.results) {
            const contain = responseJson.results[character];
            const characterName = 
            `<div class="cards" style="background-image: url('https://starwars-visualguide.com/assets/img/characters/${contain.url.replace(/\D/g, "")}.jpg');">                
                <div class="character-name-bg">
                    <span class="character-name">${contain.name}</span>
                </div>
            </div>`

            document.querySelector('#main-content').innerHTML += characterName
        }

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disable = !responseJson.next
        backButton.disable = !responseJson.previous

        backButton.style.visibility = response.Jasen.previous? "visible" : "hidden"

        currentPageUrl = urls
    } catch (error) {
        alert('erro ao carregar os personagens')
        console.log(error)
    }
}