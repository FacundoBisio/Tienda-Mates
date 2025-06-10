// src/data/productsData.js
const productsData = {
  MATES: {
    Camioneros: [
      {
        id: 'camionero-1',
        name: 'Camionero Criollo Con Base',
        price: '19999',
        image: '/images/CamioneroCriolloConBase.webp',
        href: 'CamioneroCriolloConBase',
        stock: 0
      },
      {
        id: 'camionero-2',
        name: 'Camionero De Algarrobo',
        price: '19999',
        image: '/images/CamioneroDeAlgarrobo.webp',
        href: 'CamioneroDeAlgarrobo',
        stock: 0
      }
    ],
    Imperiales: [
      {
        id: 'imperial-1',
        name: 'Imperial',
        price: '29999',
        image: '/images/Imperial.webp',
        href: 'Imperial',
        stock: 4
      },
      {
        id: 'imperial-2',
        name: 'Imperial Algarrobo',
        price: '23999',
        image: '/images/ImperialAlgarrobo.webp',
        href: 'ImperialAlgarrobo',
        stock: 2
      },
      {
        id: 'imperial-3',
        name: 'Imperial Con Base',
        price: '34999',
        image: '/images/ImperialConBase.webp',
        href: 'ImperialConBase',
        stock: 2
      },
      {
        id: 'imperial-4',
        name: 'Imperial Cincelado Con Bolitas',
        price: '41999',
        image: '/images/ImperialCinceladoConBolitas.webp',
        href: 'ImperialCinceladoConBolitas',
        stock: 2
      },
      {
        id: 'imperial-5',
        name: 'Imperial Cuero Crudo',
        price: '41999',
        image: '/images/ImperialCueroCrudo.webp',
        href: 'ImperialCueroCrudo',
        stock: 1
      },
    ],
    Torpedos: [
      {
        id: 'torpedo-1',
        name: 'Torpedo Cincelado',
        price: '29999',
        image: '/images/TorpedoCincelado.webp',
        href: 'TorpedoCincelado',
        stock: 0
      },
      {
        id: 'torpedo-2',
        name: 'Torpedo Cincelado Con Bolitas',
        price: '41999',
        image: '/images/TorpedoCinceladoConBolitas.webp',
        href: 'TorpedoCinceladoConBolitas',
        stock: 1
      },
      {
        id: 'torpedo-3',
        name: 'Torpedo Con Base Cincelado',
        price: '41999',
        image: '/images/TorpedoConBaseCueroTrabajado.webp',
        href: 'TorpedoConBaseCueroTrabajado',
        stock: 1
      },
      {
        id: 'torpedo-4',
        name: 'Torpedo Con Base',
        price: '41999',
        image: '/images/TorpedoConBaseCincelado.webp',
        href: 'TorpedoConBaseCincelado',
        stock: 1
      },
      {
        id: 'torpedo-5',
        name: 'Torpedo Cuero Crudo',
        price: '39999',
        image: '/images/TorpedoCueroCrudo.webp',
        href: 'TorpedoCueroCrudo',
        stock: 1
      }
    ]
  },
  TERMOS: [
    {
      id: 'termo-1',
      name: 'Termo Media Manija 1L Plateado/Negro',
      price: '25000',
      image: '/images/mediamanija.webp',
      stock: 3
    }
  ],
  YERBAS: [
    {
      id: 'yerba-1',
      name: 'Yerba Playadito 1kg',
      price: '4500',
      image: '/images/Playadito.webp',
      stock: 2
    },
    {
      id: 'yerba-2',
      name: 'Yerba Canarias 1kg',
      price: '9000',
      image: '/images/Canarias.webp',
      stock: 5
    },
    {
      id: 'yerba-3',
      name: 'Yerba Baldo 1kg',
      price: '10000',
      image: '/images/Baldo.webp',
      stock: 5
    }
  ],
  BOMBILLAS: [
    {
      id: 'bombilla-1',
      name: 'Bombilla Pico de loro',
      price: '7000',
      image: '/images/Bombilla.webp',
      stock: 5
    },
    {
      id: 'bombilla-2',
      name: 'Bombillon trenzado',
      price: '17000',
      image: '/images/Bombillon.webp',
      stock: 1
    }
  ],
  ACCESORIOS: [
    {
      id: 'accesorios-1',
      name: 'Yerberas',
      price: '4000',
      image: '/images/Yerbera.webp',
      stock: 5
    },
    {
      id: 'accesorios-2',
      name: 'Canastas',
      price: '30000',
      image: '/images/canastas.webp',
      stock: 2
    }
  ],
  COMBOS: [
    {
      id: 'combo-1',
      name: 'Consultanos por combos',
      price: '$$$$',
      image: '/images/combos.webp',
      stock: 100 // Puedes asignar un stock alto ya que es una consulta
    }
  ]
};

export default productsData;