var coll = document.getElementsByClassName("collapsible");
var i;
var currentIndex = 0;
var currentRole;
var topBuilds;
var jgBuilds;
var midBuilds;
var botBuilds;
var suppBuilds;
var roleList = [topBuilds,jgBuilds,midBuilds,botBuilds,suppBuilds];
var roleText = ["Top%20Lane", "Jungle","Mid%20Lane","Bot%20Lane","Support"];

var xhttp = new XMLHttpRequest();
var fileCounter = 0;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      roleList[fileCounter] = readBuild(xhttp.responseText, 3);
      fileCounter++;
      
      if (fileCounter == 5){
        currentRole = roleList[3];
        for (i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
          var content = coll[i].nextElementSibling;
          for (var j = 0; j < roleList[i].length; j++){
            var d = document.createElement("div");
            var image= document.createElement("img");
            image.src = "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/assets/" + roleList[i][j].name + ".png";
            d.style.display = "inline-block";
            d.style.width = "5rem";
            d.style.padding = "0.25rem";
            image.style.display = "inline-block";
            image.style.width = "5rem";
            image.style.padding = "0.25rem";
            content.appendChild(d);
            d.appendChild(image);
            d.id = j;
            switch(i){
              case 0:
                d.addEventListener("click",function (){ fillBuild(this.id, roleList[0], 0)});
                break;
              case 1:
                d.addEventListener("click",function (){ fillBuild(this.id, roleList[1], 0)});
                break;
              case 2:
                d.addEventListener("click",function (){ fillBuild(this.id, roleList[2], 0)});
                break;
              case 3:
                d.addEventListener("click",function (){ fillBuild(this.id, roleList[3], 0)});
                break;
              default:
                d.addEventListener("click",function (){ fillBuild(this.id, roleList[4], 0)});            
            }
            
          }
        }
        document.getElementById("b1").addEventListener("click",function (){ fillBuild(currentIndex, currentRole, 0)});
        document.getElementById("b2").addEventListener("click",function (){ fillBuild(currentIndex, currentRole, 1)});
        document.getElementById("b3").addEventListener("click",function (){ fillBuild(currentIndex, currentRole, 2)});
        fillBuild(currentIndex, currentRole, 0);
      }
      else{
        xhttp.open("GET", "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/"+roleText[fileCounter]+".txt", true);
        xhttp.send();
      }
        
    }


    
};
xhttp.open("GET", "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/"+roleText[fileCounter]+".txt", true);
xhttp.send();


function fillBuild(index, list, buildnum) {
  if (buildnum < list[index].builds.length){
    document.querySelector(".champion-image").firstElementChild.src = "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/assets/" + list[index].name + ".png";
    document.querySelector(".champion-image").firstElementChild.style.width = "100%";
    document.querySelector(".champion-image").firstElementChild.style.border = "7px solid #706136";
    for (var i = 0; i < 2; i++){
      document.querySelector(".summ" + (i + 1)).firstElementChild.src = "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/assets/summ/" + list[index].builds[buildnum].summs[i] + ".png";
      document.querySelector(".summ" + (i + 1)).firstElementChild.style.width = "100%";
      document.querySelector(".summ" + (i + 1)).firstElementChild.style.border = "3px solid #706136";
    }
    for (var i = 0; i < 6; i++){
      var image = document.querySelector(".rune" + (i + 1)).firstElementChild;
      image.src = "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/assets/rune/" + list[index].builds[buildnum].runes[i] + ".png";
      image.style.width = "100%";
       image.style.border = "7px solid #706136";
       image.style.borderRadius = "50%";
    }
    for (var i = 0; i < 3; i++){
      var image = document.querySelector(".shard" + (i + 1)).firstElementChild;
       image.src = "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/assets/rune/" + list[index].builds[buildnum].shards[i] + ".png";
       image.style.width = "100%";
       image.style.border = "2px solid #706136";
       image.style.borderRadius = "50%";
    }

    for (var i = 0; i < 8; i++){
      var d = document.querySelector(".item-container-" + (i + 1));
      d.innerHTML = "";
      for (var j = 0; j < list[index].builds[buildnum].items[i].length; j++){
        var image = document.createElement("img");
        image.src = "https://raw.githubusercontent.com/Reegal/Reegal.github.io/master/LolBuilds/assets/item/" + list[index].builds[buildnum].items[i][j] + ".png";
        image.style.width = "100%";
        image.style.border = "7px solid #706136";
        image.style.backgroundColor = "#706136";
        d.appendChild(image);
      }

    }
    document.querySelector(".notes").firstElementChild.innerHTML = "Notes: \n" + list[index].builds[buildnum].notes;


    currentRole = list;
    currentIndex = index;
  }

  for (var i = 0; i < 3; i++){
    if (i < list[index].builds.length){
      document.getElementById("b" + (i + 1)).style.backgroundColor = "honeydew";
    }else{
      document.getElementById("b" + (i + 1)).style.backgroundColor = "grey";
    }
  }
}



function readBuild(text, num){
  var buildsList = [];
  array = text.split("\r\n");
  done = false;
  i=0;
  while(!done){
    var champion = new Object();
    console.log(array[i]);
    var line = array[i];
    splitLine = line.split(",");
    champion.name = splitLine[0];
    champion.builds = [];
    i++;
    for(var j=0; j < parseInt(splitLine[1]); j++){
      var build = new Object();
      build.summs = array[i].split(",");
      i++;
      build.runes = array[i].split(",");
      i++;
      build.shards = array[i].split(",");
      i++;
      build.spells = array[i].split(",");
      i++;
      build.items = [];
      for (k=0;k<8;k++){
        build.items.push(array[i].split(","));
        i++;
      }
      build.notes = array[i];
      i++;
      champion.builds.push(build);
    }
    if (i === array.length - 1){
      done = true;
    }
    buildsList.push(champion);
  }
  
  return buildsList;
}