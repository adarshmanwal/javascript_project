
showNotes();

//If user add a note add it to the localstorage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addText=document.getElementById('addText');
    let addTitle=document.getElementById("addTitle");
    let notes=localStorage.getItem("notes")
    if(notes == null){
        notesObj=[];
        notesTitle=[];
    }
    else{
        notesObj= JSON.parse(notes)
    }
    let myobj={
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myobj)
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addText.value="";
    addTitle.value="";
    console.log(notes)
    showNotes();
})

function showNotes(){
    // debugger
    let title=localStorage.getItem("Title") || "[]";
    let notes=localStorage.getItem("tesno") || "[]";
    if(notes == null){
        notesObj=[];
        notesTitle=[];
    }
    else{
        notesObj= JSON.parse(notes)
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html+=`
            <div class="noteCard card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title }</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    })
    let notesElm=document.getElementById('notes');
    if(notesObj.length != 0){
        console.log("is not empy ")
        notesElm.innerHTML=html;
    }
    else{
        console.log("not the log is empty")
        notesElm.innerHTML=`noting to show`
    }

}

function deleteNote(index){
    console.log("I am deleting ",index)

    let notes=localStorage.getItem("notes")
    if(notes == null){
        notesObj=[];
    }
    else{
        notesObj= JSON.parse(notes)
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();

}
let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
    // debugger
    let inputval=search.value
    // console.log("input event fird",inputval)
    let noteCard=document.getElementsByClassName('noteCard')
    Array.from(noteCard).forEach(function(element){
        let cardText=element.getElementsByTagName("p")[0].innerText;
        console.log(cardText)
        if(cardText.includes(inputval)){
            element.style.display="block"
        }
        else{
            element.style.display='none'
        }
    })
})