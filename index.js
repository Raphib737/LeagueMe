//api key = 02164b8f-10a9-4785-857f-61a070a7360f
$( ".regions" ).on("click",function(){
    document.getElementById("region").textContent=this.textContent;
});

function loadXMLDoc(type, url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           console.log("Connected!");
           if(xmlhttp.status == 200){
               callback(xmlhttp.response);
           }
           else if(xmlhttp.status == 400) {
              alert('There was an error 400')
           }
           else {
               alert('something else other than 200 was returned')
           }
        }
    }

    xmlhttp.open(type, url, true);
    //xmlhttp.setRequestHeader("Allow-Access-Origin-Control","text/JSON");
    xmlhttp.send();
}

var summInfo;
var matchHist;
var matchData;

$("input").on("keydown",function search(e) {
    if(e.keyCode == 13) { 
        var sumName = $(this).val().toLowerCase();
        var region = document.getElementById("region").textContent;
        var regions = ["North America","Europe East", "Europe West","Oceania"] ;
        var regionKey = ["na","eune","euw","oce"]
        var key = "02164b8f-10a9-4785-857f-61a070a7360f" ;

        console.log(sumName,region,key);
        for (var x = 0; x < regions.length; x++){
            if(region.replace(/ /g,'') == regions[x].replace(/ /g,'')){
                region = regionKey[x]; 
            } //IF LOOP
        } // FOR LOOP 
        var url = "https://".concat(region,".api.pvp.net/api/lol/",region,"/v1.4/summoner/by-name/",sumName,"?api_key=",key);

        loadXMLDoc("GET",url,function(data){
            summInfo = JSON.parse(data);

            url = "https://".concat(region,".api.pvp.net/api/lol/",region,"/v2.2/matchhistory/",summInfo[sumName]['id'],"?rankedQueues=RANKED_SOLO_5x5&api_key=",key);
            loadXMLDoc("GET",url,function(data){
                matchHist = JSON.parse(data);

                var matchids = [];
                console.log(matchHist,matchHist['matches'].length);
                for(var y = 0; y < matchHist['matches'].length - 2; y++){
                  matchids.push(matchHist['matches'][y]['matchId']);
                } //FOR LOOP 
                
                console.log(matchids);
                for(x in matchids){
                  https://na.api.pvp.net/api/lol/na/v2.2/match/1836707013?api_key=02164b8f-10a9-4785-857f-61a070a7360f
                  url = "https://".concat(region,'.api.pvp.net/api/lol/',region,'/v2.2/match/',matchids[0],"?api_key=",key);
                  loadXMLDoc("GET",url,function(data){

                    matchData = JSON.parse(data);
                    console.log(matchData);
                  }); //loadXMLDoc for matchData
                }//FOR LOOP                 
            });//loadXMLDoc for matchHist


        });//loadXMLDoc for summInfo
    } //IF KEY.CODE STATEMENT
});//INPUT 
