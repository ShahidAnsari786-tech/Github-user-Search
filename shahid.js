const input = document.querySelector('input')
const btn = document.querySelector('button')
const card = document.querySelector('.card')

const repos_container = document.querySelector('.repos')

async function user (username) {
    const resp = await fetch(`https://api.github.com/users/${username}`)
    const respData = await resp.json()
    return respData
}


async function repos (username) {
    const resp = await fetch(`https://api.github.com/users/${username}/repos`)
    const respData = await resp.json()
    return respData
}
async function add_repo () {
    const reposData = await repos(input.value)
    repos_container.innerHTML = reposData.map(repo => {
        return `
        <div class="card">
            <h2>${repo.name}</h2>
            <p id="col" style="color:green;">${repo.language}</p>
        </div>
        `
    })
}

btn.addEventListener('click', async () => {
    const input_val = input.value
    const search_result = await user(input_val)

    add_repo()
    

    if(!search_result.login){
        alert('no user found')
    }else{
        card.innerHTML = `
        <div class="avatar">
        <img src="${search_result.avatar_url}" alt="">
    </div>
    <div class="info">
        <h2>${search_result.name}</h2>
        <p>${search_result.bio}</p>
        <h3>${search_result.location}</h3>
        <h4>${search_result.html_url}</h4>
        <div class="follow-info">
            <div class="single">
                <span>${search_result.followers}</span>
                <span>Followers</span>
            </div>
            <div class="single">
                <span>${search_result.following}</span>
                <span>Following</span>
            </div>
        </div>
        <div class="single">
            <span>${search_result.public_repos}</span>
            <span>Repositories</span>
        </div>
    </div>
        `
    }
})