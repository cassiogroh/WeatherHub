export const apiInfo = {
  apiKey: '5ab387f9a952492eb387f9a952392ec0',
  units: 'm', // Metric system (switch to 'e' for imperial system)
  numericPreicison: 'decimal',
  stationsId: [
      'ISANTACA85',
      'ISANTACA56',
      // 'IBRUSQUE2',
      // 'IBRUSQ14',
      // 'IBRUSQ12',
      // 'ISCGUABI2',
      // 'IGUABIRU5',
      // 'IGUABIRU6',
      // 'ISCRIBEI2',
      // 'IPRESI11',
      // 'ISCVARGE2',
      // 'ISCVARGE3'
      'IBRUSQ17', // Test only (station deactivated)
  ]
}

export function getUrl( stationId: string): string {
  const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=${apiInfo.units}&apiKey=${apiInfo.apiKey}&numericPrecision=${apiInfo.numericPreicison}`;
  return url;
}

// Available info
// dewpt
// elev
// heatIndex
// precipRate
// precipTotal
// pressure
// temp
// windChill
// windGust
// windSpeed

// ESTAÇÕES

// ISANTACA85 - Brusque - Centro
// ISANTACA56 - Brusque - Rio Branco
// IBRUSQUE2  - Brusque - Tomaz Coelho
// IBRUSQ14   - Brusque - Santa Luzia
// IBRUSQ12   - Brusque - Cristalina
// IGUABIRU2  - Guabiruba - Aymoré
// IGUABIRU5  - Guabiruba - Lageado Alto
// IGUABIRU6  - Guabiruba - Planície Alta
// ISCRIBEI2  - Botuverá - Ourinhos
// IPRESI11   - Presidente Nereu - Tirivas
// ISCVARGE2  - Vidal Ramos - Faz. Rio Bonito 1
// ISCPRESI3  - Vidal Ramos - Faz. Rio Bonito 2