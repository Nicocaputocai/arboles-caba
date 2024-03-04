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

let tree_data_caba_url = "https://arbin-api.divisioncode.net.ar/api/censusTrees";

async function setMap(arr) {

  var map = L.map("map", {
    center: [-34.7033363,-58.3953235],
    zoom: 13,
    tap: false,
  });
  // map.locate({setView: true, maxZoom: 18});

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
        "sk.eyJ1Ijoibmljb2NhcHV0b2NhaSIsImEiOiJja3RhazVpbzcwMzJhMndvNmZpNGJtbWhrIn0.YV17IMSMs1UQFzyqqhRIdA",
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

        var Todos = L.geoJSON(treesData, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {

              return L.marker(latlng, { icon: squareAndParkIcon });
            }
        });

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
          },
        });

        var overLayers = {
          Todos
        };



        L.control.layers(overLayers).addTo(map);
      }
    );

  return arr;
}
window.onload = setMap();
