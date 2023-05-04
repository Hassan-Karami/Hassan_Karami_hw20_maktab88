"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
class UserService {
    constructor() {
        this.storageKey = "users";
    }
    createUser(user) {
        const users = this.getAllUsers();
        users.push(user);
        this.saveUsers(users);
    }
    readUser(id) {
        const users = this.getAllUsers();
        return users.find(user => user.id === id) || null;
    }
    updateUser(user) {
        const users = this.getAllUsers();
        const targetUser = users.find(u => u.id === user.id);
        if (targetUser) {
            if (!!user.first_name.trim())
                targetUser.first_name = user.first_name;
            if (!!user.last_name.trim())
                targetUser.last_name = user.last_name;
            if (!!user.email.trim())
                targetUser.email = user.email;
            if (!!user.avatar.trim())
                targetUser.avatar = user.avatar;
        }
        this.saveUsers(users);
    }
    deleteUser(id) {
        let users = this.getAllUsers();
        users = users.filter(user => user.id !== id);
        this.saveUsers(users);
    }
    getAllUsers() {
        const data = localStorage.getItem(this.storageKey) || '[]';
        return JSON.parse(data);
    }
    saveUsers(users) {
        const data = JSON.stringify(users);
        localStorage.setItem(this.storageKey, data);
    }
}
const userService = new UserService;
//create Dom
const firstName_create_input = document.querySelector('#firstName_create_input');
const lastName_create_input = document.querySelector('#lastName_create_input');
const email_create_input = document.querySelector('#email_create_input');
const avatar_create_input = document.querySelector('#avatar_create_input');
//update Dom
const firstName_update_input = document.querySelector('#firstName_update_input');
const lastName_update_input = document.querySelector('#lastName_update_input');
const email_update_input = document.querySelector('#email_update_input');
const avatar_update_input = document.querySelector('#avatar_update_input');
const id_update_input = document.querySelector('#id_update_input');
const create_btn = document.getElementById("create_btn");
const update_btn = document.getElementById("update_btn");
const delete_btn = document.getElementById("delete_btn");
//delete Dom
const id_delete_input = document.querySelector('#id_delete_input');
//seed localstorage by reqres users
const seed_btn = (_a = document.getElementById("seed")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    const responseObject = yield fetch("https://reqres.in/api/users");
    const response = yield responseObject.json();
    localStorage.clear();
    userService.saveUsers(response.data);
}));
//create Button function
create_btn === null || create_btn === void 0 ? void 0 : create_btn.addEventListener("click", (e) => {
    const first_name = String(firstName_create_input === null || firstName_create_input === void 0 ? void 0 : firstName_create_input.value);
    const last_name = String(lastName_create_input === null || lastName_create_input === void 0 ? void 0 : lastName_create_input.value);
    const email = String(email_create_input === null || email_create_input === void 0 ? void 0 : email_create_input.value);
    const avatar = String(avatar_create_input === null || avatar_create_input === void 0 ? void 0 : avatar_create_input.value);
    const id = Number(Date.now());
    const newUser = { first_name, last_name, email, avatar, id };
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
    if (avatar_create_input) {
        avatar_create_input.value = '';
    }
});
//update Button function
update_btn === null || update_btn === void 0 ? void 0 : update_btn.addEventListener("click", (e) => {
    const first_name = String(firstName_update_input === null || firstName_update_input === void 0 ? void 0 : firstName_update_input.value);
    const last_name = String(lastName_update_input === null || lastName_update_input === void 0 ? void 0 : lastName_update_input.value);
    const email = String(email_update_input === null || email_update_input === void 0 ? void 0 : email_update_input.value);
    const avatar = String(avatar_update_input === null || avatar_update_input === void 0 ? void 0 : avatar_update_input.value);
    const id = Number(id_update_input === null || id_update_input === void 0 ? void 0 : id_update_input.value);
    const updateBody = { id, first_name, last_name, email, avatar };
    userService.updateUser(updateBody);
});
//delete Button function
delete_btn === null || delete_btn === void 0 ? void 0 : delete_btn.addEventListener("click", (e) => {
    const id = Number(id_delete_input === null || id_delete_input === void 0 ? void 0 : id_delete_input.value);
    userService.deleteUser(id);
    if (!!id_delete_input) {
        id_delete_input.value = "";
    }
});
