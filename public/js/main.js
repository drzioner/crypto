
$(document).ready(function () {

    let ancho = $("html").width();

    let escala;

    let limite;

    if (ancho < 700) {

        escala = 15;
        limite = 15;
        
    } else {

        escala = 30;
        limite = 30;
        
    }

    
    let inicio = 0;
    
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
                //console.log(error);
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
    //console.log(error);
  });
    
}

function mostrarUnaCrypto(idcrypto) {

    axios.get('https://api.coinmarketcap.com/v2/ticker/'+idcrypto+'/')
            .then(function (response) {

                let crypto = response.data.data;

                let pesos;

                $.get('https://openexchangerates.org/api/latest.json', {app_id: '6e84ba1ab3fc4036aa83618926b4c403'}, function(data) {
                    
                    pesos =data.rates.COP;

                    pesos = crypto.quotes.USD.price * pesos;

                    $(".pesos").html('COP $'+ $.number( pesos, 2 ) );

                });                

                $(".caja-crypto").html('<div class="crypto-box-2">'
                                            +'<div class="crypto-portada">'
                                                +'<img class="crypto-logo" src="https://s2.coinmarketcap.com/static/img/coins/32x32/'+crypto.id+'.png" alt="" srcset="">'
                                                +'<h4 class="crypto-name">'+crypto.name+'</h4>'
                                                +'<h4 class="crypto-symbol">'+crypto.symbol+'</h4>'
                                            +'</div>'
                                            +'<div class="crypto-content">'                                                
                                                +'<div class="crypto-values">'
                                                    +'<h3 class="crypto-usd">Precio: <h4>USD $'+ $.number( crypto.quotes.USD.price, 10 ) +'</h4><h4 class="pesos"></h4></h3>'
                                                    +'<h4>Variaciones del mercado</h4>'
                                                    +'<table class="crypto-table">'                                                        
                                                        +'<thead>'
                                                            +'<tr>'
                                                                +'<th>1h</th>'
                                                                +'<th>24h</th>'
                                                                +'<th>7d</th>'
                                                            +'</tr>'
                                                        +'</thead>'
                                                        +'<tbody>'
                                                            +'<tr>'
                                                                +'<td>'+ cambiarColorValor(Number(crypto.quotes.USD.percent_change_1h)) +'</td>'
                                                                +'<td>'+ cambiarColorValor(Number(crypto.quotes.USD.percent_change_24h)) +'</td>'
                                                                +'<td>'+ cambiarColorValor(Number(crypto.quotes.USD.percent_change_7d)) +'</td>'
                                                            +'</tr>'
                                                        +'</tbody>'
                                                    +'</table>'
                                                    +'<h3 class="crypto-usd">Capitalización: <h4>USD $'+ $.number( crypto.quotes.USD.market_cap, 2 ) +'</h4></h3>'
                                                +'</div>'
                                            +'</div>'
                                        +'</div>');                                       

            })
            .catch(function (error) {
                //console.log(error);
            }); 
    
}

function valor(valor) {
        
    if ( valor < 1) {

        if ( valor <= 0.99999 && valor >= 0.1 ) {

            if ( valor <= 0.999 && valor >= 0.1 ) {
    
                return $.number( valor, 3 );
                
            } else
            if ( valor <= 0.9999 && valor >= 0.01 ){
                return $.number( valor, 4 );
            }else{
                return $.number( valor, 2 );
            }
                                                
        } else 
        if ( valor <= 0.09 && valor >= 0.01 ) {
    
            return $.number( valor, 3 );
            
        } else
        if ( valor <= 0.009 && valor >= 0.001 ) {
    
            return $.number( valor, 4 );
            
        } else
        if ( valor <= 0.0009 && valor >= 0.0001 ){

            return $.number( valor, 5 );

        }else{

            return $.number( valor, 6 );

        }
                                            
    } else
    if ( valor > 1000){

        valor = valor/1000;

        return $.number( valor, 2 )+"K";

    } else {

        return $.number( valor, 3 );

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

function cambiarColorValor(valor) {

    let resultado;

    if (valor > 0) {
        
        resultado = '<h3 class="green">'+valor+'%</h3>';

    } else 
    if (valor < 0) {
        
        resultado = '<h3 class="red">'+valor+'%</h3>';

    }

    return resultado;
}