;(function (window) {
  // geoJson definitions for country
  window.countries = [
    {
      type: 'Feature',
      properties: {
        name: 'Iceland'
      },
      geometry: {
        type: 'Point',
        coordinates: [1258, 911]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Ireland'
      },
      geometry: {
        type: 'Point',
        coordinates: [1324, 1580]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'England'
      },
      geometry: {
        type: 'Point',
        coordinates: [1498, 1662]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'France'
      },
      geometry: {
        type: 'Point',
        coordinates: [1608, 1918]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Italia'
      },
      geometry: {
        type: 'Point',
        coordinates: [1923, 2093]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Hispania'
      },
      geometry: {
        type: 'Point',
        coordinates: [1374, 2148]
      }
    }
  ]

  // geoJson definitions
  window.geoInfo = [
    {
      'type': 'Feature',
      'properties': {
        'name': 'Mare Germanicum'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [1589, 1447]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'name': 'Mare Balticum'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [2090, 1407]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'name': 'Mare Mediteraneum'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [2028, 2453]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'name': 'Mare Maggiore'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [2623, 1918]
      }
    }
  ]

  // polygon
  window.polygon = [
    {
      x: 200,
      y: 1530
    },
    {
      x: 200,
      y: 780
    },
    {
      x: 410,
      y: 780
    },
    {
      x: 410,
      y: 1530
    }
  ]
}(window))
