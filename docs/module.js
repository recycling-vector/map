import { CSV } from "https://code4sabae.github.io/js/CSV.js"

const style = href => {
  const e = document.createElement('link')
  e.href = href
  e.rel = 'stylesheet'
  document.head.appendChild(e)
}

const script = src => {
  const e = document.createElement('script')
  e.src = src
  document.head.appendChild(e)
}

const init = () => {
  style('style.css')
  style('https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css')
  script('https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.js')
  const map = document.createElement('div')
  map.id = 'map'
  document.body.appendChild(map)
}
init()

const showMap = async (texts) => {
  const map = new maplibregl.Map({
    container: 'map',
    hash: true,
    style: 'style.json',
    maxZoom: 17.8
  })
  map.addControl(new maplibregl.NavigationControl())
  map.addControl(new maplibregl.ScaleControl({
    maxWidth: 200, unit: 'metric'
  }))
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true
  }))

console.log(csv)

/*
  let voice = null
  for(let v of speechSynthesis.getVoices()) {
    if (v.name == 'Kyoko') voice = v
  }
*/

  map.on('load', () => {
/*
    map.on('click', 'hclulc', (e) => {
      let u = new SpeechSynthesisUtterance()
      u.lang = 'ja-JP'
      u.text = 'HCLULC'
      if (voice) u.voice = voice
      speechSynthesis.cancel()
      speechSynthesis.speak(u)
    })
*/
    map.addSource('places', {
      type: 'geojson',
      data: geojson
    })
    map.addLayer({
      id: 'places',
      type: 'symbol',
      source: 'places',
      layout: {
        'text-field': '♻',
        'text-size': [
          'interpolate',
          ['exponential', 2],
          ['zoom'],
          5, 10,
          18, 100
        ],
        'text-font': [
          'NotoSansCJKjp-Regular'
        ]
      },
      paint: {
        'text-color': '#0f0'
      }
    })
  })
}

const csv = await CSV.fetch('data.csv')
const geojson = {
  type: 'FeatureCollection',
  features: []
}
for(let i = 1; i < csv.length; i++) {
  geojson.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(csv[i][3]),
        parseFloat(csv[i][4])
      ]
    },
    properties: {
      idx: i
    }
  })
}

const main = async () => {
  if (typeof maplibregl == 'undefined') {
    window.onload = () => {
      showMap()
    }
  } else {
    showMap()
  }
}
main()
