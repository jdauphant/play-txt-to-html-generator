function setAllCheckbox(checked) {
    Array.from(document.body.querySelectorAll("input[type='checkbox'].caracter-selected")).forEach(elem => {
        elem.checked = checked;
    });
}


function initCheckbox() {
    Array.from(document.body.querySelectorAll("p")).forEach(elem => {
        var caracterNode = elem.querySelector("b");
        if(caracterNode != null) {
            var caracterId = caracterNode.innerText.replace(/[ ',]/g,"-");
            elem.classList.add(caracterId);
        } else {
            elem.classList.add("comment");
        }
    });
    var firstBodyNode = document.body.childNodes[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);

    var radio0 = document.createElement("input");
    radio0.id = "none";
    radio0.type = "radio";
    radio0.name = "mode";
    radio0.checked = true;
    document.body.insertBefore(radio0, firstBodyNode);
    var radio1 = document.createElement("input");
    radio1.id = "blur";
    radio1.type = "radio";
    radio1.name = "mode";
    document.body.insertBefore(radio1, firstBodyNode);
    style.innerHTML = style.innerHTML + `#blur, #none { display: none; }
    #blur:not(:checked) ~ div label.blur:before, #none:not(:checked) ~ div label.none:before { background-image: url(icons/unchecked-radio-50px.png); } 
    #blur:checked ~ div label.blur:before, #none:checked ~ div label.none:before { background-image: url(icons/checked-radio-50px.png);  }
    #blur:not(:checked) ~ div label.blur,  #none:not(:checked) ~ div label.none { background-color: grey; color: white; }
    #blur:checked ~ div label.blur, #none:checked ~ div label.none { background-color: #ececec; } 
    `;

    Array.from(document.body.querySelectorAll("ul li")).forEach(elem => {
        var character = elem.innerText;
        var characterId = elem.innerText.replace(/[ ',]/g,"-");
        var checkbox = document.createElement("input");
        checkbox.id = characterId;
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.classList.add("caracter-selected");
        elem.innerHTML = `<label for="`+characterId+`">`+character+`</label>`;
        elem.classList.add(characterId);
        style.innerHTML = style.innerHTML + ` 
        #`+characterId+`{ display: none }
        
        #blur:not(:checked) ~ #`+characterId+`:not(:checked) ~ .`+characterId+` { font-size: 0px; overflow: hidden; }
        #blur:not(:checked) ~ #`+characterId+`:not(:checked) ~ .`+characterId+`:before { font-size:16px; content: "`+character+` parle"; font-style: italic; } 
        #blur:checked ~  #`+characterId+`:not(:checked) ~ .`+characterId+` { 
             color: transparent;
             text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        #blur:checked ~  #`+characterId+`:not(:checked) ~ .`+characterId+` b:after { 
            content: ".";
        }
        #`+characterId+`:checked ~ .`+characterId+` { display: block; } 
        #`+characterId+`:not(:checked) ~ ul li.`+characterId+` label:before { background-image: url(icons/unchecked-50px.png); } 
        #`+characterId+`:checked ~ ul li.`+characterId+` label:before { background-image: url(icons/checked-50px.png);  } 
        #`+characterId+`:not(:checked) ~ ul li.`+characterId+` label { background-color: grey; color: white; } 
        #`+characterId+`:checked ~ ul li.`+characterId+` label { background-color: #ececec; } 
        `;
        document.body.insertBefore(checkbox, firstBodyNode);
    });

    var selectA = document.createElement('div');
    selectA.style["text-align"] = "center";
    selectA.innerHTML = `
    <button onclick="setAllCheckbox(true)">Afficher tous les personnages</button> / 
    <button onclick="setAllCheckbox(false)">Masquer tous les personnages</button> <br><br>
    <label for="none" class="none">Afficher les personnages masqués en masqués</label><br><br>
    <label for="blur" class="blur">Flouter le texte des personnages masqués</label><br><br>`;
    document.body.insertBefore(selectA,document.body.querySelector("ul").nextSibling);

}

document.addEventListener("DOMContentLoaded", function() {
    initCheckbox();
});