var i = 0;
var save = [];

function AC(){
    document.getElementById('text').value = '';
    save = [];
    i=0;
}

function letter(num){
    document.getElementById('text').value += num;
    if(save[i]==null) save[i] = num; else save[i] += num;
}
function back(){
    if((save[i]==''|| save[i]==null) && i!=0){
        if(save[i]=='')save = save.slice(0, save.length - 1);
        save = save.slice(0, save.length - 1);
        let str = document.getElementById('text').value;
        str = cutlast(str);
        document.getElementById('text').value = str;
        return i-=2;
    }
    if(i==0) save[0]=document.getElementById('text').value;
    if(save[0]==null || save[0]=='') return;
    
    save[i] = cutlast(save[i]);
    let str = document.getElementById('text').value;
    str = cutlast(str);
    document.getElementById('text').value = str;
}

function optr(op){
    if((save[0]==null || save[0]=='') && op == '-'){
        document.getElementById('text').value = op;
        save[0]='-';
        return;
    }
    if (save[0]=='' || save[0]== '-') return;

    if(save[i]==null || save[i]==''){
        let rep = document.getElementById('text').value
        document.getElementById('text').value = rep.replaceAt(rep.length - 1, op);
        op=checkop(op);
        save[i-1]=op;
        return;
    }
    if (save[i][save[i].length-1] =='.') return;
    
    document.getElementById('text').value += op;
    op=checkop(op);
    save[++i]=op;
    i++;
}

function dot(){
    if (!save[i].includes(".") && save[i] != "") {
        save[i] += ".";
        document.getElementById('text').value += ".";
    }
}

function result(){
    if((save[i]==null || save[i]=='') || save[i].charAt(save[i].length-1) == '.') return;

    while(i!=0){
        save[i-2]= calculate(save[i]=parseFloat(save[i]) , save[--i] , save[--i]=parseFloat(save[i]))
        save = save.slice(0, save.length - 2);
    }
    if(isNaN(save[0])) save[0]=0;
    document.getElementById('text').value = save[0];
}

function calculate(first,op,second) {
    switch (op) {
        case "+": return second + first;
        case "-": if(first > second) return first - second; else return second - first;
        case "*": return second * first;
        case "/": return second / first;
        case "%": return second % first;
    }
}

function checkop(op){
    if(op=='x') return '*';
    if(op=='÷') return '/';
    return op;
}

function cutlast(str){
    let index = str.length-1;
    let newstr='';
    let k=0;
    while(k!=index){
        newstr+=str[k];
        k++;
    }
return newstr;
}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    var chars = this.split('');
    chars[index] = replacement;
    return chars.join('');
}