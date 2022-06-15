
const buttons_silver_custom = [
    {
        name:'Zmień magazyn z m1 na m0',
        stock_current:1,
        stock_goal:0,
        id:`silver_${(Math.random() + 1).toString(32).substring(2)}`
    },
    {
        name:'Zmień magazyn z m0 na m1',
        stock_current:0,
        stock_goal:1,
        id:`silver_${(Math.random() + 1).toString(32).substring(2)}`
    }
]
const el = document.createElement('div')
el.style.marginTop='30px'

for(let i =0;i<buttons_silver_custom.length;i++){
    const tmp_btn = document.createElement('button')
    tmp_btn.dataset.stock_current = buttons_silver_custom[i].stock_current
    tmp_btn.dataset.stock_goal = buttons_silver_custom[i].stock_goal
    tmp_btn.innerHTML = buttons_silver_custom[i].name
    tmp_btn.id = buttons_silver_custom[i].id
    el.appendChild(tmp_btn)
}

const interval = setInterval(() => {
    if(document.getElementsByClassName('description')){
        const table_el = document.getElementsByClassName('description')
        for(let x=0;x<table_el.length;x++){
            if(table_el[x].innerText === 'Realizacja z magazynu')
                table_el[x].appendChild(el)
        }
        clearInterval(interval)
           const inner_inteval = setInterval(() => {
            if(document.getElementsByClassName("yui-dt0-col-quantity yui-dt-col-quantity")){
                clearInterval(inner_inteval)
                const allMs = document.getElementsByClassName("yui-dt0-col-quantity yui-dt-col-quantity")
                for(let z =0;z<allMs.length;z++){
                    if ((new RegExp('M0')).test(allMs[z].innerText))
                      allMs[z].style.backgroundColor = 'rgba(46, 179, 138, 0.2)'
                    if((new RegExp('M1')).test(allMs[z].innerText))
                        allMs[z].style.backgroundColor = 'rgba(198, 179, 138, 0.2)'
                    if((new RegExp('M1')).test(allMs[z].innerText) && (new RegExp('M0')).test(allMs[z].innerText))
                         allMs[z].style.backgroundColor ='rgba(198, 179, 26, 0.2)'
                } 
            }
        }, 500);
        for(let j=0;j<buttons_silver_custom.length;j++){
            document.getElementById(buttons_silver_custom[j].id).addEventListener('click',function(){
                this.disabled=true
                for(let x =0;x<buttons_silver_custom.length;x++)
                    document.getElementById(buttons_silver_custom[x].id).disabled=true
                const order_number = getOrderName()
             fetch('https://silver.brandsmanago.pl/change_stocks', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stock_id_current:this.dataset.stock_current,
                    stock_id_goal:this.dataset.stock_goal,
                    crypto_key:'fewf8329uhnfi8ds76326tgfdbschbdjsbc8y328g238h28hr832r23r32',
                    order_number:order_number
                })
            }).then((res)=>res.json())
                .then((res)=>{
                   if('message' in res)
                    window.alert(res.message)
                    window.location.reload()
                })
                .catch((er)=>{
                    window.alert('Wystąpił błąd !')
                    window.location.reload()
                })
            })
        }
    }

}, 500);


function getOrderName(){
    let finded_number;
    const order_number =[...document.getElementsByClassName('page-header')[0].childNodes]
    for(const x in order_number){
        if(order_number[x].tagName == 'H1'){
            finded_number = order_number[x].innerText.trim()
            break;
        }
    }
    // mamy nr zamówienia
    finded_number = finded_number.split(' ')[2].trim()
    return finded_number
}
