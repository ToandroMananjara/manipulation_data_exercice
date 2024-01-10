export {filterResults, listOfCountry , sumBeneficeFunction, sumMarchandiseFunction, setFunction, selectAddContainer }
export {dataPerYear, beneficeTotalAppend,sumMarchandiseAppend, offlineTriFunction, onlineTriFunction}
import { SalesList } from "../components/SalesList.js";
const  filterResults = (inputSearch, datas, container)=> {
    let searchTerm = inputSearch.value.toLowerCase();

    // Filtrer les résultats en fonction du terme de recherche
    let filteredData = datas.filter(data => {
        // Vous pouvez personnaliser cette condition en fonction de votre logique de filtrage
        return data.item_type.toLowerCase().includes(searchTerm);
    });

    // Afficher les résultats filtrés
    container.querySelectorAll('sale-list').forEach(element=>{
        element.remove()
    })
    container?.querySelector('p')?.remove()
    if (filteredData.length === 0) {
        // Aucun résultat trouvé, afficher un message
        let noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'Aucun résultat trouvé pour : ' + searchTerm;
        container.appendChild(noResultsMessage);
    } else {
        // Afficher les résultats filtrés
        filteredData.forEach(filteredItem => {
            container.appendChild(new SalesList(filteredItem));
        });
    }
}

const listOfCountry = (datas) => {
    return datas.map(element => {
        return element.country;
    })
}

const sumBeneficeFunction = (datas) => {
    let newArrayBenefices =  datas.map((arr)=>(arr.unit_price - arr.unit_cost)*arr.units_sold);
    return  newArrayBenefices.reduce((sum, val)=>sum + val);
}

const sumMarchandiseFunction = (datas) => {
    let newArrayMarchandises =  datas.map((arr)=>arr.units_sold);
    return newArrayMarchandises.reduce((sum, val)=>sum + val);
}
const beneficeTotalAppend = (datas, beneficeTotalContainer) => {
            let beneficeTotal = sumBeneficeFunction(datas)
            beneficeTotalContainer.innerHTML = beneficeTotal
       }
const sumMarchandiseAppend = (datas, marchandiseTotalContainer )=>{
            let marchandiseTotal = sumMarchandiseFunction(datas)
            marchandiseTotalContainer.innerHTML = marchandiseTotal
        }
const setFunction = (datas, type) => {
    let setRegion = new Set(datas.map(arr => arr[type]));
    return Array.from(setRegion);
}

const selectAddContainer = (arrayAfterSet, selectContainer, className) => {
    arrayAfterSet.forEach((optionValue, index) => {
        selectContainer.innerHTML += `<option value = "${optionValue}" class = "${className}">${optionValue}</option>`;
    }); 

}

const offlineTriFunction = (array, salesChannels) => {
    return array.filter((arr) => arr.sales_channel === salesChannels);
}
const onlineTriFunction = (array, salesChannels) => {
    return array.filter((arr) => arr.sales_channel === salesChannels);
}

const dataPerYear = (datas) =>{
            let arrayDate = datas.map(arr => {
            return arr.ship_date;
        })
        let dataYears = [];
        arrayDate.forEach(date => {
            dataYears.push(date.substr(0, 4));
        })
        let setYears = Array.from(new Set(dataYears.map(arr => arr)))
        setYears = setYears.sort((a, b) =>a-b);

        let beneficeParYear = []
        setYears.forEach(element => {
           let filterDate = datas.filter(arr => {
                return arr.ship_date >= `${element}` &&  arr.ship_date < `${element + 1}`;
            })
            let beneficeYear = sumBeneficeFunction(filterDate)
            beneficeParYear.push(beneficeYear)
        })
        return {
            'year': setYears,
            'benefice':beneficeParYear
        }
}