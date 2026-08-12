export type Offering = {
  id: number;
  nameEn: string;
  nameMl: string;
  price: number | null;
  noteEn: string;
  noteMl: string;
  sortOrder: number;
};

const rows = [
  ["Valiya Shakteyam (Kalasham)", "വലിയ ശാക്തേയം (കലശം)", 2800], ["Shakteyam (Kalasham)", "ശാക്തേയം (കലശം)", 500],
  ["Maha Guruthi Pooja", "മഹാ ഗുരുതിപൂജ", 3000], ["Vilakku", "വിളക്ക്", 10], ["Ghee Lamp", "നെയ്യ് വിളക്ക്", 25],
  ["Garland", "മാല", 10], ["Pushpanjali", "പുഷ്പാഞ്ജലി", 10], ["Raktha Pushpanjali", "രക്ത പുഷ്പാഞ്ജലി", 15],
  ["Mangalya Pushpanjali", "മംഗല്യ പുഷ്പാഞ്ജലി", 15], ["Shathrusamhara Pushpanjali", "ശത്രുസംഹാര പുഷ്പാഞ്ജലി", 50],
  ["Guruthi Pushpanjali", "ഗുരുതി പുഷ്പാഞ്ജലി", 50], ["Muttirakkal", "മുട്ടിറക്കൽ", 10, "Please bring a coconut", "ഒരു തേങ്ങ കൊണ്ടുവരണം"],
  ["Kumkumarchana", "കുങ്കുമാർച്ചന", 25], ["Poomoodal", "പൂമൂടൽ", 1000], ["Lighting the Deepastambham", "ദീപസ്തംഭം തെളിയിക്കൽ", 150],
  ["Malar Nivedyam", "മലർ നിവേദ്യം", 25], ["Thrimadhuram", "ത്രിമധുരം", 25], ["Jaggery Payasam", "ശർക്കര പായസം", 50],
  ["Kadum Payasam", "കടുംപായസം", 100], ["Milk Payasam", "പാൽപായസം", 70], ["Vella Nivedyam", "വെള്ള നിവേദ്യം", 15],
  ["Niramala", "നിറമാല", 500], ["Chuttu Vilakku", "ചുറ്റുവിളക്ക്", 1500], ["Bhagavathi Seva", "ഭഗവത്‌സേവ", 150],
  ["Choroonu", "ചോറൂണ്", 50], ["Vivaham", "വിവാഹം", 150], ["Nel Para", "നെൽ പറ", 250],
  ["Thiruvudayada Charthal", "തിരുവുടയാട ചാർത്തൽ", 50], ["Vehicle Pooja", "വാഹന പൂജ", 50], ["Ezhuthiniruthal", "എഴുത്തിനിരുത്തൽ", 50],
  ["Kalabhabhishekam", "കളഭാഭിഷേകം", 25], ["Palabhishekam", "പാലഭിഷേകം", 25], ["Honey Abhishekam", "തേൻ അഭിഷേകം", 100],
  ["Kali Sahasranamarchana", "കാളി സഹസ്രനാമാർച്ചന", 100], ["Tender Coconut Abhishekam", "ഇളനീർ അഭിഷേകം", 10, "Please bring a tender coconut", "ഇളനീർ കൊണ്ടുവരണം"],
  ["Turmeric Powder Abhishekam", "മഞ്ഞൾപ്പൊടി അഭിഷേകം", 50], ["Lemon Garland", "നാരങ്ങമാല", null], ["Lemon Lamp", "നാരങ്ങ വിളക്ക്", null], ["Kedavilakku", "കെടാവിളക്ക്", 100],
] as const;

export const defaultOfferings: Offering[] = rows.map((row, index) => ({
  id: index + 1, nameEn: row[0], nameMl: row[1], price: row[2],
  noteEn: row[3] ?? "", noteMl: row[4] ?? "", sortOrder: index + 1,
}));

export const formatPrice = (price: number | null) => price == null ? null : `₹${price.toLocaleString("en-IN")}`;
