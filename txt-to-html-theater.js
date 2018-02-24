var fs = require('fs');

var fileName = process.argv[2];
if(fileName === undefined) {
    console.log("usage: node "+process.argv[1]+" theater-file");
    process.exit(1)
}
if (!fs.existsSync(fileName+".txt")) {
    console.log(fileName+".txt doesn't exist");
    process.exit(1)
}

// https://apps.timwhitlock.info/js/regex#
var lowerCaseRegex = /[a-zªµºß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķ-ĸĺļľŀłńņň-ŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌ-ƍƒƕƙ-ƛƞơƣƥƨƪ-ƫƭưƴƶƹ-ƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜ-ǝǟǡǣǥǧǩǫǭǯ-ǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿ-ɀɂɇɉɋɍɏ-ʓʕ-ʯͱͳͷͻ-ͽΐά-ώϐ-ϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻ-ϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎ-ӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣա-ևᴀ-ᴫᵢ-ᵷᵹ-ᶚḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶ-ᾷιῂ-ῄῆ-ῇῐ-ΐῖ-ῗῠ-ῧῲ-ῴῶ-ῷⁱⁿℊℎ-ℏℓℯℴℹℼ-ℽⅆ-ⅉⅎↄⰰ-ⱞⱡⱥ-ⱦⱨⱪⱬⱱⱳ-ⱴⱶ-ⱼⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣ-ⳤⴀ-ⴥꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯꝱ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌﬀ-ﬆﬓ-ﬗａ-ｚ]|\ud801[\udc28-\udc4f]|\ud835[\udc1a-\udc33\udc4e-\udc54\udc56-\udc67\udc82-\udc9b\udcb6-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udccf\udcea-\udd03\udd1e-\udd37\udd52-\udd6b\udd86-\udd9f\uddba-\uddd3\uddee-\ude07\ude22-\ude3b\ude56-\ude6f\ude8a-\udea5\udec2-\udeda\udedc-\udee1\udefc-\udf14\udf16-\udf1b\udf36-\udf4e\udf50-\udf55\udf70-\udf88\udf8a-\udf8f\udfaa-\udfc2\udfc4-\udfc9\udfcb]/;

var actorRegex = /^(([A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸ-ŹŻŽƁ-ƂƄƆ-ƇƉ-ƋƎ-ƑƓ-ƔƖ-ƘƜ-ƝƟ-ƠƢƤƦ-ƧƩƬƮ-ƯƱ-ƳƵƷ-ƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺ-ȻȽ-ȾɁɃ-ɆɈɊɌɎͰͲͶΆΈ-ΊΌΎ-ΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹ-ϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀ-ӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԱ-ՖႠ-ჅḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾ-ℿⅅↃⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱯⱲⱵⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽ-ꝾꞀꞂꞄꞆꞋＡ-Ｚ]|\ud801[\udc00-\udc27]|\ud835[\udc00-\udc19\udc34-\udc4d\udc68-\udc81\udc9c\udc9e-\udc9f\udca2\udca5-\udca6\udca9-\udcac\udcae-\udcb5\udcd0-\udce9\udd04-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd38-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd6c-\udd85\udda0-\uddb9\uddd4-\udded\ude08-\ude21\ude3c-\ude55\ude70-\ude89\udea8-\udec0\udee2-\udefa\udf1c-\udf34\udf56-\udf6e\udf90-\udfa8\udfca]|[ ',])+)\. (.*)$/;

/*

Data example :
{
    "title" : "Littoral",
    "caracters" : ["WILFRID", "LE RÉALISATEUR"],
    "parts" : [{
        "title" : "ICI",
        "chapters" : [{
            "title" : "1. Nuit",
            "lines" : [{
                "type": "comment",
                "content": "Nuit."
            },
            {
                "type" : "line",
                "content" : "C'est en désespoir de cause, monsieur le juge, que j'ai couru jusqu' ici pour venir vous voir. On m'a dit que vous étiez la bonne personne pour ce genre de choses, alors je n'ai pas hésité et j'ai couru sans savoir quoi dire ni comment répondre car comment répondre avec la catastrophe pardessus le marché puisque hier encore je n'étais rien et du jour au lendemain, par la terreur des circonstances, je suis là, devant vous et vous me dites : racontez-moi un peu qui vous êtes comme si j'étais une histoire. Mais rien, je ne suis rien, un quidam ou alors je ne sais pas ou je n'ai jamais su ! Maintenant il faut ce qu'il faut et pour raconter je veux bien essayer de dire, comme vous dites, un peu qui je suis, même si un peu je ne sais pas et qu'importe la quantité puisqu'un peu ou beaucoup ça va être long alors pour commencer par une vérité, mettons que je m'appelle Wilfrid",
                "character" : "WILFRID"
            }]

        }]
    }]
}

*/

function parseTheaterText(text) {
    var splitedText = text.split('\n');
    var result = { 
        "title": splitedText.shift().trim(),
        "parts": []
    };
    splitedText.shift().trim();
    //Parts
    for(var partLine = splitedText.shift(); partLine != undefined; partLine = splitedText.shift()) {
        partLine = partLine.trim();
        if(partLine === "") {
            continue;
        }
        console.log("New part: "+partLine);
        var part = {
            "title": partLine,
            "chapters" : []
        }
        splitedText.shift();
        //Chapters
        for(var chapterLine = splitedText.shift(); chapterLine != undefined; chapterLine = splitedText.shift()) {
            chapterLine = chapterLine.trim();
            if(chapterLine === "") {
                continue;
            }/*
            if(chapterLine.match(lowerCaseRegex) === null){
                splitedText.unshift(line);
                break;
            }*/
            if(!chapterLine.match(/^\d+\. .*/i)){
                splitedText.unshift(chapterLine);
                break;
            }
            console.log("New chapter: "+chapterLine);
            var chapter = {
                "title": chapterLine,
                "lines" : []
            }
            splitedText.shift();
            var contents = [];
            var lineStruct = {};
            //Lines
            for(var line = splitedText.shift(); line != undefined; line = splitedText.shift()) {
                line = line.trim();
                if(line === "") {
                    if(contents.length != 0) {
                        lineStruct["content"] = contents.join("\n")
                        chapter["lines"].push(lineStruct);
                    }
                    contents = [];
                    lineStruct = {};
                    continue;
                }
                if(line.match(lowerCaseRegex) === null){
                    splitedText.unshift(line);
                    break;
                }
                if(line.match(/^\d+\. .*/i)){
                    splitedText.unshift(line);
                    break;
                }
                if(contents.length == 0) {
                    var results = line.match(actorRegex);
                    if(results === null) {
                        lineStruct["type"] = "comment";
                        contents.push(line);
                    } else {
                        lineStruct["type"] = "line";
                        lineStruct["caracter"] = results[1];
                        contents.push(results[3]);
                    }
                } else {
                    contents.push(line);
                }
            }
            part["chapters"].push(chapter);
        }
        result["parts"].push(part);
    }
    return result;
}

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

function generateHTML(json) {
    var html = `<html> 
    <head> 
        <link rel="stylesheet" href="text.css" />
    </head>
    <body>
        <h1>`+json["title"]+`</h1> 
        <h2>Personnages</h2>
            <ul>\n`;
    var characters = flatten(json["parts"].map(part =>
        { 
            return part["chapters"].map(chapter => 
            {
               return chapter["lines"].filter(line => line["type"] === "line")
                      .map(line => line["caracter"]);
            }) 
        }));
    
    characters.filter(function(item, pos) {
            return characters.indexOf(item) == pos;
        }).sort().forEach(caracter =>
            html+="                 <li>"+caracter+"</li>\n"
        )
    html+="            </ul>\n\n";

    json["parts"].forEach(
        part => {
            html+= "        <h2>"+part["title"]+"</h2>\n\n";
            part["chapters"].forEach(
                chapter => {
                    html+= "\n             <h3>"+chapter["title"]+"</h3>\n\n";
                    chapter["lines"].forEach( 
                        line => {
                            if(line["type"]==="line") {
                                var content = line["content"].replace(/\(/g, "<i>(").replace(/\)/g, ")</i>");
                                html+="             <p><b>"+line["caracter"]+"</b>. "+content+"</p>\n";
                            } else {
                                html+="             <p><i>"+line["content"]+"</i></p>\n";
                            }
                        }
                    );
                }
            );
        }
    );
    html+= `
        </body> 
        <script src="text.js"></script>
    </html>`;
    return html;
}


fs.readFile(fileName+'.txt', 'utf8', (err,data) => {
    if (err) {
        return console.log(err);
    }
    console.log("Parsing started");
    var theater = parseTheaterText(data);
    console.log("Parsing finished");

    fs.writeFile(fileName+".json", JSON.stringify(theater, null, 2), (err) => {
       if(err) {
           return console.log(err);
       }
       console.log("Json file saved");
    });

    console.log("Generate HTML");
    var html = generateHTML(theater);

    fs.writeFile(fileName+".html", html, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Html file saved");
     });
});