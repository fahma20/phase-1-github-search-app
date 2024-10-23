// js/index.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting
      const searchInput = document.getElementById('search').value;
      searchUsers(searchInput);
    });
  
    function searchUsers(username) {
      fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      })
      .then(response => response.json())
      .then(data => {
        userList.innerHTML = ''; // Clear previous results
        data.items.forEach(user => displayUser(user));
      })
      .catch(error => console.error('Error fetching users:', error));
    }
  
    function displayUser(user) {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
      `;
      userItem.addEventListener('click', () => fetchUserRepos(user.login));
      userList.appendChild(userItem);
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      })
      .then(response => response.json())
      .then(repos => {
        reposList.innerHTML = ''; // Clear previous results
        repos.forEach(repo => displayRepo(repo));
      })
      .catch(error => console.error('Error fetching repos:', error));
    }
  
    function displayRepo(repo) {
      const repoItem = document.createElement('li');
      repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      reposList.appendChild(repoItem);
    }
  });
  