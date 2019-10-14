const data = []
const count = 4



for (var i = 0; i < count; i++) {
    data.push({
        id: i,
        name: 'Morango'+ i,
        qnt: '20',
        qnt_min: '4',
        type: 'Vegetal',
        price: '8',
    })
}

export default data