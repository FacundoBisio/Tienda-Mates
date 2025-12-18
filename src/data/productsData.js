// src/data/productsData.js
const productsData = {
  MATES: {
    Camioneros: [
      {
        id: 'camionero-1',
        name: 'Camionero Criollo Con Base',
        price: '19500',
        image: '/images/mates/camioneros/CamioneroCriolloConBase.webp',
        href: 'CamioneroCriolloConBase',
        description: 'Mate estilo camionero criollo, fabricado con calabaza seleccionada de pared gruesa y forrado en cuero de alta calidad. Incluye base reforzada para mayor estabilidad.',
        stock: 0
      },
      {
        id: 'camionero-2',
        name: 'Camionero De Algarrobo',
        price: '17999',
        image: '/images/mates/camioneros/CamioneroDeAlgarrobo.webp',
        href: 'CamioneroDeAlgarrobo',
        description: 'Mate camionero torneado en madera de algarrobo macizo. Suave al tacto, curado fácil y gran durabilidad. Ideal para quienes prefieren el sabor que aporta la madera.',
        stock: 0
      }
    ],
    Imperiales: [
      {
        id: 'imperial-1',
        name: 'Imperial',
        price: '31999',
        image: '/images/mates/imperiales/Imperial.webp',
        href: 'Imperial',
        description: 'El clásico Mate Imperial. Calabaza brasilera de primera calidad, forrado en cuero vacuno y virola de alpaca. Un mate que combina elegancia y tradición.',
        stock: 4
      },
      {
        id: 'imperial-2',
        name: 'Imperial Algarrobo',
        price: '24999',
        image: '/images/mates/imperiales/ImperialAlgarrobo.webp',
        href: 'ImperialAlgarrobo',
        description: 'Variante del imperial con cuerpo de madera de algarrobo estacionada y virola de alpaca. Resistente y con terminaciones premium.',
        stock: 2
      },
      {
        id: 'imperial-3',
        name: 'Imperial Con Base',
        price: '35999',
        image: '/images/mates/imperiales/ImperialConBase.webp',
        href: 'ImperialConBase',
        description: 'Mate Imperial Premium con base de alpaca reforzada. Calabaza gruesa y cuero seleccionado. La base le otorga una presencia única y mayor estabilidad.',
        stock: 2
      },
      {
        id: 'imperial-4',
        name: 'Imperial Cincelado Con Bolitas',
        price: '44999',
        image: '/images/mates/imperiales/ImperialCinceladoConBolitas.webp',
        href: 'ImperialCinceladoConBolitas',
        description: 'Edición de lujo. Mate Imperial con virola cincelada a mano y detalle de bolitas de bronce en las patas. Una pieza de orfebrería para lucir.',
        stock: 2
      },
      {
        id: 'imperial-5',
        name: 'Imperial Cuero Crudo',
        price: '41999',
        image: '/images/mates/imperiales/ImperialCueroCrudo.webp',
        href: 'ImperialCueroCrudo',
        description: 'Mate Imperial forrado en cuero crudo con costuras rústicas a la vista. Virola de alpaca ancha. Un estilo más campero y auténtico.',
        stock: 1
      },
    ],
    Torpedos: [
      {
        id: 'torpedo-1',
        name: 'Torpedo Cincelado',
        price: '29999',
        image: '/images/mates/torpedos/TorpedoCincelado.webp',
        href: 'TorpedoCincelado',
        description: 'Mate Torpedo clásico con forma ergonómica. Calabaza brasileña y virola de alpaca cincelada. El compañero ideal para todos los días.',
        stock: 0
      },
      {
        id: 'torpedo-2',
        name: 'Torpedo Cincelado Con Bolitas',
        price: '39999',
        image: '/images/mates/torpedos/TorpedoCinceladoConBolitas.webp',
        href: 'TorpedoCinceladoConBolitas',
        description: 'Modelo Torpedo con detalles de categoría superior. Incluye virola trabajada y apliques de bolitas en la base para un acabado distinguido.',
        stock: 1
      },
      {
        id: 'torpedo-3',
        name: 'Torpedo base redonda Cuero Labrado',
        price: '34999',
        image: '/images/mates/torpedos/TorpedoConBaseCueroTrabajado.webp',
        href: 'TorpedoConBaseCueroTrabajado',
        description: 'Mate Torpedo con cuero trabajado artesanalmente con diseños labrados. Base redonda que se adapta perfectamente a la mano.',
        stock: 1
      },
      {
        id: 'torpedo-4',
        name: 'Torpedo base redonda Virola Cincelada',
        price: '36999',
        image: '/images/mates/torpedos/TorpedoConBaseCincelado.webp',
        href: 'TorpedoConBaseCincelado',
        description: 'Diseño exclusivo de Torpedo con base redonda y virola de alpaca con cincelado profundo. Equilibrio perfecto entre estética y funcionalidad.',
        stock: 1
      },
      {
        id: 'torpedo-5',
        name: 'Torpedo Cuero Crudo',
        price: '41999',
        image: '/images/mates/torpedos/TorpedoCueroCrudo.webp',
        href: 'TorpedoCueroCrudo',
        description: 'Estilo rústico. Mate Torpedo revestido en cuero crudo natural. Con el uso y el sol, el cuero va tomando un color caramelo único.',
        stock: 1
      }
    ]
  },
  TERMOS: [
    {
      id: 'termo-1',
      name: 'Termo Media Manija 1L Plateado',
      price: '24000',
      image: '/images/termos/mediamanija.webp',
      description: 'Termo de acero inoxidable bicapa con capacidad de 1 litro. Diseño "media manija" para un cebado cómodo y preciso. Mantiene el agua caliente por 24hs.',
      stock: 3
    },
    {
      id: 'termo-2',
      name: 'Termo Media Manija 1L Total Black',
      price: '26000',
      image: '/images/termos/termoNegro.webp',
      description: 'Edición Total Black. Termo de acero inoxidable de 1 litro con acabado negro mate antideslizante. Alta retención térmica y pico cebador de precisión.',
      stock: 3
    }
  ],
  YERBAS: [
    {
      id: 'yerba-2',
      name: 'Yerba Canarias 1kg',
      price: '10500',
      image: '/images/yerbas/Canarias.webp',
      description: 'La yerba número uno de Uruguay. Molienda fina sin palo, sabor intenso y duradero. Ideal para quienes buscan un mate con cuerpo y energía.',
      stock: 5
    },
    {
      id: 'yerba-3',
      name: 'Yerba Baldo 1kg',
      price: '11000',
      image: '/images/yerbas/Baldo.webp',
      description: 'Yerba mate uruguaya de sabor equilibrado. Molienda tipo PU-1. Menos intensa que Canarias pero con excelente rendimiento.',
      stock: 5
    },
    {
      id: 'yerba-4',
      name: 'Yerba Baldo 500g',
      price: '6000',
      image: '/images/yerbas/baldo500.webp',
      description: 'Versión de medio kilo de la clásica Yerba Baldo. Perfecta para probar o para viajes.',
      stock: 5
    },
    {
      id: 'yerba-5',
      name: 'Yerba Baldo 5kg',
      price: '48000',
      image: '/images/yerbas/baldo5kg.webp',
      description: 'Pack económico familiar o gastronómico de 5kg. La misma calidad Baldo en presentación rendidora.',
      stock: 5
    },
    {
      id: 'yerba-6',
      name: 'Yerba Sara 1kg',
      price: '10000',
      image: '/images/yerbas/sara.webp',
      description: 'Yerba mate tradicional uruguaya. Sabor clásico, amargor justo y espuma duradera. Una de las marcas con más historia.',
      stock: 5
    },
    {
      id: 'yerba-7',
      name: 'Yerba Sara Suave 1kg',
      price: '10000',
      image: '/images/yerbas/saraSuave.webp',
      description: 'Variedad suave de Sara. Ideal para quienes se inician en la yerba sin palo o prefieren mates menos agresivos al paladar.',
      stock: 5
    },
    {
      id: 'yerba-8',
      name: 'Yerba Rei Verde Tradicional 1kg',
      price: '7500',
      image: '/images/yerbas/reiverde.webp',
      description: 'Yerba mate de origen brasileño para exportación. Corte tradicional, buen balance entre hoja y polvo.',
      stock: 5
    },
    {
      id: 'yerba-9',
      name: 'Yerba Rei Verde Clasica 1kg',
      price: '7000',
      image: '/images/yerbas/reiverdeClasica.webp',
      description: 'Sabor clásico y versátil. Rei Verde Clásica ofrece un mate parejo desde la primera hasta la última cebada.',
      stock: 5
    },
    {
      id: 'yerba-10',
      name: 'Yerba Rei Verde Compuesta 500g',
      price: '4500',
      image: '/images/yerbas/reiverdeCompuesta.webp',
      description: 'Mezcla especial con hierbas serranas. Aporta frescura y propiedades digestivas al mate diario.',
      stock: 5
    },
    {
      id: 'yerba-11',
      name: 'Yerba Rei Verde Premium 1kg',
      price: '9000',
      image: '/images/yerbas/reiverdePremium.webp',
      description: 'Selección especial de hojas. Estacionamiento natural prolongado que otorga un sabor más sofisticado y suave.',
      stock: 5
    },
    {
      id: 'yerba-12',
      name: 'Yerba Rei Verde Padron Argentino 500g',
      price: '4000',
      image: '/images/yerbas/reiverdeRoja.webp',
      description: 'Elaborada con palo, al estilo argentino. Molienda más gruesa que las uruguayas, sabor suave y amigable.',
      stock: 5
    },
    {
      id: 'yerba-13',
      name: 'Yerba Libre 1kg',
      price: '6000',
      image: '/images/yerbas/libre.webp',
      description: 'Yerba mate elaborada pensando en un público joven. Sabor fresco y energizante.',
      stock: 5
    },
    {
      id: 'yerba-14',
      name: 'Yerba Cosmico 500g',
      price: '4500',
      image: '/images/yerbas/cosmico.webp',
      description: 'Selección especial con palo. Un sabor "de otro planeta", suave y rendidor.',
      stock: 5
    },
    {
      id: 'yerba-15',
      name: 'Yerba Verdecita 1kg',
      price: '8000',
      image: '/images/yerbas/verdecita.webp',
      description: 'Yerba mate de producción agroecológica. Sabor puro a campo, sin agroquímicos.',
      stock: 5
    }
  ],
  BOMBILLAS: [
    {
      id: 'bombilla-1',
      name: 'Bombilla Pico de loro',
      price: '7000',
      image: '/images/bombillas/Bombilla.webp',
      description: 'Bombilla de acero inoxidable con curva "pico de loro" para mayor comodidad al beber. Filtro tipo pala.',
      stock: 5
    },
    {
      id: 'bombilla-2',
      name: 'Bombilla Trenzada',
      price: '8000',
      image: '/images/bombillas/BombillaTrenzada.webp',
      description: 'Diseño trenzado en el cuerpo para mejor agarre y disipación de temperatura. Acero inoxidable de alta calidad.',
      stock: 5
    },
    {
      id: 'bombilla-3',
      name: 'Bombilla con Apliques',
      price: '8000',
      image: '/images/bombillas/BombillaApliques.webp',
      description: 'Bombilla con detalles decorativos en bronce o alpaca. Agrega un toque de distinción a tu mate.',
      stock: 5
    },
    {
      id: 'bombilla-4',
      name: 'Bombillon Trenzado',
      price: '22500',
      image: '/images/bombillas/Bombillon.webp',
      description: 'Bombillón de gran caudal tipo "bomba". Ideal para mates grandes y yerbas finas uruguayas. No se tapa.',
      stock: 1
    }
  ],
  ACCESORIOS: [
    {
      id: 'accesorios-1',
      name: 'Yerberas',
      price: '5000',
      image: '/images/accesorios/Yerbera.webp',
      description: 'Yerbera de tela impermeable y cuero. Práctica, lavable y con pico vertedor para cargar el mate sin derrames.',
      stock: 5
    },
    {
      id: 'accesorios-3',
      name: 'Canasta de Cuero',
      price: '40000',
      image: '/images/accesorios/canastas.webp',
      description: 'Matera tipo canasta 100% cuero vacuno. Espacio para termo, mate, yerbera y azucarera. Manija reforzada.',
      stock: 2
    }
  ],
  COMBOS: [
    {
      id: 'combo-1',
      name: 'Consultanos por combos',
      price: '$$$$',
      image: '/images/combos.webp',
      description: 'Armá tu equipo completo. Llevando mate, bombilla y termo te hacemos un precio especial. ¡Consultanos por WhatsApp!',
      stock: 100
    }
  ]
};

export default productsData;