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

    private getAllUsers(): User[] {
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
const firstName_create_input = document.querySelector<HTMLInputElement>('#firstName_create_input');
const lastName_create_input = document.querySelector<HTMLInputElement>('#lastName_create_input');
const email_create_input = document.querySelector<HTMLInputElement>('#email_create_input');
const avatar_create_input = document.querySelector<HTMLInputElement>('#avatar_create_input');

//update Dom
const firstName_update_input = document.querySelector<HTMLInputElement>('#firstName_update_input');
const lastName_update_input = document.querySelector<HTMLInputElement>('#lastName_update_input');
const email_update_input = document.querySelector<HTMLInputElement>('#email_update_input');
const avatar_update_input = document.querySelector<HTMLInputElement>('#avatar_update_input');
const id_update_input = document.querySelector<HTMLInputElement>('#id_update_input');

const create_btn = document.getElementById("create_btn");
const update_btn = document.getElementById("update_btn");
const delete_btn = document.getElementById("delete_btn");
//delete Dom
const id_delete_input = document.querySelector<HTMLInputElement>('#id_delete_input');

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

if (firstName_create_input) {
  firstName_create_input.value = '';
}
if (lastName_create_input) {
  lastName_create_input.value = '';
}
if (email_create_input) {
  email_create_input.value = '';
}
if(avatar_create_input){
    avatar_create_input.value='';
}

})


//update Button function
update_btn?.addEventListener("click",(e)=>{

const first_name = String(firstName_update_input?.value);
const last_name = String(lastName_update_input?.value);
const email = String(email_update_input?.value);
const avatar = String(avatar_update_input?.value);
const id = Number(id_update_input?.value)
const updateBody: User = {id,first_name,last_name,email,avatar};
userService.updateUser(updateBody); 
})


//delete Button function
delete_btn?.addEventListener("click",(e)=>{
  const id = Number(id_delete_input?.value);
  userService.deleteUser(id);
  if(!!id_delete_input){
    id_delete_input.value="";
  }
})
