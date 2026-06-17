const produtos = [

  /* BLENDS */

  {
    nome: "Blend Calme Lata",
    categoria: "blend",
    peso: "30g",
    valor: 50.00,
    estoque: 18,
    imagem: "imagens/blend-calme-lata.png"
  },

  {
    nome: "Blend Felicitá Lata",
    categoria: "blend",
    peso: "80g",
    valor: 50.00,
    estoque: 12,
    imagem: "imagens/blend-felicita-lata.png"
  },

  {
    nome: "Blend Ormoni Lata",
    categoria: "blend",
    peso: "40g",
    valor: 50.00,
    estoque: 9,
    imagem: "imagens/blend-ormoni-lata.png"
  },

  {
    nome: "Blend MaterniTea Lata",
    categoria: "blend",
    peso: "90g",
    valor: 50.00,
    estoque: 7,
    imagem: "imagens/blend-maternitea-lata.png"
  },

  {
    nome: "Blend Airmid Lata",
    categoria: "blend",
    peso: "40g",
    valor: 50.00,
    estoque: 15,
    imagem: "imagens/blend-airmid-lata.png"
  },

  {
    nome: "Blend Chai Masala Lata",
    categoria: "blend",
    peso: "80g",
    valor: 50.00,
    estoque: 10,
    imagem: "imagens/blend-chai-masala-lata.png"
  },

  {
    nome: "Blend DesintoxiTea Lata",
    categoria: "blend",
    peso: "60g",
    valor: 50.00,
    estoque: 11,
    imagem: "imagens/blend-desintoxitea-lata.png"
  },

  {
    nome: "Blend Animé Lata",
    categoria: "blend",
    peso: "60g",
    valor: 50.00,
    estoque: 14,
    imagem: "imagens/blend-anime-lata.png"
  },

  {
    nome: "Blend Amore Lata",
    categoria: "blend",
    peso: "30g",
    valor: 50.00,
    estoque: 6,
    imagem: "imagens/blend-amore-lata.png"
  },



  /* HOME SPRAY */

  {
    nome: "Home Spray Ormoni",
    categoria: "home spray",
    peso: "200ml",
    valor: 95.00,
    estoque: 8,
    imagem: "imagens/home-spray-ormoni.png"
  },

  {
    nome: "Home Spray Maternitea",
    categoria: "home spray",
    peso: "200ml",
    valor: 95.00,
    estoque: 5,
    imagem: "imagens/home-spray-maternitea.png"
  },

  {
    nome: "Home Spray Airmid",
    categoria: "home spray",
    peso: "200ml",
    valor: 95.00,
    estoque: 13,
    imagem: "imagens/home-spray-airmid.png"
  },



  /* KITS */

  {
    nome: "Kit Presente Lata + Home Spray",
    categoria: "kit",
    peso: null,
    valor: 150.00,
    estoque: 4,
    imagem: "imagens/kit-presente-lata-home-spray.png"
  },



  /* EMBALAGENS */

  {
    nome: "Sacola Chás da Laura",
    categoria: "embalagem",
    peso: null,
    valor: 5.00,
    estoque: 40,
    imagem: "imagens/sacola-chas-da-laura.png"
  },



  /* ACESSÓRIOS */

  {
    nome: "Infusor",
    categoria: "acessório",
    peso: null,
    valor: 25.00,
    estoque: 22,
    imagem: "imagens/infusor.png"
  }

];


const insumos = [
  {
    nome: "Camomila",
    categoria: "chá",
    estoque: 25,
    quantidade: 2,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-12-10",
    imagem: "imagens/insumos/camomila.png"
  },
  {
    nome: "Erva-doce",
    categoria: "chá",
    estoque: 18,
    quantidade: 1.5,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-11-20",
    imagem: "imagens/insumos/erva-doce.png"
  },
  {
    nome: "Hortelã",
    categoria: "chá",
    estoque: 20,
    quantidade: 1.8,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-10-15",
    imagem: "imagens/insumos/hortela.png"
  },
  {
    nome: "Capim-limão",
    categoria: "chá",
    estoque: 16,
    quantidade: 1.2,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-09-30",
    imagem: "imagens/insumos/capim-limao.png"
  },
  {
    nome: "Chá-preto",
    categoria: "chá",
    estoque: 22,
    quantidade: 2.5,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2027-01-05",
    imagem: "imagens/insumos/cha-preto.png"
  },
  {
    nome: "Chá-verde",
    categoria: "chá",
    estoque: 19,
    quantidade: 2,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-12-18",
    imagem: "imagens/insumos/cha-verde.png"
  },
  {
    nome: "Canela em casca",
    categoria: "chá",
    estoque: 14,
    quantidade: 900,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-03-12",
    imagem: "imagens/insumos/canela-em-casca.png"
  },
  {
    nome: "Gengibre desidratado",
    categoria: "chá",
    estoque: 13,
    quantidade: 850,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-02-25",
    imagem: "imagens/insumos/gengibre-desidratado.png"
  },
  {
    nome: "Hibisco",
    categoria: "chá",
    estoque: 21,
    quantidade: 1.7,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-11-08",
    imagem: "imagens/insumos/hibisco.png"
  },
  {
    nome: "Lavanda",
    categoria: "chá",
    estoque: 12,
    quantidade: 700,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2026-08-22",
    imagem: "imagens/insumos/lavanda.png"
  },
  {
    nome: "Melissa",
    categoria: "chá",
    estoque: 17,
    quantidade: 1.3,
    unidadeMedida: "kg",
    estoqueMinimo: 10,
    validade: "2026-10-02",
    imagem: "imagens/insumos/melissa.png"
  },
  {
    nome: "Lata para blend",
    categoria: "chá",
    estoque: 45,
    quantidade: 45,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/lata-para-blend.png"
  },
  {
    nome: "Cúrcuma",
    categoria: "chá",
    estoque: 11,
    quantidade: 600,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-04-10",
    imagem: "imagens/insumos/curcuma.png"
  },
  {
    nome: "Cravo-da-índia",
    categoria: "chá",
    estoque: 13,
    quantidade: 500,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-05-01",
    imagem: "imagens/insumos/cravo-da-india.png"
  },
  {
    nome: "Anis-estrelado",
    categoria: "chá",
    estoque: 10,
    quantidade: 450,
    unidadeMedida: "g",
    estoqueMinimo: 10,
    validade: "2027-03-28",
    imagem: "imagens/insumos/anis-estrelado.png"
  },
  {
    nome: "Infusor inox redondo",
    categoria: "infusor",
    estoque: 30,
    quantidade: 30,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/infusor-inox-redondo.png"
  },
  {
    nome: "Álcool de cereal",
    categoria: "infusor",
    estoque: 20,
    quantidade: 5,
    unidadeMedida: "litros",
    estoqueMinimo: 10,
    validade: "2027-01-18",
    imagem: "imagens/insumos/alcool-de-cereal.png"
  },
  {
    nome: "Corrente para infusor",
    categoria: "infusor",
    estoque: 25,
    quantidade: 25,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/corrente-para-infusor.png"
  },
  {
    nome: "Tela de aço inox",
    categoria: "infusor",
    estoque: 12,
    quantidade: 5,
    unidadeMedida: "metros",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/tela-de-aco-inox.png"
  },
  {
    nome: "Argola metálica",
    categoria: "infusor",
    estoque: 35,
    quantidade: 35,
    unidadeMedida: "unidades",
    estoqueMinimo: 10,
    validade: null,
    imagem: "imagens/insumos/argola-metalica.png"
  }
];