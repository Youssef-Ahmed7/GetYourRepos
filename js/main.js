let input = document.querySelector(".container .content input");
let button = document.querySelector(".container .content button");
let repSection = document.querySelector(".repos");
button.addEventListener("click" , function(){
    if (input.value === '' ){
        repSection.innerHTML = "<p>Please Enter Your User Name</p>"
        
    }else{
        repSection.innerHTML = " ";
        getData();
    }
})
function getData (){
    fetch(`https://api.github.com/users/${input.value}/repos`).then((response)=>{
        return response.json();
    }).then((Data)=>{
         Data.forEach((e)=>{
            let repoName = e.name;
            let repoStars = e.stargazers_count;
            let repoLink = e.clone_url;
               createElements(repoName , repoStars, repoLink);
         });
    }).catch((error)=>{
        repSection.innerHTML ='<p>User Name Is Not Found</p>'
    })
}
function createElements ( repoName , repoStars , repoLink){
    let mainDiv = document.createElement("div");
    let p = document.createElement("p");
    let pTextNode = document.createTextNode(repoName);
    let secondDiv = document.createElement("div");
    let iconSpan = document.createElement("span");
    let spanTextNode = document.createTextNode(repoStars);
    iconSpan.append(spanTextNode);
    p.append(pTextNode) ;
    mainDiv.appendChild(p);
    let i = document.createElement("i");
     i.setAttribute("class" , "fa-solid fa-star");
     secondDiv.appendChild(iconSpan);
     secondDiv.appendChild(i);
    let aLink = document.createElement("a");
    let aTextNode = document.createTextNode("Review");
    aLink.setAttribute("href" , repoLink);
    aLink.append(aTextNode);
    secondDiv.appendChild(aLink);
    mainDiv.appendChild(secondDiv);
    repSection.appendChild(mainDiv);
}