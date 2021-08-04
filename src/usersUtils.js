import axios from 'axios';

const usrUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const getAllUsersData = async () => {
    let resp = await axios.get(usrUrl);
    let allUsersdata = resp.data;

    const keys_to_keep = ['id', 'name', 'email', 'address'];
    allUsersdata = allUsersdata.map(element => Object.assign({}, ...keys_to_keep.map(key => ({ [key]: element[key] }))));
    return allUsersdata;
}

const getAllUserTodos = async () => {
    let resp = await axios.get(todosUrl);
    return resp.data;
}

const getAllUserPosts = async () => {
    let resp = await axios.get(postsUrl);
    return resp.data;
}

export default { getAllUsersData, getAllUserTodos, getAllUserPosts };