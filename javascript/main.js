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

var Charater = function(name,hp,maxHp,att,def,spd,lv,exp,maxExp,luk){
    this.name = name||"player";
    this.hp = hp||100;
    this.maxHp = maxHp||100;
    this.att = att||5;
    this.def = def||5;
    this.spd = spd||1;
    this.lv = lv||1;
    this.exp = exp||0;
    this.maxExp = maxExp||0;
}


var player = new Charater();
var monster = new Charater();
Charater.prototype.attack = function(target){
    var target = target;
    target.hp = target.hp - this.att;
    log(this.name+"이(가)"+target.name+"을(를) "+this.att+"의 만큼 데미지 입혔다!("+target.name+"의 HP:"+target.hp+")");
}

Charater.prototype.heal = function(target){
    var target = target;

}

var monsterMaker = function(){
    var info_monrandom = getRandom(0,(monsterList.length-1));
    monster.name = monsterList[info_monrandom][0];
    monster.hp = monsterList[info_monrandom][1];
    monster.maxHp = monsterList[info_monrandom][2];
    monster.att = monsterList[info_monrandom][3];
    monster.def = monsterList[info_monrandom][4];
    monster.spd = monsterList[info_monrandom][5];
    monster.lv = monsterList[info_monrandom][6];

}

var infostatus = function(){
    var info_name = document.getElementById("status_name");
    var info_level = document.getElementById("status_level");
    var info_exp = document.getElementById("status_exp");
    var info_hp = document.getElementById("status_hp");
    info_name.innerHTML = player.name;
    info_level.innerHTML = player.lv;
    info_exp.innerHTML = player.exp+"/"+player.maxExp;
    info_hp.innerHTML = player.hp+"/"+player.maxHp;
}

var gameStart = function(){
    player.name = prompt("플레이어의 이름을 지정해주세요");
    battleTick();
    infostatus();
    log("게임이 시작되었습니다.");
    setTimeout(() => {
        log("몬스터 타워에 입장하였습니다.( 현재층:"+battleFloorNow+"층)");
    }, 1000);
    
}

gameStart();

//탐험하기
document.getElementById("dun_go").addEventListener('click',function(){
    log("던전을 돌아다니는중...");
    setTimeout(function(){
        if(getRandom()>25){
            log("몬스터가 나타났다!!");
            battleMaster = true;
            monsterMaker();
            battleTick();
            setTimeout(
                function(){
                    if(getRandom()>50){
                        log("내가 먼저 공격한다!");
                        player.attack(monster);
                    }else{
                        log("적이 먼저 기습했다!");
                        monster.attack(player);
                    }
                },1000)
        }else{
            log("몬스터가 나타나지 않았다..");
        }
    },1000)
});

//휴식하기
document.getElementById("dun_rest").addEventListener('click',function(){

});

//내려가기
document.getElementById("dun_floor").addEventListener('click',function(){

});

//공격하기
document.getElementById("battle_att").addEventListener('click',function(){
    player.attack(monster);
});

//회복하기
document.getElementById("battle_heal").addEventListener('click',function(){

});

//도망가기
document.getElementById("battle_escape").addEventListener('click',function(){

});
