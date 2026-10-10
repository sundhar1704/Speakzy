// ─────────────────────────────────────────────────────────────
// Course catalogue + question bank.
// Add a course  → push to COURSES and add its entry in QUESTIONS.
// Add questions → append q(...) lines. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'spoken', label: 'Spoken languages' },
  { id: 'code', label: 'Programming' },
];

export const COURSES = [
  { id: 'en', category: 'spoken', name: 'English', speechLang: 'en-US' },
  { id: 'es', category: 'spoken', name: 'Spanish', speechLang: 'es-ES' },
  { id: 'fr', category: 'spoken', name: 'French', speechLang: 'fr-FR' },
  { id: 'hi', category: 'spoken', name: 'Hindi', speechLang: 'hi-IN' },
  { id: 'py', category: 'code', name: 'Python', speechLang: 'en-US' },
  { id: 'js', category: 'code', name: 'JavaScript', speechLang: 'en-US' },
  { id: 'cpp', category: 'code', name: 'C++', speechLang: 'en-US' },
  { id: 'java', category: 'code', name: 'Java', speechLang: 'en-US' },
];

export const getCourse = (id) => COURSES.find((c) => c.id === id) || null;

export const MODES = ['vocabulary', 'speaking', 'grammar'];

// Colours for the three practice cards come straight from the Home Dashboard frame.
export function modeMeta(course) {
  const code = course?.category === 'code';
  return {
    vocabulary: {
      label: 'Vocabulary',
      sub: code ? 'Learn new terms' : 'Learn new words',
      iconBg: '#3ea302',
      bar: '#001a4d',
    },
    speaking: {
      label: 'Speaking',
      sub: code ? 'Say code out loud' : 'Practice Pronunciation',
      iconBg: '#2463eb',
      bar: '#2463eb',
    },
    grammar: {
      label: 'Grammar',
      sub: code ? 'Master the syntax' : 'Master the rules',
      iconBg: '#ffb300',
      bar: '#ffb300',
    },
  };
}

const q = (prompt, answer, wrong) => ({ prompt, answer, wrong });

export const QUESTIONS = {
  // ───────────── English ─────────────
  en: {
    vocabulary: [
      q('Which word means “happy”?', 'Joyful', ['Gloomy', 'Sleepy', 'Angry']),
      q('Choose the synonym of “big”.', 'Large', ['Tiny', 'Narrow', 'Quiet']),
      q('A place where you borrow books', 'Library', ['Bakery', 'Garage', 'Airport']),
      q('Which word is the opposite of “begin”?', 'Finish', ['Start', 'Open', 'Launch']),
      q('Which word means “very tired”?', 'Exhausted', ['Energetic', 'Curious', 'Generous']),
    ],
    speaking: [
      q('Which sentence is a polite greeting?', 'Good morning, how are you?', ['Give me water now.', 'Go away, please.', 'I am morning good.']),
      q('How do you politely ask for help?', 'Could you help me, please?', ['Help me now.', 'You help me?', 'Me help need.']),
      q('How do you introduce yourself?', 'Hello, my name is Sam.', ['Hello, I name Sam.', 'Name is hello Sam.', 'Sam hello my.']),
      q('Which sentence thanks someone?', 'Thank you very much.', ['Very much thank.', 'You thanks much.', 'Thanking you are.']),
    ],
    grammar: [
      q('She ___ to school every day.', 'goes', ['go', 'going', 'gone']),
      q('They ___ playing football now.', 'are', ['is', 'am', 'be']),
      q('I have ___ umbrella.', 'an', ['a', 'two', 'many']),
    ],
  },

  // ───────────── Spanish ─────────────
  es: {
    vocabulary: [
      q('How do you say “Hello”?', 'Hola', ['Adiós', 'Gracias', 'Por favor']),
      q('How do you say “Thank you”?', 'Gracias', ['Adiós', 'Por favor', 'Hola']),
      q('How do you say “Please”?', 'Por favor', ['Gracias', 'Adiós', 'Hola']),
      q('How do you say “Goodbye”?', 'Adiós', ['Hola', 'Gracias', 'Por favor']),
      q('How do you say “Water”?', 'Agua', ['Pan', 'Leche', 'Casa']),
    ],
    speaking: [
      q('Say “Good morning”', 'Buenos días', ['Buenas noches', 'Hasta luego', 'Mucho gusto']),
      q('Say “How are you?”', '¿Cómo estás?', ['¿Dónde estás?', '¿Quién eres?', '¿Qué hora es?']),
      q('Say “My name is Ana”', 'Me llamo Ana', ['Tengo nombre Ana', 'Me llamas Ana', 'Llamo me Ana']),
      q('Say “Nice to meet you”', 'Mucho gusto', ['Buenas noches', 'Con permiso', 'De nada']),
    ],
    grammar: [
      q('Yo ___ estudiante.', 'soy', ['eres', 'es', 'somos']),
      q('Ellos ___ en casa.', 'están', ['estás', 'estoy', 'estamos']),
      q('Nosotros ___ español.', 'hablamos', ['hablo', 'hablas', 'hablan']),
    ],
  },

  // ───────────── French ─────────────
  fr: {
    vocabulary: [
      q('How do you say “Hello”?', 'Bonjour', ['Au revoir', 'Merci', 'S’il vous plaît']),
      q('How do you say “Thank you”?', 'Merci', ['Bonjour', 'Au revoir', 'Pardon']),
      q('How do you say “Please”?', 'S’il vous plaît', ['Merci', 'Bonjour', 'Au revoir']),
      q('How do you say “Goodbye”?', 'Au revoir', ['Bonjour', 'Merci', 'Bonsoir']),
      q('How do you say “Water”?', 'Eau', ['Pain', 'Lait', 'Maison']),
    ],
    speaking: [
      q('Say “Good evening”', 'Bonsoir', ['Bonjour', 'Bonne nuit', 'À demain']),
      q('Say “How are you?”', 'Comment allez-vous ?', ['Où allez-vous ?', 'Qui êtes-vous ?', 'Quelle heure est-il ?']),
      q('Say “My name is Marie”', 'Je m’appelle Marie', ['J’ai Marie', 'Je suis appelle Marie', 'Mon appelle Marie']),
      q('Say “Nice to meet you”', 'Enchanté', ['Bonne nuit', 'Excusez-moi', 'De rien']),
    ],
    grammar: [
      q('Je ___ étudiant.', 'suis', ['es', 'est', 'sommes']),
      q('Nous ___ français.', 'parlons', ['parle', 'parles', 'parlent']),
      q('Elle ___ une pomme.', 'mange', ['manges', 'mangeons', 'mangent']),
    ],
  },

  // ───────────── Hindi (Devanagari + romanisation) ─────────────
  hi: {
    vocabulary: [
      q('How do you say “Hello”?', 'नमस्ते (Namaste)', ['धन्यवाद (Dhanyavaad)', 'अलविदा (Alvida)', 'कृपया (Kripya)']),
      q('How do you say “Thank you”?', 'धन्यवाद (Dhanyavaad)', ['नमस्ते (Namaste)', 'पानी (Paani)', 'कृपया (Kripya)']),
      q('How do you say “Please”?', 'कृपया (Kripya)', ['नमस्ते (Namaste)', 'पानी (Paani)', 'अलविदा (Alvida)']),
      q('How do you say “Goodbye”?', 'अलविदा (Alvida)', ['नमस्ते (Namaste)', 'धन्यवाद (Dhanyavaad)', 'कृपया (Kripya)']),
      q('How do you say “Water”?', 'पानी (Paani)', ['रोटी (Roti)', 'दूध (Doodh)', 'घर (Ghar)']),
    ],
    speaking: [
      q('Say “Good morning”', 'सुप्रभात (Suprabhat)', ['शुभ रात्रि (Shubh ratri)', 'फिर मिलेंगे (Phir milenge)', 'माफ़ कीजिए (Maaf kijiye)']),
      q('Say “How are you?”', 'आप कैसे हैं? (Aap kaise hain?)', ['आप कहाँ हैं? (Aap kahaan hain?)', 'आप कौन हैं? (Aap kaun hain?)', 'समय क्या है? (Samay kya hai?)']),
      q('Say “My name is Ravi”', 'मेरा नाम रवि है (Mera naam Ravi hai)', ['मेरा घर रवि है (Mera ghar Ravi hai)', 'तुम्हारा नाम रवि है (Tumhara naam Ravi hai)', 'मैं नाम रवि (Main naam Ravi)']),
      q('Say “Nice to meet you”', 'आपसे मिलकर खुशी हुई (Aapse milkar khushi hui)', ['शुभ रात्रि (Shubh ratri)', 'माफ़ कीजिए (Maaf kijiye)', 'कोई बात नहीं (Koi baat nahin)']),
    ],
    grammar: [
      q('Pick the correct sentence: “I am a student”', 'मैं छात्र हूँ (Main chhaatr hoon)', ['मैं छात्र है (Main chhaatr hai)', 'मैं छात्र हैं (Main chhaatr hain)', 'मैं छात्र हो (Main chhaatr ho)']),
      q('Pick the correct sentence: “He is at home”', 'वह घर पर है (Vah ghar par hai)', ['वह घर पर हूँ (Vah ghar par hoon)', 'वह घर पर हो (Vah ghar par ho)', 'मैं घर पर है (Main ghar par hai)']),
      q('Pick the correct sentence: “We are friends”', 'हम दोस्त हैं (Ham dost hain)', ['हम दोस्त है (Ham dost hai)', 'हम दोस्त हूँ (Ham dost hoon)', 'हम दोस्त हो (Ham dost ho)']),
    ],
  },

  // ───────────── Python ─────────────
  py: {
    vocabulary: [
      q('Which keyword defines a function?', 'def', ['func', 'function', 'define']),
      q('Which function prints text to the screen?', 'print()', ['echo()', 'console.log()', 'write()']),
      q('Which data type stores True or False?', 'bool', ['int', 'str', 'float']),
      q('Which keyword starts a loop over items?', 'for', ['loop', 'each', 'repeat']),
      q('Which symbol starts a comment?', '#', ['//', '/*', '--']),
    ],
    speaking: [
      q('How do you read `x = 5` aloud?', 'x equals five', ['x is greater than five', 'x minus five', 'x divided by five']),
      q('How do you read `len(items)` aloud?', 'length of items', ['lentils of items', 'linked items', 'list of items']),
      q('How do you read `if age >= 18:` aloud?', 'if age is greater than or equal to eighteen', ['if age is less than eighteen', 'if age is exactly eighteen', 'if age is not eighteen']),
      q('How do you read `for i in range(3):` aloud?', 'for i in range of three', ['while i is three', 'for range in i three', 'if i is in three']),
    ],
    grammar: [
      q('Which is a correct if statement?', 'if x > 3:', ['if x > 3 {', 'if (x > 3) then', 'if x > 3 end']),
      q('Which creates a list?', 'items = [1, 2, 3]', ['items = {1, 2, 3}', 'items = <1, 2, 3>', 'items = (1; 2; 3)']),
      q('Which defines a function correctly?', 'def greet():', ['function greet()', 'def greet() {', 'greet = def()']),
    ],
  },

  // ───────────── JavaScript ─────────────
  js: {
    vocabulary: [
      q('Which keyword declares a constant?', 'const', ['let', 'var', 'fixed']),
      q('Which call logs output to the console?', 'console.log()', ['print()', 'echo()', 'System.out.println()']),
      q('Which array method adds an item to the end?', 'push()', ['pop()', 'shift()', 'slice()']),
      q('Which operator checks strict equality?', '===', ['=', '==', '!=']),
      q('Which type stores text?', 'string', ['number', 'boolean', 'array']),
    ],
    speaking: [
      q('How do you read `const total = 10;` aloud?', 'const total equals ten', ['const total is less than ten', 'let total divided by ten', 'const ten equals total']),
      q('How do you read `a === b` aloud?', 'a strictly equals b', ['a is assigned b', 'a is not b', 'a is less than b']),
      q('How do you read `arr.length` aloud?', 'arr dot length', ['arr comma length', 'arr minus length', 'arr colon length']),
      q('How do you read `() => {}` aloud?', 'arrow function', ['curly function', 'round bracket loop', 'equals greater loop']),
    ],
    grammar: [
      q('Which is a correct function declaration?', 'function add(a, b) { }', ['def add(a, b):', 'func add(a, b) { }', 'add function(a, b) { }']),
      q('Which creates an object?', 'const user = { name: "Sam" };', ['const user = ["name": "Sam"];', 'const user = (name = "Sam");', 'const user = <name: "Sam">;']),
      q('Which is a correct for loop?', 'for (let i = 0; i < 3; i++) { }', ['for i in range(3) { }', 'for (i < 3; i++) { }', 'foreach (i in 3) { }']),
    ],
  },

  // ───────────── C++ ─────────────
  cpp: {
    vocabulary: [
      q('Which prints to the console?', 'std::cout', ['print()', 'System.out.println()', 'console.log()']),
      q('Which function is the program entry point?', 'main()', ['start()', 'run()', 'init()']),
      q('Which line adds input/output support?', '#include <iostream>', ['import iostream', 'using iostream', 'require(<iostream>)']),
      q('Which symbol declares a pointer?', '*', ['&', '#', '::']),
      q('Which type stores whole numbers?', 'int', ['string', 'bool', 'double']),
    ],
    speaking: [
      q('How do you read `int x = 5;` aloud?', 'integer x equals five', ['string x equals five', 'integer five equals x', 'return x five']),
      q('How do you read `x++` aloud?', 'x plus plus', ['x minus minus', 'x times x', 'x equals plus']),
      q('How do you read `std::cout` aloud?', 'standard c out', ['standard see in', 'state cout', 'string c out']),
      q('How do you read `a != b` aloud?', 'a is not equal to b', ['a equals b', 'a is less than b', 'a is assigned b']),
    ],
    grammar: [
      q('Which is a correct for loop?', 'for (int i = 0; i < 3; i++) { }', ['for i in range(3):', 'for (i = 0; i < 3) { }', 'loop (int i = 0; i < 3; i++) { }']),
      q('Which character ends a statement?', ';', [':', '.', ',']),
      q('Which declares a string?', 'std::string name = "Sam";', ["string name = 'Sam';", 'str name = "Sam";', 'name: string = "Sam";']),
    ],
  },

  // ───────────── Java ─────────────
  java: {
    vocabulary: [
      q('Which method is the program entry point?', 'public static void main', ['def main', 'function main', 'int start']),
      q('Which prints a line to the console?', 'System.out.println()', ['console.log()', 'print()', 'cout <<']),
      q('Which keyword creates an object?', 'new', ['create', 'make', 'object']),
      q('Which type stores text?', 'String', ['char', 'text', 'int']),
      q('Which type stores whole numbers?', 'int', ['String', 'boolean', 'double']),
    ],
    speaking: [
      q('How do you read `int count = 0;` aloud?', 'integer count equals zero', ['string count equals zero', 'integer zero equals count', 'count plus zero']),
      q('How do you read `a.equals(b)` aloud?', 'a dot equals of b', ['a equals equals b', 'a minus b', 'a assign b']),
      q('How do you read `i++` aloud?', 'i plus plus', ['i minus minus', 'i times i', 'i equals plus']),
      q('How do you read `System.out.println` aloud?', 'system dot out dot print line', ['system colon out colon print line', 'system dot in dot print line', 'system dot out dot read line']),
    ],
    grammar: [
      q('Which is a correct class declaration?', 'public class Main { }', ['class Main:', 'def class Main { }', 'public Main class { }']),
      q('Which is a correct if statement?', 'if (x > 3) { }', ['if x > 3:', 'if x > 3 then', 'if [x > 3] { }']),
      q('Which creates an array of ints?', 'int[] nums = {1, 2, 3};', ['int nums = [1, 2, 3];', 'array nums = (1, 2, 3);', 'nums = int[1, 2, 3];']),
    ],
  },
};

// Text that should be spoken / recognised for a speaking question.
// Strips a trailing "(romanisation)" used for Hindi options.
export const spokenForm = (answer) => answer.replace(/\s*\([^)]*\)\s*$/, '');
