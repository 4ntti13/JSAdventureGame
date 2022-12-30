// Pelikartta

var mapLocation = 4
alert("Olet vangittuna taikamaailmaan syntiesi vuoksi, joita olet elämässäsi tehnyt. Tehtävänäsi on tappaa lohikäärme, jolta saat avaimen, jotta pääset portista ulos! Jos pääset ulos portista, niin saat elämässäsi uuden mahdollisuuden toimia esimerkillisenä kansalaisena ja jatkaa elämääsi muiden ihmisten tavoin. Tehtävä ei ole helppo! Käytä mielikuvitustasi ja kokeile käyttää esineitä myös niissä paikossa, joissa vähiten kuvittelisit niistä olevan hyötyä! Onnea peliin!")

// Pelaajan syöte
var playersInput = ""

// Pelin viesti 
var gameMessage = ""

// Pelaajan käytössä olevat toiminnot
var actionsForPlayer = ["pohjoinen", "itä", "etelä", "länsi", "poimi", "käytä", "pudota"]
var action = ""

// Esineet + sijainti
var items = ["huilu", "kaukalopallo", "muusinuija", "keppi", "taikaloitsu", "onki", "miekka", "keppi ja naru", "avain"]
var itemLocations = [3, 0, 7]
var backPack = []
var knownItems = ["huilu", "kaukalopallo", "muusinuija", "keppi", "taikaloitsu", "onki", "miekka", "keppi ja naru", "avain"]
var item = ""

// Käyttöliittymäelementit
var image = document.querySelector("img")
var output = document.querySelector("#output")
var input = document.querySelector("#input")
var button = document.querySelector("button")

button.style.cursor = "pointer"
button.addEventListener("click", clickHandler, false)
var input = document.getElementById("input");  

         
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("btn").click();
   document.getElementById("input").value = '';
  }});

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 38) {
     event.preventDefault();
     document.getElementById("input").value = 'pohjoinen';
     document.getElementById("btn").click();
     document.getElementById("input").value = '';
    }});

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 39) {
     event.preventDefault();
     document.getElementById("input").value = 'itä';
     document.getElementById("btn").click();
     document.getElementById("input").value = '';
        }});

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 40) {
        event.preventDefault();
        document.getElementById("input").value = 'etelä';
        document.getElementById("btn").click();
        document.getElementById("input").value = '';
            }});

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 37) {
     event.preventDefault();
     document.getElementById("input").value = 'länsi';
     document.getElementById("btn").click();
     document.getElementById("input").value = '';
    }});


var map = []

map[0] = "Vanha linnantorni"
map[1] = "Syvä kaivo"
map[2] = "Aurinkoinen metsäaukio"
map[3] = "Nukkuva lohikäärme"
map[4] = "Kapea metsäpolku"
map[5] = "Vanha ruosteinen lukittu portti"
map[6] = "Joen ranta, johon on leiriytynyt vaeltajia"
map[7] = "Tyhjä puupenkki"
map[8] = "Vanha mökki, sisältä kuuluu musiikkia"

var images = []

images[0] = "torni.jpg"
images[1] = "kaivo.jpg"
images[2] = "aukio.jpg"
images[3] = "dragon.jpg"
images[4] = "polku.jpg"
images[5] = "portti.jpg"
images[6] = "joki.jpg"
images[7] = "penkki.jpg"
images[8] = "mokki.jpg"

var blockMessage = []

blockMessage[0] = "Haluamasi reitti on liian vaarallinen!"
blockMessage[1] = "Salaperäinen voima estää liikkumasta tuohon suuntaan"
blockMessage[2] = "Vaikeakulkuinen metsikkö estää liikkumisen tuohon suuntaan"
blockMessage[3] = "Lohikäärme ei halua sinun menevän tuohon suuntaan, tai muuten se sanoo murrr!!"
blockMessage[4] = ""
blockMessage[5] = "Portti on lukittu!"
blockMessage[6] = "Jokea ei voi ylittää"
blockMessage[7] = "Sinne et pääse!"
blockMessage[8] = "Et varmasti halua mennä sinne"

render()

function render() {
    // Kunkin sijainnin kuva
    image.src = "images/" +images[mapLocation]
    // Sijainti tekstinä
    output.innerHTML = "Sijaintisi on " + map[mapLocation]
    // Onko sijainnissa esine
    for(var i = 0; i < items.length; i++) {
        if(mapLocation === itemLocations[i]) {
            output.innerHTML += "<br><stan class='item'>Näet esineen: " + items[i] + "</span>"
        }
    }
    // repun sisältö
    if(backPack.length != 0)
    {
        output.innerHTML += "<br><stan class='reppu'>Mukanasi on: " + backPack.join(", ");
    }
    // Pelin anatama palaute
    output.innerHTML += "<br><em>" + gameMessage + "</em>"
}

function takeItem(){
    // Käytä hyväksesi tietoa valitusta esineestä ja etsi esineen index items arraysta
    var itemIndexNumber = items.indexOf(item);
    // Onko esine pelikentällä ja onko se pelaajan tämän hetkisessä lokaatiossa?
    if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation)
    {
        gameMessage = "Poimit esineen " + item + ".";
        // Lisää esine reppuun 
        backPack.push(item);
        // Poista esine items-arraysta ja alkuperäisestä sijainnista
        items.splice(itemIndexNumber, 1);
        itemLocations.splice(itemIndexNumber, 1);
        // Debuggaa konsoliin
        console.log("Pelikentällä: "+ items);
        console.log("Repussa: "+ backPack);
    }
    else {
        // Viesti jos yrität ottaa esineen joka ei ole ko. sijainnissa
        gameMessage = "Et voi tehdä kyseistä toimenpidettä.";
    }
}

function dropItem() {
    // Voit pudottaa esineen vain jos repussa on jotain
    if(backPack.length !== 0) {
        // Etsi repusta tekstikentässä mainitun esineen index
        var backPackIndexNumber = backpack.indexOf(item);
        // Esine löytyi jos index ei ole -1
        if(backPackIndexNumber !== -1) {
            // Kerro pelaajalle että esine on pudotettu
            gameMessage = "Pudotit esineen: " + item+ ".";
            // Siirrä esine repusta peliympäristöön 
            items.push(backPack[backPackIndexNumber]);
            itemLocations.push(mapLocation); 
            // Poista esine repusta
            backPack.splice(backpackIndexNumber, 1);
        }
        else {
            // Viesti jos yritetään pudottaa  esinettä joka ei ole repussa
            gameMessage= "No can do!!";
        }
    }
    else {
        // Viesti jos reppu on tyhjä
        gameMessage= "Reppu on tyhjä.";
    }
}

function useItem() {
    // Selvitä onko esine mukana selvittämällä esineen index
    var backPackIndexNumber = backPack.indexOf(item);
    // Jos index sai arvon -1 esine ei ole mukana
    if(backPackIndexNumber === -1) {
        gameMessage = "Ei ole sinulla semmoista mukana.";
    }
    // Jos repussa ei ole mitään kerro se 
    if(backPack.length === 0) {
        gameMessage += " Reppu on tyhjä.";
    }
    // Jos esine on mukana, mitä sillä voi tehdä...
    if(backPackIndexNumber !== -1) {
        switch(item) {
            case "huilu":
                if(mapLocation === 8) {
                    gameMessage= "Annat huilun mökissä asuvalle rouvalle. Rouva antaa sinulle pitkän kepin.";
                    backPack.splice(backPackIndexNumber, 1);
                    backPack.push("keppi")
                    images[8] = "mokki.jpg"
                    map[8] = "Vanha mökki, sisältä kuuluu iloista musiikkia"
                }
                else if(mapLocation === 1) {
                    alert("Heitit huilun kaivoon. Aloitetaampa alusta!");
                    playAgain();
                } 
                else {
                    gameMessage= "Et voi vinguttaa huilua täällä.";
                }
                break;

            
            case "miekka":
                if(mapLocation === 3) {
                    gameMessage= "Rohkeaa toimintaa!! Katkaisit lohikäärmeen pään, jonka vuoksi sait haltuusi portin avaimen!";
                    backPack.splice(backPackIndexNumber, 1);
                    backPack.push("avain")
                    images[3] = "dragon.jpg"
                    map[3] = "Lohikäärme, jolla ei ole päätä!"
                }
                else if(mapLocation === 1) {
                    gameMessage= "Heitit miekan kaivoon... Whyyyy? Homma alkaa alusta!";
                    playAgain();
                }

                else {
                    gameMessage= "Heiluttelet miekkaasi tylsistyneenä. Oleppa varovainen sen kanssa!";
                }
                break;
            
            case "kaukalopallo":
                if(mapLocation === 1) {
                    gameMessage= "Pudotat kaukalopallon kaivoon, mikäs sen järkevämpää...";
                    backPack.splice(backPackIndexNumber, 1);
                    images[1] = "kaivo.jpg"
                }
                else {
                    gameMessage= "Älä heitä palloa sinne, joku voi suuttua.";
                }
                    break;
                    
            case "taikaloitsu":
                if(mapLocation === 2) {
                    gameMessage= "Taikaloitsulla saat itsellesi miekan!! Tiedät varmasti, että mitä sillä pitää tehdä!!";
                    backPack.splice(backPackIndexNumber, 1);
                    backPack.push("miekka")
                    images[2] = "aukio.jpg"
                    map[2] = "Aurinkoinen metsäaukio"
                }
                else if(mapLocation === 1) {
                    gameMessage= "Lausuitko juuri loistun kaivoon? HERÄTYS!.";
                    playAgain();
                }
                else {
                    gameMessage= "Ei toimi loitsut täällä.";
                }
                break;

            case "keppi":
                if(mapLocation === 6) {
                    gameMessage= "Kysyt vaeltajilta, mitä voisit kepilläsi tehdä, ja he antavat sinulle pitkän pätkän narua. Sidot narun kepin päähän.";
                    backPack.splice(backPackIndexNumber, 1);
                    backPack.push("keppi ja naru")
                    images[6] = "joki.jpg"
                }
                else if(mapLocation === 1) {
                    gameMessage= "Yrität kepillä nostaa kaivosta jotain, mutta eipä onnistu.";
                }
                else {
                    gameMessage= "Keksit varmasti paremman paikan käyttää keppiä.";
                }
                break;

            case "muusinuija":
                    gameMessage= "Vielä kun jostain nyrkillinen voita kattilaan...?";
                    if(mapLocation === 1) {
                        gameMessage= "Heitit muusinuijan kaivoon, oletko varma, ettet halua tehdä muusia päivälliseksi?";
                        backPack.splice(backPackIndexNumber, 1);
                        images[1] = "kaivo.jpg"
                    }
                break;

            case "onki":
                if(mapLocation === 1) {
                    gameMessage= "Ongit kaivosta paperikääreen, jossa on taikaloitsu!";
                    backPack.splice(backPackIndexNumber, 1);
                    backPack.push("taikaloitsu")
                }
                else if(mapLocation === 6) {
                    gameMessage= "Vaeltajat sanovat: Sinäkö taas?? Mene muualle onkesi kanssa!."; 
                }
                else {
                    gameMessage= "Täällä on turha sohia ongen kanssa!.";
                }
                break;

            case "keppi ja naru":
                if(mapLocation === 5) {
                    gameMessage= "Löydät portin luota pätkän rautalankaa, josta saat tehtyä koukun narun päähän. Nyt sinulla on onki! Loistavaa!!";
                    backPack.splice(backPackIndexNumber, 1);
                    backPack.push("onki")
                }
                else if(mapLocation === 1) {
                    gameMessage= "Pelkällä kepillä ja narulla on turha yrittää poimia kaivosta mitään.";
                }
                else {
                    gameMessage= "Ei kannata.";
                }
                break;

            case "avain":
                if(mapLocation === 5) {
                    gameMessage= "Avaat portin lukon";
                    backPack.splice(backPackIndexNumber, 1);
                    alert("Portti auki, PELI LÄPI!!!")
                    images[5] = "portti.jpg"
                    map[5] = "Avonainen portti"
                }
                else if(mapLocation === 1) {
                    gameMessage= "What?? Heitit avaimen kaivoon, joten et halua lopettaa!?!?. Aloittakaamme siis alusta!";
                    playAgain();
                }
                else {
                    gameMessage= "Mihin avainta yleensä käytetään?? Ei ainakaan täällä mihinkään!";
                }
                break;

        }
    }
}

function clickHandler() {
    console.log("Klikkaus");
    playGame()
}

function playGame() {
    // lue pelaajan syöte ja muuta se pieniksi kirjaimiksi
    playersInput = input.value.toLowerCase()
    //console.log(playersInput)

    // Nollataan nämä muuttujat ettei saada arvoja ed. kierrokselta
    gameMessage = ""
    action = ""
    // Tarkista pelaajan valitsema toiminto
    for(i = 0; i < actionsForPlayer.length; i++) {
        if(playersInput.indexOf(actionsForPlayer[i]) !== -1) {
            action = actionsForPlayer[i]
            console.log("pelaajan valinta oli: " + action)
            break
        }
    }

    // Tarkista minkä esineen pelaaja haluaa
    for(i = 0; i < knownItems.length; i++) {
        if(playersInput.indexOf(knownItems[i]) !== -1) {
            item = knownItems[i]
            console.log("pelaajan valinta: " + item)
        }
    }

    switch(action) {

        case "pohjoinen":
            if(mapLocation >= 3){
                mapLocation -= 3
            } else {
                gameMessage = blockMessage[mapLocation]
            }
            break

        case "itä":
            if(mapLocation % 3 != 2){
                mapLocation += 1
                } else {
                    gameMessage = blockMessage[mapLocation]
                }
                break

        case "etelä":
            if(mapLocation < 6){
                mapLocation += 3
            } else {
                gameMessage = blockMessage[mapLocation]
            }
            break

        case "länsi":
            if(mapLocation % 3 != 0){
            mapLocation -= 1
            } else {
                gameMessage = blockMessage[mapLocation]
            }
            break

        case "luovuta":
            if(mapLocation === 3) {
                alert("Pelisi on pelattu!! Loser!!")
                playAgain();
            }
            else {
                gameMessage= "Voi voi.. se oli siinä!";
            }
            break;

        case "poimi":
            takeItem()
            break

        case "käytä":
            useItem()
            break

        case "pudota":
            dropItem()
            break

        default:
            gameMessage = "<span class='error'>Tuntematon toiminto</span>"
    }

    render()

}

function reset() {
    location.reload();
}

function playAgain() {
    document.getElementById("input").value = '';
    reset();
    playGame();
}