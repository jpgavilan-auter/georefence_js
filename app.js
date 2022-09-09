var options = {
    enableHighAccuracy: true,
    timeout: 6000,
    maximumAge: 0
  };
  
  navigator.geolocation.getCurrentPosition( success, error, options );
  
  async function success(position) {
    var coordenadas = position.coords;
  
    console.log('Tu posición actual es:');
    console.log('Latitud : ' + coordenadas.latitude);
    console.log('Longitud: ' + coordenadas.longitude);
    console.log('Más o menos ' + coordenadas.accuracy + ' metros.');

    await fetch('http://localhost:8080/qt/getNearby',{
        method:'POST',
        body : JSON.stringify({
            "latitud" : coordenadas.latitude,
            "longitud" :  coordenadas.longitude,
            "distancia" : 200
        }),
        headers : {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        for (let d of data){
            console.log(d);
            document.getElementById('cruces').innerHTML += 
            `
                <option value=${d.id_cruce}>${d.calle_1}-${d.calle_2}</option>
            `;
        }
    });
  };
  
  function error(error) {
    console.warn('ERROR(' + error.code + '): ' + error.message);
  };

  function save(){

  }