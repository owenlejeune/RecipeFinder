window.addEventListener("DOMContentLoaded", (e) => {
    var path = window.location.href;
    var index = path.indexOf('=');
    if (index != -1){path = path.substring(index+1, path.length);}
    else{path = ''}
    getRecipes(path);
})

function redirect(){
    var ingredients = document.getElementById('ingredient_text').value;
    if(ingredients){
        ingredients = ingredients.replace(/and/g, ",");
        ingredients = ingredients.replace(/ /g, '');
        var url = `http://localhost:${window.location.port}/recipes?q=${ingredients}`;
        location.replace(url);
    }
}


function getRecipes(location){
    var ingredients = '&q=' + location;
    ingredients = ingredients.replace("and", ",");
    ingredients = ingredients.replace(" ", '');
    var ingredientsJSON = JSON.stringify({ingredients: ingredients});
    document.getElementById('ingredient_text').value = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var responseObj = JSON.parse(xhttp.responseText);
            document.getElementById('table_area').innerHTML = responseObj.tableHTML;
            setTableClickEvents();
        }
    }
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-Type", 'application/json');
    xhttp.send(ingredientsJSON);
}

function setTableClickEvents(){
    var table = document.getElementById('table');
    if(table != null){
        for(let i=0; i < table.rows[0].cells.length; i++){
            var url = table.rows[0].cells[i].id;
            var img = document.getElementById(`img${i}`);
            var title = document.getElementById(`title${i}`);
            setClickEvent(img, title, url);
        }
    }
}

setClickEvent = function(img, title, url){
    img.onclick = function(){
        var win = window.open(url, '__blank');
        win.focus();
    }
    title.onclick = function(){
        var win = window.open(url, '__blank');
        win.focus();
    }
}

function gohome(){
    location.replace(`http://localhost:${window.location.port}/index.html`);
}

function scrolltotop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
