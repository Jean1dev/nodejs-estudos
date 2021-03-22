const axios = require('axios')

let p1 = new Promise((resolve, reject) => {
    setTimeout(async () => {
        const data = await axios.get('http://localhost:3000/fake')
        resolve(data.status)
    }, 1000);
});
let p2 = new Promise(async (resolve, reject) => {
    const data = await axios.get('http://localhost:3000/fake')
    resolve(data.status)
});
let p3 = new Promise(async (resolve, reject) => {
    const data = await axios.get('http://localhost:3000/fake')
    resolve(data.status)
});
let p4 = new Promise(async (resolve, reject) => {
    const data = await axios.get('http://localhost:3000/fake')
    resolve(data.status)
});
let p5 = new Promise(async (resolve, reject) => {
    const data = await axios.get('http://localhost:3000/fake')
    resolve(data.status)
});


Promise.all([p1, p2, p3, p4, p5].map(f => f))
    .then(valores => {
        console.log(valores);
    })
    .catch(erro => {
        console.log(erro.message)
    });

