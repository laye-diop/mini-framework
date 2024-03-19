// var render = (template, data) => {
// 	return template.replace(/{{(.*?)}}/g, (match) => {
// 		return data[match.split(/{{|}}/).filter(Boolean)[0]]
// 	})
// }
// let a = render("Hi, my name is {{ name }}!", {
//     name: "shadowtime2000"
//     });

// console.log(a)
let data ={
    "title": "Star Trek TNG - Season One",
    "episodes": [
        "Encounter at Farpoint (part. 1)",
        "Encounter at Farpoint (part. 2)",
        "The Naked Now",
        "Code of Honor",
        "The Last Outpost",
        "Where No One Has Gone Before",
        "Lonely Among Us",
        "Justice",
        "The Battle",
        "Hide and Q",
        "Haven",
        "The Big Goodbye",
        "Datalore",
        "Angel One",
        "11001001",
        "Too Short a Season",
        "When the Bough Breaks",
        "Home Soil",
        "Coming of Age",
        "Heart of Glory",
        "The Arsenal of Freedom",
        "Symbiosis",
        "Skin of Evil",
        "We'll Always Have Paris",
        "Conspiracy",
        "The Neutral Zone"
    ]
}

function formatInOneLine(textTemplate, data) {
    return new Function("data ", `const out = [];\n${((`##${textTemplate}##`).replace(/##\s*</g, "\nout.push(`<").replace(/>\s*##/g, ">`);\n").replace(/{=/g, "${").replace(/=}/g, "}").replace(/^##/, "").replace(/##$/, ""))}\nreturn out.join("");`)(data);
}
let template = `
<div class="title">{= data.title =} </div>
<div class="episodes-list"> ##
let episodeNumber = 1;
for (let episodeName of data.episodes) { ##
    <div class="episode-name"><span>{= episodeNumber =}</span><span>{= episodeName =}</span></div> ## 
    episodeNumber++;
} ##
</div>

`
console.log(formatInOneLine(template, data))