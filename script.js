// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
// Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
// Note del docente

// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"
// Esempio di utilizzo

// getDashboardData('london')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
//             `The main airport is ${data.airport}.\n`
//         );
//     })
//     .catch(error => console.error(error));

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj
}

// async function getDashboardData(query) {
//     const promises = [
//         fetchJson(`http://localhost:3333/destinations?search=${query}`),
//         fetchJson(`http://localhost:3333/weathers?search=${query}`),
//         fetchJson(`http://localhost:3333/airports?search=${query}`),
//     ];
//     const allData = await Promise.all(promises);
//     const data = {
//         'city': allData[0][0].name,
//         'country': allData[0][0].country,
//         'temperature': allData[1][0].temperature,
//         'weather': allData[1][0].weather_description,
//         'airport': allData[2][0].name
//     }

//     return data;
// }

// (async () => {
//     try {
//         const data = await getDashboardData('london');
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
//             `The main airport is ${data.airport}.\n`
//         );
//     } catch (error) {
//         console.error(error);
//     }
// })()

// Esempio di output atteso

// // Risposta API
// {
//   city: "London",
//   country: "United Kingdom",
//   temperature: 18,
//     weather: "Partly cloudy",
//   airport: "London Heathrow Airport"
// }
// ​
// // Output in console
// London is in United Kingdom. 
// Today there are 18 degrees and the weather is Partly cloudy.
// The main airport is London Heathrow Airport.


// 🎯 Bonus 1 - Risultato vuoto

// Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).

// // Risposta API
// {
//   city: "Vienna",
//   country: "Austria",
//   temperature: null,
//     weather: null,
//   airport: "Vienna International Airport"
// }
// ​
// // Output in console
// Vienna is in Austria.
// The main airport is Vienna International Airport.

// async function getDashboardData(query) {
//     const promises = [
//         fetchJson(`http://localhost:3333/destinations?search=${query}`),
//         fetchJson(`http://localhost:3333/weathers?search=${query}`),
//         fetchJson(`http://localhost:3333/airports?search=${query}`),
//     ];
//     const allData = await Promise.all(promises);

//     function checkData(array, propertyName) {
//         let result = null;
//         if (array.length > 0) {
//             result = array[0][propertyName];
//         }
//         return result;
//     }

//     const data = {
//         'city': checkData(allData[0], 'name'),
//         'country': checkData(allData[0], 'country'),
//         'temperature': checkData(allData[1], 'temperature'),
//         'weather': checkData(allData[1], 'weather_description'),
//         'airport': checkData(allData[2], 'name')
//     }

//     return data;
// }

// (async () => {
//     try {
//         const data = await getDashboardData('vienna');
//         let message = ``;
//         if (data.city !== null && data.country !== null) {
//             message += `${data.city} is in ${data.country}.\n`
//         }
//         if (data.temperature !== null && data.weather !== null) {
//             message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
//         }
//         if (data.airport !== null) {
//             message += `The main airport is ${data.airport}.\n`
//         }
//         console.log('Dasboard data:', data);
//         console.log(message);
//     } catch (error) {
//         console.error(error);
//     }
// })()



// 🎯 Bonus 2 - Chiamate fallite

// Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

// Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
// Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
// Stampa in console un messaggio di errore per ogni richiesta fallita.
// Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).

async function getDashboardData(query) {
    const promises = [
        fetchJson(`http://localhost:3333/destinations?search=${query}`),
        fetchJson(`https://www.meteofittizio.it`),
        fetchJson(`https://www.aeroportofittizio.it`),
    ];
    const allData = await Promise.allSettled(promises);

    function checkData(array, propertyName) {
        let result = null;
        if (array.status === 'fulfilled') {
            if (array.value.length > 0) {
                result = array.value[0][propertyName];
            }
        }
        return result;
    }

    const data = {
        'city': checkData(allData[0], 'name'),
        'country': checkData(allData[0], 'country'),
        'temperature': checkData(allData[1], 'temperature'),
        'weather': checkData(allData[1], 'weather_description'),
        'airport': checkData(allData[2], 'name')
    }

    return data;
}

(async () => {
    try {
        const data = await getDashboardData('vienna');
        let message = ``;
        if (data.city !== null && data.country !== null) {
            message += `${data.city} is in ${data.country}.\n`
        }
        if (data.temperature !== null && data.weather !== null) {
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
        }
        if (data.airport !== null) {
            message += `The main airport is ${data.airport}.\n`
        }
        console.log('Dasboard data:', data);
        console.log(message);
    } catch (error) {
        console.error(error);
    }
})()