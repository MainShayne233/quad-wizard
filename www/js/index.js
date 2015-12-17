window.onload = function(){
	//document.getElementById('loaderdiv').style.visibility = "hidden";
}

window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

window.addEventListener('load', function() {
        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
}, false);