const display = document.getElementById("log");
const stayMenu = document.querySelector('.stayMenu');
const battleMenu = document.querySelector('.battleMenu');
const dun_floor = document.querySelector('.stayMenu-floor');

var battleMaster = false;
var battleFloor = 1;    //내려갈수 있는 층 수
var battleFloorNow = 1; //현재 내가있는 층 수

//로그창
var log = function(msg,color){
    var info_log = document.createElement("p");
    info_log.innerHTML = msg;
    info_log.style.color=color;
    display.prepend(info_log);
}

//랜덤값 생성함수
var getRandom = function(min,max){
    var min = Math.ceil(min||0);
    var max = Math.floor(max||100);
    return Math.floor(Math.random()*(max-min+1))+min;
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
        },
        floor:{
            off:function(){
                dun_floor.classList.add("on");
            },
            on:function(){
                dun_floor.classList.remove("on");
            }
        }
    }
}

//배틀인지 아닌지 판단해서 버튼조정
var battleTick = function(){
    if(battleMaster==false){
        command.battle.off();
        command.stay.on();
        if(battleFloor>battleFloorNow){
            command.stay.floor.on();
        }else{
            command.stay.floor.off();
        }
    }else if(battleMaster==true){
        command.battle.on();
        command.stay.off();
    }
}

var Charater = function(name,hp,maxHp,att,def,spd,lv){
    this.name = name||"player";
    this.hp = hp||100;
    this.maxHp = maxHp||100;
    this.att = att||5;
    this.def = def||5;
    this.spd = spd||1;
    this.lv = lv||1;
}

Charater.prototype.attack = function(targret){
    var target = target;
}

var player = new Charater();
var monster = new Charater();



//휴식하기
document.getElementById("dun_rest").addEventListener('click',function(){

});

//공격하기
document.getElementById("battle_att").addEventListener('click',function(){

});

//회복하기
document.getElementById("battle_heal").addEventListener('click',function(){

});

//도망가기
document.getElementById("battle_escape").addEventListener('click',function(){

});

//내려가기
document.getElementById("dun_floor").addEventListener('click',function(){

});