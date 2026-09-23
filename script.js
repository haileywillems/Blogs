let container = document.getElementById("blogs");
container.classList.add('blog-section');

const API = "https://true-blogger-api.app";
const API_KEY = "lba_pZypO5sF8jV59VLPYCK9B7VGPLzp4kvbsGFbQpnG4s0"

async function getUserData() {
    try {
        const response = await fetch(`${API}/api/v1/blogs`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${resonse.status}`)
        }

        await response.json()
            .then((data) => {
                // console.log("Full Response");
                // console.log(data);
                display(data.blogs);
            })
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

getUserData()

function createTags(tagsArr){
    const tags = document.createElement('div');
    tags.classList.add('tags');

    for(let i = 0; i < tagsArr.length; i++){
        const tag = document.createElement('span');
        tag.classList.add('category');
        tag.innerHTML = tagsArr[i];
        tags.appendChild(tag);
    }
    return tags;
    // console.log(tags);
}

function display(blogs){
    console.log(blogs);
    for(let i=0; i < blogs.length; i++ ){
        let blog = document.createElement('div');
        blog.classList.add("blog-section")

        let title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = blogs[i].title;

        let blogResponse = document.createElement('p');
        blogResponse.classList.add('para');
        blogResponse.textContent = blogs[i].content.content[0].content[0].text;

        let views = document.createElement('p');
        views.textContent = blogs[i].views;
        views.classList.add('views');

        let blogTags = createTags(blogs[i].tags);

        let images = document.createElement('img')
        images.src = `https://true-blogger-api.app` + blogs[i].coverImageUrl;
        images.classList.add('coverImage')

        blog.appendChild(title);
        blog.appendChild(images);
        blog.appendChild(blogResponse);
        blog.appendChild(blogTags);

        container.appendChild(blog);
    }
}

const deleteBlogOne = "api-testing-post-ok"
const deleteBlogTwo = "database-testing-post-thing"

async function deleteBlogBySlug(slug){
        const response = await fetch(`${API}/api/v1/blogs/${slug}`, {
            method: "DELETE",
            headers:  {
                Authorization: `Bearer ${API_KEY}`
            }
        })

    const data = await response.json().catch(() => null);

    if(!response.ok){
        const message = data?.error || `HTTPS Error: ${response.status}`;
        throw new Error(message);
    }
    return data;
}

deleteBlogBySlug(deleteBlogOne);
deleteBlogBySlug(deleteBlogTwo)