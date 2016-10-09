
var map = L.map("map", {})
        .setView([37.78, -25.5], 12);

var layerData = [
	[
        { name: "153,144", title: "Carta de Ocupação do Solo + Freguesias" },

        { name: "138", title: "Área de Intervenção de Planos Especiais de Ordenamento do Território" },
        { name: "139", title: "Área de Intervenção de Planos Directores Municipais" },
        { name: "140", title: "Área de Intervenção de Planos de Pormenor" },
        { name: "141", title: "Área de Intervenção de Planos de Urbanização" },
        { name: "143", title: "Concelhos" },
        { name: "144", title: "Freguesias" },
        { name: "145", title: "Lagoas" },
        { name: "146", title: "Hidrografia" },
        { name: "147", title: "Altimetria" },
        { name: "148", title: "Edificado" },
        { name: "149", title: "Caminhos" },
        { name: "150", title: "Estradas" },
        { name: "151", title: "Toponimia" },
        { name: "152", title: "Áreas Classificadas" },
        { name: "153", title: "Carta de Ocupação do Solo" },

        // POOC Costa Sul
        { name: "2", title: "Reserva de Caça - POOC Costa Sul" },
        { name: "3", title: "Lugar Classificado da Praia - POOC Costa Sul" },
        { name: "4", title: "SIC da Caloura/ Ponta da Galera - POOC Costa Sul" },
        { name: "5", title: "ZPE do Pico da Vara/ Ribeira do Guilherme - POOC Costa Sul" },
        { name: "6", title: "Reserva Natural Regional do Ilhéu de Vila Franca - POOC Costa Sul" },
        { name: "7", title: "Reserva Agrícola Regional - POOC Costa Sul" },
        { name: "8", title: "Reserva Ecológica - POOC Costa Sul" },
        { name: "9", title: "RAR e RER - POOC Costa Sul" },
        { name: "10", title: "Perimetro Florestal - POOC Costa Sul" },
        { name: "11", title: "Águas subterrâneas para abastecimento público - POOC Costa Sul" },
        { name: "12", title: "Domínio Hídrico - Leitos e margens dos cursos de água - POOC Costa Sul" },
        { name: "13", title: "Domínio Hídrico - Leitos e margens das águas do mar - POOC Costa Sul" },
        { name: "14", title: "Domínio Público Marítimo - POOC Costa Sul" },
        { name: "15", title: "Área de Protecção aos Imóveis - POOC Costa Sul" },
        { name: "16", title: "Património Edificado - POOC Costa Sul" },
        { name: "17", title: "Faróis e outros sinais marítimos - POOC Costa Sul" },
        { name: "18", title: "Feixes Hertzianos e respectivas zonas de Protecção - POOC Costa Sul" },
        { name: "19", title: "Área do Aeroporto - POOC Costa Sul" },
        { name: "20", title: "Zona de Protecção do Aeroporto - POOC Costa Sul" },
        { name: "21", title: "Local do Aeroporto - POOC Costa Sul" },
        { name: "22", title: "Postos de Transformação - POOC Costa Sul" },
        { name: "23", title: "Emissários - POOC Costa Sul" },
        { name: "24", title: "Rede de Esgotos: Fossas e Emissário - POOC Costa Sul" },
        { name: "25", title: "Abastecimento de Águas: Adutoras - POOC Costa Sul" },
        { name: "26", title: "Águas de Nascentes - POOC Costa Sul" },
        { name: "27", title: "Pedreiras - POOC Costa Sul" },
        { name: "28", title: "Equipamentos e Actividades - POOC Costa Sul" },
        { name: "29", title: "Marcos geodésicos - POOC Costa Sul" },
        { name: "30", title: "Zona Terrestre de Proteccao - POOC Costa Sul" },
        { name: "31", title: "Faixa Marítima de Protecção - POOC Costa Sul" },
        { name: "33", title: "Classificação de Espaços - POOC Costa Sul" },
        { name: "34", title: "Tipologia de Áreas Balneares - POOC Costa Sul" },
        { name: "36", title: "Áreas Edificadas em Zonas de Risco - POOC Costa Sul" },
        { name: "37", title: "Tipologia de Áreas Edificadas em Zonas de Risco" },
        { name: "38", title: "Área do Aeroporto - POOC Costa Sul" },
        { name: "39", title: "Área do Porto - POOC Costa Sul" },
        { name: "40", title: "Faróis - POOC Costa Sul" },
        { name: "41", title: "Pedreiras - POOC Costa Sul" },
        { name: "42", title: "ETAR - POOC Costa Sul" },
        { name: "43", title: "Aterro Sanitário - POOC Costa Sul" },
        { name: "44", title: "Obras Costeiras e Portuárias Previstas - POOC Costa Sul" },
        { name: "45", title: "Obras Costeiras e Portuárias Previstas - POOC Costa Sul" },
        { name: "46", title: "Portos e Portinhos - POOC Costa Sul" },
        { name: "47", title: "Zona Terrestre de Proteccao  - POOC Costa Sul" },
        { name: "48", title: "Faixa Marítima de Protecção - POOC Costa Sul" },
        { name: "49", title: "Área de Suspensao Parcial - POOC Costa Sul" },

        // POOC Costa Norte
        { name: "51", title: "Reserva Agrícola Regional - POOC Costa Norte" },
        { name: "52", title: "Ajuda à Navegação - POOC Costa Norte" },
        { name: "53", title: "Estação Elevatória de Água para Abastecimento - POOC Costa Norte" },
        { name: "54", title: "Pontos de Cloragem - POOC Costa Norte" },
        { name: "55", title: "Reservatórios - POOC Costa Norte" },
        { name: "56", title: "Furos - POOC Costa Norte" },
        { name: "57", title: "Nascentes - POOC Costa Norte" },
        { name: "58", title: "Adutoras - POOC Costa Norte" },
        { name: "59", title: "Infra-Estruturas Radioeléctricas - POOC Costa Norte" },
        { name: "60", title: "Infra-Estruturas Eléctricas - POOC Costa Norte" },
        { name: "61", title: "Domínio Público Marítimo - POOC Costa Norte" },
        { name: "62", title: "Locais de Descarga de Águas Residuais - POOC Costa Norte" },
        { name: "63", title: "Fossas - POOC Costa Norte" },
        { name: "64", title: "Protecção de imóveis classificados e em vias de classificação - POOC Costa Norte" },
        { name: "65", title: "Protecção a Marcos Geodésicos - POOC Costa Norte" },
        { name: "66", title: "Limite Maritimo de Intervenção - POOC Costa Norte" },
        { name: "67", title: "Limite Terrestre de Intervenção - POOC Costa Norte" },
        { name: "69", title: "Classificação de Espaços - POOC Costa Norte" },
        { name: "70", title: "Espaço afecto ao Domínio Hídrico (DPM) - POOC Costa Norte" },
        { name: "71", title: "Sectores - POOC Costa Norte" },
        { name: "72", title: "Zonas UOPG - POOC Costa Norte" },
        { name: "73", title: "UOPG - POOC Costa Norte" },
        { name: "74", title: "Praias - POOC Costa Norte" },
        { name: "75", title: "Infra-Estruturas Portuárias - POOC Costa Norte" },
        { name: "76", title: "Limite Maritimo de Intervenção - POOC Costa Norte" },
        { name: "77", title: "Limite Terrestre de Intervenção - POOC Costa Norte" },

        // POBHL Furnas
        { name: "79", title: "Áreas com Risco de Erosão - POBHL Furnas" },
        { name: "80", title: "Escarpas - POBHL Furnas" },
        { name: "81", title: "Zonas com declive superior a 25% - POBHL Furnas" },
        { name: "82", title: "Cabeceiras das linhas de água - POBHL Furnas" },
        { name: "83", title: "Áreas de Máxima Infiltracao - POBHL Furnas" },
        { name: "84", title: "Faixa de Protecção às nascentes - POBHL Furnas" },
        { name: "85", title: "Faixa de Protecção à Lagoa - POBHL Furnas" },
        { name: "86", title: "Imóvel Classificado - POBHL Furnas" },
        { name: "87", title: "Reserva Agrícola Regional - POBHL Furnas" },
        { name: "88", title: "Protecção às linhas de água - POBHL Furnas" },
        { name: "89", title: "Zona Reservada - POBHL Furnas" },
        { name: "90", title: "Protecção aos marcos geodésicos - POBHL Furnas" },
        { name: "91", title: "Linhas de alta tensão - POBHL Furnas" },
        { name: "92", title: "Infraestruturas de abastecimento de água - POBHL Furnas" },
        { name: "93", title: "Nascentes - POBHL Furnas" },
        { name: "94", title: "Marcos geodésicos - POBHL Furnas" },
        { name: "96", title: "Classificação de Espaços - POBHL Furnas" },
        { name: "97", title: "Zona Reservada - POBHL Furnas" },
        { name: "98", title: "Limite da Zona de Protecção - POBHL Furnas" },
        { name: "99", title: "Estradas/Percursos Panorâmicos - POBHL Furnas" },
        { name: "100", title: "Linhas Panorâmicas - POBHL Furnas" },
        { name: "101", title: "Pontos Panorâmicos - POBHL Furnas" },
        { name: "102", title: "Pontos Panorâmicos - POBHL Furnas" },
        { name: "103", title: "Unidades de Projecto - POBHL Furnas" },
        { name: "104", title: "Unidades de Projecto - POBHL Furnas" },
        { name: "105", title: "Nucleo de apoio da Zona Sul da Lagoa - POBHL Furnas" },
        { name: "106", title: "Núcleo de apoio das Caldeiras - POBHL Furnas" },

        // POBHL Sete Cidades
        { name: "108", title: "Faixa de Protecção aos Vértices Geodésicos - POBHL Sete Cidades" },
        { name: "109", title: "Vértices Geodésicos - POBHL Sete Cidades" },
        { name: "110", title: "Linhas Eléctricas de 15 KW - POBHL Sete Cidades" },
        { name: "111", title: "Linhas Eléctricas de 15 KW - POBHL Sete Cidades" },
        { name: "112", title: "Feixes Hertzianos e Faixas de Protecção - POBHL Sete Cidades" },
        { name: "113", title: "Estação de Feixes Hertzianos - POBHL Sete Cidades" },
        { name: "114", title: "Faixa de Protecção da Estrada Regional - POBHL Sete Cidades" },
        { name: "115", title: "Faixa de Protecção do Caminho Municipal - POBHL Sete Cidades" },
        { name: "116", title: "Rede Viária - POBHL Sete Cidades" },
        { name: "117", title: "Redes de Saneamento Básico e Abastecimento Público de Água - POBHL Sete Cidades" },
        { name: "118", title: "Redes de Saneamento Básico e Abastecimento Público de Água - POBHL Sete Cidades" },
        { name: "119", title: "Reserva Agrícola Regional - POBHL Sete Cidades" },
        { name: "120", title: "Reserva Ecológica - POBHL Sete Cidades" },
        { name: "121", title: "Paisagem Protegida das Sete Cidades - POBHL Sete Cidades" },
        { name: "122", title: "Faixa de Protecção às Linha de água - POBHL Sete Cidades" },
        { name: "123", title: "Zona Reservada - POBHL Sete Cidades" },
        { name: "124", title: "Leitos e Cursos de Água - POBHL Sete Cidades" },
        { name: "125", title: "Faixas de Protecção às Nascentes - POBHL Sete Cidades" },
        { name: "126", title: "Nascentes - POBHL Sete Cidades" },
        { name: "127", title: "Pontos Cotados - POBHL Sete Cidades" },
        { name: "129", title: "Ribeiras - POBHL Sete Cidades" },
        { name: "130", title: "Cais - POBHL Sete Cidades" },
        { name: "131", title: "Rede Viária - POBHL Sete Cidades" },
        { name: "132", title: "Classificação de Espaços - POBHL Sete Cidades" },
        { name: "133", title: "Zona Reservada - POBHL Sete Cidades" },
        { name: "134", title: "Espaços Canais - POBHL Sete Cidades" },
        { name: "135", title: "Rede Viária - POBHL Sete Cidades" },
        { name: "136", title: "Pontos Cotados - POBHL Sete Cidades" },

        // geral
        { name: "138", title: "Área de Intervenção de Planos Especiais de Ordenamento do Território" },
        { name: "139", title: "Área de Intervenção de Planos Directores Municipais" },
        { name: "140", title: "Área de Intervenção de Planos de Pormenor" },
        { name: "141", title: "Área de Intervenção de Planos de Urbanização" },
        { name: "143", title: "Concelhos" },
        { name: "144", title: "Freguesias" },
        { name: "145", title: "Lagoas" },
        { name: "146", title: "Hidrografia" },
        { name: "147", title: "Altimetria" },
        { name: "148", title: "Edificado" },
        { name: "149", title: "Caminhos" },
        { name: "150", title: "Estradas" },
        { name: "151", title: "Toponimia" },
        { name: "152", title: "Áreas Classificadas" },
        { name: "153", title: "Carta de Ocupação do Solo" },
/**/

   ]
];


var baseLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
	opacity: 0.4
});

map.addLayer(baseLayer);

// only for Sao Miguel; for the others see http://sig-sraa.azores.gov.pt/sram/site/servicos-wms.asp
var sraaWMSUrl = "http://sig-sraa.azores.gov.pt/ArcGIS/services/WMS/SRIT_SMG/MapServer/WMSServer";

var array, wmsLayers = [], wmsLegends = [];

for(var i=0; i<layerData.length; i++){

	array = layerData[i];
	wmsLayers.push({});
	//wmsLegends.push({});
	
	for(var j=0; j<array.length; j++){

		var key = array[j].title + " (" + array[j].name + ")";
		wmsLayers[i][key] = L.tileLayer.wms(sraaWMSUrl, {
			layers: array[j].name,
			format: "image/png",
			transparent: true,
            //crs: L.CRS.EPSG4326
            crs: L.CRS.EPSG3857
		});

		//wmsLayers[i][array[j].name].title = array[j].title;
		wmsLayers[i][key].arrayIndex = i;

		wmsLayers[i][key].on("loading", function(e){
			//debugger;
			console.log("loading @ " + Date.now());
		});

		wmsLayers[i][key].on("load", function(e){
			//debugger;
			console.log("    load @ " + Date.now());
		});
/*
		var legendUrl = (sraaWMSUrl + "?" + 
							"request=GetLegendGraphic&" + 
							"format=image/png&" + 
							"layer=" + array[j]
						).replace(" ", "+");


		wmsLegends[i][array[j]] = new L.Control.WMSLegend({uri: legendUrl});
*/		

	}
}

for(i=0; i<wmsLayers.length; i++){
	map.addControl(L.control.layers(wmsLayers[i], undefined));	
}
