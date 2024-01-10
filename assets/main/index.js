import { SalesList } from "../components/SalesList.js"
import { StatChart } from "../components/Stat.js";
import {dataPerYear, filterResults, listOfCountry, beneficeTotalAppend,
        sumMarchandiseAppend, setFunction, selectAddContainer, offlineTriFunction,
        onlineTriFunction, sumBeneficeFunction 
    } from "./data.js";
import { displayList, updateButtons} from "./function.js";
let links = document.querySelectorAll('.link-button');
let sections = document.querySelectorAll('section');

let datas = []
let newRegion = []

let container = document.querySelector('.container')
let indiceInitiale = 0; //indice initiale pour l'createLineTable du tableau
let indiceDePage = 9;  //indice utilisé pour afficher la page en 10 par 10
let pageActuel = 1; // on initialise le compteur de page actuel à 1;
let totalPages 

let statSection = document.querySelector('.stat')

let inputSearch = document.getElementById('input-search')
let selectRegion = document.querySelector('.region');
let selectChannel = document.querySelector('.sales-channel');
let beneficeTotalContainer = document.querySelector('.benefice-total')
let marchandiseTotalContainer = document.querySelector('.marchandise-total')
let btnPreview = document.querySelector('.preview');
let btnNext = document.querySelector('.next');

fetch('../assets/data/sales_100.json')
    .then(res => res.json())
    .then(data => {
        console.log(data.sales_100[0]);
        datas = data.sales_100
        const updateList = ()=>{
            pageActuel = 1 
            indiceInitiale = 0
            let saleLists = document.querySelectorAll('sale-list')
            displayList(saleLists, indiceInitiale, indiceDePage);
            updateButtons(saleLists, indiceDePage,pageActuel, totalPages)
            if (!saleLists.length) {
                btnNext.disabled = true; 
            }
        }
        let coutries = listOfCountry(datas)
        beneficeTotalAppend(datas, beneficeTotalContainer)        
        sumMarchandiseAppend(datas, marchandiseTotalContainer)
        
        let regions = setFunction(datas, 'region')
        selectAddContainer(regions, selectRegion, 'region-option');
        
        let channels = setFunction(datas, 'sales_channel')
        selectAddContainer(channels, selectChannel, 'channel-option');    
        
        datas.forEach(data => {
            newRegion.push(data)
            container.append(new SalesList(data))   
        });
        updateList()
        inputSearch.addEventListener('input',()=>{
            filterResults(inputSearch, newRegion, container)
            updateList()
        })
       
        btnNext.addEventListener('click', () => {
            pageActuel++;
            let saleLists = document.querySelectorAll('sale-list')
            for (let i = indiceInitiale; i < indiceInitiale + indiceDePage; i++) {
                saleLists[i].style.display = 'none';
            }
            indiceInitiale = indiceInitiale + indiceDePage;
            displayList(saleLists, indiceInitiale, indiceDePage);         
            updateButtons(saleLists, indiceDePage,pageActuel, totalPages)
        });
        
        btnPreview.addEventListener('click', () => {
            let saleLists = document.querySelectorAll('sale-list')
            pageActuel--;
            for (let index = indiceInitiale; index < indiceInitiale + indiceDePage; index++) {
                if (saleLists[index]) {
                    saleLists[index].style.display = 'none';
                }
            }
            indiceInitiale -= indiceDePage;        
            displayList(saleLists, indiceInitiale, indiceDePage);
            updateButtons(saleLists, indiceDePage,pageActuel, totalPages)
        });

        const triRegion = (array, region) => {
            return array.filter((arr)=> arr.region === region);           
          }
          
        selectRegion.addEventListener('click', ()=> {
            container.querySelectorAll('sale-list').forEach(element=>{
                element.remove()
            })
            container?.querySelector('p')?.remove()
            if(selectRegion.value === 'tous'){
                datas.forEach(data => {
                    container.append(new SalesList(data))   
                });
                beneficeTotalAppend(datas, beneficeTotalContainer)        
                sumMarchandiseAppend(datas, marchandiseTotalContainer)

            }else{
                newRegion = triRegion(datas, selectRegion.value)
                newRegion.forEach(data => {
                    container.append(new SalesList(data))   
                });
                console.log(newRegion);
                beneficeTotalAppend(newRegion, beneficeTotalContainer)        
                sumMarchandiseAppend(newRegion, marchandiseTotalContainer)
            }
            updateList()
        
            let channelOptions = document.querySelectorAll('.channel-option');
            channelOptions.forEach(element => {
                if(element.parentNode){
                    if((element.innerHTML !== 'Tous')){
                        selectChannel.removeChild(element);
                    }
                }
            })
            selectAddContainer(channels, selectChannel, 'channel-option');   
        })

        selectChannel.addEventListener('change', () => {
            let newSalesChannels;
            container.querySelectorAll('sale-list').forEach(element=>{
                element.remove()
            })
            container?.querySelector('p')?.remove()
            if (selectChannel.value === 'tous') {
                newRegion.forEach(data => {
                    container.append(new SalesList(data))   
                }); 
                console.log(newRegion);
              
            }
            if (selectChannel.value === 'Offline') {
                console.log(newRegion);
                newSalesChannels = offlineTriFunction(newRegion, selectChannel.value);
                newSalesChannels.forEach(data => {
                    container.append(new SalesList(data))   
                }); 
                
            }else if (selectChannel.value === 'Online'){
                newSalesChannels = onlineTriFunction(newRegion, selectChannel.value);
                console.log(newSalesChannels);
                newSalesChannels.forEach(data => {
                    container.append(new SalesList(data))   
                }); 
            }       
            if(!newSalesChannels.length){
                let noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'Aucun résultat '
                container.appendChild(noResultsMessage);
            } 
            updateList()
        })

        const dataYear = dataPerYear(datas)
        console.log(dataYear);
        statSection.prepend(new StatChart(dataYear))
        
        links.forEach((link ,index)=>{
            link.addEventListener('click', (e)=> {
                links.forEach(otherLink => {
                    otherLink.querySelector('a').style.color = '#F6F4F3'; // Réinitialiser à la couleur par défaut (ou utilisez une autre valeur)
                    otherLink.querySelector('a').style.textDecoration = 'none';
                });
                links[index].querySelector('a').style.textDecoration = 'underline';
                links[index].querySelector('a').style.textDecorationColor = '#FFD400';
                links[index].querySelector('a').style.color = '#FFD400'  

                sections.forEach(section => {
                    section.style.display = 'none';
                })
                sections[index].style.display = 'flex';
                sections[index].style.flexDirection = 'column';
            })
        })
        
    })