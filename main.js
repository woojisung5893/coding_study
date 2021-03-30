const display = document.getElementById("log");
const stayMenu = document.querySelector('.stayMenu');
const battleMenu = document.querySelector('.battleMenu');

var battleMaster = false;

var log = function(msg,color){
    var info_log = document.createElement("p");
    info_log.innerHTML = msg;
    info_log.style.color=color;
    display.prepend(info_log);
}

var command = {
    battle:{
        on:function(){
            battleMenu.classList.add("on"); 
        },
        off:function(){
            battleMenu.classList.remove("on");
        }
    },
    stay:{
        on:function(){
            stayMenu.classList.add("on");
        },
        off:function(){
            stayMenu.classList.remove("on");
        }
    }
}

var battleTick = function(){
    if(battleMaster==false){

    }
}
log("테스트","red");