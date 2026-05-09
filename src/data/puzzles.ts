
export type Difficulty = 'Mudah' | 'Menengah' | 'Sulit';
export type Category = 'General' | 'IoT';

export interface Puzzle {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: Category;
  code: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export const puzzles: Puzzle[] = [
  // MUDAH - General
  {
    id: 'e1',
    title: 'Output Dasar & Operator',
    difficulty: 'Mudah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10;\n    int y = 5;\n    cout << x + y * 2;\n    return 0;\n}`,
    question: 'Berapakah output dari kode C++ di atas?',
    options: ['30', '20', '25', '15'],
    correctAnswer: 1,
    explanation: '📌 Langkah Penjelasan:\n1. Di sini ada operator (+) dan (*).\n2. Dalam aturan matematika C++, perkalian (*) dikerjakan lebih dulu.\n3. Maka: 5 * 2 = 10.\n4. Terakhir baru dijumlahkan: 10 + 10 = 20.',
    hint: 'Ingat aturan PEMDAS/BODMAS. Perkalian dikerjakan sebelum penjumlahan.'
  },
  {
    id: 'e2',
    title: 'Logika Sisa Bagi (Modulo)',
    difficulty: 'Mudah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int count = 0;\n    for(int i=0; i<5; i++) {\n        if(i % 2 == 0) count++;\n    }\n    cout << count;\n    return 0;\n}`,
    question: 'Berapakah nilai variabel count yang dicetak?',
    options: ['2', '3', '5', '0'],
    correctAnswer: 1,
    explanation: '📌 Langkah Penjelasan:\n1. Loop berjalan untuk i = 0, 1, 2, 3, 4.\n2. Kondisi (i % 2 == 0) artinya "apakah i bernilai genap?".\n3. i yang genap adalah: 0, 2, dan 4.\n4. Karena ada 3 angka genap, maka count bertambah 3 kali.',
    hint: 'Operator % menghasilkan sisa bagi. Jika (i % 2 == 0), maka i adalah bilangan genap.'
  },
  {
    id: 'e3',
    title: 'Variabel & Increment',
    difficulty: 'Mudah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 5;\n    int b = a++;\n    cout << a << b;\n    return 0;\n}`,
    question: 'Apa output yang dicetak oleh cout?',
    options: ['55', '66', '65', '56'],
    correctAnswer: 2,
    explanation: '📌 Langkah Penjelasan:\n1. `a++` adalah post-increment. Artinya, nilai `a` diberikan ke `b` dulu, baru kemudian `a` ditambah 1.\n2. Jadi `b` mendapat nilai awal 5.\n3. Setelah itu `a` naik menjadi 6.\n4. Output: `a`(6) dan `b`(5) -> 65.',
    hint: 'Perhatikan perbedaan antara a++ (post-increment) dan ++a (pre-increment).'
  },
  // MENENGAH - General
  {
    id: 'm1',
    title: 'Pointer Dasar',
    difficulty: 'Menengah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nvoid update(int *p) {\n    *p = *p + 10;\n}\n\nint main() {\n    int val = 5;\n    update(&val);\n    cout << val;\n    return 0;\n}`,
    question: 'Berapakah output dari kode tersebut?',
    options: ['5', '10', '15', 'Error'],
    correctAnswer: 2,
    explanation: '📌 Langkah Penjelasan:\n1. Kita mengirim alamat memori `val` ke fungsi menggunakan `&val`.\n2. Di fungsi, `*p` mengakses nilai di alamat tersebut (yaitu 5).\n3. `*p = 5 + 10` mengubah nilai langsung di memori menjadi 15.\n4. Jadi, variabel `val` asli di main ikut berubah menjadi 15.',
    hint: 'Tanda *p di dalam fungsi mengakses (dereference) nilai dari alamat yang ditunjuk.'
  },
  {
    id: 'm2',
    title: 'Array & Sizeof',
    difficulty: 'Menengah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    cout << sizeof(arr) / sizeof(arr[0]);\n    return 0;\n}`,
    question: 'Apa output dari kode di atas?',
    options: ['20', '4', '5', '1'],
    correctAnswer: 2,
    explanation: '📌 Langkah Penjelasan:\n1. `sizeof(arr)` memberikan total byte (5 elemen * 4 byte = 20 byte).\n2. `sizeof(arr[0])` adalah ukuran satu elemen int (4 byte).\n3. 20 dibagi 4 adalah 5. Ini adalah trik standar untuk mencari jumlah elemen array di C++.',
    hint: 'sizeof mengembalikan ukuran dalam byte, bukan jumlah elemen secara langsung.'
  },
  // SULIT - General
  {
    id: 'h1',
    title: 'Scope & Destructor',
    difficulty: 'Sulit',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nclass Test {\npublic:\n    static int count;\n    Test() { count++; }\n    ~Test() { count--; }\n};\n\nint Test::count = 0;\n\nint main() {\n    Test t1;\n    {\n        Test t2;\n    }\n    cout << Test::count;\n    return 0;\n}`,
    question: 'Berapakah nilai Test::count yang dicetak di akhir?',
    options: ['0', '1', '2', 'Undefined'],
    correctAnswer: 1,
    explanation: '📌 Langkah Penjelasan:\n1. `t1` dibuat (count jadi 1).\n2. Di dalam kurung kurawal `{...}`, `t2` dibuat (count jadi 2).\n3. Saat keluar dari kurung kurawal, `t2` hancur (destructor dipanggil), count dikurangi 1.\n4. Saat `cout` dipanggil, hanya `t1` yang tersisa, jadi count bernilai 1.',
    hint: 'Variabel yang dideklarasikan di dalam blok { } akan dihapus saat keluar dari blok tersebut.'
  },
  {
    id: 'h2',
    title: 'Template Overloading',
    difficulty: 'Sulit',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nvoid func(T x) {\n    cout << "T";\n}\n\nvoid func(int x) {\n    cout << "I";\n}\n\nint main() {\n    func(10.5);\n    func(10);\n    return 0;\n}`,
    question: 'Apa output yang dihasilkan?',
    options: ['TI', 'TT', 'II', 'IT'],
    correctAnswer: 0,
    explanation: '📌 Langkah Penjelasan:\n1. `func(10.5)` adalah double. Karena tidak ada fungsi khusus double, C++ menggunakan versi Template (mencetak "T").\n2. `func(10)` adalah int. C++ memprioritaskan fungsi yang tipenya pas (non-template) daripada template jika tersedia.\n3. Maka versi `int` dipanggil (mencetak "I"). Hasilnya "TI".',
    hint: 'C++ akan memilih fungsi yang paling spesifik terlebih dahulu.'
  },
  {
    id: 'e4',
    title: 'Operasi String Dasar',
    difficulty: 'Mudah',
    category: 'General',
    code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s = "C++";\n    s += "20";\n    cout << s.length();\n    return 0;\n}`,
    question: 'Berapakah output dari s.length()?',
    options: ['3', '5', '6', '1'],
    correctAnswer: 1,
    explanation: '📌 Penjelasan:\n1. Awalnya s = "C++" (3 karakter).\n2. Dilakukan concatenation s += "20", sehingga s menjadi "C++20".\n3. Panjang string "C++20" adalah 5 karakter.',
    hint: 'Operator += pada string menambahkan karakter ke akhir string yang sudah ada.'
  },
  {
    id: 'e5',
    title: 'Logika Gerbang OR (||)',
    difficulty: 'Mudah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    bool a = true, b = false;\n    if(a || b) cout << "Yes";\n    else cout << "No";\n    return 0;\n}`,
    question: 'Apa output dari kode tersebut?',
    options: ['Yes', 'No', 'Error', 'None'],
    correctAnswer: 0,
    explanation: '📌 Penjelasan:\n1. Operator || (OR) akan menghasilkan true jika salah satu saja operand-nya true.\n2. Karena a adalah true, maka kondisi (a || b) bernilai true.\n3. Program mencetak "Yes".',
    hint: 'Cek cara kerja gerbang logika OR vs AND.'
  },
  {
    id: 'm3',
    title: 'Variabel Statis di Fungsi',
    difficulty: 'Menengah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nvoid counter() {\n    static int c = 0;\n    cout << ++c;\n}\n\nint main() {\n    counter();\n    counter();\n    return 0;\n}`,
    question: 'Apa output yang dicetak oleh program?',
    options: ['11', '12', '22', '01'],
    correctAnswer: 1,
    explanation: '📌 Penjelasan:\n1. Variabel `static` hanya diinisialisasi SEKALI dan nilainya tetap ada meskipun fungsi selesai dijalankan.\n2. Panggilan ke-1: c jadi 1, cetak 1.\n3. Panggilan ke-2: c lanjut dari 1 jadi 2, cetak 2. Hasil: 12.',
    hint: 'Variabel statis menyimpan nilainya sepanjang program berjalan.'
  },
  {
    id: 'm4',
    title: 'Rekursi Sederhana',
    difficulty: 'Menengah',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nint func(int n) {\n    if(n <= 1) return 1;\n    return n + func(n-1);\n}\n\nint main() {\n    cout << func(3);\n    return 0;\n}`,
    question: 'Berapakah hasil dari func(3)?',
    options: ['3', '6', '4', '5'],
    correctAnswer: 1,
    explanation: '📌 Penjelasan:\n1. func(3) memanggil 3 + func(2).\n2. func(2) memanggil 2 + func(1).\n3. func(1) mengembalikan 1.\n4. Total: 3 + 2 + 1 = 6.',
    hint: 'Telusuri langkah demi langkah panggilan fungsi ke dirinya sendiri.'
  },
  {
    id: 'h3',
    title: 'Fungsi Virtual (Polimorfisme)',
    difficulty: 'Sulit',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual void show() { cout << "B"; }\n};\n\nclass Derived : public Base {\npublic:\n    void show() { cout << "D"; }\n};\n\nint main() {\n    Base* b = new Derived();\n    b->show();\n    return 0;\n}`,
    question: 'Apa output yang dihasilkan program ini?',
    options: ['B', 'D', 'BD', 'Error'],
    correctAnswer: 1,
    explanation: '📌 Penjelasan:\n1. Karena fungsi di Base ditandai `virtual`, C++ menggunakan *Dynamic Binding*.\n2. Meskipun tipe pointernya Base, objek aslinya adalah Derived.\n3. Maka fungsi `show()` milik Derived yang dijalankan. Hasil: "D".',
    hint: 'Keyword virtual memungkinkan fungsi di-override secara dinamis saat runtime.'
  },
  {
    id: 'h4',
    title: 'Bitwise XOR',
    difficulty: 'Sulit',
    category: 'General',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 5; // 0101 dalam biner\n    int b = 3; // 0011 dalam biner\n    cout << (a ^ b);\n    return 0;\n}`,
    question: 'Berapakah output numerik dari operasi bitwise XOR tersebut?',
    options: ['8', '2', '6', '1'],
    correctAnswer: 2,
    explanation: '📌 Penjelasan:\n1. XOR (^) menghasilkan 1 jika bit berbeda, 0 jika sama.\n   0101 (5)\n   0011 (3)\n   ----\n   0110 -> 4 + 2 = 6.',
    hint: 'Lakukan perbandingan bit demi bit secara vertikal.'
  },

  // IOT PUZZLES
  {
    id: 'iot-e1',
    title: 'Input/Output Digital',
    difficulty: 'Mudah',
    category: 'IoT',
    code: `void setup() {\n    pinMode(13, OUTPUT);\n    digitalWrite(13, HIGH);\n}`,
    question: 'Berdasarkan kode Arduino/C++ di atas, apa yang terjadi pada komponen yang terhubung di Pin 13?',
    options: ['Mati', 'Menyala', 'Input Aktif', 'Blink'],
    correctAnswer: 1,
    explanation: '📌 Penjelasan:\n1. `pinMode(13, OUTPUT)` mengatur pin 13 sebagai keluaran.\n2. `digitalWrite(13, HIGH)` memberikan tegangan (VCC) ke pin tersebut.\n3. Jika itu LED, maka LED akan menyala.',
    hint: 'HIGH berarti memberikan tegangan, LOW berarti mematikan.'
  },
  {
    id: 'iot-e2',
    title: 'Input Pullup Internal',
    difficulty: 'Mudah',
    category: 'IoT',
    code: `void setup() {\n    pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n    int state = digitalRead(2);\n    if(state == LOW) {\n        // Tombol ditekan\n    }\n}`,
    question: 'Mengapa kita mengecek kondisi LOW untuk mendeteksi tombol ditekan pada INPUT_PULLUP?',
    options: ['Karena arus bocor', 'Pin terhubung ke GND saat ditekan', 'Efisiensi daya', 'Error pada board'],
    correctAnswer: 1,
    explanation: '📌 Penjelasan:\n1. `INPUT_PULLUP` mengaktifkan resistor internal yang menarik pin ke arah HIGH secara default.\n2. Saat tombol ditekan, tombol menghubungkan pin tersebut ke Ground (GND).\n3. Oleh karena itu, pin akan terbaca LOW saat sirkuit tertutup (tombol ditekan).',
    hint: 'Pullup berarti ditarik ke atas (HIGH). Lawannya adalah Ground (LOW).'
  },
  {
    id: 'iot-m2',
    title: 'Serial Communication',
    difficulty: 'Menengah',
    category: 'IoT',
    code: `void setup() {\n    Serial.begin(9600);\n}\n\nvoid loop() {\n    if (Serial.available() > 0) {\n        char c = Serial.read();\n        Serial.print(c);\n    }\n}`,
    question: 'Apa fungsi dari blok "if (Serial.available() > 0)"?',
    options: ['Mengirim data', 'Mereset koneksi', 'Mengecek apakah ada data masuk', 'Mengatur kecepatan'],
    correctAnswer: 2,
    explanation: '📌 Penjelasan:\n1. `Serial.available()` mengembalikan jumlah byte yang sudah masuk ke buffer serial.\n2. Jika > 0, berarti ada data yang siap dibaca.\n3. Ini mencegah program membaca data kosong atau "sampah" dari buffer.',
    hint: 'Available berarti tersedia. Kita hanya membaca jika ada yang tersedia.'
  },
  {
    id: 'iot-m3',
    title: 'Fungsi Map (Scaling)',
    difficulty: 'Menengah',
    category: 'IoT',
    code: `void loop() {\n    int val = analogRead(A0); // Range 0-1023\n    int brightness = map(val, 0, 1023, 0, 255);\n    analogWrite(9, brightness);\n}`,
    question: 'Jika input analog (val) bernilai 512, berapakah nilai variabel brightness?',
    options: ['512', '0', '127', '255'],
    correctAnswer: 2,
    explanation: '📌 Penjelasan:\n1. 512 adalah nilai tengah dari rentang 0-1023 (sekitar 50%).\n2. Fungsi `map` akan mengonversi persentase tersebut ke rentang baru 0-255.\n3. 50% dari 255 adalah sekitar 127.',
    hint: '512 adalah setengah dari 1024. Hitung setengah dari 256.'
  },
  {
    id: 'iot-h2',
    title: 'External Interrupts',
    difficulty: 'Sulit',
    category: 'IoT',
    code: `volatile int count = 0;\n\nvoid increment() {\n    count++;\n}\n\nvoid setup() {\n    attachInterrupt(digitalPinToInterrupt(2), increment, RISING);\n}`,
    question: 'Kapan fungsi "increment()" akan dipanggil?',
    options: ['Setiap detik', 'Saat pin 2 berubah dari LOW ke HIGH', 'Saat program mulai', 'Setiap kali loop selesai'],
    correctAnswer: 1,
    explanation: '📌 Penjelasan:\n1. `attachInterrupt` memantau sinyal perangkat keras secara langsung.\n2. Mode `RISING` berarti interupsi terpicu saat tegangan naik (dari LOW ke HIGH).\n3. Ini sangat berguna untuk menghitung putaran motor atau deteksi tombol yang sangat cepat.',
    hint: 'Rising berarti naik, Falling berarti turun.'
  },
  {
    id: 'iot-h3',
    title: 'EEPROM Persistence',
    difficulty: 'Sulit',
    category: 'IoT',
    code: `#include <EEPROM.h>\n\nvoid setup() {\n    int val = 100;\n    EEPROM.write(0, val);\n}`,
    question: 'Apa keunggulan utama menggunakan EEPROM dibandingkan variabel biasa?',
    options: ['Lebih cepat', 'Kapasitas lebih besar', 'Data tidak hilang saat mati lampu', 'Otomatis terenkripsi'],
    correctAnswer: 2,
    explanation: '📌 Penjelasan:\n1. Variabel (RAM) akan terhapus saat mikrokontroler dimatikan.\n2. EEPROM (Electrically Erasable Programmable Read-Only Memory) adalah memori non-volatile.\n3. Data yang ditulis ke EEPROM akan tetap tersimpan meskipun daya diputus.',
    hint: 'Pikirkan tentang memori pada kartu SD atau Hard Drive.'
  }
];

