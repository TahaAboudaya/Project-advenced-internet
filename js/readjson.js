function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var data;
readTextFile("data.json", function(text){
    data = JSON.parse(text);
});

//usage:
function search(searchFild){

    //console.log(document.getElementById("slider-snap-value-lower").innerHTML);
    var string = '';
    for(var i = 0; i < data.length; i++)
    {
        var brand = (Object.keys(data[i])[0]).toLowerCase();
        //console.log(Object.keys(data[i])[0]);
        var matches = brand.indexOf(searchFild.toLowerCase()) >= 0 ? true : false;
        if (matches && searchFild != null && searchFild != '') {
            //console.log(data[i]);
            var selectedBrand = data[i][brand];
            var e = document.getElementById("type");
			var type = e.options[e.selectedIndex].value;
			
			string +=  '<a href="#" style="font-size: 20px"> '+ brand +' <i class="fa fa-arrow-down "></i></a>';
            string += '<div class="row advanced-search-row">';
			 for(var j = 0; j < selectedBrand.length; j++){
				if(selectedBrand[j].type.toString() == type.toString()){
					string += '<li><a href="'+ selectedBrand[j].url +'" tabindex="-1" style="font-size: 25px;">';
					string += '<img src="'+ selectedBrand[j].img +'" style="width: 81px;" /><span> '+ selectedBrand[j].model +' </span><span> '+ selectedBrand[j].type +' </span></a></li>';
				}else if (type.toString() == ''){
					string += '<li><a href="'+ selectedBrand[j].url +'" tabindex="-1" style="font-size: 25px;">';
					string += '<img src="'+ selectedBrand[j].img +'" style="width: 81px;" /><span> '+ selectedBrand[j].model +' </span><span> '+ selectedBrand[j].type +' </span></a></li>';
				}else{
					
				}
			 }
            string += '</div>';
			
            
            //console.log(data[i].model);
            //document.getElementById("cars_array").insertAdjacentHTML('beforeend',string);
        }
    }
    document.getElementById("cars_array").innerHTML = string;
}


