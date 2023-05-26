import { MessageDescriptor } from "react-intl"

export type Country = {
  value: string
  label: MessageDescriptor
}

export const countryList: Array<Country> = [
  {
    value: "AFG",
    label: { id: "country.afganistan", defaultMessage: "Afganistan" },
  },
  { value: "ALB", label: { id: "country.albania", defaultMessage: "Albania" } },
  { value: "DZA", label: { id: "country.algeria", defaultMessage: "Algeria" } },
  {
    value: "ASM",
    label: { id: "country.american_samoa", defaultMessage: "American Samoa" },
  },
  { value: "AND", label: { id: "country.andorra", defaultMessage: "Andorra" } },
  { value: "AGO", label: { id: "country.angola", defaultMessage: "Angola" } },
  {
    value: "AIA",
    label: { id: "country.anguilla", defaultMessage: "Anguilla" },
  },
  {
    value: "ATA",
    label: { id: "country.antarctica", defaultMessage: "Antarctica" },
  },
  {
    value: "ATG",
    label: {
      id: "country.antigua_and_barbuda",
      defaultMessage: "Antigua and Barbuda",
    },
  },
  {
    value: "ARG",
    label: { id: "country.argentina", defaultMessage: "Argentina" },
  },
  { value: "ARM", label: { id: "country.armenia", defaultMessage: "Armenia" } },
  { value: "ABW", label: { id: "country.aruba", defaultMessage: "Aruba" } },
  {
    value: "AUS",
    label: { id: "country.australia", defaultMessage: "Australia" },
  },
  { value: "AUT", label: { id: "country.austria", defaultMessage: "Austria" } },
  {
    value: "AZE",
    label: { id: "country.azerbaijan", defaultMessage: "Azerbaijan" },
  },
  { value: "BHS", label: { id: "country.bahamas", defaultMessage: "Bahamas" } },
  { value: "BHR", label: { id: "country.bahrain", defaultMessage: "Bahrain" } },
  {
    value: "BGD",
    label: { id: "country.bangladesh", defaultMessage: "Bangladesh" },
  },
  {
    value: "BRB",
    label: { id: "country.barbados", defaultMessage: "Barbados" },
  },
  { value: "BLR", label: { id: "country.belarus", defaultMessage: "Belarus" } },
  { value: "BEL", label: { id: "country.belgium", defaultMessage: "Belgium" } },
  { value: "BLZ", label: { id: "country.belize", defaultMessage: "Belize" } },
  { value: "BEN", label: { id: "country.benin", defaultMessage: "Benin" } },
  { value: "BMU", label: { id: "country.bermuda", defaultMessage: "Bermuda" } },
  { value: "BTN", label: { id: "country.bhutan", defaultMessage: "Bhutan" } },
  { value: "BOL", label: { id: "country.bolivia", defaultMessage: "Bolivia" } },
  {
    value: "BIH",
    label: {
      id: "country.bosnia_and_herzegovina",
      defaultMessage: "Bosnia and Herzegovina",
    },
  },
  {
    value: "BWA",
    label: { id: "country.botswana", defaultMessage: "Botswana" },
  },
  {
    value: "BVT",
    label: { id: "country.bouvet_island", defaultMessage: "Bouvet Island" },
  },
  { value: "BRA", label: { id: "country.brazil", defaultMessage: "Brazil" } },
  {
    value: "IOT",
    label: {
      id: "country.british_indian_ocean_territory",
      defaultMessage: "British Indian Ocean Territory",
    },
  },
  {
    value: "VGB",
    label: {
      id: "country.british_virgin_islands",
      defaultMessage: "British Virgin Islands",
    },
  },
  {
    value: "BRN",
    label: {
      id: "country.brunei_darussalam",
      defaultMessage: "Brunei Darussalam",
    },
  },
  {
    value: "BGR",
    label: { id: "country.bulgaria", defaultMessage: "Bulgaria" },
  },
  {
    value: "BFA",
    label: { id: "country.burkina_faso", defaultMessage: "Burkina Faso" },
  },
  { value: "BDI", label: { id: "country.burundi", defaultMessage: "Burundi" } },
  {
    value: "KHM",
    label: { id: "country.cambodia", defaultMessage: "Cambodia" },
  },
  {
    value: "CMR",
    label: { id: "country.cameroon", defaultMessage: "Cameroon" },
  },
  { value: "CAN", label: { id: "country.canada", defaultMessage: "Canada" } },
  {
    value: "CPV",
    label: { id: "country.cape_verde", defaultMessage: "Cape Verde" },
  },
  {
    value: "CYM",
    label: { id: "country.cayman_islands", defaultMessage: "Cayman Islands" },
  },
  {
    value: "CAF",
    label: {
      id: "country.central_african_republic",
      defaultMessage: "Central African Republic",
    },
  },
  { value: "TCD", label: { id: "country.chad", defaultMessage: "Chad" } },
  { value: "CHL", label: { id: "country.chile", defaultMessage: "Chile" } },
  { value: "CHN", label: { id: "country.china", defaultMessage: "China" } },
  {
    value: "CXR",
    label: {
      id: "country.christmas_island",
      defaultMessage: "Christmas Island",
    },
  },
  {
    value: "CCK",
    label: {
      id: "country.cocos_islands",
      defaultMessage: "Cocos (Keeling) Islands",
    },
  },
  {
    value: "COL",
    label: { id: "country.colombia", defaultMessage: "Colombia" },
  },
  { value: "COM", label: { id: "country.comoros", defaultMessage: "Comoros" } },
  {
    value: "COD",
    label: { id: "country.congo_drc", defaultMessage: "Congo [DRC]" },
  },
  {
    value: "COG",
    label: { id: "country.congo_republic", defaultMessage: "Congo [Republic]" },
  },
  {
    value: "COK",
    label: { id: "country.cook_islands", defaultMessage: "Cook Islands" },
  },
  {
    value: "CRI",
    label: { id: "country.costarica", defaultMessage: "Costa Rica" },
  },
  {
    value: "CIV",
    label: { id: "country.cote_d_ivoire", defaultMessage: "Côte d'Ivoire" },
  },
  { value: "HRV", label: { id: "country.croatia", defaultMessage: "Croatia" } },
  { value: "CUB", label: { id: "country.cuba", defaultMessage: "Cuba" } },
  { value: "CYP", label: { id: "country.cyprus", defaultMessage: "Cyprus" } },
  {
    value: "CZE",
    label: { id: "country.czech_republic", defaultMessage: "Czech Republic" },
  },
  { value: "DNK", label: { id: "country.denmark", defaultMessage: "Denmark" } },
  {
    value: "DJI",
    label: { id: "country.djibouti", defaultMessage: "Djibouti" },
  },
  {
    value: "DMA",
    label: { id: "country.dominica", defaultMessage: "Dominica" },
  },
  {
    value: "DOM",
    label: {
      id: "country.dominican_republic",
      defaultMessage: "Dominican Republic",
    },
  },
  { value: "ECU", label: { id: "country.ecuador", defaultMessage: "Ecuador" } },
  { value: "EGY", label: { id: "country.egypt", defaultMessage: "Egypt" } },
  {
    value: "SLV",
    label: { id: "country.el_salvador", defaultMessage: "El Salvador" },
  },
  {
    value: "GNQ",
    label: {
      id: "country.equatorial_guinea",
      defaultMessage: "Equatorial Guinea",
    },
  },
  { value: "ERI", label: { id: "country.eritrea", defaultMessage: "Eritrea" } },
  { value: "EST", label: { id: "country.estonia", defaultMessage: "Estonia" } },
  {
    value: "SWZ",
    label: { id: "country.eswatini", defaultMessage: "Eswatini" },
  },
  {
    value: "ETH",
    label: { id: "country.ethiopia", defaultMessage: "Ethiopia" },
  },
  {
    value: "FLK",
    label: {
      id: "country.falkland_Islands_Malvinas",
      defaultMessage: "Falkland Islands (Malvinas)",
    },
  },
  {
    value: "FRO",
    label: { id: "country.faroe_islands", defaultMessage: "Faroe Islands" },
  },
  { value: "FJI", label: { id: "country.fiji", defaultMessage: "Fiji" } },
  { value: "FIN", label: { id: "country.finland", defaultMessage: "Finland" } },
  { value: "FRA", label: { id: "country.france", defaultMessage: "France" } },
  {
    value: "GUF",
    label: { id: "country.french_guiana", defaultMessage: "French Guiana" },
  },
  {
    value: "PYF",
    label: {
      id: "country.french_polynesia",
      defaultMessage: "French Polynesia",
    },
  },
  {
    value: "ATF",
    label: {
      id: "country.french_southern_territories",
      defaultMessage: "French Southern Territories",
    },
  },
  { value: "GAB", label: { id: "country.gabon", defaultMessage: "Gabon" } },
  { value: "GMB", label: { id: "country.gambia", defaultMessage: "Gambia" } },
  { value: "GEO", label: { id: "country.georgia", defaultMessage: "Georgia" } },
  { value: "DEU", label: { id: "country.germany", defaultMessage: "Germany" } },
  { value: "GHA", label: { id: "country.ghana", defaultMessage: "Ghana" } },
  {
    value: "GIB",
    label: { id: "country.gibraltar", defaultMessage: "Gibraltar" },
  },
  { value: "GRC", label: { id: "country.greece", defaultMessage: "Greece" } },
  {
    value: "GRL",
    label: { id: "country.greenland", defaultMessage: "Greenland" },
  },
  { value: "GRD", label: { id: "country.grenada", defaultMessage: "Grenada" } },
  {
    value: "GLP",
    label: { id: "country.guadeloupe", defaultMessage: "Guadeloupe" },
  },
  { value: "GUM", label: { id: "country.guam", defaultMessage: "Guam" } },
  {
    value: "GTM",
    label: { id: "country.guatemala", defaultMessage: "Guatemala" },
  },
  {
    value: "GGY",
    label: { id: "country.guernsey", defaultMessage: "Guernsey" },
  },
  { value: "GIN", label: { id: "country.guinea", defaultMessage: "Guinea" } },
  {
    value: "GNB",
    label: { id: "country.guinea_bissau", defaultMessage: "Guinea-Bissau" },
  },
  { value: "GUY", label: { id: "country.guyana", defaultMessage: "Guyana" } },
  { value: "HTI", label: { id: "country.haiti", defaultMessage: "Haiti" } },
  {
    value: "HMD",
    label: {
      id: "country.heard_and_mcdonald_islands",
      defaultMessage: "Heard and Mcdonald Islands",
    },
  },
  {
    value: "HND",
    label: { id: "country.honduras", defaultMessage: "Honduras" },
  },
  {
    value: "HKG",
    label: { id: "country.hong_kong", defaultMessage: "Hong Kong" },
  },
  { value: "HUN", label: { id: "country.hungary", defaultMessage: "Hungary" } },
  { value: "ISL", label: { id: "country.iceland", defaultMessage: "Iceland" } },
  { value: "IND", label: { id: "country.india", defaultMessage: "India" } },
  {
    value: "IDN",
    label: { id: "country.indonesia", defaultMessage: "Indonesia" },
  },
  {
    value: "IRN",
    label: {
      id: "country.iran_islamic_republic_of",
      defaultMessage: "Iran, Islamic Republic of",
    },
  },
  { value: "IRQ", label: { id: "country.iraq", defaultMessage: "Iraq" } },
  { value: "IRL", label: { id: "country.ireland", defaultMessage: "Ireland" } },
  {
    value: "IMN",
    label: { id: "country.isle_of_man", defaultMessage: "Isle of Man" },
  },
  { value: "ISR", label: { id: "country.israel", defaultMessage: "Israel" } },
  { value: "ITA", label: { id: "country.italy", defaultMessage: "Italy" } },
  { value: "JAM", label: { id: "country.jamaica", defaultMessage: "Jamaica" } },
  { value: "JPN", label: { id: "country.japan", defaultMessage: "Japan" } },
  { value: "JEY", label: { id: "country.jersey", defaultMessage: "Jersey" } },
  { value: "JOR", label: { id: "country.jordan", defaultMessage: "Jordan" } },
  {
    value: "KAZ",
    label: { id: "country.kazakhstan", defaultMessage: "Kazakhstan" },
  },
  { value: "KEN", label: { id: "country.kenya", defaultMessage: "Kenya" } },
  {
    value: "KIR",
    label: { id: "country.kiribati", defaultMessage: "Kiribati" },
  },
  { value: "XKX", label: { id: "country.kosovo", defaultMessage: "Kosovo" } },
  { value: "KWT", label: { id: "country.kuwait", defaultMessage: "Kuwait" } },
  {
    value: "KGZ",
    label: { id: "country.kyrgyzstan", defaultMessage: "Kyrgyzstan" },
  },
  { value: "LAO", label: { id: "country.lao_pdr", defaultMessage: "Lao PDR" } },
  { value: "LVA", label: { id: "country.latvia", defaultMessage: "Latvia" } },
  { value: "LBN", label: { id: "country.lebanon", defaultMessage: "Lebanon" } },
  { value: "LSO", label: { id: "country.lesotho", defaultMessage: "Lesotho" } },
  { value: "LBR", label: { id: "country.liberia", defaultMessage: "Liberia" } },
  { value: "LBY", label: { id: "country.libya", defaultMessage: "Libya" } },
  {
    value: "LIE",
    label: { id: "country.liechtenstein", defaultMessage: "Liechtenstein" },
  },
  {
    value: "LTU",
    label: { id: "country.lithuania", defaultMessage: "Lithuania" },
  },
  {
    value: "LUX",
    label: { id: "country.luxembourg", defaultMessage: "Luxembourg" },
  },
  {
    value: "MAC",
    label: {
      id: "country.macao_sar_china",
      defaultMessage: "Macao, SAR China",
    },
  },
  {
    value: "MKD",
    label: {
      id: "country.macedonia_republic_of",
      defaultMessage: "Macedonia, Republic of",
    },
  },
  {
    value: "MDG",
    label: { id: "country.madagascar", defaultMessage: "Madagascar" },
  },
  { value: "MWI", label: { id: "country.malawi", defaultMessage: "Malawi" } },
  {
    value: "MYS",
    label: { id: "country.malaysia", defaultMessage: "Malaysia" },
  },
  {
    value: "MDV",
    label: { id: "country.maldives", defaultMessage: "Maldives" },
  },
  { value: "MLI", label: { id: "country.mali", defaultMessage: "Mali" } },
  { value: "MLT", label: { id: "country.malta", defaultMessage: "Malta" } },
  {
    value: "MHL",
    label: {
      id: "country.marshall_islands",
      defaultMessage: "Marshall Islands",
    },
  },
  {
    value: "MTQ",
    label: { id: "country.martinique", defaultMessage: "Martinique" },
  },
  {
    value: "MRT",
    label: { id: "country.mauritania", defaultMessage: "Mauritania" },
  },
  {
    value: "MUS",
    label: { id: "country.mauritius", defaultMessage: "Mauritius" },
  },
  { value: "MYT", label: { id: "country.mayotte", defaultMessage: "Mayotte" } },
  { value: "MEX", label: { id: "country.mexico", defaultMessage: "Mexico" } },
  {
    value: "FSM",
    label: {
      id: "country.micronesia_federated_states_of",
      defaultMessage: "Micronesia, Federated States of",
    },
  },
  { value: "MDA", label: { id: "country.moldova", defaultMessage: "Moldova" } },
  { value: "MCO", label: { id: "country.monaco", defaultMessage: "Monaco" } },
  {
    value: "MNG",
    label: { id: "country.mongolia", defaultMessage: "Mongolia" },
  },
  {
    value: "MNE",
    label: { id: "country.montenegro", defaultMessage: "Montenegro" },
  },
  {
    value: "MSR",
    label: { id: "country.montserrat", defaultMessage: "Montserrat" },
  },
  { value: "MAR", label: { id: "country.morocco", defaultMessage: "Morocco" } },
  {
    value: "MOZ",
    label: { id: "country.mozambique", defaultMessage: "Mozambique" },
  },
  { value: "MMR", label: { id: "country.myanmar", defaultMessage: "Myanmar" } },
  { value: "NAM", label: { id: "country.namibia", defaultMessage: "Namibia" } },
  { value: "NRU", label: { id: "country.nauru", defaultMessage: "Nauru" } },
  { value: "NPL", label: { id: "country.nepal", defaultMessage: "Nepal" } },
  {
    value: "NLD",
    label: { id: "country.netherlands", defaultMessage: "Netherlands" },
  },
  {
    value: "ANT",
    label: {
      id: "country.netherlands_antilles",
      defaultMessage: "Netherlands Antilles",
    },
  },
  {
    value: "NCL",
    label: { id: "country.new_caledonia", defaultMessage: "New Caledonia" },
  },
  {
    value: "NZL",
    label: { id: "country.new_zealand", defaultMessage: "New Zealand" },
  },
  {
    value: "NIC",
    label: { id: "country.nicaragua", defaultMessage: "Nicaragua" },
  },
  { value: "NER", label: { id: "country.niger", defaultMessage: "Niger" } },
  { value: "NGA", label: { id: "country.nigeria", defaultMessage: "Nigeria" } },
  { value: "NIU", label: { id: "country.niue", defaultMessage: "Niue" } },
  {
    value: "NFK",
    label: { id: "country.norfolk_island", defaultMessage: "Norfolk Island" },
  },
  {
    value: "PRK",
    label: { id: "country.north_korea", defaultMessage: "North Korea" },
  },
  {
    value: "MNP",
    label: {
      id: "country.northern_mariana_islands",
      defaultMessage: "Northern Mariana Islands",
    },
  },
  { value: "NOR", label: { id: "country.norway", defaultMessage: "Norway" } },
  { value: "OMN", label: { id: "country.oman", defaultMessage: "Oman" } },
  {
    value: "PAK",
    label: { id: "country.pakistan", defaultMessage: "Pakistan" },
  },
  { value: "PLW", label: { id: "country.palau", defaultMessage: "Palau" } },
  {
    value: "PSE",
    label: {
      id: "country.palestinian_territory",
      defaultMessage: "Palestinian Territory",
    },
  },
  { value: "PAN", label: { id: "country.panama", defaultMessage: "Panama" } },
  {
    value: "PNG",
    label: {
      id: "country.papua_gew_guinea",
      defaultMessage: "Papua New Guinea",
    },
  },
  {
    value: "PRY",
    label: { id: "country.paraguay", defaultMessage: "Paraguay" },
  },
  { value: "PER", label: { id: "country.peru", defaultMessage: "Peru" } },
  {
    value: "PHL",
    label: { id: "country.philippines", defaultMessage: "Philippines" },
  },
  {
    value: "PCN",
    label: { id: "country.pitcairn", defaultMessage: "Pitcairn" },
  },
  { value: "POL", label: { id: "country.poland", defaultMessage: "Poland" } },
  {
    value: "PRT",
    label: { id: "country.portugal", defaultMessage: "Portugal" },
  },
  {
    value: "PRI",
    label: { id: "country.puerto_rico", defaultMessage: "Puerto Rico" },
  },
  { value: "QAT", label: { id: "country.qatar", defaultMessage: "Qatar" } },
  { value: "REU", label: { id: "country.reunion", defaultMessage: "Réunion" } },
  { value: "ROU", label: { id: "country.romania", defaultMessage: "Romania" } },
  {
    value: "RUS",
    label: {
      id: "country.russian_federation",
      defaultMessage: "Russian Federation",
    },
  },
  { value: "RWA", label: { id: "country.rwanda", defaultMessage: "Rwanda" } },
  {
    value: "SHN",
    label: { id: "country.saint_helena", defaultMessage: "Saint Helena" },
  },
  {
    value: "KNA",
    label: {
      id: "country.saint_kitts_and_nevis",
      defaultMessage: "Saint Kitts and Nevis",
    },
  },
  {
    value: "LCA",
    label: { id: "country.saint_lucia", defaultMessage: "Saint Lucia" },
  },
  {
    value: "SPM",
    label: {
      id: "country.saint_pierre_and_miquelon",
      defaultMessage: "Saint Pierre and Miquelon",
    },
  },
  {
    value: "VCT",
    label: {
      id: "country.saint_vincent_and_grenadines",
      defaultMessage: "Saint Vincent and Grenadines",
    },
  },
  { value: "WSM", label: { id: "country.samoa", defaultMessage: "Samoa" } },
  {
    value: "SMR",
    label: { id: "country.san_marino", defaultMessage: "San Marino" },
  },
  {
    value: "STP",
    label: {
      id: "country.sao_tome_and_principe",
      defaultMessage: "Sao Tome and Principe",
    },
  },
  {
    value: "SAU",
    label: { id: "country.saudi_arabia", defaultMessage: "Saudi Arabia" },
  },
  { value: "SEN", label: { id: "country.senegal", defaultMessage: "Senegal" } },
  { value: "SRB", label: { id: "country.serbia", defaultMessage: "Serbia" } },
  {
    value: "SYC",
    label: { id: "country.seychelles", defaultMessage: "Seychelles" },
  },
  {
    value: "SLE",
    label: { id: "country.sierra_leone", defaultMessage: "Sierra Leone" },
  },
  {
    value: "SGP",
    label: { id: "country.singapore", defaultMessage: "Singapore" },
  },
  {
    value: "SVK",
    label: { id: "country.slovakia", defaultMessage: "Slovakia" },
  },
  {
    value: "SVN",
    label: { id: "country.slovenia", defaultMessage: "Slovenia" },
  },
  {
    value: "SLB",
    label: { id: "country.solomon_islands", defaultMessage: "Solomon Islands" },
  },
  { value: "SOM", label: { id: "country.somalia", defaultMessage: "Somalia" } },
  {
    value: "ZAF",
    label: { id: "country.south_africa", defaultMessage: "South Africa" },
  },
  {
    value: "SGS",
    label: {
      id: "country.south_georgia_and_the_south_sandwich_islands",
      defaultMessage: "South Georgia and the South Sandwich Islands",
    },
  },
  {
    value: "KOR",
    label: { id: "country.south_korea", defaultMessage: "South Korea" },
  },
  {
    value: "SSD",
    label: { id: "country.south_sudan", defaultMessage: "South Sudan" },
  },
  { value: "ESP", label: { id: "country.spain", defaultMessage: "Spain" } },
  {
    value: "LKA",
    label: { id: "country.sri_lanka", defaultMessage: "Sri Lanka" },
  },
  { value: "SDN", label: { id: "country.sudan", defaultMessage: "Sudan" } },
  {
    value: "SUR",
    label: { id: "country.suriname", defaultMessage: "Suriname" },
  },
  {
    value: "SJM",
    label: {
      id: "country.svalbard_and_jan_mayen_islands",
      defaultMessage: "Svalbard and Jan Mayen Islands",
    },
  },
  { value: "SWE", label: { id: "country.sweden", defaultMessage: "Sweden" } },
  {
    value: "CHE",
    label: { id: "country.switzerland", defaultMessage: "Switzerland" },
  },
  {
    value: "SYR",
    label: {
      id: "country.syrian_arab_republic_syria",
      defaultMessage: "Syrian Arab Republic (Syria)",
    },
  },
  {
    value: "TWN",
    label: {
      id: "country.taiwan_republic_of_china",
      defaultMessage: "Taiwan, Republic of China",
    },
  },
  {
    value: "TJK",
    label: { id: "country.tajikistan", defaultMessage: "Tajikistan" },
  },
  {
    value: "TZA",
    label: {
      id: "country.tanzania_united_republic_of",
      defaultMessage: "Tanzania, United Republic of",
    },
  },
  {
    value: "THA",
    label: { id: "country.thailand", defaultMessage: "Thailand" },
  },
  {
    value: "TLS",
    label: { id: "country.timor_leste", defaultMessage: "Timor-Leste" },
  },
  { value: "TGO", label: { id: "country.togo", defaultMessage: "Togo" } },
  { value: "TKL", label: { id: "country.tokelau", defaultMessage: "Tokelau" } },
  { value: "TON", label: { id: "country.tonga", defaultMessage: "Tonga" } },
  {
    value: "TTO",
    label: {
      id: "country.trinidad_and_tobago",
      defaultMessage: "Trinidad and Tobago",
    },
  },
  { value: "TUN", label: { id: "country.tunisia", defaultMessage: "Tunisia" } },
  { value: "TUR", label: { id: "country.turkey", defaultMessage: "Turkey" } },
  {
    value: "TKM",
    label: { id: "country.turkmenistan", defaultMessage: "Turkmenistan" },
  },
  {
    value: "TCA",
    label: {
      id: "country.turks_and_caicos_islands",
      defaultMessage: "Turks and Caicos Islands",
    },
  },
  { value: "TUV", label: { id: "country.tuvalu", defaultMessage: "Tuvalu" } },
  {
    value: "VIR",
    label: {
      id: "country.us_virgin_islands",
      defaultMessage: "U.S. Virgin Islands",
    },
  },
  { value: "UGA", label: { id: "country.uganda", defaultMessage: "Uganda" } },
  { value: "UKR", label: { id: "country.ukraine", defaultMessage: "Ukraine" } },
  {
    value: "ARE",
    label: {
      id: "country.united_arab_emirates",
      defaultMessage: "United Arab Emirates",
    },
  },
  {
    value: "GBR",
    label: { id: "country.united_kingdom", defaultMessage: "United Kingdom" },
  },
  {
    value: "USA",
    label: {
      id: "country.united_states_of_america",
      defaultMessage: "United States of America",
    },
  },
  { value: "URY", label: { id: "country.uruguay", defaultMessage: "Uruguay" } },
  {
    value: "UZB",
    label: { id: "country.uzbekistan", defaultMessage: "Uzbekistan" },
  },
  { value: "VUT", label: { id: "country.vanuatu", defaultMessage: "Vanuatu" } },
  {
    value: "VAT",
    label: {
      id: "country.vatican_City",
      defaultMessage: "Vatican City [Holy See]",
    },
  },
  {
    value: "VEN",
    label: {
      id: "country.venezuela_bolivarian_republic",
      defaultMessage: "Venezuela (Bolivarian Republic)",
    },
  },
  { value: "VNM", label: { id: "country.vietnam", defaultMessage: "Vietnam" } },
  {
    value: "WLF",
    label: {
      id: "country.wallis_and_futuna_islands",
      defaultMessage: "Wallis and Futuna Islands",
    },
  },
  {
    value: "ESH",
    label: { id: "country.western_sahara", defaultMessage: "Western Sahara" },
  },
  { value: "YEM", label: { id: "country.yemen", defaultMessage: "Yemen" } },
  { value: "ZMB", label: { id: "country.zambia", defaultMessage: "Zambia" } },
  {
    value: "ZWE",
    label: { id: "country.zimbabwe", defaultMessage: "Zimbabwe" },
  },
]
