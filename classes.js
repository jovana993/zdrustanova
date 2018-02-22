class Osoba {
    constructor(id, ime, prezime) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
    }
}
class Doktor extends Osoba {
    constructor(id, ime, prezime, specjalnost) {
        super(id, ime, prezime);
        this.specjalnost = specjalnost;
        this.pacijenti = [];
    }
    dodajPacijenta(pacijent) {
        this.pacijenti.push(pacijent);
    }
    zakaziPregled(pregled, pacijent) {
        pregled.zakazi(this, pacijent);
    }
}
class Pacijent extends Osoba {
    constructor(id, ime, prezime, jmbg, brKartona) {
        super(id, ime, prezime);
        this.jmbg = jmbg;
        this.brKartona = brKartona;
    }
    izaberiDoktora(doktor) {
        this.doktor = doktor;
        doktor.dodajPacijenta(this);
    }
}
class LabPregled {
    constructor(id, datumVrijeme) {
        this.id = id;
        this.datumVrijeme = datumVrijeme;
        this.doktor = null;
        this.pacijent = null;
        this.obavljen = false;
    }
    zakazi(doktor, pacijent) {
        this.doktor = doktor;
        this.pacijent = pacijent;
    }
    obaviPregled() {
        this.obavljen = true;
    }
    prikaziRezultat(rezultat, vrstaPregleda) {
        if (this.obavljen) {
            document.write('- Rezultat pregleda ' + vrstaPregleda + rezultat);
        }
    }
}
class KrvniPritisak extends LabPregled {
    constructor(id, datumVrijeme) {
        super(id, datumVrijeme);
        this.gVrijednost = 0;
        this.dVrijednost = 0;
    }
    obaviPregledKrvnogPritiska() {
        super.obaviPregled();
        this.gVrijednost = Math.round(Math.random() * 100);
        this.dVrijednost = Math.round(Math.random() * 100);
        this.prikaziRezultatKrvnogPritiska();
    }
    prikaziRezultatKrvnogPritiska() {
        let rez = "<br> gornja vrijednost: " + this.gVrijednost + " , donja vrijednost: " + this.dVrijednost + "<br>";
        return super.prikaziRezultat(rez, 'mjerenje krvnog pritiska');
    }
}
class AnalizaKrvi extends LabPregled {
    constructor(id, datumVrijeme, tip) {
        super(id, datumVrijeme);
        this.vrijednost = '';
        this.poslObrok = '';
        this.tip = tip;
    }
    obaviPregledAnalizeKrvi(poslObrok) {
        super.obaviPregled();
        this.vrijednost = Math.round(Math.random() * 100);
        this.poslObrok = poslObrok;
        this.prikaziRezultatAnalizeKrvi();
    }
    prikaziRezultatAnalizeKrvi() {
        let rez = "<br>vrijednost: " + this.vrijednost + ", vrijeme poslednjeg obroka: " + this.poslObrok + "<br>";
        return super.prikaziRezultat(rez, this.tip);
    }
}
const Tipovi = { SECER_U_KRVI: 'secer u krvi', HOLESTEROL_U_KRVI: 'holesterol u krvi' };