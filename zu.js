class Doktor {
    constructor (id,ime ,prezime, specjalnost ) {
        this.id = id;
        this.ime = ime;
        this.prezime=prezime;
        this.specjalnost = specjalnost;
        this.pacijenti = [];
    }
    zakaziPregled( pregled ){
        pregled.doktor = this.ime;
        return pregled;
    }
}
class Pacijent {
    constructor (ime ,prezime, jmbg, br_kartona) {
        this.ime = ime;
        this.prezime = prezime;
        this.jmbg = jmbg;
        this.br_kartona = br_kartona;
    }
    setDoktor(doktor){
        this.doktor = doktor.ime;
        doktor.pacijenti.push(this.ime);
    }
}
class LabPregled {
    constructor (id,datumVrijeme, doktor, pacijent ) {
        this.id = id;
        this.datumVrijeme = datumVrijeme;
        this.doktor = doktor;
        this.pacijent = pacijent;
        this.obavljen = false;
    }
    prikaziRezultat(rezultat, vrstaPregleda){
        if(this.obavljen){
            document.write('Rezultat pregleda '+ vrstaPregleda + rezultat);
        }
    }
}
class KrvniPritisak extends LabPregled {
    constructor (id, datumVrijeme, doktor, pacijent) {
        super(id, datumVrijeme, doktor, pacijent);
        this.obavljen = false;
        this.gVrijednost = 0;
        this.dVrijednost = 0;
    }
    prikaziRezultatKrvnogPritiska(){
        let rez = "/n gornja vrijednost: " + this.gVrijednost + " , donja vrijednost: " + this.dVrijednost;
        return super.prikaziRezultat(rez,'mjerenje krvnog pritiska');
    }
}
class AnalizaKrvi extends LabPregled {
    constructor (id, datumVrijeme, doktor,pacijent, tip) {
        super(id, datumVrijeme, doktor, pacijent);
        this.obavljen = false;
        this.vrijednost = '';
        this.poslObrok = '';
        this.tip = tip;
    }
    prikaziRezultatAnalizeKrvi(){
        let rez = "/n vrijednost: " + this.vrijednost;
        return super.prikaziRezultat(rez,this.tip);
    }
}
const Tipovi = ['secer u krvi','holesterol u krvi'];

//1. kreirati doktora “Milan”
let d1 = new Doktor(1,'Milan','Milanovic','kardiolog',[]);
prikaziAkciju('kreiran doktor Milan');

//2. kreirati pacijenta “Dragan”
let p1 = new Pacijent('Dragan','Draganic',12345,765);
prikaziAkciju('kreiran pacijent Dragan');
getMethods(p1);

//3. pacijent “Dragan” bira doktora “Milan” za svog izabranog lekara
p1.setDoktor(d1);
prikaziAkciju('pacijent bira doktora');

//4. doktor “Milan” zakazuje pregled za merenje nivoa šećera u krvi za pacijenta “Dragan”
let pregled1 = new AnalizaKrvi();
getMethods(pregled1);
pregled1 = d1.zakaziPregled({id:1,datumVrijeme:new Date(2018, 2, 23, 14, 30),pacijent:p1.ime,tip:Tipovi[0]});
getMethods(pregled1);
//5. doktor “Milan” zakazuje pregled za merenje krvnog pritiska za pacijenta “Dragan”
let pregled2 = new KrvniPritisak();
pregled2 = d1.zakaziPregled({id:2,datumVrijeme:new Date(2018, 2, 24, 18, 00),pacijent:p1.ime});

//6. pacijent “Dragan” obavlja laboratorijski pregled za merenje nivoa šećera u krvi. Simulirati i prikazati rezultate.
pregled1.obavljen = true;
pregled1.poslObrok = '3 sata prije pregleda';
pregled1.vrijednost= '4,3';
pregled1.prikaziRezultatAnalizeKrvi();
prikaziAkciju('obavljen laboratorijski pregled');

//7. pacijent “Dragan” obavlja laboratorijski pregled za merenje krvnog pritiska. Simulirati i prikazati rezultate.
pregled2.obavljen = true;
pregled2.gVrijednost = 180;
pregled2.dVrijednost= 100;
pregled2.prikaziRezultatKrvnogPritiska();
prikaziAkciju('obavljen laboratorijski pregled');


function prikaziAkciju(naziv){
    document.write('[' + Date.now() + ']'+ naziv);
}

function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
            res.push(m)
        }
    }
    console.log(res);
}


/*
Dodati logovanje akcija u sistemu. Akcije logovati u fajl u formatu [datum] [vreme] [akcija].
Primer jedne linije log fajla: [20.03.2013 19:30] Kreiran pacijent “Milan”
Akcije koje treba da se loguju su:
● kreiranje doktora
● kreiranje pacijenta
● pacijent bira doktora
● obavljanje laboratorijskog pregleda
*/
