import { itemAudio, itemImage, itemText, itemVideo } from '../../types/Item';
import { License } from '../../types/License';
import { collectionTypes as Types } from '../../types/Collection';

export const oceans = [
  {value: 'Atlantic Ocean', label: 'Atlantic Ocean'},
  {value: 'Arctic Ocean', label: 'Arctic Ocean'},
  {value: 'Indian Ocean', label: 'Indian Ocean'},
  {value: 'Pacific Ocean', label: 'Pacific Ocean'},
  {value: 'Southern Ocean', label: 'Southern Ocean'}
];

export const countries = [
  {value: 'AF', label: 'Afghanistan'},
  {value: 'AX', label: '\u00c5land Islands'},
  {value: 'AL', label: 'Albania'},
  {value: 'DZ', label: 'Algeria'},
  {value: 'AS', label: 'American Samoa'},
  {value: 'AD', label: 'Andorra'},
  {value: 'AO', label: 'Angola'},
  {value: 'AI', label: 'Anguilla'},
  {value: 'AQ', label: 'Antarctica'},
  {value: 'AG', label: 'Antigua and Barbuda'},
  {value: 'AR', label: 'Argentina'},
  {value: 'AM', label: 'Armenia'},
  {value: 'AW', label: 'Aruba'},
  {value: 'AU', label: 'Australia'},
  {value: 'AT', label: 'Austria'},
  {value: 'AZ', label: 'Azerbaijan'},
  {value: 'BS', label: 'Bahamas'},
  {value: 'BH', label: 'Bahrain'},
  {value: 'BD', label: 'Bangladesh'},
  {value: 'BB', label: 'Barbados'},
  {value: 'BY', label: 'Belarus'},
  {value: 'BE', label: 'Belgium'},
  {value: 'BZ', label: 'Belize'},
  {value: 'BJ', label: 'Benin'},
  {value: 'BM', label: 'Bermuda'},
  {value: 'BT', label: 'Bhutan'},
  {value: 'BO', label: 'Bolivia, Plurinational State of'},
  {value: 'BQ', label: 'Bonaire, Sint Eustatius and Saba'},
  {value: 'BA', label: 'Bosnia and Herzegovina'},
  {value: 'BW', label: 'Botswana'},
  {value: 'BV', label: 'Bouvet Island'},
  {value: 'BR', label: 'Brazil'},
  {value: 'IO', label: 'British Indian Ocean Territory'},
  {value: 'BN', label: 'Brunei Darussalam'},
  {value: 'BG', label: 'Bulgaria'},
  {value: 'BF', label: 'Burkina Faso'},
  {value: 'BI', label: 'Burundi'},
  {value: 'KH', label: 'Cambodia'},
  {value: 'CM', label: 'Cameroon'},
  {value: 'CA', label: 'Canada'},
  {value: 'CV', label: 'Cape Verde'},
  {value: 'KY', label: 'Cayman Islands'},
  {value: 'CF', label: 'Central African Republic'},
  {value: 'TD', label: 'Chad'},
  {value: 'CL', label: 'Chile'},
  {value: 'CN', label: 'China'},
  {value: 'CX', label: 'Christmas Island'},
  {value: 'CC', label: 'Cocos (Keeling) Islands'},
  {value: 'CO', label: 'Colombia'},
  {value: 'KM', label: 'Comoros'},
  {value: 'CG', label: 'Congo'},
  {value: 'CD', label: 'Congo, the Democratic Republic of the'},
  {value: 'CK', label: 'Cook Islands'},
  {value: 'CR', label: 'Costa Rica'},
  {value: 'CI', label: 'C\u00f4te d\'Ivoire'},
  {value: 'HR', label: 'Croatia'},
  {value: 'CU', label: 'Cuba'},
  {value: 'CW', label: 'Cura\u00e7ao'},
  {value: 'CY', label: 'Cyprus'},
  {value: 'CZ', label: 'Czech Republic'},
  {value: 'DK', label: 'Denmark'},
  {value: 'DJ', label: 'Djibouti'},
  {value: 'DM', label: 'Dominica'},
  {value: 'DO', label: 'Dominican Republic'},
  {value: 'EC', label: 'Ecuador'},
  {value: 'EG', label: 'Egypt'},
  {value: 'SV', label: 'El Salvador'},
  {value: 'GQ', label: 'Equatorial Guinea'},
  {value: 'ER', label: 'Eritrea'},
  {value: 'EE', label: 'Estonia'},
  {value: 'ET', label: 'Ethiopia'},
  {value: 'FK', label: 'Falkland Islands (Malvinas)'},
  {value: 'FO', label: 'Faroe Islands'},
  {value: 'FJ', label: 'Fiji'},
  {value: 'FI', label: 'Finland'},
  {value: 'FR', label: 'France'},
  {value: 'GF', label: 'French Guiana'},
  {value: 'PF', label: 'French Polynesia'},
  {value: 'TF', label: 'French Southern Territories'},
  {value: 'GA', label: 'Gabon'},
  {value: 'GM', label: 'Gambia'},
  {value: 'GE', label: 'Georgia'},
  {value: 'DE', label: 'Germany'},
  {value: 'GH', label: 'Ghana'},
  {value: 'GI', label: 'Gibraltar'},
  {value: 'GR', label: 'Greece'},
  {value: 'GL', label: 'Greenland'},
  {value: 'GD', label: 'Grenada'},
  {value: 'GP', label: 'Guadeloupe'},
  {value: 'GU', label: 'Guam'},
  {value: 'GT', label: 'Guatemala'},
  {value: 'GG', label: 'Guernsey'},
  {value: 'GN', label: 'Guinea'},
  {value: 'GW', label: 'Guinea-Bissau'},
  {value: 'GY', label: 'Guyana'},
  {value: 'HT', label: 'Haiti'},
  {value: 'HM', label: 'Heard Island and McDonald Islands'},
  {value: 'VA', label: 'Holy See (Vatican City State)'},
  {value: 'HN', label: 'Honduras'},
  {value: 'HK', label: 'Hong Kong'},
  {value: 'HU', label: 'Hungary'},
  {value: 'IS', label: 'Iceland'},
  {value: 'IN', label: 'India'},
  {value: 'ID', label: 'Indonesia'},
  {value: 'IR', label: 'Iran, Islamic Republic of'},
  {value: 'IQ', label: 'Iraq'},
  {value: 'IE', label: 'Ireland'},
  {value: 'IM', label: 'Isle of Man'},
  {value: 'IL', label: 'Israel'},
  {value: 'IT', label: 'Italy'},
  {value: 'JM', label: 'Jamaica'},
  {value: 'JP', label: 'Japan'},
  {value: 'JE', label: 'Jersey'},
  {value: 'JO', label: 'Jordan'},
  {value: 'KZ', label: 'Kazakhstan'},
  {value: 'KE', label: 'Kenya'},
  {value: 'KI', label: 'Kiribati'},
  {value: 'KP', label: 'Korea, Democratic People\'s Republic of'},
  {value: 'KR', label: 'Korea, Republic of'},
  {value: 'KW', label: 'Kuwait'},
  {value: 'KG', label: 'Kyrgyzstan'},
  {value: 'LA', label: 'Lao People\'s Democratic Republic'},
  {value: 'LV', label: 'Latvia'},
  {value: 'LB', label: 'Lebanon'},
  {value: 'LS', label: 'Lesotho'},
  {value: 'LR', label: 'Liberia'},
  {value: 'LY', label: 'Libya'},
  {value: 'LI', label: 'Liechtenstein'},
  {value: 'LT', label: 'Lithuania'},
  {value: 'LU', label: 'Luxembourg'},
  {value: 'MO', label: 'Macao'},
  {value: 'MK', label: 'Macedonia, the Former Yugoslav Republic of'},
  {value: 'MG', label: 'Madagascar'},
  {value: 'MW', label: 'Malawi'},
  {value: 'MY', label: 'Malaysia'},
  {value: 'MV', label: 'Maldives'},
  {value: 'ML', label: 'Mali'},
  {value: 'MT', label: 'Malta'},
  {value: 'MH', label: 'Marshall Islands'},
  {value: 'MQ', label: 'Martinique'},
  {value: 'MR', label: 'Mauritania'},
  {value: 'MU', label: 'Mauritius'},
  {value: 'YT', label: 'Mayotte'},
  {value: 'MX', label: 'Mexico'},
  {value: 'FM', label: 'Micronesia, Federated States of'},
  {value: 'MD', label: 'Moldova, Republic of'},
  {value: 'MC', label: 'Monaco'},
  {value: 'MN', label: 'Mongolia'},
  {value: 'ME', label: 'Montenegro'},
  {value: 'MS', label: 'Montserrat'},
  {value: 'MA', label: 'Morocco'},
  {value: 'MZ', label: 'Mozambique'},
  {value: 'MM', label: 'Myanmar'},
  {value: 'NA', label: 'Namibia'},
  {value: 'NR', label: 'Nauru'},
  {value: 'NP', label: 'Nepal'},
  {value: 'NL', label: 'Netherlands'},
  {value: 'NC', label: 'New Caledonia'},
  {value: 'NZ', label: 'New Zealand'},
  {value: 'NI', label: 'Nicaragua'},
  {value: 'NE', label: 'Niger'},
  {value: 'NG', label: 'Nigeria'},
  {value: 'NU', label: 'Niue'},
  {value: 'NF', label: 'Norfolk Island'},
  {value: 'MP', label: 'Northern Mariana Islands'},
  {value: 'NO', label: 'Norway'},
  {value: 'OM', label: 'Oman'},
  {value: 'PK', label: 'Pakistan'},
  {value: 'PW', label: 'Palau'},
  {value: 'PS', label: 'Palestine, State of'},
  {value: 'PA', label: 'Panama'},
  {value: 'PG', label: 'Papua New Guinea'},
  {value: 'PY', label: 'Paraguay'},
  {value: 'PE', label: 'Peru'},
  {value: 'PH', label: 'Philippines'},
  {value: 'PN', label: 'Pitcairn'},
  {value: 'PL', label: 'Poland'},
  {value: 'PT', label: 'Portugal'},
  {value: 'PR', label: 'Puerto Rico'},
  {value: 'QA', label: 'Qatar'},
  {value: 'RE', label: 'R\u00e9union'},
  {value: 'RO', label: 'Romania'},
  {value: 'RU', label: 'Russian Federation'},
  {value: 'RW', label: 'Rwanda'},
  {value: 'BL', label: 'Saint Barth\u00e9lemy'},
  {value: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha'},
  {value: 'KN', label: 'Saint Kitts and Nevis'},
  {value: 'LC', label: 'Saint Lucia'},
  {value: 'MF', label: 'Saint Martin (French part)'},
  {value: 'PM', label: 'Saint Pierre and Miquelon'},
  {value: 'VC', label: 'Saint Vincent and the Grenadines'},
  {value: 'WS', label: 'Samoa'},
  {value: 'SM', label: 'San Marino'},
  {value: 'ST', label: 'Sao Tome and Principe'},
  {value: 'SA', label: 'Saudi Arabia'},
  {value: 'SN', label: 'Senegal'},
  {value: 'RS', label: 'Serbia'},
  {value: 'SC', label: 'Seychelles'},
  {value: 'SL', label: 'Sierra Leone'},
  {value: 'SG', label: 'Singapore'},
  {value: 'SX', label: 'Sint Maarten (Dutch part)'},
  {value: 'SK', label: 'Slovakia'},
  {value: 'SI', label: 'Slovenia'},
  {value: 'SB', label: 'Solomon Islands'},
  {value: 'SO', label: 'Somalia'},
  {value: 'ZA', label: 'South Africa'},
  {value: 'GS', label: 'South Georgia and the South Sandwich Islands'},
  {value: 'SS', label: 'South Sudan'},
  {value: 'ES', label: 'Spain'},
  {value: 'LK', label: 'Sri Lanka'},
  {value: 'SD', label: 'Sudan'},
  {value: 'SR', label: 'Suriname'},
  {value: 'SJ', label: 'Svalbard and Jan Mayen'},
  {value: 'SZ', label: 'Swaziland'},
  {value: 'SE', label: 'Sweden'},
  {value: 'CH', label: 'Switzerland'},
  {value: 'SY', label: 'Syrian Arab Republic'},
  {value: 'TW', label: 'Taiwan, Province of China'},
  {value: 'TJ', label: 'Tajikistan'},
  {value: 'TZ', label: 'Tanzania, United Republic of'},
  {value: 'TH', label: 'Thailand'},
  {value: 'TL', label: 'Timor-Leste'},
  {value: 'TG', label: 'Togo'},
  {value: 'TK', label: 'Tokelau'},
  {value: 'TO', label: 'Tonga'},
  {value: 'TT', label: 'Trinidad and Tobago'},
  {value: 'TN', label: 'Tunisia'},
  {value: 'TR', label: 'Turkey'},
  {value: 'TM', label: 'Turkmenistan'},
  {value: 'TC', label: 'Turks and Caicos Islands'},
  {value: 'TV', label: 'Tuvalu'},
  {value: 'UG', label: 'Uganda'},
  {value: 'UA', label: 'Ukraine'},
  {value: 'AE', label: 'United Arab Emirates'},
  {value: 'GB', label: 'United Kingdom'},
  {value: 'US', label: 'United States'},
  {value: 'UM', label: 'United States Minor Outlying Islands'},
  {value: 'UY', label: 'Uruguay'},
  {value: 'UZ', label: 'Uzbekistan'},
  {value: 'VU', label: 'Vanuatu'},
  {value: 'VE', label: 'Venezuela, Bolivarian Republic of'},
  {value: 'VN', label: 'Viet Nam'},
  {value: 'VG', label: 'Virgin Islands, British'},
  {value: 'VI', label: 'Virgin Islands, U.S.'},
  {value: 'WF', label: 'Wallis and Futuna'},
  {value: 'EH', label: 'Western Sahara'},
  {value: 'YE', label: 'Yemen'},
  {value: 'ZM', label: 'Zambia'},
  {value: 'ZW', label: 'Zimbabwe'}
];
export const languages = [
  {value: 'ar', label: 'Arabic'},
  {value: 'bg', label:  'Bulgarian'}, 
  {values: 'ca', label:  'Catalan'},
  {value: 'zh-', label: 'Hans Chinese, Han'},
  {value: 'cs', label: 'Czech'},
  {value: 'da', label: 'Danish' },
  {value: 'de', label: 'German'},
  {value: 'el', label: 'Modern Greek'},
  {value: 'en', label: 'English'},
  {value: 'es', label: 'Spanish'},
  {value: 'fi', label: 'Finnish'},
  {value: 'fr', label: 'French'},
  {value: 'he', label: 'Hebrew'},
  {value: 'hu', label: 'Hungarian'},
  {value: 'is', label: 'Icelandic'},
  {value: 'it', label: 'Italian'},
  {value: 'ja', label: 'Japanese'},
  {value: 'ko', label: 'Korean'},
  {value: 'nl', label: 'Dutch'},
  {value: 'no', label: 'Norwegian'},
  {value: 'pl', label: 'Polish'},
  {value: 'pt', label: 'Portuguese'},
  {value: 'rm', label: 'Romansh'},
  {value: 'ro', label: 'Romanian'},
  {value: 'ru', label: 'Russian'},
  {value: 'hr', label: 'Croatian'},
  {value: 'sk', label: 'Slovak'},
  {value: 'sq', label: 'Albanian'},
  {value: 'sv', label: 'Swedish'},
  {value: 'th', label: 'Thai'},
  {value: 'tr', label: 'Turkish'},
  {value: 'ur', label: 'Urdu'},
  {value: 'id', label: 'Indonesian'},
  {value: 'uk', label: 'Ukrainian'},
  {value: 'be', label: 'Belarusian'},
  {value: 'sl', label: 'Slovenian'},
  {value: 'et', label: 'Estonian'},
  {value: 'lv', label: 'Latvian'},
  {value: 'lt', label: 'Lithuania'},
  {value: 'tg', label: 'Tajik'},
  {value: 'fa', label: 'Persian'},
  {value: 'vi', label: 'Vietnamese'},
  {value: 'hy', label: 'Armenian'},
  {value: 'az', label: 'Azerbaijani'},
  {value: 'eu', label: 'Basque'},
  {value: 'hsb', label: 'Upper Sorbian'},
  {value: 'mk', label: 'Macedonian'},
  {value: 'tn', label: 'Tswana'},
  {value: 'xh', label: 'Xhosa'},
  {value: 'zu', label: 'Zulu'},
  {value: 'af', label: 'Afrikaans'},
  {value: 'ka', label: 'Georgian'},
  {value: 'fo', label: 'Faroese'},
  {value: 'hi', label: 'Hindi'},
  {value: 'mt', label: 'Maltese'},
  {value: 'se', label: 'Northern Sami'},
  {value: 'ga', label: 'Irish'},
  {value: 'ms', label: 'Malay'},
  {value: 'kk', label: 'Kazakh'}, 
  {value: 'ky', label: 'irghiz'},
  {value: 'sw', label: 'Swahili'},
  {value: 'tk', label: 'Turkmen'},
  {value: 'uz', label: 'Uzbek'},
  {value: 'tt', label: 'Tatar'},
  {value: 'bn', label: 'Bengali'},
  {value: 'pa', label: 'Panjabi'},
  {value: 'gu', label: 'Gujarati'},
  {value: 'or', label: 'Oriya'},
  {value: 'ta', label: 'Tamil'},
  {value: 'te', label: 'Telugu'},
  {value: 'kn', label: 'Kannada'},
  {value: 'ml', label: 'Malayalam'},
  {value: 'as', label: 'Assamese'},
  {value: 'mr', label: 'Marathi'},
  {value: 'sa', label: 'Sanskrit'},
  {value: 'mn', label: 'Mongolian'},
  {value: 'bo', label: 'Tibetan'},
  {value: 'cy', label: 'Welsh'},
  {value: 'km', label: 'Central Khmer'},
  {value: 'lo', label: 'Lao'},
  {value: 'gl', label: 'Galician'},
  {value: 'kok', label: 'Konkani'},
  {value: 'syr', label: 'Syriac'},
  {value: 'si', label: 'Sinhala'},
  {value: 'iu', label: 'Inuktitut'},
  {value: 'am', label: 'Amharic'},
  {value: 'tzm', label: 'Central Atlas Tamazight'},
  {value: 'ne', label: 'Nepali'},
  {value: 'fy', label: 'Western Frisian'},
  {value: 'ps', label: 'Pushto'},
  {value: 'fil', label: 'Filipino'},
  {value: 'dv', label: 'Dhivehi'},
  {value: 'ha', label: 'Hausa'},
  {value: 'yo', label: 'Yoruba'},
  {value: 'quz', label: 'Cusco Quechua'},
  {value: 'nso', label: 'Pedi'},
  {value: 'ba', label: 'Bashkir'},
  {value: 'lb', label: 'Luxembourgish'},
  {value: 'kl', label: 'Kalaallisut'},
  {value: 'ig', label: 'Igbo'},
  {value: 'ii', label: 'Sichuan Yi'},
  {value: 'arn', label: 'Mapudungun'},
  {value: 'moh', label: 'Mohawk'},
  {value: 'br', label: 'Breton'},
  {value: 'ug', label: 'Uighur'},
  {value: 'mi', label: 'Maori'},
  {value: 'oc', label: 'Occitan'},
  {value: 'co', label: 'Corsican'},
  {value: 'gsw', label: 'Swiss German'},
  {value: 'sah', label: 'Yakut'},
  {value: 'qut', label: 'Guatemala'},
  {value: 'rw', label: 'Kinyarwanda'},
  {value: 'wo', label: 'Wolof'},
  {value: 'prs', label: 'Dari'},
  {value: 'gd', label: 'Scottish Gaelic'}
];

export const licenseType = [
  {value: License.CC_BY, label: 'CC BY'},
  {value: License.CC_BY_SA, label: 'CC BY-SA'},
  {value: License.CC_BY_ND, label: 'CC BY-ND'},
  {value: License.CC_BY_NC, label: 'CC BY-NC'},
  {value: License.CC_BY_NC_SA, label: 'CC BY-NC-SA'},
  {value: License.CC_BY_NC_ND, label: 'CC BY-NC-ND'},
  {value: License.LOCKED, label: 'Locked'}
];

export const itemTextSubTypes = [
  {value: itemText.Academic_Publication, label: 'Academic Publication'},
  {value: itemText.Article, label: 'Article'},
  {value: itemText.News, label: 'News'},
  {value: itemText.Policy_Paper, label: 'Policy Paper'},
  {value: itemText.Report, label: 'Report'},
  {value: itemText.Book, label: 'Book'},
  {value: itemText.Essay, label: 'Essay'},
  {value: itemText.Historical_Text, label: 'Historical Text'},
  {value: itemText.Event_Press, label: 'Event Press'},
  {value: itemText.Toolkit, label: 'Toolkit'},
  {value: itemText.Other, label: 'Other'}
];
export const itemVideoSubTypes = [
  {value: itemVideo.Movie, label: 'Movie'},
  {value: itemVideo.Documentary, label: 'Documentary'},
  {value: itemVideo.Research, label: 'Research'},
  {value: itemVideo.Interview, label: 'Interview'},
  {value: itemVideo.Art, label: 'Art'},
  {value: itemVideo.News_Journalism, label: 'News / Journalism'},
  {value: itemVideo.Event_Recording, label: 'Event Recording'},
  {value: itemVideo.Informational_Video, label: 'Informational Video'},
  {value: itemVideo.Trailer, label: 'Trailer'},
  {value: itemVideo.Artwork_Documentation, label: 'Artwork Documentation'},
  {value: itemVideo.Raw_Footage, label: 'Raw Footage'},
  {value: itemVideo.Other, label: 'Other'}
];
export const itemImageSubTypes = [
  {value: itemImage.Photograph, label: 'Photograph'},
  {value: itemImage.Research, label: 'Research'},
  {value: itemImage.Digital_Art, label: 'Digital Art'},
  {value: itemImage.Graphics, label: 'Graphics'},
  {value: itemImage.Map, label: 'Map'},
  {value: itemImage.Film_Still, label: 'Film Still'},
  {value: itemImage.Sculpture, label: 'Sculpture'},
  {value: itemImage.Painting, label: 'Painting'},
  {value: itemImage.Illustration, label: 'Illustration'},
  {value: itemImage.Artwork_Documentation, label: 'Artwork Documentation'},
  {value: itemImage.Other, label: 'Other'}
];
export const itemAudioSubTypes = [
  {value: itemAudio.Field_Recording, label: 'Field Recording'},
  {value: itemAudio.Sound_Art, label: 'Sound Art'},
  {value: itemAudio.Music, label: 'Music'},
  {value: itemAudio.Podcast, label: 'Podcast'},
  {value: itemAudio.Lecture, label: 'Lecture'},
  {value: itemAudio.Interview, label: 'Interview'},
  {value: itemAudio.Radio, label: 'Radio'},
  {value: itemAudio.Performance_Poetry, label: 'Performance Poetry'},
  {value: itemAudio.Other, label: 'Other'}
];

export const collectionTypes = [
  {value : Types.Series, label: 'Series'},
  {value : Types.Area_of_Research, label: 'Area of research'},
  {value : Types.Event, label: 'Event'},
  {value : Types.Event_Series, label: 'Event Series'},
  {value : Types.Edited_Volume, label: 'Edited Volume'},
  {value : Types.Expedition, label: 'Expedition'},
  {value : Types.Expedition, label: 'Exhibition'},
  {value : Types.Collection, label: 'Collection'},
  {value : Types.Convening, label: 'Convening'},
  {value : Types.Performance, label: 'Performance'},
  {value : Types.Installation, label: 'Installation'},
  {value : Types.Other, label: 'Other'}
];
