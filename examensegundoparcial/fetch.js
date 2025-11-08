const ApiPerros = "https://api.thedogapi.com/v1/breeds";

const informacion = () => {
    const perrosElements = {
        proposito: document.getElementById("proposito"),
        grupoRaza: document.getElementById("grupoRaza"),
        vida: document.getElementById("vida"),
        personalidad: document.getElementById("personalidad"),
        peso: document.getElementById("peso"),
        estatura: document.getElementById("estatura"),
    };

    const containers = {
        imageContainer: document.getElementById("imagen"),
    };

    const buttons = {
        buscar: document.getElementById("btnBuscar"),
    };

    const PerroInput = document.getElementById("RazaPerro");

    const images = {
        imgNotFound: "./img/404.png",
        imgLoading: "./img/buscando.png",
    };

    const imageTemplate = `<img src="{imgSrc}" alt="Imagen de perro" />`;

    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
    };

    const getPerroData = async (RazaPerro) => {
        try {
            const response = await fetch(ApiPerros, {
                method: "GET",
                headers: {
                    "x-api-key": "live_AetvN7O5tDhBs5WVbg1BYZTKIsKHLUHamOSndJVITaS5XTiaYA54NUiZkqbT28dJ",
                },
            });
            const data = await response.json();
            const filteredData = data.find((breed) => breed.name.toLowerCase() === RazaPerro.toLowerCase());
            return filteredData || { requestFailed: true };
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
            return { requestFailed: true };
        }
    };

    const SetPerroData = async (RazaPerro) => {
        setLoading();
        const PerroData = await getPerroData(RazaPerro);
        if (PerroData.requestFailed) {
            containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgNotFound);
            Object.values(perrosElements).forEach((element) => (element.textContent = "No disponible"));
        } else {
            containers.imageContainer.innerHTML = `<img src="${PerroData.image.url}" alt="${PerroData.name}" />`;
            perrosElements.proposito.textContent = PerroData.bred_for || "No disponible";
            perrosElements.grupoRaza.textContent = PerroData.breed_group || "No disponible";
            perrosElements.vida.textContent = PerroData.life_span || "No disponible";
            perrosElements.personalidad.textContent = PerroData.temperament || "No disponible";
            perrosElements.peso.textContent = PerroData.weight.metric || "No disponible";
            perrosElements.estatura.textContent = PerroData.height.metric || "No disponible";
        }
    };

    const triggers = () => {
        buttons.buscar.onclick = () => SetPerroData(PerroInput.value);
    };
    triggers();
};

window.onload = informacion;
/*const ApiPerros = "https://api.thedogapi.com/v1/breeds";

const informacion = () => {
    const perrosElements = {
        proposito: document.getElementById("proposito"),
        grupoRaza: document.getElementById("grupoRaza"),
        vida: document.getElementById("vida"),
        personalidad: document.getElementById("personalidad"),
        peso: document.getElementById("peso"),
        estatura: document.getElementById("estatura"),
    }

    const containers = {
        imageContainer: document.getElementById("imagen"), 
    };

    const buttons = {
        buscar: document.getElementById("btnBuscar"),
    }

    const PerroInput = document.getElementById("RazaPerro");

    const images = {
        imgNotFound: "./img/404.png",
        imgLoading: "./img/buscando.png",
    };

    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
    };
    
    


    const getPerroData = async (RazaPerro) => fetch(`${ApiPerros}/search?q=${encodeURIComponent(RazaPerro)}`,{
        method: "GET",
        headers: {
            "x-api-key": "live_AetvN7O5tDhBs5WVbg1BYZTKIsKHLUHamOSndJVITaS5XTiaYA54NUiZkqbT28dJ",
        },
    })
    .then((response) => response.json())
    .catch((error) => ({requestFailed: true}));

    
    const SetPerroData = async (RazaPerro) => {
        setLoading();
        const PerroData = await getPerroData(typeof RazaPerro === typeof "" ? RazaPerro.toLowerCase() : RazaPerro);
        if (PerroData.requestFailed || PerroData.length === 0) {
            containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgNotFound);
        }else{
            containers.imageContainer.innerHTML = `${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default)}`;
            perrosElements.proposito = PerroData.bred_for;
        }
        
    }
    
    const triggers = () => {
        buttons.buscar.onclick = () => SetPerroData(PerroInput.value);
    }
    triggers();
};

window.onload = informacion;
*/