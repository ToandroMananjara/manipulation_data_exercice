    
let marchandiseTotal = document.getElementById('marchandise-total');
let createTr;
let createTd;
let tbody = document.querySelector('tbody');
let btnPreview = document.querySelector('.preview');
let btnNext = document.querySelector('.next');

let links = document.querySelectorAll('.link-button');
let sections = document.querySelectorAll('section');
links.forEach((link ,index)=>{
    link.addEventListener('click', (e)=> {
        sections.forEach(section => {
            section.style.display = 'none';
        })
        sections[index].style.display = 'flex';
    })
})

fetch("./assets/data/sales_100.json")
    .then(res => res.json())
    .then(lists => {
        console.log(lists);
        let beneficeTotalContainer = document.getElementById('benefice-total');
        let array = lists.sales_100;
        let newArray;
            newArray =  array.map((arr)=>({
                "order_id" : arr.order_id,
                "region" : arr.region,
                "country" : arr.country,
                "item_type" :  arr.item_type,
                "sales_channel" :  arr.sales_channel,
                "order_date" :  arr.order_date,
                "ship_date" :  arr.ship_date,
                "units_sold" :arr.units_sold,
                "unit_price": arr.unit_price,
                "unit_cost" : arr.unit_cost,
                "benefice_total" : (arr.unit_price - arr.unit_cost)*arr.units_sold
        }));
        let listsOfCountry =  array.map(element => {
            return element.country;
        })
        let setCountry = new Set;
        listsOfCountry.forEach(element => {
            setCountry.add(element);
        })
        listsOfCountry = Array.from(setCountry);

        const triRegion = (array, region) => {
          return array.filter((arr)=> arr.region === region);           
        }

        const offlineTriFunction = (array, salesChannels) => {
            return array.filter((arr) => arr.sales_channel === salesChannels);
        }
        const onlineTriFunction = (array, salesChannels) => {
            return array.filter((arr) => arr.sales_channel === salesChannels);
        }

        const sumBeneficeFunction = (newArray, beneficeTotalContainer) => {
            let newArrayBenefices =  newArray.map((arr)=>arr.benefice_total);
            let sumBeneficeTotal =  newArrayBenefices.reduce((sum, val)=>sum + val);
            beneficeTotalContainer.innerHTML = sumBeneficeTotal;
        }

        const sumMarchandiseFunction = (newArray, marchandiseTotalContainer) => {
            let newArrayMarchandises =  newArray.map((arr)=>arr.units_sold);
            let sumMarchandiseTotal =  newArrayMarchandises.reduce((sum, val)=>sum + val);
            marchandiseTotalContainer.innerHTML = sumMarchandiseTotal;
        }

        let list;
        const createLineTable = (regionArray) => {
            regionArray.forEach((elements)=> {
                createTr = document.createElement('tr');
                createTr.classList.add('trace-row');
                tbody.appendChild(createTr);
                for (const key in elements) {
                    if (Object.hasOwnProperty.call(elements, key)) {
                        let element = elements[key];
                        createTd = document.createElement('td');
                        createTr.appendChild(createTd);
                        createTd.innerHTML = `<span class= 'value' >${element}</span>`;
                    }
                }
            });
            list = document.querySelectorAll('.trace-row');            
        }
        
        /* Debut de manipulation DOM */
        createLineTable(newArray);
        sumBeneficeFunction(newArray, beneficeTotalContainer);
        sumMarchandiseFunction(newArray, marchandiseTotal);
        let indiceInitiale = 0; //indice initiale pour l'createLineTable du tableau
        let indiceDePage = 10;  //indice utilisé pour afficher la page en 10 par 10
        let pageActuel = 1; // on initialise le compteur de page actuel à 1;
        let totalPages;
        const displayList = (indiceInitiale, indiceDePage) => {
                for (let index = indiceInitiale; index < indiceInitiale + indiceDePage; index++) {
                    if (list[index]) {
                        list[index].style.display = 'revert';
                    }
                }
        }
        //fonction qui gere le bouton precedent et next
        const updateButtons = () => {
            if (list.length%indiceDePage === 0) {
                    totalPages =  Math.trunc(list.length / indiceDePage); 
                }
            else{
                totalPages =  Math.trunc(list.length / indiceDePage) + 1; 
            }
            if (pageActuel === 1) {
                btnPreview.disabled = true; 
            } else {
                btnPreview.disabled = false; 
            }

            if (pageActuel === totalPages) { 
                btnNext.disabled = true;
            } else {
                btnNext.disabled = false;
            }
        }

        displayList(indiceInitiale, indiceDePage);
        updateButtons();
        btnNext.addEventListener('click', () => {
            pageActuel++;
            updateButtons();
            for (let i = indiceInitiale; i < indiceInitiale + indiceDePage; i++) {
               list[i].style.display = 'none';
            }
            indiceInitiale = indiceInitiale + indiceDePage;
            displayList(indiceInitiale, indiceDePage);                
        });
        // Masquez les éléments actuellement affichés
        btnPreview.addEventListener('click', () => {
            pageActuel--;
            updateButtons();
            for (let index = indiceInitiale; index < indiceInitiale + indiceDePage; index++) {
                if (list[index]) {
                    list[index].style.display = 'none';
                }
            }
            indiceInitiale -= indiceDePage;        
            displayList(indiceInitiale, indiceDePage);
        });

        regions = array.map(arr => {
            return arr.region;
        });

        let setRegion = new Set;
        regions.forEach(region => {
            setRegion.add(region);
        });
        const regionAfterSet = Array.from(setRegion);
        let selectRegion = document.querySelector('.region');

        const selectAddContainer = (arrayAfterSet, selectContainer, className) => {
            arrayAfterSet.forEach((optionValue, index) => {
                selectContainer.innerHTML += `<option value = "${optionValue}" class = "${className}">${optionValue}</option>`;
            }); 

        }
        
        let dataBeneficeParRegion = [];
        regionAfterSet.forEach(element => {
            let filter = newArray.filter(arr => {
                return arr.benefice_total && arr.region === element;
            })
            let beneficeParRegion = filter.map(arr => {
                return arr.benefice_total;
            })
            let sumParRegion = beneficeParRegion.reduce((sum, e) => {
                return sum + e;
            })
            dataBeneficeParRegion.push(sumParRegion);
        })
        
        
        let salesChannels = array.map(arr => {
            return arr.sales_channel;
        });
        let setSalesChannel = new Set;
        salesChannels.forEach(salesChannel => {
            setSalesChannel.add(salesChannel);
        });
        const salesChannelAfterSet = Array.from(setSalesChannel);
        let  newRegion = newArray ; //
        let selectRegionValue ;
        selectAddContainer(regionAfterSet, selectRegion, 'region-option');
        selectRegion.addEventListener('change', () => {
            indiceInitiale = 0;
            pageActuel = 1;
            selectRegionValue = selectRegion.value;
            list.forEach(element => {
                if(element.parentNode){
                    tbody.removeChild(element);
                }
            })

            if(selectRegionValue === 'tous'){
                newRegion = newArray ;
                sumBeneficeFunction(newArray, beneficeTotalContainer);
                sumMarchandiseFunction(newArray, marchandiseTotal);
                createLineTable(newArray);
            }
            else{
              newRegion = triRegion(newArray, selectRegionValue);
                sumBeneficeFunction(newRegion, beneficeTotalContainer);
                sumMarchandiseFunction(newRegion, marchandiseTotal);
                createLineTable(newRegion);
            }
            updateButtons();
            displayList(indiceInitiale, indiceDePage);  
            let channelOptions = document.querySelectorAll('.channel-option');
            channelOptions.forEach(element => {
                if(element.parentNode){
                    if((element.innerHTML !== 'Tous')){
                        selectChannel.removeChild(element);
                    }
                }
            })
            selectAddContainer(salesChannelAfterSet, selectChannel, 'channel-option');
        });

        let selectChannelValue;
        let selectChannel = document.querySelector('.sales-channel');
        selectAddContainer(salesChannelAfterSet, selectChannel, 'channel-option');

        selectChannel.addEventListener('change', () => {
            pageActuel = 1;   
            indiceInitiale = 0;
            selectChannelValue = selectChannel.value;
            list.forEach(element => {
                if(element.parentNode){
                    tbody.removeChild(element);
                }
            });
            let newSalesChannels;
            
            if (selectChannelValue === 'tous') {
                createLineTable(newRegion);     
                updateButtons();
                displayList(indiceInitiale, indiceDePage);
            }
            if (selectChannelValue === 'Offline') {
                newSalesChannels = offlineTriFunction(newRegion, selectChannelValue);
                createLineTable(newSalesChannels);     
                updateButtons();
                displayList(indiceInitiale, indiceDePage);
            }else if (selectChannelValue === 'Online'){
                newSalesChannels = onlineTriFunction(newRegion, selectChannelValue);
                createLineTable(newSalesChannels);     
                updateButtons();
                displayList(indiceInitiale, indiceDePage);

            }        
            
        })


        let arrayDate = array.map(arr => {
            return arr.ship_date;
        })
        console.log(arrayDate);
        let dateYears = [];
        arrayDate.forEach(date => {
            dateYears.push(date.substr(0, 4));
        })
        console.log(dateYears);
        let setYear = new Set() 
        dateYears.forEach(dateYear =>{
            setYear.add(dateYear);
        })    
        let dateYearAfterSet =  Array.from(setYear)
        console.log(setYear);
        console.log(dateYearAfterSet);
        dateYearAfterSet = dateYearAfterSet.sort((a, b) =>a-b);
        console.log(dateYearAfterSet);
        let dataBeneficeParYear = [];
        let filterDate
        dateYearAfterSet.forEach(element => {
            filterDate = newArray.filter(arr => {
                return arr.benefice_total && (arr.ship_date >= `${element}` &&  arr.ship_date < `${element + 1}`);
            })
            console.log(filterDate);
            let beneficeParYear = filterDate.map(arr => {
                return arr.benefice_total;
            })
                  
            let sumParYear = beneficeParYear.reduce((sum, e) => {
                return sum + e;
            },0)
            dataBeneficeParYear.push(sumParYear);    

        })
        console.log(dataBeneficeParYear);
        console.log(dateYearAfterSet);
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: regionAfterSet,
              datasets: [{
                label: '',
                data: dataBeneficeParRegion,
                borderWidth: 1,
                color: 'green',
                backgroundColor: ['#FFFC31', '#38A700', '#2CDA9D', '#E94F37', '#393E41', '#48BEFF', '#E9EBF8'],  
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

        const ctxYear = document.getElementById('myChart-year');
        new Chart(ctxYear, {
            type: 'line',
            data: {
              labels: dateYearAfterSet,
              datasets: [{
                label: 'Benefice par an',
                data: dataBeneficeParYear,
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
        // let statLink = document.querySelector('.stat-link');
        // let statLinks = document.querySelectorAll('.stat-none');
        // statLink.addEventListener('click', () => {
        //     statLinks.forEach(element =>{
        //         element.classList.toggle('stat-link-toggle');
        //     })
        // })
        
    });





