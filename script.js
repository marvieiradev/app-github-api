const searchBtn = document.getElementById('searchBtn');
const profileImg = document.getElementById('profileImg');
const profileName = document.getElementById('profileName');
const profileBio = document.getElementById('profileBio');
const profileFollowers = document.getElementById('profileFollowers');
const profileFollowing = document.getElementById('profileFollowing');
const profileRepos = document.getElementById('profileRepos');

searchBtn.addEventListener('click', handleSearch);

async function getProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (data.message == "Not Found")
        return null;
    return data;
}

async function getRepositories(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();

    if (data.message == "Not Found")
        return null;
    return data;
}


async function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const username = searchInput.value;

    if (!username) return;
    updateProfile('none');
    const data = await getProfile(username);

    if (!data) {
        alert("Não Encontrado")
    }

    const repositories = await getRepositories(username);
    updateProfile(data);
    updateRepositories(repositories);
    updateProfileDisplay('flex')
}

function updateProfile(data) {
    profileImg.src = data.avatar_url;
    profileName.textContent = data.name;
    profileBio.textContent = data.bio;
    profileFollowers.textContent = data.followers;
    profileFollowing.textContent = data.following;
    profileRepos.textContent = data.public_repos;
}

function updateRepositories(data) {
    const repositories = document.querySelector('.repositories')
    data.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repo');

        repoElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>Stars: ${repo.stargazers_count}
        `
        repositories.appendChild(repoElement);
    });
}

function updateProfileDisplay(display) {
    const profile = document.querySelector('.profile');
    const repositories = document.querySelector('.repositories');

    profile.style.display = display;
    repositories.style.display = display;
}