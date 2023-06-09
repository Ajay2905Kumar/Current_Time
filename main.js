var d=new Date();
var day=d.getDay();
var month=d.getMonth();
var year=d.getFullYear();
var date=d.getDate();
var time=d.getTime();
var hr=d.getHours();
var mi=d.getMinutes();
var se=d.getSeconds();
var p_hr1=Number.MAX_VALUE;
var p_hr2=Number.MAX_VALUE;
var p_mi1=Number.MAX_VALUE;
var p_mi2=Number.MAX_VALUE;
var p_se1=Number.MAX_VALUE;
var p_se2=Number.MAX_VALUE;
var p_num=[p_hr1,p_hr2,p_mi1,p_mi2,p_se1,p_se2];
setDate();
function setDate(){
    var month_array=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var day_array=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.getElementById("display-date").innerHTML=month_array[month]+" "+date+" , "+year;
    clock();
    document.getElementById("display-day").innerHTML=day_array[day];
}
function setClock(x,y,z){
    document.getElementById("hour").style.transform="rotate("+((x%12)-6)*30+"deg)";
    document.getElementById("minute").style.transform="rotate("+((y)-30)*6+"deg)";
    document.getElementById("second").style.transform="rotate("+((z)-30)*6+"deg)";
    if(y<15){
        document.getElementById("hour").style.transform="rotate("+((x%12)-6)*30+"deg)";
    }
    else if(y>=15 && y<30){
        document.getElementById("hour").style.transform="rotate("+((((x%12)-6)*30)+7.5)+"deg)";
    }
    else if(y>=30 && y<45){
        document.getElementById("hour").style.transform="rotate("+((((x%12)-6)*30)+15)+"deg)";
    }
    else if(y>=45){
        document.getElementById("hour").style.transform="rotate("+((((x%12)-6)*30)+22.5)+"deg)";
    }
}
function clock(){
    setClock(hr,mi,se);
    setDigital(hr,mi,se);
    se++;
    if(se==60){
        se=0;
        mi++;
    }
    if(mi==60){
        mi=0;
        hr++;
    }
    if(hr==24){
        hr=0;
    }
    setTimeout(clock,1000);
}
function setDigital(a,b,c){
    var h2=a%10;
    var h1=(a-h2)/10;
    var m2=b%10;
    var m1=(b-m2)/10;
    var s2=c%10;
    var s1=(c-s2)/10;
    var num=[h1,h2,m1,m2,s1,s2];
    let seven_array=[[1,1,1,0,1,1,1],[0,0,1,0,1,0,0],[0,1,1,1,0,1,1],[0,1,1,1,1,1,0],[1,0,1,1,1,0,0],[1,1,0,1,1,1,0],[1,1,0,1,1,1,1],[0,1,1,0,1,0,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,0]];
    var class_list=["display-hour1","display-hour2","display-minute1","display-minute2","display-second1","display-second2"];
    for(var i=0;i<class_list.length;i++){
        animateDigital(class_list[i],num[i],p_num[i]);
        setActiveElements(class_list[i],seven_array[num[i]]);
        p_num[i]=num[i];
    }
}
function setActiveElements(x,y){
    var a=document.getElementsByClassName(x)[0];
    for(var i=0;i<y.length;i++){
        if(i!=3){
            var b=a.querySelector(".segment"+(i+1));
            if(y[i]==1){
                if(b.classList.contains("inactive-segment")){
                    b.classList.remove("inactive-segment");
                    b.classList.add("active-segment");
                }
            }
            else{
                if(b.classList.contains("active-segment")){
                    b.classList.remove("active-segment");
                    b.classList.add("inactive-segment");
                }
            }
        }
        else{
            var b=a.querySelector(".segment"+(i+1)+"u");
            if(y[i]==1){
                if(b.classList.contains("inactive-segment")){
                    b.classList.remove("inactive-segment");
                    b.classList.add("active-segment");
                }
            }
            else{
                if(b.classList.contains("active-segment")){
                    b.classList.remove("active-segment");
                    b.classList.add("inactive-segment");
                }
            }
            b=a.querySelector(".segment"+(i+1)+"l");
            if(y[i]==1){
                if(b.classList.contains("inactive-segment")){
                    b.classList.remove("inactive-segment");
                    b.classList.add("active-segment");
                }
            }
            else{
                if(b.classList.contains("active-segment")){
                    b.classList.remove("active-segment");
                    b.classList.add("inactive-segment");
                }
            }
        }
    }
}
function animateDigital(a,b,c){
    var s1="flip-"+a.slice(8);
    var s2=a.slice(8)+"-visible";
    var ac=document.getElementsByClassName(s1)[0];
    var va=document.getElementsByClassName(s2);
    if(b!=c){
        if(ac.classList.contains("no-animation")){
            ac.classList.remove("no-animation");
            ac.classList.add("active-animation");
            for(var i=0;i<va.length;i++){
                va[i].classList.add("visible-animation");
            }
        }
    }
    else{
        if(ac.classList.contains("active-animation")){
            ac.classList.remove("active-animation");
            ac.classList.add("no-animation");
            for(var i=0;i<va.length;i++){
                va[i].classList.remove("visible-animation");
            }
        }
    }
}