console.log("this is library")
showbooks()

//show all the books in the table
function showbooks(){
    let bookData=localStorage.getItem("bookData")
    if(bookData==null){
        console.log('the book data is not avaliable')
        return
    }
    else{
        console.log('the book data is avalibale')
        
        bookObj= JSON.parse(bookData)
        // console.log(bookObj)
        let tableBody=document.getElementById('tableBody');
        // // console.log(tableBody)
        // let uiString=`<tr>
        //                 <td>${bookData.name}</td>
        //                 <td>${bookData.author}</td>
        //                 <td>${bookData.type}</td>
        //               </tr>`
        // console.log(uiString)
        // tableBody.innerHTML +=uiString;

        let uiString=""
        bookObj.forEach(function(element){
            uiString +=`<tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
          </tr>`
          tableBody.innerHTML +=uiString;

        });
    }
    
}

function Book(name,author,type){
    this.name=name;
    this.author=author;
    this.type=type;
}

function Display(){
}
Display.prototype.add=function(book){
    let booksData=localStorage.getItem("bookData")
    if(booksData==null){
        bookObj=[]
    }
    else
    {
        bookObj=JSON.parse(booksData)
    }
    let myobj={
        name:book.name,
        author:book.author,
        type:book.type
    }
    bookObj.push(myobj)
    localStorage.setItem("bookData",JSON.stringify(bookObj))
    // console.log('adding to UI')
    let tableBody=document.getElementById('tableBody');
    // console.log(tableBody)
    let uiString=`<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                  </tr>`
    console.log(uiString)
    tableBody.innerHTML +=uiString;
}


Display.prototype.clear=function(){
    let libraryForm=document.getElementById('libraryForm')
    libraryForm.reset();
}

Display.prototype.validate=function(book){
    if (book.name.length<2 || book.author.length<2){
        return false
    }
    else{
        return true
    }
}


Display.prototype.show=function(type,displaymessage){
   let message= document.getElementById('message')
   message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message:</strong> ${displaymessage}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`


    setTimeout(function(){
        message.innerHTML=""
    },2000);
}

let libraryForm=document.getElementById('libraryForm')
libraryForm.addEventListener('submit',libraryFormSubmit);

function libraryFormSubmit(e){
    console.log("you have submited libarary form ")
    let name=document.getElementById('bookName').value;
    let author=document.getElementById('author').value;

    let fiction=document.getElementById('fiction');
    // console.log(fiction)
    let programing=document.getElementById('programing');
    // console.log(programing)
    let cooking=document.getElementById('cooking');
    // console.log(cooking)
    let type;
    if(fiction.checked){
        type=fiction.value
    }
    else if(programing.checked){
        type=programing.value

    }
    else if(cooking.checked){
        type=cooking.value
    }
    else{
        type='NULL'
    }
    // console.log(`your type is this ->${type}`)
    let book=new Book(name,author,type)
    // console.log(book)
    let display =new Display();

   if( display.validate(book)){
        display.add(book)
        display.clear()
        display.show('success','Your book is sucessesfully added !! ')
    }
    else{
        //show error
        display.show("danger",'sorry you cannot add this book')
    }
   
    e.preventDefault()
    
}