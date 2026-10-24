const readline = require('node:readline/promises')


function ticketPrice(category){
            switch(category){
                case 1:
                    return 300
                case 2:
                    return 500
                case 3:
                    return 900
                default:
                    return 0
            }
}
function maxTickets( budget, price){
    let count =0
    while (budget >= price){
        budget = budget - price
        count ++
    }
    return count  
}



function deliveryPrice(distance, total){
     if (total >= 3000 || distance <= 3){
        return 0
     } else if( 4 <= distance && 10>= distance){
        return 200
     } else{
        return 200 + (distance - 10) * 25
     }
}

function printSteps(height){
    let i = 1
    for (i ; i < height ; i++){
        if (i === 4){
            continue
        } else if(i>10){
            console.log(`Дальше лестница не построена
Всего построено: 9`)
                return 
        } else{
            console.log(`Ступень ${i}`)
             
        }
    }
    console.log(`Всего построено: ${i}`)
    return
}

async function main(){


    console.log(`Выберите задачу:
    1 — билетная касса
    2 — доставка заказа
    3 — лестница`)
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    const choice = Number(await rl.question (`Ваш выбор:`))

    switch(choice){
        case 1:
            const category = Number(await rl.question ('Категория билета:'))
            const budget = Number(await rl.question ('Бюджет:') )

            const price = ticketPrice(category)
            const count = maxTickets( budget, price)
            console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`)
            break
        case 2:
            const distance = Number( await rl.question ('Расстояние: '))
            const total = Number (await rl.question ('Сумма заказа: '))

            let deliveryprice = deliveryPrice(distance, total)
            console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${deliveryprice} руб.`)
            break
        case 3:
            let height = Number( await rl.question('Высота лестницы:'))
            printSteps(height)
            break
        default:
            console.log(`Такой задачи нет`)
        
    }
    rl.close()
}

main()