import { PitanjaZa100, 
    PitanjaZa200,
    PitanjaZa300,
    PitanjaZa500,
    PitanjaZa1000,
    PitanjaZa2000,
    PitanjaZa4000,
    PitanjaZa8000,
    PitanjaZa16000,
    PitanjaZa32000,
    PitanjaZa64000,
    PitanjaZa125000,
    PitanjaZa250000,
    PitanjaZa500000,
    PitanjaZa1000000
 } from "./pitanja.js";



 let timer;
 let rezultat = 0;
 let brojac = 0;
 let trenutnoOznacenIndex = null;
 let trenutnaKategorija = "0";
 let trenutnoKviznoPitanje;



const svaPitanja = {
    "100" : PitanjaZa100,
    "200" : PitanjaZa200,
    "300" : PitanjaZa300,
    "500" : PitanjaZa500,
    "1000": PitanjaZa1000,
    "2000": PitanjaZa2000,
    "4000": PitanjaZa4000,
    "8000": PitanjaZa8000,
    "16000": PitanjaZa16000,
    "32000": PitanjaZa32000,
    "64000": PitanjaZa64000,
    "125000": PitanjaZa125000,
    "250000": PitanjaZa250000,
    "500000": PitanjaZa500000,
    "1000000": PitanjaZa1000000
}

const pitanje = document.getElementById('pitanje');
const odgovor = document.getElementById('odgovor');
const pocetnoDugme = document.getElementById('pocetno-dugme');
const odustaniDugme = document.getElementById('odustani-dugme');


function dobijPitanje() {
    const pitanja = svaPitanja[trenutnaKategorija];
    return pitanja[Math.floor(Math.random() * pitanja.length)];
  }

function sljedecePitanje() {
    pocetnoDugme.style.display = "none";
    odustaniDugme.style.display = "inline";


    clearTimeout(timer);

    document.getElementById('countdown').style.display = "inline";


    trenutnaKategorija = promjeniKategoriju(trenutnaKategorija);

    
    trenutnoKviznoPitanje = dobijPitanje();
    pitanje.innerHTML = trenutnoKviznoPitanje.question;

    odgovor.innerHTML = "";
    trenutnoOznacenIndex = null;

     
    trenutnoKviznoPitanje.options.forEach((option, index) => {
        const dugme = document.createElement("button");
        dugme.innerText = option;
    
            
        dugme.addEventListener("click", () => provjeriOdgovor(option, dugme, index, option === trenutnoKviznoPitanje.correctAnswer));
    
         odgovor.appendChild(dugme);
        });

    pocniCountdown();
}

function promjeniKategoriju(trenutnaKategorija) {
    switch (trenutnaKategorija) {
        case "0":
            return "100";
        case "200":
            return "300";
        case "300" :
            return "500";
        case "64000":
            return "125000";
        default:
            return (parseInt(trenutnaKategorija) * 2).toString();
    }
}


function provjeriOdgovor(userAnswer, dugme, index, isTacan)
{

    clearTimeout(timer);

    

    setTimeout(() => {

        if (!isTacan) {
            const tačanIndex = trenutnoKviznoPitanje.options.findIndex((option) => option === trenutnoKviznoPitanje.correctAnswer);
            const tačnoDugme = odgovor.children[tačanIndex];
            tačnoDugme.style.backgroundColor = '#2ecc71';
            tačnoDugme.style.color = 'white';
            dugme.style.backgroundColor= '#e74c3c';
        }
        else {
            dugme.style.backgroundColor = '#2ecc71';
        }
        dugme.style.color = 'white';
    }, 200);

    setTimeout(() => {
        const isTacanOdgovor = userAnswer === trenutnoKviznoPitanje.correctAnswer;

        if (isTacanOdgovor && brojac < 14) {
            rezultat++;
            brojac++;
            TrenutniIznos();
            setTimeout(sljedecePitanje, 2000)
        } else {
            zavrsiKviz();
        }
    }, 2500); 
}


function pocniCountdown() {
    let countdownVrijednost = 30; 

    timer = setInterval(() => {
        document.getElementById('countdown').innerText = countdownVrijednost;
        countdownVrijednost--;

        if (countdownVrijednost < 0) {
            clearInterval(timer);
            alert("Vrijeme je isteklo!"); 
            document.getElementById('countdown').innerText = "";
            zavrsiKviz();
        }
    }, 1000);
}

function TrenutniIznos() {


    pitanje.innerText = "";
    odgovor.innerHTML = `Čestitamo! Trenutni iznos koji imate je ${trenutnaKategorija} KM`;

    pocetnoDugme.style.display = "none";
    odustaniDugme.style.display = "none";

    document.getElementById('countdown').style.display = "none";

    document.querySelectorAll('.iznos').forEach(iznos => iznos.classList.remove('highlight'));

    document.querySelector('.iznos-' + trenutnaKategorija).classList.add('highlight');

}




function zavrsiKviz() {

    pitanje.innerText = "";

    let ispravnaKategorija;

    if (trenutnaKategorija === "500") {
        ispravnaKategorija = "300";
    } else if (trenutnaKategorija === "300") {
        ispravnaKategorija = "200";
    } else if (trenutnaKategorija === "100") {
        ispravnaKategorija = "0";
    } else if (trenutnaKategorija === "125000") {
        ispravnaKategorija = "64000";
    } else if (brojac === 14) {
        ispravnaKategorija = "1 000 000";
        document.querySelectorAll('.iznos').forEach(iznos => iznos.classList.remove('highlight'));
        document.querySelector('.iznos-' + trenutnaKategorija).classList.add('highlight');
    } else {
        ispravnaKategorija = (parseInt(trenutnaKategorija) / 2).toString();
    }

    odgovor.innerHTML = "Osvojili ste iznos od " +  ispravnaKategorija + " KM";

    pocetnoDugme.style.display = "inline";
    odustaniDugme.style.display = "none";

    document.getElementById('countdown').style.display = "none";

}

function PonoviSve() {
    trenutnaKategorija = "0";
    brojac = 0;
    rezultat = 0;
    document.querySelectorAll('.iznos').forEach(iznos => iznos.classList.remove('highlight'));

    sljedecePitanje();
}


function Odustani() {
    zavrsiKviz(trenutnaKategorija);
}



pocetnoDugme.addEventListener("click", PonoviSve);

odustaniDugme.addEventListener("click" , Odustani);


sljedecePitanje();

