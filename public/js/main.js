axios.get('https://api.coinmarketcap.com/v2/ticker/?limit&sort')
  .then(function (response) {
    
    let monedas = response.data.data;

    $.each(monedas, function(key, moneda ) {

        $("#caja-crypto").append('<div class="crypto-box">'
                                    +'<div class="crypto-logo">'
                                        +'<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/'+moneda.id+'.png" alt="" srcset="">'
                                    +'</div>'
                                    +'<div class="crypto-content">'
                                        +'<h4 class="crypto-name">'+moneda.name+'</h4>'
                                        +'<h3 class="crypto-usd">$'+valor(Number(moneda.quotes.USD.price)) +'</h3>'
                                    +'</div>'
                                +'</div>');
    });   
    

    /*'<div class="crypto-box">
        +'<div class="crypto-logo">'
            +'<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/'+response.data.id+'.png" alt="" srcset="">'
        +'</div>'
        +'<div class="crypto-content">'
            +'<h4 class="crypto-name">'++'</h4>'
            +'<h3 class="crypto-usd">'++'</h3>'
        +'</div>'
    +'</div>'*/

  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    console.log('ejecucion terminada');
  });


function valor(valor) {
        
    if ( valor < 1) {

        if ( valor <= 0.99999 && valor >= 0.1 ) {

            if ( valor <= 0.999 && valor >= 0.1 ) {
    
                return valor.toFixed(3);
                
            } else
            if ( valor <= 0.9999 && valor >= 0.01 ){
                return valor.toFixed(4);
            }else{
                return valor.toFixed(2);
            }
                                                
        } else 
        if ( valor <= 0.09 && valor >= 0.01 ) {
    
            return valor.toFixed(3);
            
        } else
        if ( valor <= 0.009 && valor >= 0.001 ) {
    
            return valor.toFixed(4);
            
        } else
        if ( valor <= 0.0009 && valor >= 0.0001 ){
            return valor.toFixed(5);
        }else{
            return valor.toFixed(6);
        }
                                            
    } else
    if ( valor > 1000){

        valor = valor/1000;

        return valor.toFixed(2)+"K";

    } else {

        return valor.toFixed(2);

    }
    
}