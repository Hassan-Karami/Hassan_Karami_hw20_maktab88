interface User{
    id:number,
    first_name: string,
    last_name: string,
    email: string,
    avatar:string
}

 class UserService{
    private storageKey= "users";

    createUser(user: User): void {
    const users = this.getAllUsers();
    users.push(user);
    this.saveUsers(users);
  }

  readUser(id: number): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.id === id) || null;
  }

  updateUser(user: User): void {
    const users = this.getAllUsers();    
    const targetUser:User|undefined = users.find(u=>u.id === user.id);

    if(targetUser){
      if(!!user.first_name.trim()) targetUser.first_name=user.first_name;
      if(!!user.last_name.trim()) targetUser.last_name=user.last_name
      if(!!user.email.trim()) targetUser.email=user.email
      if(!!user.avatar.trim()) targetUser.avatar=user.avatar
    }
    this.saveUsers(users);
  }

  deleteUser(id: number): void {
    let users = this.getAllUsers();
    users = users.filter(user => user.id !== id);
    this.saveUsers(users);
  }

    public getAllUsers(): User[] {
    const data = localStorage.getItem(this.storageKey) || '[]';
    return JSON.parse(data);
    }

    public saveUsers(users:User[]): void{
        const data = JSON.stringify(users);
        localStorage.setItem(this.storageKey,data);
    } 


}




const userService = new UserService;
//create Dom
// const firstName_create_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#firstName_create_input');
// const lastName_create_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#lastName_create_input');
// const email_create_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#email_create_input');
// const avatar_create_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#avatar_create_input');
const firstName_create_input = document.getElementById("firstName_create_input") as HTMLInputElement;
const lastName_create_input = document.getElementById("lastName_create_input") as HTMLInputElement;
const email_create_input = document.getElementById("email_create_input") as HTMLInputElement;
const avatar_create_input = document.getElementById("avatar_create_input") as HTMLInputElement;

//update Dom
// const firstName_update_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#firstName_update_input');
// const lastName_update_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#lastName_update_input');
// const email_update_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#email_update_input');
// const avatar_update_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#avatar_update_input');
// const id_update_input:HTMLInputElement|null = document.querySelector<HTMLInputElement>('#id_update_input');
const firstName_update_input = document.getElementById("firstName_update_input") as HTMLInputElement;
const lastName_update_input = document.getElementById("lastName_update_input") as HTMLInputElement;
const email_update_input = document.getElementById("email_update_input") as HTMLInputElement;
const avatar_update_input = document.getElementById("avatar_update_input") as HTMLInputElement;
const id_update_input = document.getElementById("id_update_input") as HTMLInputElement;

//buttons dom
const create_btn = document.getElementById("create_btn");
const update_btn = document.getElementById("update_btn");
const delete_btn = document.getElementById("delete_btn");
const get_all_users_btn = document.getElementById("get_all_users_btn");
const get_user_btn = document.getElementById("get_user_btn");

//delete Dom
const id_delete_input = document.getElementById("id_delete_input") as HTMLInputElement;
//text_area dom
const text_area = document.getElementById("text_area") as HTMLTextAreaElement;
//get single user Dom
const targetUser_id_input = document.getElementById("targetUser_id_input") as HTMLInputElement;
const targetUser_firstName_input = document.getElementById("targetUser_firstName_input") as HTMLInputElement;
const targetUser_lastName_input = document.getElementById("targetUser_lastName_input") as HTMLInputElement;
const targetUser_email_input = document.getElementById("targetUser_email_input") as HTMLInputElement;
const targetUser_avatar_input = document.getElementById("targetUser_avatar_input") as HTMLInputElement;

//seed localstorage by reqres users
const seed_btn = document.getElementById("seed")?.addEventListener("click",async(e)=>{
   const responseObject = await fetch("https://reqres.in/api/users");
   const response = await responseObject.json();
   localStorage.clear();
   userService.saveUsers(response.data) 
})

//create Button function
create_btn?.addEventListener("click",(e)=>{
const first_name = String(firstName_create_input?.value);
const last_name = String(lastName_create_input?.value);
const email = String(email_create_input?.value);
const avatar = String(avatar_create_input?.value);
const id = Number(Date.now());
const newUser:User = {first_name,last_name,email,avatar,id};
userService.createUser(newUser);
alert("created successfully")
  firstName_create_input.value = '';
  lastName_create_input.value = '';
  email_create_input.value = '';
  avatar_create_input.value='';
})


//update Button function
update_btn?.addEventListener("click",(e)=>{

const first_name = String(firstName_update_input.value);
const last_name = String(lastName_update_input.value);
const email = String(email_update_input.value);
const avatar = String(avatar_update_input.value);
const id = Number(id_update_input.value)
const updateBody: User = {id,first_name,last_name,email,avatar};
userService.updateUser(updateBody); 
alert("updated successfully");
firstName_update_input.value="";
lastName_update_input.value="";
id_update_input.value="";
email_update_input.value="";
avatar_update_input.value="";
})


//delete Button function
delete_btn?.addEventListener("click",(e)=>{
  const id = Number(id_delete_input.value);
  userService.deleteUser(id);
  if(!!id_delete_input){
    id_delete_input.value="";
  }
  alert("deleted successfully");
  id_delete_input.value="";
})

//get all users and print in index.html
get_all_users_btn?.addEventListener("click",(e)=>{
  const usersList = userService.getAllUsers();
  text_area.value = JSON.stringify(usersList)
  
})

//get single user
get_user_btn?.addEventListener("click",(e)=>{
  const id= targetUser_id_input.value;
  const targetUser= userService.readUser(Number(id));
  if(targetUser){
    targetUser_firstName_input.value= targetUser.first_name;
    targetUser_lastName_input.value= targetUser.last_name;
    targetUser_email_input.value= targetUser.email;
    targetUser_avatar_input.value= targetUser.avatar;

    
  }
  
})