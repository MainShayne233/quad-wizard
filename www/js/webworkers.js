var w;

function startWorker() {
    document.getElementById('solutions').style.visibility = "hidden";
    document.getElementById('loaderdiv').style.visibility = "";
    var args = [];
    args[0] = parseFloat(document.getElementById("a").value);
    args[1] = parseFloat(document.getElementById("b").value);
    args[2] = parseFloat(document.getElementById("c").value);
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("js/quad_form_workers.js");
            w.postMessage(args);
        }
        w.onmessage = function(event) {
            document.getElementById("solutions").innerHTML = event.data;
            stopWorker();
            MathJax.Hub.Queue(
                ["Typeset",MathJax.Hub],
                function () {
                    document.getElementById('loaderdiv').style.visibility = "hidden";
                    document.getElementById('solutions').style.visibility = "";
                }
            );
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}

function stopWorker() { 
    w.terminate();
        w = undefined;
    }