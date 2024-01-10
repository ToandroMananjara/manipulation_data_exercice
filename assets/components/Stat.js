export class StatChart extends HTMLElement{
    constructor(datas){
        super()
        this.datas = datas
        this.render()
        this.ctxYear = this.querySelector('#myChart-year')
        this.stat(this.ctxYear) 
    }
    render(){
        this.innerHTML = `
            <style>
           
            </style>
            <canvas id="myChart-year"></canvas>     
        `    
    }
    stat(ctxYear){
        new Chart(ctxYear, {
            type: 'line',
            data: {
              labels: this.datas.year,
              datasets: [{
                label: 'Benefice par an',
                data: this.datas.benefice,
                borderWidth: 1,
                backgroundColor : '#48BEFF'
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });
    }
}
customElements.define('stat-chart', StatChart)