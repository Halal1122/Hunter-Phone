const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)

}


const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';  

    const showAllBtn = document.getElementById('btn-container')
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }
    else{
        showAllBtn.classList.add('hidden');
    }
    console.log('is show all', isShowAll)
    // diplay onle 12 phone
    if(!isShowAll){
        phones = phones.slice(0,12 )
    }

    phones.forEach(phone => {
        console.log(phone);
        
        const phoneCrad = document.createElement('div');
        phoneCrad.classList = `card bg-stone-100 p-8 shadow-xl`
        phoneCrad.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="clickShowAllDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCrad);
    })
    loadingSpinner(false);
}
// show all details btn
const clickShowAllDetails = async (id)=>{
    console.log('show all details', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data)
}

// hendel Search Btn
const hendelSearch =(isShowAll)=>{
    loadingSpinner(true);
    const InputItemField = document.getElementById('input-field')
    const searchText = InputItemField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const loadingSpinner = (isLodding)=>{
    const loadingSpinnerToggel = document.getElementById('loading-spinner')
    if(isLodding){
        loadingSpinnerToggel.classList.remove('hidden')
    }
    else{
        loadingSpinnerToggel.classList.add('hidden')
    }
}

// show all btn
const showAllBtn = () =>{
    hendelSearch(true);
}

