export class SalesList extends HTMLElement{
    constructor(data){
        super()
        this.root = this.attachShadow({mode : 'open'})
        this.data = data
        this.render()
        this.addEventListener('click', ()=>{
            this.container = document.querySelector('.container-click')
            this.clickItem()
            this.container.querySelector('.closed').addEventListener('click',()=> this.closed())
        })
    }
    
    render() {
        this.root.innerHTML = `
            <style>
                .card-item{
                    display: flex;
                    margin: 5px;
                }
                .title{
                    display: flex;
                    width: 120px;
                    color: #FFD400;
                    margin-left:5px;
                }
                .data-region{
                    display: flex;
                    text-align:center;
                }
            </style>
            
                <div class= "card">
                    <span class="id card-item"><span class="title" > Id </span><span>:</span><span>${this.data.order_id}</span></span>
                    <span class="region card-item"><span class="title">Region </span><span>:</span><span class="data-region">${this.data.region}</span></span>
                    <span class="country card-item"><span class="title">Country</span><span>:</span><span>${this.data.country}</span></span>
                    <span class="item-type card-item"> <span class="title">Item_type</span><span>:</span><span>${this.data.item_type}</span></span>
                    <span class="channel-sale card-item"><span class="title">Channel_sale </span><span>:</span><span>${this.data.sales_channel}</span></span>
                </div>
            
        `;
    }
    clickRender(){
    this.container.innerHTML = `
        <style>
                .card-item{
                    display: flex;  
                    margin: 5px;
                    font-size:25px;
                }
                .title{
                    display: flex;
                    width: 215px;
                    color: #FFD400;
                }
                .new-card{
                    
                }
                .closed{
                    position: absolute;
                    z-index:5;
                    top: 15px;
                    right: 15px;
                    color: red;
                    font-size: 30px;
                }
                .data-region{
                
                }
               
                @media only screen and (max-width:768px){
                    .card-item{
                        font-size:15px;
                    }
                    .title{
                        width: 120px;
                    }
                }
        </style>
        <div class= "new-card">
            <span class="closed"><i class="fa-solid fa-x"></i></span>
            <span class="id card-item"><span class="title" > Id </span> : <span>${this.data.order_id}</span></span>
            <span class="region card-item"><span class="title">Region </span> : <span class="data-region">${this.data.region}</span></span>
            <span class="country card-item"><span class="title">Country</span> : <span >${this.data.country}</span></span>
            <span class="item-type card-item"> <span class="title">Item_type</span> : <span>${this.data.item_type}</span></span>
            <span class="channel-sale card-item"><span class="title">Channel_sale </span>: <span>${this.data.sales_channel}</span></span>
            <span class="order-date card-item"> <span class="title">Order-date</span> : <span>${this.data.order_date}</span></span>
            <span class="ship-date card-item"><span class="title">Ship_date</span> : <span>${this.data.ship_date}</span></span>
            <span class="unit-cost card-item"><span class="title">Unit-cost </span>: <span>${this.data.unit_cost}</span></span>
            <span class="unit-price card-item"><span class="title">Unit-price </span>: <span>${this.data.unit_price}</span></span>
            <span class="units-sold card-item"><span class="title">Units-sold </span>: <span>${this.data.units_sold}</span></span>
        </div>
        
    `;
    }
    clickItem(){
        this.clickRender()
        this.container.style.display = 'flex'
        this.container.style.zIndex = 2
        this.container.style.position = 'absolute'
    }
    closed(){
        this.container.innerHTML = ''
        this.container.style.display = 'none'
    }
}
customElements.define('sale-list', SalesList)