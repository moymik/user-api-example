
const users = [];
let currentId = 1;
export default {
  getUsers: () => users,
  addUser: (user) => {
    user.id = currentId++;
    users.push(user);
  },
  updateUser: (id, updatedData) => {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      return users[userIndex] = { ...users[userIndex], ...updatedData };
    }
    return null;
  },
  deleteUser: (id) => {
    
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return true;
    }
    return false;
  },
  getUserById: (id) => {
    const user = users.find((u) => id === u.id);
    return user ? user:null
  },
};
