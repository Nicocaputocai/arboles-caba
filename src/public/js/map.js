window.addEventListener("load", function () {
  document.querySelector("body").classList.add("loaded");
});

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.geometry.type != "Polygon" && feature.properties.status!="Finalizado" && feature.properties.status!="En curso" && feature.properties.status!="Planificado" ) {
    return layer.bindPopup(
      `<h3>${feature.properties.nombre_cientifico}</h3><span>Dirección: ${feature.properties.direccion_normalizada} </span>`
    );
  } else if (feature.properties && feature.geometry.type == "Polygon") {

    return layer.bindPopup(
      `<h3>${feature.properties.name}</h3><span>Dirección: ${feature.properties.address}</span> <span> Metros cuadrados: ${feature.properties.area} mts2</span>`
    ).openPopup();;
  }else if(feature.properties.status=="Finalizado" || feature.properties.status=="En curso"|| feature.properties.status=="Planificado" && feature.geometry.type == "Point"){
    return layer.bindPopup(
    `<h3>${feature.properties.name}</h3> <p>Descripción: ${feature.properties.description}</p> <p>Estado: ${feature.properties.status}</p>`
    ).openPopup();;
  }
}

let tree_data_caba_url = "/data/arbolado-publico-lineal-2017-2018.geojson";

//Si deja de funcionar probar con esto
// async function setMap(healthData) {

async function setMap(arr) {
  //let loader = `<div class="loader-wrapper"></div>`;
  //document.getElementById("map").innerHTML = loader;
  // var map = L.map("map",{zoom: 18});
  var map = L.map("map",


function onLocationFound(e) {

  // var radius = e.accuracy / 2;
  // L.marker(e.latlng).addTo(map)
  //   .bindPopup("You are within " + radius + " meters from this point").openPopup();
  // L.circle(e.latlng, radius).addTo(map);
  e.latlng ? map == L.map("map", {
    center: [e.latlng],
    zoom: 18,
    tap: false,
  }) :
  map == L.map("map", {
    center: [-34.60376, -58.38162],
    zoom: 18,
    tap: false,
  })
}  )
// map.on('locationfound', onLocationFound);
// map.locate({setView: true, watch: true, maxZoom: 8});

  var squareAndParkIcon = new L.icon({
    iconUrl: "/img/square&Park.svg",
    iconSize: [80, 50],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  

  L.Control.Watermark = L.Control.extend({
    onAdd: function (map) {
      var img = L.DomUtil.create("img");

      img.src = "/img/Logo completo.png";
      img.style.width = "200px";

      return img;
    },
  });

  L.control.watermark = function (opts) {
    return new L.Control.Watermark(opts);
  };

  L.control.watermark({ position: "bottomleft" }).addTo(map);

  L.tileLayer(
    // "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", // Mapbox
    // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', Open Street map pelado
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key={accessToken}", // Stadia Map
    {
      attribution:
        'Map &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org">OpenMapTiles</a>, <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, Diseño &copy <a href="https://maiken.com.ar/" target="_blank"> Maiken </a>, Desarrollo &copy <a href="https://www.divisioncode.net.ar/" target="_blank"> The Division Code </a> & &copy <a href="https://desarrolloi.org/" target="_blank"> Desarrollo i </a>',
      maxZoom: 19,
      minZoom: 12,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "79ce0079-013c-4669-b426-5128efda7dc5",
      // accessToken:
      //   "sk.eyJ1Ijoibmljb2NhcHV0b2NhaSIsImEiOiJja3RhazVpbzcwMzJhMndvNmZpNGJtbWhrIn0.YV17IMSMs1UQFzyqqhRIdA",
    }
  ).addTo(map);
  var fTreesCaba = fetch(tree_data_caba_url);

  var arr = Promise.all([
    fTreesCaba,
  ])
    .then(async ([ftc]) => {
      var ft = await ftc.json();
      return [ft];
    })
    .then(
      ([
        treesData,
      ]) => {

        var aligustrina = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Ligustrum sinense"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var alamo_blanco = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Populus alba"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var araucaria_australiana = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Araucaria bidwillii"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var arce_negundo = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Acer negundo"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var arce_tridente = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Acer buergerianum"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var ceibo = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Erythrina crista-galli"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var crespon = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Lagerstroemia indica"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var espinillo = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Vachellia caven"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var falsa_acacia = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Robinia pseudoacacia"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var ficus = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Ficus benjamina"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var laurel = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Laurus nobilis"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var liquidambar = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Liquidambar styraciflua"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          }
        });
        var naranjo = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Citrus aurantium"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var olivo = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Olea europaea"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var palta = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Persea americana"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var pezuña_de_buey = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Bauhinia forficata"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var pino_australiano = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Casuarina cunninghamiana"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var sofora = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Styphnolobium japonicum"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });
        var tilo_norteno = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Tilia cordata"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });

        var tipa = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            if (
              feature.properties.nombre_cientifico == "Tipuana tipu"
            ) {
              return L.marker(latlng, { icon: squareAndParkIcon });
            } else {
              return ""
            }

            // return L.marker(latlng, { icon: squareAndParkIcon });
          },
        });


        var overLayers = {
          aligustrina: aligustrina,
          tipa: tipa,
          "tilo norteno":tilo_norteno,
          sofora,
          "pino australiano":  pino_australiano,
          "pezuña de buey": pezuña_de_buey,
          palta,
          olivo,
          naranjo,
          liquidambar,
          laurel,
          ficus,
          "falsa acacia": falsa_acacia,
          espinillo,
          crespon,
          ceibo,
          "arce tridente":arce_tridente,
          "arce negundo": arce_negundo,
          "alamo blanco": alamo_blanco,
          "araucaria australiana": araucaria_australiana

        };
        map.locate({setView: true, maxZoom: 16});

// function onLocationFound(e) {
//  var radius = e.accuracy / 2;

// L.marker(e.latlng).addTo(map)
//  .bindPopup("Tu estas aqui, con " + radius + " metros de aproximacion").openPopup();

// L.circle(e.latlng, radius).addTo(map);
//  }
//  function onLocationError(e) {
//  alert(e.message);
// }
//  map.on('locationfound', onLocationFound);
//  map.on('locationerror', onLocationError);

        // var baseMap = {
        //   // "Polígono": polygonLanus,
        //   Barrios: districtsLanus,
        //   // "Circuitos Electorales": circuitLanus,
        //   Localidades: LocationsLanus,
        // };
        L.control.layers(overLayers).addTo(map);
        // trees.addTo(map)
      }
    );

  return arr;
}
window.onload = setMap();
