/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/



//Podúkol 1
const seznamElement = document.querySelector('#recepty');

const dostupneRecepty = recepty;
console.log(dostupneRecepty);

//zobrazDostupneRecepty();

function zobrazDostupneRecepty(){
    let seznamReceptu='';

    dostupneRecepty.forEach((recept) => {
    seznamReceptu += `

        <div class="recept">
            <div class="recept-obrazek">
            <img src="${recept.img}" alt="Obrazek">
            </div>

            <div class="recept-info">
                <h3>${recept.nadpis}</h3>
            </div>
        </div>`   
    })

    seznamElement.innerHTML = seznamReceptu;
}



//Podúkol 2 - filtrování dle názvu (vyhledávání)

let filtrReceptu = document.querySelector("#hledat");
console.log(filtrReceptu);

filtrReceptu.addEventListener("input", function(event){
    let coHledam = event.target.value;

    let vysledekHledani = recepty.filter(function(recept){
        return recept.nadpis.toLowerCase().includes(coHledam.toLowerCase())
    })

    console.log(vysledekHledani);
    seznamReceptu='';

    vysledekHledani.forEach((recept) => {
        seznamReceptu += `
            <div class="recept">
                <div class="recept-obrazek">
                    <img src="${recept.img}" alt="Obrazek">
                </div>

                <div class="recept-info">
                     <h3>${recept.nadpis}</h3>
                </div>
            </div>`
      })

    seznamElement.innerHTML = seznamReceptu;
    
})

//Podúkol 3 - filtrování dle kategorie - NEFUNGUJE, zkusila jsem udělat podle podúkolu 2, ale neúspěšně

let kategorieReceptu = document.querySelector("#kategorie");
console.log(kategorieReceptu);

kategorieReceptu.addEventListener("select", function(event){
    let jakaKategorie = event.target.value;

    let vysledekKategorie = recepty.filter(function(recept){
        return recept.kategorie.toLowerCase().includes(jakaKategorie.toLowerCase());
       
    })

    console.log(vysledekKategorie);

    seznamReceptu='';

    vysledekKategorie.forEach((recept) => {
        seznamReceptu += `
            <div class="recept">
                <div class="recept-obrazek">
                    <img src="${recept.img}" alt="Obrazek">
                </div>

                <div class="recept-info">
                     <h3>${recept.nadpis}</h3>
                </div>
            </div>`
      })

    seznamElement.innerHTML = seznamReceptu;
    
})

//Podúkol 4 - Řazení receptů podle hodnocení, také nefunguje :-/


let razeni = document.querySelector('#razeni').value;
console.log(razeni);


function seradit(){
    
    if (razeni === 'nejlepsi') {
        dostupneRecepty = dostupneRecepty.sort((recept1, recept2) => {
            if (recept1.hodnoceni < recept2.hodnoceni) {
                return 1;
            } else {
                return -1;
            }
        });
    } else if (razeni === 'nejhorsi') {
        dostupneRecepty = dostupneRecepty.sort((recept1, recept2) => {
            if (recept1.hodnoceni > recept2.hodnoceni) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    zobrazDostupneRecepty();  
};

//Podúkol 5 - Zobrazení receptu po kliknutí - já už teda opravdu nevím. Ani po zkonpírování Matějova kódu a jeho drobné úpravě mi program nefunguje

function detailReceptu(indexReceptu) {
	let detailWrapper = document.querySelector('.recept-detail');
	detailWrapper.innerHTML = null;

	let obrazekWrapper = document.createElement('div');
	obrazekWrapper.classList.add('recept-detail-obrazek');

	let obrazekElement = document.createElement('img');
	obrazekElement.src = dostupneRecepty[indexReceptu].img;
	obrazekElement.setAttribute('alt', dostupneRecepty[indexReceptu].nadpis);

	obrazekWrapper.appendChild(obrazekElement);

	let infoWrapper = document.createElement('div');
	infoWrapper.classList.add('recept-detail-info');
	
	let headerInfo = 
	`<header>
		<div class="recept-kategorie">
			<span class="fas fa-tag"></span> Kategorie:
			<span class="hodnota" id="recept-kategorie">${dostupneRecepty[indexReceptu].kategorie}</span>
		</div>
		<div class="recept-hodnoceni">
			<span class="far fa-star"></span>
			<span class="hodnota" id="recept-hodnoceni">${dostupneRecepty[indexReceptu].hodnoceni}</span>
		</div>
	</header>`;

	let nazevReceptu = document.createElement('h1');
	nazevReceptu.innerHTML = dostupneRecepty[indexReceptu].nadpis;

	let popisReceptu = document.createElement('p');
	popisReceptu.innerHTML = dostupneRecepty[indexReceptu].popis;

	infoWrapper.innerHTML = headerInfo;
	infoWrapper.appendChild(nazevReceptu);
	infoWrapper.appendChild(popisReceptu);
	
	detailWrapper.appendChild(obrazekWrapper);
	detailWrapper.appendChild(infoWrapper);

	// ulozime prohlizeny recept do Local Storage
	localStorage.posledniRecept = indexReceptu;
}

//Podúkol 6 - při znovu-načtení stránky, zobrazit poslední vybraný recept (Local Storage)

function zobrazPosledniRecept() {
	let posledniRecept = localStorage.posledniRecept;

	if (posledniRecept !== null && posledniRecept !== undefined) {
		// pokud posledni nacteny recept existuje, tak zobrazime detail
		let indexReceptu = parseInt(posledniRecept);

		if (indexReceptu >= 0 && indexReceptu < recepty.length) {
			detailReceptu(indexReceptu);
		}
	}
}

