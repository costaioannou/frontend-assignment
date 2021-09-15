export const Configuration = {
  BASE_URL: 'https://services.marinetraffic.com/api/exportvesseltrack/v:3',
  API_KEY: 'cf8f05df0b57bfae43e762cc61fd381239c4c042',
  MAP_DEFAULT_CENTER: [36.7246631, 25.4768674],
  MAP_DEFAULT_ZOOM: 10,
  MAP_FLYING_ZOOM: 13,
} as const;

export const NavigationalStatus = {
  0: 'Under way using engine',
  1: 'At anchor',
  2: 'Not under command',
  3: 'Restricted maneuverability',
  4: 'Constrained by her draught',
  5: 'Moored',
  6: 'Aground',
  7: 'Engaged in fishing',
  8: 'Under way sailing',
  9: 'Reserved for future amendment of navigational status for ships carrying DG, HS, or MP, '
      + 'or IMO hazard or pollutant category C, high-speed craft (HSC)',
  10: 'Reserved for future amendment of navigational status for ships carrying dangerous goods (DG), '
      + 'harmful substances (HS) or marine pollutants (MP), or IMO hazard or pollutant category A, wing in ground (WIG)',
  11: 'Power-driven vessel towing astern (regional use)',
  12: 'Power-driven vessel pushing ahead or towing alongside (regional use)',
  13: 'Reserved for future use',
  14: 'AIS-SART (active), MOB-AIS, EPIRB-AIS',
  15: 'No information available',
  95: 'Base Station',
  96: 'Class B',
  97: 'SAR Aircraft',
  98: 'Aid to Navigation',
  99: 'Class B',
} as const;
