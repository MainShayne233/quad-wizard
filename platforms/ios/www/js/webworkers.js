var w;

function startWorker(message) {
    if(typeof(w) != "undefined"){
        stopWorker();
    }
    else{
        removeElement('solutions');
        createAnimation();
    }
    var args = [];
    args[0] = parseFloat(document.getElementById("a").value);
    args[1] = parseFloat(document.getElementById("b").value);
    args[2] = parseFloat(document.getElementById("c").value);
    args[3] = message;
    w = new Worker("js/quad_form_workers.js");
    w.postMessage(args);

    w.onmessage = function(event) {
        createSolution();
        document.getElementById("solutions").innerHTML = event.data;
        stopWorker();
        MathJax.Hub.Queue(
            ["Typeset",MathJax.Hub],
            function () {
                removeElement('loaderdiv');
                document.getElementById('solutions').style.visibility = "";
            }
        );
    };

}

function stopWorker() { 
    w.terminate();
    w = undefined;
}

function createAnimation(){
    var loader = document.createElement("div");
    /*
    var ball1 = document.createElement("div");
    var ball2 = document.createElement("div");
    var ball3 = document.createElement("div");
    loader.appendChild(ball1);
    loader.appendChild(ball2);
    loader.appendChild(ball3);
    loader.className = "loader-inner ball-triangle-path loader";
    */
    loader.className = "spinner"
    loader.id = 'loaderdiv';
    document.getElementById('soldiv').appendChild(loader);
}


function createSolution(){
    var solution = document.createElement("p");
    solution.className = "solution_display";
    solution.id = "solutions";
    solution.style.visibility = "hidden";
    document.getElementById('soldiv').appendChild(solution);
}

function removeElement(name){
    document.getElementById("soldiv").removeChild(document.getElementById(name));
}
