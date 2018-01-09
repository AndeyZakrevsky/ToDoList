var toDoTasks = [];
var i;
var userType;
var person;
var createUser=document.querySelector('#createUser');
var getChange =document.querySelector('#sel');
var home_task= document.querySelector('.homeTask');
var project_task = document.querySelector('.projTask');


//constructors for differents types of tasks
    function SimpleTask(title,status) {
        this.title =title;
        this.status =status;
    }
        function HomeTask(title,status,description) {
            SimpleTask.call(this,title,status);
            this.description = description;
        }
            function ProjectTask(title,status,description,deadline) {
                HomeTask.call(this,title,status,description);
                this.deadline = deadline;
            }

//constructors for differents types of users
    function MakeUser(name,surname,typeofUser) {
        this.name = name;
        this.surname= surname;
        this.typeOfUser = typeofUser;
    }
        function MakeStudent(name,surname,typeofUser,Specialization){
            MakeUser.call(this ,name,surname,typeofUser);
            this.specialization = Specialization;
        }
            function MakeDeveloper(name,surname,typeofUser,Specialization, jobtittle){
                MakeStudent.call(this ,name,surname,typeofUser,Specialization);
                this.jobTittle = jobtittle;
            }

//Create Styles
getChange.addEventListener('change',function getSelectValue(){
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
    var name= document.querySelector('#name').value;
    var surname = document.querySelector('#surname').value;
    var spec = document.querySelector('#spec').value;
    var jobTitle = document.querySelector('#jobt').value;

        switch (userType){
        case 'user':
            person = new MakeUser(name,surname,userType);
            home_task.disabled=true;
            project_task.disabled=true;
            home_task.addEventListener('click',noHomeTask);
            project_task.addEventListener('click',noHomeTask);
            break;
        case 'student':
            person = new MakeStudent(name,surname,userType,spec);
            project_task.disabled=true;
            project_task.addEventListener('click',noProjectTask);
            break;
        case 'developer':
            person = new MakeDeveloper(name,surname,userType,spec,jobTitle);
            break;
    }
});

//Create Tasks for User
    function addSimpleTask(){
        var title = document.querySelector('.title').value;
        var status = document.querySelector('.status').value;
        person.task = new SimpleTask(title,status);
        pushData();
        stylesForTascks();
    }
        function addHomeTask(){
            var title = document.querySelector('.title1').value;
            var status = document.querySelector('.status1').value;
            var description= document.querySelector('.comment1').value;
            person.task= new HomeTask(title,status,description);
            pushData();
            stylesForTascks();
        }
            function addProjectTask() {
                var title = document.querySelector('.title2').value;
                var status = document.querySelector('.status2').value;
                var description= document.querySelector('.comment2').value;
                var deadline = document.querySelector('.deadline2').value;
                person.task= new ProjectTask(title,status,description,deadline);
                pushData();
                stylesForTascks();
            }

//we paste the data into HTML
function pushData() {
    var Data=document.querySelector('.modal-body');
    for(var key in person){
       if( key !== 'task'){
           Data.innerHTML +=  key.toUpperCase() + ' : ' +person[key] +"<BR>" ;
        }
    }
    for(var id in person.task){
        Data.innerHTML += id.toUpperCase()+ ' : ' +person.task[id] +"<BR>" ;
    }
    Data.innerHTML += "<BR>" +"<HR>" ;
    i = toDoTasks.length;
    toDoTasks[i]= person;
    person = false;
}
console.log(toDoTasks);

function noHomeTask() {
    alert("User can not do this task!!");
}

function noProjectTask(){
    alert("Student can not do this task!!");
}

function stylesForTascks() {
    project_task.disabled = false;
    home_task.disabled = false;
    project_task.removeEventListener("click",noHomeTask);
    home_task.removeEventListener("click",noHomeTask);
    project_task.removeEventListener("click",noProjectTask);
}