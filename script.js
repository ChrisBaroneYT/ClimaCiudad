const apiKey = "e48b24e781b6b054dd1e287a6a584a31";
let climaActual = {}; // Objeto para almacenar los datos obtenidos

document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Por favor, ingresa el nombre de una ciudad.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("result").innerHTML = "<p>Ciudad no encontrada.</p>";
            } else {
                climaActual = {
                    ciudad: data.name,
                    pais: data.sys.country,
                    descripcion: data.weather[0].description,
                    temperatura: data.main.temp,
                    humedad: data.main.humidity,
                    presion: data.main.pressure
                };

                const resultHtml = `
                    <h2>Clima en ${climaActual.ciudad}, ${climaActual.pais}</h2>
                    <p><strong>Descripción:</strong> ${climaActual.descripcion}</p>
                    <p><strong>Temperatura:</strong> ${climaActual.temperatura}°C</p>
                    <p><strong>Humedad:</strong> ${climaActual.humedad}%</p>
                    <p><strong>Presión atmosférica:</strong> ${climaActual.presion} hPa</p>
                `;

                document.getElementById("result").innerHTML = resultHtml;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un error al obtener los datos.");
        });
});

document.getElementById("saveWeather").addEventListener("click", function () {
    if (!climaActual.ciudad) {
        alert("Primero debes obtener el clima.");
        return;
    }

    fetch("http://localhost:3000/guardarClima", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(climaActual)
    })
    .then(response => response.json())
    .then(result => alert(result.message))
    .catch(error => {
        console.error("Error al guardar en DB:", error);
        alert("Error al guardar los datos.");
    });
});
