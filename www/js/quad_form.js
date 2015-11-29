



function get_nums(){
    var a = parseFloat(document.getElementById("a").value);
    var b = parseFloat(document.getElementById("b").value);
    var c = parseFloat(document.getElementById("c").value);
    return [a,b,c];
}


function inner_sqrt_value(nums){
    var a = nums[0];
    var b = nums[1];
    var c = nums[2];
    return Math.pow(b,2)-4*a*c;
}


//case 1: positive
//case -1: negative
//case 0: zero
function neg_pos_zero(sqrt){
    var props = [0,0,0];
    if (sqrt < 0){
        return -1;
    }
    else if (sqrt == 0){
        return 0;
    }
    return 1;
}


function is_sqr(n){
    if (Math.pow(n,0.5) == parseInt(Math.pow(n,0.5))){
        return true;
    }
    return false;
}

function sqr_fact(sqrt){
    for (i = 1; i <= sqrt; i++){
        if (is_sqr(sqrt/i)){
            return (sqrt/i);
        }
    }
    return 1;
}


function sqrt_case(sqrt){
    if (sqrt < 0){
        sqrt = sqrt*(-1);
    }
    var fac = sqr_fact(sqrt);
    if (fac == sqrt){
        return [Math.pow(sqrt,0.5),1];
    }
    else if (fac == 1){
        return [1,sqrt];
    }
    else{
        return [Math.pow(fac,0.5),sqrt/fac];
    }
}

function sqrt_properties(sqrt){
    sqrt_prop = [0, 0];
    sqrt_prop[0] = neg_pos_zero(sqrt);
    sqrt_prop[1] = sqrt_case(sqrt);
    return sqrt_prop;
}


function gcd(values){
    var largest = 0;
    for (i = 0; i < values.length; i++){
        if (Math.abs(values[i]) > largest){
            largest = Math.abs(values[i]);
        }
    }
  var flag;
    for (i=largest; i > 0; i--){
        flag = 0;
        for (j=0; j < values.length; j++){
            if (values[j]%i != 0){
              flag = 1;
            }
        }
        if (flag == 0){
            return i;
        }
    }
    return 1;
}


//which = 1 means plus
//which = -1 means minus
function sol_form(nums,sqrt_prop,which){
    var form = [0,0,0,0,0];
    var div;
    var w_val;
    form[0] = nums[1]*-1;
    form[1] = sqrt_prop[1][0];
    form[2] = sqrt_prop[1][1];
    form[3] = sqrt_prop[0];
    form[4] = nums[0]*2;
    if (form[0] < 0 && form[4] < 0){
        form[0]*=-1;
        form[4]*=-1;
    }
    //if the whole square root thing is just 0
    if (form[3] == 0){
        form[1] = 0;
        form[2] = 0;
        div = gcd([form[0],form[4]]);
        form[0] /= div;
        form[4] /= div;
    }
    //if there is a mixed whole number and square root
    else if(form[1] > 1 && form[2] > 1){
        div = gcd([form[0], form[1], form[4]]);
        form[0] /= div;
        form[1] /= div;
        form[4] /= div;
    }
    //if there is just a whole number on the right, and no i
    else if (form[1] > 0 && form[2] == 1 && form[3] == 1){
        if (which == 1){
            w_val = form[0] + form[1];
        }
        else{
            w_val = form[0] - form[1];
        }
        div = gcd([w_val, form[4]]);
        form[0] = w_val / div;
        form[4] /= div;
        form[1] = 0;
        form[2] = 0;
        form[3] = 0;
    }
    //if there is just a whole number on the right, and an i
    else if (form[1] > 1 && form[2] == 1 && form[3] == -1){
        div = gcd([form[0],form[1],form[4]])
        form[0] /= div;
        form[1] /= div;
        form[4] /= div;
    }
    //if there is just a square root on the right
    else if (form[1] == 1 && form[2] > 1){
        //no change, no reducing
    }
    if (form[4] == -1){
        form[0] *= -1;
        form[4] = 1;
        w_val *= -1;
    }
    else if (form[4] < -1){
        form[0] *= -1;
        form[4] *= -1;
        w_val *= -1;
    }
    return form;
}


function determine_oper(a,which){
    if (which == 1 && a == 0)
        return "";
    else if (which == 1)
        return "+";
    return "-";
}

function determine_i(d){
    if (d == -1)
        return "i";
    return "";
}


function sol_string(arg,which){
    var has_i = determine_i(arg[3]);
    var oper = determine_oper(arg[0],which)
    if (arg[0] == 0){
        //0 where coe = 0
        if (arg[1] == 0){
            return "0";
        }
        else if (arg[1] == 1){
            if (arg[2] == 1){
                if (arg[3] == 1){
                    //+-sqrt(1)
                    if (arg[4] == 1){
                        return oper + "1";
                    }
                    //+-sqrt(1)/den
                    else{
                        return "\\frac{" + oper + "1}{" + arg[4] + "}";
                    }
                }
                else{
                    //+-i
                    if (arg[4] == 1){
                        return oper + "i";
                    }
                    //+-i/den
                    else{
                        return "\\frac{" + oper + "i}{" + arg[4] + "}";
                    }
                }
            }
            else{
                //sqrt*(i)
                if (arg[4] == 1){
                    return oper + "\\sqrt{" + arg[2] + "}" + has_i;
                }
                //sqrt*(i)/den
                else{
                    return "\\frac{" + oper + "\\sqrt(" + arg[2] + "}" + has_i + "}{" + arg[4] + "}";
                }
            }
        }
        else{
            if (arg[2] == 1){
                //coe*(i)
                if (arg[4] == 1){
                    return oper + arg[1] + has_i;
                }
                //coe*(i)/den
                else{
                    return "\\frac{" + oper + arg[1] + has_i + "}{" + arg[4] + "}";
                }
            }
            else{
                //coe*sqrt*(i)
                if (arg[4] == 1){
                    return oper + arg[1] + "\\sqrt{" + arg[2] + "}" + has_i;
                }
                //coe*sqrt*(i)/den
                else{
                    return "\\frac{" + oper + arg[1] + "\\sqrt{" + arg[2] + "}" + has_i + "}{" + arg[4] + "}";
                }
            }
        }
    }
    else{
        if (arg[1] == 0){
            //a
            if (arg[4] == 1){
                return arg[0];
            }
            //a/den
            else{
                return "\\frac{" + arg[0] + "}{" + arg[4] + "}";
            }
        }
        else if (arg[1] == 1){
                if (arg[2] == 1){
                    if (arg[3] == -1){
                        //a+-i
                        if (arg[4] == 1){
                            return arg[0] + oper + "i";
                        }
                        //(a+-i)/den
                        else{
                            return "\\frac{" + arg[0] + oper + "i}{" + arg[4] + "}";
                        }
                    }                    
                }
                else{
                    //a+-sqrt(c)*(i)
                    if (arg[4] == 1){
                        return arg[0] + oper + "\\sqrt{" + arg[2] + "}" + has_i;
                    }
                        //(s+-sqrt(c)*(i))/den
                    else{
                        return "\\frac{" + arg[0] + oper + "\\sqrt{" + arg[2] + "}" + has_i + "}{" + arg[4] + "}";
                    }
                }
            }
            else{
                if (arg[2] == 1){
                    if (arg[4] == 1){
                        return arg[0] + oper + arg[1] + has_i;
                    }
                    else{
                        return "\\frac{" + arg[0] + oper + arg[1] + has_i + "}{" + arg[4] + "}";
                    }
                }
                //a+-bsqrt(c)*(i)
                if (arg[4] == 1){
                    return arg[0] + oper + arg[1] + "\\sqrt{" + arg[2] + "}" + has_i;
                }
                    //(a+-bsqrt(c)*(i))/den
                else{
                    return "\\frac{" + arg[0] + oper + arg[1] + "\\sqrt{" + arg[2] + "}" + has_i + "}{" + arg[4] + "}";
                }
            }
        }
    }


function if_a_zero(b,c){
    if (b == c){
        return "-1";
    }
    if (b == -c){
        return "1";
    }
    var div = gcd([b,c]);
    if (gcd == b){
        return (-c/div).toString();
    }
    return "\\frac{" + (-c/div).toString() + "}{" + (b/div).toString() + "}";
}

function ax_b(nums){
    var frac = [-nums[2],nums[1]]
    if (frac[0] < 0 && frac[1] < 0){
        frac[0]*=-1;
        frac[1]*=-1;
    }
    var div = gcd([Math.abs(frac[0]),Math.abs(frac[1])]);
    frac[0]/=div;
    frac[1]/=div;
    if (frac[1] == 1){
        return frac[0].toString();
    }
    if (frac[1] == -1){
        return (-frac[0]).toString();
    }
    return "\\frac{" + frac[0] + "}{" + frac[1] + "}";
}

function not_quad(nums){
    if (nums[1] == 0){
        if (nums[2] == 0){
            return "Looks like you entered all zeros. Good for you, but this doesn't concern the quadratic formula. However, the equation \\(0=0\\) will hold true for all \\(x\\).";
        }
        return "Do you see what you did there? You entered zeroes for everything except the constant. Did you do that on purpose? Regardless, the equation won't be true for any \\(x\\), because \\(" + nums[2].toString() + "\\neq 0\\), no matter what \\(x\\) is.";
    }
    if (nums[2] == 0){
        return "You do realize this is just \\(" + nums[1].toString() + "x=0\\), right? It's plain to see that the equation will be true when, and only when, \\(x=0\\).";
    }
    var sol = ax_b(nums);
    return "You plugged in a \\(0\\) for the coeffecient of \\(x^2\\). That's fine, but an equation in this form does not concern the quadratic formula. Despite that, we can still solve for x, and in this case, \\(x=" + sol + "\\).";

}

function nan_input(nums){
    return "You left one or more of the input boxes empty, or put in invalid data. We won't get anywhere if you hold out on me like this.";
}


//sqrt_prop[neg_pos_zero,[coe, sqrt]]
function quad_equation() {
    var nums = get_nums();

    if (isNaN(nums[0]) || isNaN(nums[1]) || isNaN(nums[2])){
        var sol = nan_input(nums);
        document.getElementById("solutions").innerHTML = sol;
    }
    else if (nums[0] == 0){
        var sol = not_quad(nums);
        document.getElementById("solutions").innerHTML = sol;
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else{
        var sqrt = inner_sqrt_value(nums);
        var sqrt_prop = sqrt_properties(sqrt);
        var sol1 = sol_form(nums,sqrt_prop,1);  
        var sol2 = sol_form(nums,sqrt_prop,-1);
        //alert(sol1);
        //alert(sol2);
        var sol1_string = sol_string(sol1,1);
        var sol2_string = sol_string(sol2,-1);
        if (sol1_string == sol2_string){
            document.getElementById("solutions").innerHTML = "<br>Soluton: \\(x =" + sol1_string + "\\)";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }
        else{
            document.getElementById("solutions").innerHTML = "<br>Soluton 1: \\(x=" + sol1_string + "\\)" + "<br><br><br>Solution 2:   \\(x=" + sol2_string + "\\)";
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }
    }
    
}
