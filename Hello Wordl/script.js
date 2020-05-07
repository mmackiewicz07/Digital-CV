var Od = 8;
var Od_minutes=0;
var Do = 19; 
var Do_minutes=0;
var h = 0;
var m = 0;
var time = 0;
var weekend = false;
var free_time = 0;
var sum_date;
var holiday = false; 

$('document').ready(function(){
data = $('.date');
time = $('.time');

//data
data.focusin(function()
{
  this.type='date';
})
data.focusout(function()
{
  this.type='text';
})

//time
time.focusin(function()
{
  this.type='time';
})
time.focusout(function()
{
  this.type='text';
})

//wybranie opcji
$('.chose2').click(function(){
  $('.pick').css("display","none");
  $('.dane').css("display","flex");
  $('.window').css("display","unset");
});

$('.chose1').click(function(){
  $('.pick').css("display","none");
  $('.window1').css("display","unset");
  $('.czas').css("display","unset");
});

//back
$('.back').click(function(){
  $('.pick').css("display","flex");
  $('.dane').css("display","none");
  $('.window').css("display","none");
  $('.czas').css("display","none");
  $('.window1').css("display","none");

});

//submit nowych godzin 

$('#own_time').submit(function(){
 
  var time_helperOD = $('#OD').val();
  var time_helperDO = $('#DO').val();
  ToHour(time_helperOD);
  ToMinute(time_helperOD);
  Od = h;
  Od_minutes = m;
  ToHour(time_helperDO);
  ToMinute(time_helperDO);
  Do=h;
  Do_minutes = m;
});
 

//submit
$('#dane').submit(function(e){


//zmiana godzin pracy
 // setHoursOd();
 // setHoursDo();
  

///////////////////zebranie danych
////SLM/////
   var pomoc = $('#SLM_DATE').val();
   var SLMdate = new Date(pomoc);
   var SLM = $('#SLM_TIME').val();
   ToHour(SLM);
   ToMinute(SLM);
   SLMdate.setHours(h)
   SLMdate.setMinutes(m);
   
   
  
////CIT/////
   var pomoc = $('#CIT_DATE').val();
   var CITdate = new Date(pomoc);
   var CIT = $('#CIT_TIME').val();
   ToHour(CIT);
   ToMinute(CIT);
   CITdate.setHours(h)
   CITdate.setMinutes(m);
   
////PFT/////
   var pomoc = $('#PFT_DATE').val();
   var PFTdate = new Date(pomoc);
   var PFT = $('#PFT_TIME').val();
   ToHour(PFT);
   ToMinute(PFT);
   PFTdate.setHours(h)
   PFTdate.setMinutes(m);
   
   
   

  
   //liczenie roznicy czasu
   roznica(SLMdate,CITdate);
   //sprawdzenie weekendu
   isWeekend(SLMdate,CITdate);
   if(weekend==true)
   {
      free_time +=free_time;
   }
   else
   {
      free_time=0;
   }
   //sprawdzenie świąt
     isHoliday(SLMdate,CITdate,PFTdate);
     if(holiday==true)
     {
      //alert('wybrałeś datę świąteczną');

      return;
     }
   //ostateczna roznica godzin
     var result = time - free_time;
   //dodawanie roznicy
     addDiff(result,PFTdate);
   //sprawdzenie czy nowa data wypada w weekend
     WeekendAgain(sum_date);
  //sprawdzenie czy nowa data wypada w swieta
     
     HolidayAgain(sum_date);
   
      
     //alert(sum_date);

     writeResult(sum_date);
     
     e.preventDefault();
})


});



function ToHour (SLM)

{
   var firsth = SLM[0];
   var secondh = SLM[1];
   
   var suma_h = firsth + secondh;
  
  
   h = Number(suma_h);
   
   return h; 
}

function ToMinute (SLM)
{
  var firstm = SLM[3];
  var secondm = SLM[4];

  var suma_m = firstm + secondm;

  m = Number (suma_m);
  
  return m;

}

function roznica (SLMdate,CITdate)
{
 
  if(CITdate.getDate() == SLMdate.getDate()&& SLMdate.getHours()>=Od && SLMdate.getHours()<=Do && SLMdate.getMinutes()>=Od_minutes && CITdate.getHours()>=Od && CITdate.getHours()<=Do && (CITdate.getMinutes()<=Do_minutes || Do_minutes == 0))
  {
  
    time =  (CITdate.getTime()-SLMdate.getTime());
   
  }
  else 
  {
    if(SLMdate.getHours()>=Od && SLMdate.getHours()<=Do && SLMdate.getMinutes()>=Od_minutes && CITdate.getHours()>=Od && CITdate.getHours()<=Do && (CITdate.getMinutes()<=Do_minutes || Do_minutes == 0))
    {
      //ile jest dni roznicy
      var day_diff  = CITdate.getDate()-SLMdate.getDate();
      
      
      //roznica pierwszego dnia
      var secondary_date = CITdate.getTime();
      var secondary_date1 = new Date(secondary_date);
      secondary_date1.setHours(Od);
      secondary_date1.setMinutes(Od_minutes);
      var diff1 = CITdate - secondary_date1;
      //roznica ostatniego dnia
      secondary_date = SLMdate.getTime();
      secondary_date1 = new Date(secondary_date);
      secondary_date1.setHours(Do);
      secondary_date1.setMinutes(Do_minutes);
      var diff2 = secondary_date1 - SLMdate;

      if(day_diff==1)
      {
        time = diff1+diff2;
        //alert('roznica jednego dnia');
      }
      else
      {
         //obliczanie reszty dni

         //pierwsza data pomocnicza ustawiona na poczatek dnia
         var tmp = 0;
         var third_date = CITdate.getTime();
         var third_date1 = new Date(third_date);
         third_date1.setHours(Od);
         third_date1.setMinutes(Od_minutes);
         third_date1.setDate(CITdate.getDate());
         

         //druga data pomocnicza ustawiona na koniec dnia
         var four_date = SLMdate.getTime();
         var four_date1 = new Date(four_date);
         four_date1.setHours(Do);
         four_date1.setMinutes(Do_minutes);
         four_date1.setDate(CITdate.getDate());
         free_time = four_date1 - third_date1;
         var diff3 = four_date1 - third_date1;
         
         time = (diff3*(day_diff-1)+(diff1+diff2));
         //alert('roznica wiecej niz jeden dzien');
      }
     }
    else
    {
      alert('wprowadzono błędne dane');
    }

  }
  
  return time;
   
}
function isWeekend (SLMdate,CITdate)
{
  var tab = [];
  var diffr = CITdate.getDate()-SLMdate.getDate();
  for(var i = 0; i <= diffr ; i++)
        {
            tab[i] = SLMdate.getDay()+i;
        }
    for(var j = 0; j <= tab.length; j++)
        {
            if(tab[j]==6 || tab[j]==0)
                {
                    weekend=true;
                }
        }
    //alert(weekend);
    return weekend;
    

}


function addDiff(result,PFTdate)
{

  //tworzenie pomocniczej daty i ustawienie jej na koniec dnia roboczego
    var tmp_date = PFTdate.getTime();
    var tmp_date1 = new Date(tmp_date);
    tmp_date1.setHours(Do);
    tmp_date1.setMinutes(Do_minutes);

//tworzenie pomocniczej daty i ustawienie jej na poczatek dnia roboczego

    var tmp_date = PFTdate.getTime();
    var tmp_date2 = new Date(tmp_date);
    tmp_date2.setHours(Od);
    tmp_date2.setMinutes(Od_minutes);

//tworzenie pomocniczej daty wynikowej
    

//zmienne pomocnicze
    var time_diffr = 0;
    var helper = 0;
    helper = result; 
    //alert(helper);
  

    time_diffr = tmp_date1.getTime() - PFTdate.getTime();

    //alert(time_diffr);
   // alert(result);

    if(time_diffr<result)
    {
      result = helper - time_diffr;
      var helper1 =tmp_date1.getDate()+1;
      PFTdate.setDate(helper1);
      var one_day_diff = tmp_date1.getTime() - tmp_date2.getTime();
      var division = (result/(one_day_diff));
     // alert(division);
      if(division >= 1 )
      {
        helper1 += division;
        PFTdate.setDate(helper1);
        //alert(PFTdate);
        var division_with_rest = (result%one_day_diff);
        PFTdate.setHours(Od);
        PFTdate.setMinutes(Od_minutes);
        sum_result = PFTdate.getTime()+division_with_rest;
        sum_date = new Date(sum_result);
      }
      else
      {
        PFTdate.setHours(Od);
        PFTdate.setMinutes(Od_minutes);
        sum_result = PFTdate.getTime()+result;
        sum_date = new Date(sum_result);

      }
    }
    else 
    {
      sum_result = PFTdate.getTime() + result;
      sum_date = new Date(sum_result);
    }

  
  //alert(sum_date);
  return sum_date; 
   
}
function WeekendAgain(sum_date)
{

  //data pomocnicza

  var tmp_date = sum_date.getTime();
  var tmp_date1 = new Date(tmp_date);
  var day = tmp_date1.getDate();
  if(sum_date.getDay()==0)
  {
     sum_date.setDate(day+1);
  }
  else if(sum_date.getDay()==6)
  {
    sum_date.setDate(day+2);
  }
  else 
  {
    return sum_date;
  }
  return sum_date;
}
function setHoursOd()
{

  var helper = $('#OD').val();
  ToHour(helper);
  ToMinute(helper);
  //alert(helper);

}
function setHoursDo()
{
 
  var helper = $('#DO').val();
  oHour(helper);
  ToMinute(helper);
  //alert(helper);
}

function onClickNormal ()
{
   $('.pick').css('display:none');
}

function isHoliday(SLMdate,CITdate,PFTdate)
{

  var SLM_month = ((SLMdate.getMonth())+1);
  var SLM_date3 = SLMdate.getDate();
  var CIT_month = ((CITdate.getMonth())+1);
  var CIT_date3 = CITdate.getDate();
  var PFT_month = ((PFTdate.getMonth())+1);
  var PFT_date3 = PFTdate.getDate();
 
  
  if((SLM_month==6 && SLM_date3 == 11) || (CIT_month==6 && CIT_date3 == 11) || (PFT_month==6 && PFT_date3 == 11))
  {
    holiday=true;
  }
  if((SLM_month==11 && SLM_date3 == 11) || (CIT_month==11 && CIT_date3 == 11) || (PFT_month==11 && PFT_date3 == 11))
  {
    holiday=true;
  }
  if((SLM_month==12 && SLM_date3 == 25) || (CIT_month==12 && CIT_date3 == 25) || (PFT_month==12 && PFT_date3 == 125))
  {
    holiday=true;
  }
 
  return holiday;
}

function HolidayAgain (sum_date)
{
 //data pomocnicza
 
  var tmp_date = sum_date.getTime();
  var tmp_date1 = new Date(tmp_date);
  var day = tmp_date1.getDate();
  var month = (tmp_date1.getMonth())+1;
  

  if(month==6 && day == 11)
  {
    sum_date.setDate(day+1);
  }
  if(month==11 && day == 11)
  {
    sum_date.setDate(day+1);
  }
  if(month==12 && day == 25)
  {
    sum_date.setDate(day+3);
  }
 
  return sum_date;
}
function writeResult(sum_date)
{
   //alert('piesek');
   var day = sum_date.getDate();
   var month = (sum_date.getMonth())+1;
   var year = sum_date.getYear()-100;

   var hour = sum_date.getHours();
   var minutes = sum_date.getMinutes();
   if(sum_date.getDay()<10)
   {
     day ="0"+sum_date.getDate();
   }
   if((sum_date.getMonth()+1)<10)
   {
     month ="0"+(sum_date.getMonth()+1);
   }
   if(sum_date.getHours()<10)
   {
     hour ="0"+sum_date.getHour();
   }
   if(sum_date.getMinutes()<10)
   {
     minutes ="0"+sum_date.getMinutes();
   }
   $('.new_pft').text(day+"."+month+"."+year+" | "+hour+":"+minutes);
   
   return 0;
}
