const baseUrl = 'http://localhost:3003/api/posts'

// get all posts from the database
const getPosts = async () => {
	const res = await axios.get(baseUrl)
	const posts = res.data
	if (posts) {
		console.log('posts: ', posts)
		mapToPosts(posts)
	}
}

const createHeader = (post) => {
	let headerDiv = document.createElement('div')
	let blogheader = document.createElement('h2')

	blogheader.textContent = post.header
	headerDiv.appendChild(blogheader)
	headerDiv.className='article_heading'

	return headerDiv
}
const createComment = (comment) => {
	let commentDiv = document.createElement('div')
	let content = document.createElement('p')
	let username = document.createElement('h2')
	username.textContent = comment.username
	content.textContent = comment.content

	commentDiv.appendChild(username)
	commentDiv.appendChild(content)

	return (commentDiv)
}
const postsComments = (post) => {
	const commentContainer = document.createElement('div')

	post.comments.map(comment => {
		commentContainer.appendChild(createComment(comment))
	})
	return commentContainer
}


const createContent = (post) => {
	let contentDiv = document.createElement('div')
	let blogContent = document.createElement('p')

	blogContent.textContent = post.content
	contentDiv.appendChild(blogContent)
	contentDiv.className='article_content'

	return contentDiv
}

const showComments = (post, element) => {
	element.appendChild(postsComments(post))
}

const createCommentButton = (post, element) => {
	let isVisible = false
	let button = document.createElement('button')
	button.textContent = 'show comments'
	button.addEventListener('click', () => {
		if (!isVisible) {
			element.appendChild(postsComments(post))
			isVisible = true
		} else {
			element.removeChild(element.lastChild)
			isVisible = false
		}
		
	})

	return button
}

const createSingleBlog = (post) => {
	let blog = document.createElement('div')
	const blogID = post.id
	console.log('blog id: ', blogID)
	blog.setAttribute('id', blogID)

	blog.appendChild(createHeader(post))
	blog.appendChild(createContent(post))
   	blog.appendChild(createCommentButton(post, blog))
	

	blog.className='article'
	
	return blog
}

const mapToPosts = (posts) => {
	const contentContainer = document.querySelector('#posts')
	
	posts.map(post => {
		contentContainer.appendChild(createSingleBlog(post))
	})
}
getPosts()



