//1. kreirati doktora “Milan”
let d1 = new Doktor(1, 'Milan', 'Milanovic', 'kardiolog');
logovanjeAkcija('kreiran doktor Milan');

//2. kreirati pacijenta “Dragan”
let p1 = new Pacijent(2, 'Dragan', 'Draganic', 12345, 765);
logovanjeAkcija('kreiran pacijent Dragan');

//3. pacijent “Dragan” bira doktora “Milan” za svog izabranog lekara
p1.izaberiDoktora(d1);
logovanjeAkcija('pacijent bira doktora');

//4. doktor “Milan” zakazuje pregled za merenje nivoa šećera u krvi za pacijenta “Dragan”
let pregled1 = new AnalizaKrvi(1, new Date(2018, 2, 23, 14, 30), Tipovi.SECER_U_KRVI);
d1.zakaziPregled(pregled1, p1);

//5. doktor “Milan” zakazuje pregled za merenje krvnog pritiska za pacijenta “Dragan”
let pregled2 = new KrvniPritisak(2, new Date(2018, 2, 24, 18, 00));
d1.zakaziPregled(pregled2, p1);

//6. pacijent “Dragan” obavlja laboratorijski pregled za merenje nivoa šećera u krvi. Simulirati i prikazati rezultate.
pregled1.obaviPregledAnalizeKrvi('3h prije pregleda');
logovanjeAkcija('obavljen laboratorijski pregled');

//7. pacijent “Dragan” obavlja laboratorijski pregled za merenje krvnog pritiska. Simulirati i prikazati rezultate.
pregled2.obaviPregledKrvnogPritiska();
logovanjeAkcija('obavljen laboratorijski pregled');


function logovanjeAkcija(akcija) {
    console.log('[' + moment().format('MMMM Do YYYY, h:mm:ss a') + ']' + akcija);
}

