
function odliczanie()
    {
         
        var dzisiaj = new Date();
		
		var dzien = dzisiaj.getDate();
		var miesiac = dzisiaj.getMonth()+1;
		var rok = dzisiaj.getFullYear();
		
		var godzina = dzisiaj.getHours();
		if (godzina<10) godzina = "0"+godzina;
		
		var minuta = dzisiaj.getMinutes();
		
        if (minuta<10) {
            minuta = "0"+minuta;
        }
            
		var sekunda = dzisiaj.getSeconds();
		if (sekunda<10) sekunda = "0"+sekunda;
        
        if (miesiac<10) miesiac ="0"+miesiac;
		
		document.getElementById("zegar").innerHTML = 
        godzina+":"+minuta+":"+sekunda+" | "+dzien+"/"+miesiac+"/"+rok;
		 
		 setTimeout("odliczanie()",1000);
    };

$('document').ready( function() {
    odliczanie();
    
    $('.opcja').click(function(){
        $('.text3').css('display','none');
        $('.text2').css('display','none');
        $('.text1').css('display','none');
        $('.text4').css('display','none');
        $('.text0').toggle();
         sprawdz();
        });
    $('.opcja1').click(function(){
        $('.text3').css('display','none');
        $('.text2').css('display','none');
        $('.text0').css('display','none');
        $('.text4').css('display','none');
         $('.text1').toggle();
         sprawdz();
        });
    $('.opcja2').click(function(){
         $('.text3').css('display','none');
        $('.text1').css('display','none');
        $('.text0').css('display','none');
        $('.text4').css('display','none');
        $('.text2').toggle();
         sprawdz();
        });
    $('.opcja3').click(function(){
         $('.text1').css('display','none');
        $('.text2').css('display','none');
        $('.text0').css('display','none');
        $('.text4').css('display','none');
        $('.text3').toggle();
        sprawdz();
        });
    $('.stopeczki').click(function(){
         $('.text1').css('display','none');
        $('.text2').css('display','none');
        $('.text0').css('display','none');
        $('.text4').toggle();
        $('.text3').css('display','none');
        
    });
    
    $('.prawo section').each(function (i){
      $(this).addClass("text"+i);
       });
    
    //boxy
    
   var hint = $('<div class="box">jakis tekst</div>');
   $('body').prepend(hint);
    
    var poczatek;
    var koniec;
   $('.icon-phone').hover(function(evt){
       $('.box').text('Kontakt');
       poczatek=evt.timeStamp;
       hint.css(
           {
       
           "left":evt.pageX+20,
           "top":evt.pageY+10
           
            }
               ).show(200);
       
                },
        function(evt)
                          
            {
               koniec=evt.timeStamp;
        if(koniec-poczatek > 100){
               hint.hide(200);
        }
            }
        );
    $('.icon-github-circled').hover(function(evt){
     $('.box').text('Github');
       poczatek=evt.timeStamp;
       hint.css(
           {
       
           "left":evt.pageX+20,
           "top":evt.pageY+10
           
            }
               ).show(200);
       
                },
        function(evt)
            { 
               koniec=evt.timeStamp;
         if(koniec-poczatek > 100){
               hint.hide(200);
         }
            }
        );
    $('.icon-instagram-filled').hover(function(evt){
        $('.box').text('Instagram');
       poczatek=evt.timeStamp;
       hint.css(
           {
       
           "left":evt.pageX+20,
           "top":evt.pageY+10
           
            }
               ).show(200);
       
                },
        function(evt)
            {
               koniec=evt.timeStamp;
         if(koniec-poczatek > 100){
               hint.hide(200);
         }
            }
        );
    $('.icon-facebook-circled').hover(function(evt){
       $('.box').text('Facebook');
       poczatek=evt.timeStamp;
       hint.css(
           {
       
           "left":evt.pageX+20,
           "top":evt.pageY+10
           
            }
               ).show(200);
       
                },
       
        function(evt)
            {
               koniec=evt.timeStamp;
        if(koniec-poczatek > 100)
        {
               hint.hide(200);
        }
            }
        );
    
    
});

function sprawdz()
{
    const display0=$('.text0').css('display');
    const display1=$('.text1').css('display');
    const display2=$('.text2').css('display');
    const display3=$('.text3').css('display');
    if(display0==='none' && display1==='none' && display2==='none' && display3==='none')
    {
        $('.text4').css('display','block');
    }
    else
    {
         $('.text4').css('display','none');
    }

 }
    
