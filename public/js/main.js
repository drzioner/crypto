
$(document).ready(function () {

    let escala = 15;
    let inicio = 0;
    let limite = 15;
    let orden = "rank";
    
    mostrarCryptos(limite, orden);

    cargarCryptos(escala, inicio, limite, orden);
    
})

$(".caja-cryptos").on("click",".crypto-box", function () {

    let idcrypto = $(this).attr("idcrypto");

    $(".caja-cryptos").addClass("caja-crypto");
    $(".caja-crypto").removeClass("caja-cryptos");
       
    mostrarUnaCrypto(idcrypto);

});

$(".caja-cryptos").on("click",".crypto-box-2", function () {

    $(".caja-crypto").addClass("caja-cryptos");
    $(".caja-cryptos").removeClass("caja-crypto");
    $(".crypto-box-2").remove();

    let limite = 15;
    let orden = "rank";
    
    mostrarCryptos(limite, orden);

});

function mostrarCryptos(limite, orden) {

    axios.get('https://api.coinmarketcap.com/v2/ticker/?limit='+limite+'&sort='+orden)
  .then(function (response) {
    
    let monedas = response.data.data;

    $.each(monedas, function(key, moneda ) {

        $(".caja-cryptos").append('<div class="crypto-box" idcrypto='+moneda.id+'>'
                                    +'<div class="crypto-logo">'
                                        +'<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/'+moneda.id+'.png" alt="" srcset="">'
                                    +'</div>'
                                    +'<div class="crypto-content">'
                                        +'<h4 class="crypto-name">'+moneda.name+'</h4>'
                                        +'<h3 class="crypto-usd">$'+valor(Number(moneda.quotes.USD.price)) +'</h3>'
                                    +'</div>'
                                +'</div>');
    });

  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    console.log('ejecucion terminada');
  });
    
}

function mostrarCryptosMas(inicio, limite, orden) {

    axios.get('https://api.coinmarketcap.com/v2/ticker/?start='+inicio+'&limit='+limite+'&sort='+orden)
  .then(function (response) {
    
    let monedas = response.data.data;

    $.each(monedas, function(key, moneda ) {

        $(".caja-cryptos").append('<div class="crypto-box" idcrypto='+moneda.id+'>'
                                    +'<div class="crypto-logo">'
                                        +'<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/'+moneda.id+'.png" alt="" srcset="">'
                                    +'</div>'
                                    +'<div class="crypto-content">'
                                        +'<h4 class="crypto-name">'+moneda.name+'</h4>'
                                        +'<h3 class="crypto-usd">$'+valor(Number(moneda.quotes.USD.price)) +'</h3>'
                                    +'</div>'
                                +'</div>');
    });

  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    console.log('ejecucion terminada');
  });
    
}

function mostrarUnaCrypto(idcrypto) {

    axios.get('https://api.coinmarketcap.com/v2/ticker/'+idcrypto+'/')
            .then(function (response) {
    
                console.log(response.data.data);
                
                
                let crypto = response.data.data;
                
                $(".caja-crypto").html('<div class="crypto-box-2">'
                                +'<div class="crypto-logo">'
                                    +'<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/'+crypto.id+'.png" alt="" srcset="">'
                                +'</div>'
                                +'<div class="crypto-content">'
                                    +'<h4 class="crypto-name">'+crypto.name+'</h4>'
                                    +'<div class="crypto-values">'
                                        +'<h3 class="crypto-usd">Precio: $'+crypto.quotes.USD.price.toFixed(5) +'</h3>'
                                        +'<h3 class="crypto-usd">1h '+Number(crypto.quotes.USD.percent_change_1h) +'%</h3>'
                                        +'<h3 class="crypto-usd">24h '+Number(crypto.quotes.USD.percent_change_24h) +'%</h3>'
                                    +'</div>'
                                +'</div>'
                            +'</div>');

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log('ejecucion terminada');
            }); 
    
}


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

function cargarCryptos(escala, inicio, limite, orden) {    
    
    window.addEventListener('scroll', function(e) {
        
        let posicion = parseInt(window.pageYOffset, 10) + parseInt(window.screen.height, 10) - parseInt($("#header").height(), 10);

        let alto = parseInt($("html").height(), 10);

        let progreso = alto - posicion;
        
        let ancho = $("html").width();

        if (ancho < 700) {

            if (progreso <= 75) {
                
                setTimeout("",1000);
            
                inicio = limite + 1;
    
                limite = limite + escala;
                
                setTimeout("",1000);
                
                mostrarCryptosMas(inicio, limite, orden)
                
                return;
                
            }

        } else {
            
            if (progreso <= 8) {
                
                setTimeout("",1000);
            
                inicio = limite + 1;
    
                limite = limite + escala;         
    
                setTimeout("",1000);

                mostrarCryptosMas(inicio, limite, orden)
                
                return;
                
            }

            return;

        }
        
        return;
         
    });

    return;
    
}