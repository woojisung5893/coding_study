const display = document.getElementById("log");
const stayMenu = document.querySelector('.stayMenu');
const battleMenu = document.querySelector('.battleMenu');

var battleMaster = false;

//로그창
var log = function(msg,color){
    var info_log = document.createElement("p");
    info_log.innerHTML = msg;
    info_log.style.color=color;
    display.prepend(info_log);
}

//랜덤값 생성함수
var getRandom = function(){
    
}

//디스플레이 편리하게 on/off
var command = {
    battle:{
        off:function(){
            battleMenu.classList.add("on"); 
        },
        on:function(){
            battleMenu.classList.remove("on");
        }
    },
    stay:{
        off:function(){
            stayMenu.classList.add("on");
        },
        on:function(){
            stayMenu.classList.remove("on");
        }
    }
}

//배틀인지 아닌지 판단
var battleTick = function(){
    if(battleMaster==false){
        command.battle.off();
        command.stay.on();
    }else if(battleMaster==true){
        command.battle.on();
        command.stay.off();
    }
}

var Character = function(name,hp,att,def,spd){
    this.name = name||"player";
    this.hp = hp||100;
    this.att = att||5;
    this.def = def||5;
    this.spd = spd||1;
}

var monsterMaker = function(){
    var mon = new Character();
    mon.name = monsterList[0][0];
    mon.hp = monsterList[0][1];
    mon.att = monsterList[0][2];
    mon.def = monsterList[0][3];
    mon.spd = monsterList[0][4];

}