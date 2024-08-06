const getUSerName = document.querySelector("#user") as HTMLInputElement;
const formSubmit = document.querySelector("#form") as HTMLFormElement; 
const main_container = document.querySelector(".main_container") as HTMLElement;

interface userData {
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string
}

const myCustomFetcher =async <T>  (url:string) :Promise<T>=>{
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Network response was not ok : ${response.status} `);
    }
    const data = await response.json();
    return data;
}

const showResultUI = (singleUser:userData) =>{
    const{avatar_url,login,url} = singleUser;
    main_container.insertAdjacentHTML(
        "beforeend",
        `<div class='card'> 
        <img src=${avatar_url} alt=${login} />
        <hr />
        <div class="card-footer">
          <img src="${avatar_url}" alt="${login}" /> 
          <span> ${login}</span>'
          <a href="${url}"> Github </a>
        </div>
        </div>
        `
    );

}

const fetechUserData = (url:string) =>{
    myCustomFetcher<userData[]>(url).then((userInfo) =>{
        for(const singleUser of userInfo){
        
            showResultUI(singleUser);
            
        }

    })

}



fetechUserData("https://api.github.com/users")


let searchFunctionality


formSubmit.addEventListener('submit',async (e) =>{
    e.preventDefault();
    const serachTerm = getUSerName.value.toLowerCase();

    try{
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher<userData[]>(url);
        
        const matchingUser = allUserData.filter((user) =>{
            return user.login.toLowerCase().includes(serachTerm);
        })
        main_container.innerHTML = "";
        if(matchingUser.length ===0){
            main_container?.insertAdjacentHTML(
                "beforeend",
        `<p class="empty-msg">No matching users found.</p>`
    )} else{
        for(const singleUser of matchingUser){
            showResultUI(singleUser);
        }
    }
        }
    
    catch(error){
        console.log(error)
    }

})