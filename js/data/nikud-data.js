// Hebrew letter + nikud combinations for bonus rounds
export const nikudChallenges = [
  // Level 1 (easy)
  [
    {
      letter: 'אָ',
      options: ['ah', 'uh', 'eh', 'ee'],
      correct: 'uh',
      sound: 'kamatz',
      transliteration: 'uh as in "sun"'
    },
    {
      letter: 'בֵּ',
      options: ['ve', 'bey', 'bah', 'buh'],
      correct: 'bey',
      sound: 'tzere',
      transliteration: 'e as in "they"'
    },
    {
      letter: 'גִּ',
      options: ['ghee', 'gah', 'go', 'gu'],
      correct: 'ghee',
      sound: 'chirik',
      transliteration: 'i as in "machine"'
    }
  ],
  // Level 2 (medium)
  [
    {
      letter: 'דֹּ',
      options: ['doh', 'dah', 'duh', 'di'],
      correct: 'doh',
      sound: 'cholam',
      transliteration: 'o as in "go"'
    },
    {
      letter: 'הֻ',
      options: ['hoo', 'hi', 'he', 'ho'],
      correct: 'hoo',
      sound: 'kubutz',
      transliteration: 'u as in "flute"'
    }
  ],
  // Level 3 (harder)
  [
    {
      letter: 'חַ',
      options: ['cha', 'chi', 'chu', 'che'],
      correct: 'cha',
      sound: 'patach',
      transliteration: 'a as in "father"'
    },
    {
      letter: 'טוּ',
      options: ['tu', 'ti', 'te', 'ta'],
      correct: 'tu',
      sound: 'shuruk',
      transliteration: 'u as in "flute"'
    },
    {
      letter: 'יֶ',
      options: ['ye', 'ya', 'yo', 'yu'],
      correct: 'ye',
      sound: 'segol',
      transliteration: 'e as in "set"'
    }
  ],
  // Level 4 (advanced)
  [
    {
      letter: 'כַּ',
      options: ['ka', 'ke', 'ki', 'ku'],
      correct: 'ka',
      sound: 'patach',
      transliteration: 'a as in "father"'
    },
    {
      letter: 'לֹ',
      options: ['lo', 'la', 'li', 'lu'],
      correct: 'lo',
      sound: 'cholam',
      transliteration: 'o as in "go"'
    },
    {
      letter: 'נוֹ',
      options: ['no', 'na', 'ni', 'nu'],
      correct: 'no',
      sound: 'cholam malei',
      transliteration: 'o as in "go"'
    }
  ],
  // Level 5 (using common Hebrew names/words to illustrate vowel sounds)
  [
    {
      letter: 'נֹ', // Using the first syllable of "Noach"
      options: ['oh', 'ah', 'eh', 'oo'],
      correct: 'oh',
      sound: 'cholam',
      transliteration: 'as in "Noach"'
    },
    {
      letter: 'יָ', // The first syllable of "Adam"
      options: ['yah', 'yeh', 'yee', 'yuh'],
      correct: 'yah',
      sound: 'qamatz',
      transliteration: 'as in "Adam"'
    },
    {
      letter: 'מֹ', // The first syllable of "Moshe"
      options: ['mo', 'ma', 'me', 'mu'],
      correct: 'mo',
      sound: 'cholam',
      transliteration: 'as in "Moshe"'
    }
  ],
  // Level 6 (even more advanced — "malei" forms)
  [
    {
      letter: 'אִי',
      options: ['a', 'ee', 'o', 'u'],
      correct: 'ee',
      sound: 'chirik malei',
      transliteration: 'ee as in "seen"'
    },
    {
      letter: 'אֵי',
      options: ['ei', 'i', 'a', 'u'],
      correct: 'ei',
      sound: 'tzere malei',
      transliteration: 'ei as in "veil"'
    },
    {
      letter: 'אֹ',
      options: ['o', 'a', 'e', 'u'],
      correct: 'o',
      sound: 'cholam ḥaser',
      transliteration: 'o as in "go"'
    }
  ],
  // Level 7 (for multi-word phrases)
  [
    {
      letter: 'שְׁ',
      options: ['sh', 's', 'sch', 'z'],
      correct: 'sh',
      sound: 'shva',
      transliteration: 'sh as in "shop"'
    },
    {
      letter: 'חֲ',
      options: ['cha', 'ha', 'kha', 'ach'],
      correct: 'cha',
      sound: 'chataf patach',
      transliteration: 'ch as in "Bach"'
    }
  ],
  // Level 8 (for multi-word phrases)
  [
    {
      letter: 'בְּ',
      options: ['b', 'v', 'p', 'f'],
      correct: 'b',
      sound: 'shva',
      transliteration: 'b as in "boy"'
    },
    {
      letter: 'רָ',
      options: ['ra', 're', 'ri', 'ro'],
      correct: 'ra',
      sound: 'kamatz',
      transliteration: 'ra as in "raw"'
    }
  ],
  // Level 9 (for multi-word phrases)
  [
    {
      letter: 'עֲ',
      options: ['a', 'i', 'u', 'e'],
      correct: 'a',
      sound: 'chataf patach',
      transliteration: 'a guttural sound'
    },
    {
      letter: 'תִּ',
      options: ['ti', 'te', 'ta', 'tu'],
      correct: 'ti',
      sound: 'chirik',
      transliteration: 'ti as in "team"'
    }
  ]
];
