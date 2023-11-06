let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try{
        await loadCharacters(currentPageUrl);
    }catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }
}

