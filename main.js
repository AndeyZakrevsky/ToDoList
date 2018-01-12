var count = false;
var userType;
var person;
var createUser=document.querySelector('#createUser');
var getChange =document.querySelector('#sel');
var home_task= document.querySelector('.homeTask');
var project_task = document.querySelector('.projTask');


//constructors for differents types of tasks
function SimpleTask(obj) {
    this.title = obj.title;
    this.status = obj.status;
}
function HomeTask(obj) {
    SimpleTask.call(this,obj);
    this.description = obj.description;
}
function ProjectTask(obj) {
    HomeTask.call(this,obj);
    this.deadline = obj.deadline;
}

//constructors for differents types of users
function MakeUser(obj) {
    this.name = obj.name;
    this.surname= obj.surname;
    this.typeOfUser = obj.typeofUser;
}
function MakeStudent(obj){
    MakeUser.call(this ,obj);
    this.specialization = obj.spec;
}
function MakeDeveloper(obj){
    MakeStudent.call(this ,obj);
    this.jobTittle = obj.jobTitle;
}

//Create Styles
getChange.addEventListener('change',function(){
    var  spec = document.querySelector('#spec');
    var jobTitle = document.querySelector('#jobt');
    userType = this.value;

    switch (userType){
        case'user':
            spec.style.display ='none';
            jobTitle.style.display ='none';
            break;
        case 'student':
            spec.style.display ='block';
            jobTitle.style.display ='none';
            break;
        case 'developer':
            spec.style.display ='block';
            jobTitle.style.display ='block';
            break;
    }
});

//Create User
createUser.addEventListener('click', function () {
    document.querySelector('.wrap2').style.visibility = 'visible';
    person = false;
    var userData={
        name:document.querySelector('#name').value,
        surname:document.querySelector('#surname').value,
        spec:document.querySelector('#spec').value,
        jobTitle:document.querySelector('#jobt').value,
        typeofUser:userType
    };
    if(count) stylesForTascks();

    switch (userType){
        case 'user':
            person = new MakeUser(userData);
            home_task.disabled=true;
            project_task.disabled=true;
            home_task.addEventListener('click',noTask);
            project_task.addEventListener('click',noTask);
            break;
        case 'student':
            person = new MakeStudent(userData);
            project_task.disabled=true;
            project_task.addEventListener('click',noTask);
            break;
        case 'developer':
            person = new MakeDeveloper(userData);
            break;
    }
});

//Create Tasks for User
function addSimpleTask(){
    var task = {
        title:document.querySelector('.title').value,
        status:document.querySelector('.status').value
    };
    person.task = new SimpleTask(task);
    pushData();
}
function addHomeTask(){
    var task = {
        title:document.querySelector('.title1').value,
        status:document.querySelector('.status1').value,
        description:document.querySelector('.comment1').value
    };
    person.task= new HomeTask(task);
    pushData();
}
function addProjectTask() {
    var task = {
        title:document.querySelector('.title2').value,
        status:document.querySelector('.status2').value,
        description:document.querySelector('.comment2').value,
        deadline:document.querySelector('.deadline2').value
    };
    person.task= new ProjectTask(task);
    pushData();
}

//we paste the data into HTML
function pushData() {
    var Data=document.querySelector('.modal-body');
    for(var key in person){
        if( key !== 'task'){
            Data.innerHTML +=  key.toUpperCase() + ' : ' +person[key] +"<br>" ;
        }
    }
    for(var id in person.task){
        Data.innerHTML += id.toUpperCase()+ ' : ' +person.task[id] +"<br>" ;
    }
    Data.innerHTML += "<br>" +"<hr>" ;
    count = true;
    alert("YOU CREATED A NEW TASK");
    document.getElementById("myForm").reset();
    document.getElementById("myForm2").reset();
    document.getElementById("myForm3").reset();
    document.getElementById("myForm4").reset();
}

function noTask() {
    if(userType ==="user") {
        alert( " User can not do this task!!");
    }else{
        alert( " Student can not do this task!!");
    }
}


function stylesForTascks() {
    project_task.disabled = false;
    home_task.disabled = false;
    project_task.removeEventListener("click",noTask);
    home_task.removeEventListener("click",noTask);
    project_task.removeEventListener("click",noTask);
}