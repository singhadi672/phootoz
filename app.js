let input = document.querySelector(".search-input");
const auth = "563492ad6f917000010000015b8f392f37cd435ea4c552d25cf23758";

let gallery = document.querySelector(".gallery");
let submitButton = document.querySelector(".submit-btn");
let moreButton = document.querySelector(".more-btn");
let searchString;
let count =0;
let count1 =0;


async function fetchApi(url){
const fetched = await fetch(url,{
    method: "GET",
    headers:{
        Accept: "application/json",
        Authorization : auth
    }
})
    const data = await fetched.json();
    return data;
}

function fetchImage(data){

    data.photos.forEach(photo => {
        let galleryImage = document.createElement("div");
        galleryImage.classList.add("image");
        let images = `<p>${photo.photographer}</p>
        <img src=${photo.src.large}></img>`;
        galleryImage.innerHTML = images;
        gallery.appendChild(galleryImage);
    });
} 


input.addEventListener("input",(e)=>{
    searchString = e.target.value;
})

submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    clear();
    searchFetch();
    input.value=""; 
})

async function imagesFetch(){
    count1++;
    const url = `https://api.pexels.com/v1/curated?per_page=15&page=${count1}`;
    let data = await fetchApi(url);
    fetchImage(data);
    
}

async function searchFetch(){
    count++;
    const searchUrl = `https://api.pexels.com/v1/search?query=${searchString}&per_page=15&page=${count}`;
    let data = await fetchApi(searchUrl);
    fetchImage(data);
}

function clear(){
    gallery.innerHTML ="";
}



moreButton.addEventListener("click",(e)=>{
    if(count>0){
        searchFetch();  
    }
    else{
        imagesFetch();
    }
})

imagesFetch();
