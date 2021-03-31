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

//레벨당 스텟계산기(캐릭터)
var charlevelUpVal = function(lv){
    var hpVal = 5;
    var attVal = 2;
    var defVal = 3;
    var spdVal = 2;
    char.lv++;
    char.maxHp += hpVal;
    char.att += attVal;
    char.def += defVal;
    char.spd += spdVal;
    char.hp = maxHp;
}

//레벨당 스텟계산기(몬스터)
var monsterlevelUpVal = function(lv){
    var hpVal = 5;
    var attVal = 2;
    var defVal = 3;
    var spdVal = 2;
    mon.lv++;
    mon.maxHp += hpVal;
    mon.att += attVal;
    mon.def += defVal;
    mon.spd += spdVal;
    mon.hp = mon.maxHp;
}

//캐릭터 생성기
var Character = function(name,hp,maxHp,att,def,spd,lv){
    this.name = name||"player";
    this.hp = hp||100;
    this.maxHp = maxHp||100;
    this.att = att||5;
    this.def = def||5;
    this.spd = spd||1;
    this.lv = lv||1;
}

var char = new Character();
var mon = new Character();


//몬스터 생성기
var monsterMaker = function(minlv,maxlv){
    var mon = new Character();
    var infomon = getRandom(0,monsterList.length-1);
    var monlv = getRandom(minlv,maxlv);
    mon.name = monsterList[infomon][0];
    mon.hp = monsterList[infomon][1];
    mon.maxHp = monsterList[infomon][2];
    mon.att = monsterList[infomon][3];
    mon.def = monsterList[infomon][4];
    mon.spd = monsterList[infomon][5];
    mon.lv = monlv;
    monsterlevelUpVal(mon.lv);
    return mon;
}

//층수별로 몬스터 난이도 결정하기
var monapp = function(floor){
    var floor = floor;
    monsterMaker(floor-4,floor+2)
}

//공격메소드
Character.prototype.attack = function(target){
    log(this.name+"이(가)"+target.name+"를(을)"+this.att+"만큼 데미지를 주었다.("+target.name+"의 체력:"+target.hp+")");
    target.hp -= this.att;
    if(char.hp<=0){
        log("패배했습니다.");
        
    }else if(mon.hp<=0){
        log("이겼습니다.");
    }
}

//회복메소드
Character.prototype.heal = function(){

}

//도망메소드
Character.prototype.escape = function(){

}

//휴식메소드
Character.prototype.rest = function(){

}




//게임시작
var gameStart = function(){
    battleTick();
    log("게임이 시작되었습니다.");
    
}

//버튼 누르면 시작하는 구간
//탐험하기
document.getElementById("dun_go").addEventListener('click',function(){
    log(char.name+"이(가) 던전으로 들어간다..");
    setTimeout(function(){
        if(getRandom()>=25){
            monsterMaker(battleFloorNow-4,battleFloorNow+2);
            battleMaster = true;
            battleTick();
            log("몬스터가 나타났다.")
        }else{
            log("몬스터가 나타나지 않았다.")
        }
    },1000);

});

//휴식하기
document.getElementById("dun_rest").addEventListener('click',function(){

});

//공격하기
document.getElementById("battle_att").addEventListener('click',function(){
    char.attack(mon);
    mon.attack(char);
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

gameStart();
