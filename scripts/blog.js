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

// Add comment to database
const commentBlogPost = async (id, comment) => {
	console.log('id in request', id)
	await axios.put(`${baseUrl}/${id}`, comment)
}
// header elemet for single blogpost
const createHeader = (post) => {
	let headerDiv = document.createElement('div')
	let blogheader = document.createElement('h2')

	blogheader.textContent = post.header
	headerDiv.appendChild(blogheader)
	headerDiv.className='article_heading'

	return headerDiv
}
// create single comment with username and comment
const createComment = (comment) => {
	let commentDiv = document.createElement('div')
	let content = document.createElement('p')
	let username = document.createElement('h2')
	username.textContent = comment.username
	content.textContent = comment.content

	commentDiv.appendChild(username)
	commentDiv.appendChild(content)

	return commentDiv
}

/* comment form with input field for username and textarea for comment
submitting adds new comment to database for the commented blogpost and appends the created blog
to comment section so the comment apperas to the page without refreshing
TODO refactor this into smaller components
*/ 
const commentForm = (id, element) => {
	let formDiv = document.createElement('div')
	let header = document.createElement('h3')
	let submit = document.createElement('button')

	submit.textContent = 'comment'
	submit.setAttribute('type', 'submit')
	header.textContent = 'Comment this blogpost'

	let form = document.createElement('form')
	form.setAttribute('type', 'submit')
	
	let nameInput = document.createElement('input')
	nameInput.setAttribute('type', 'text')
	nameInput.defaultValue = 'username here...'

	let commentInput = document.createElement('textarea')
	commentInput.setAttribute('type', 'text')
	commentInput.defaultValue = 'add comment...'

	form.appendChild(nameInput)
	form.appendChild(document.createElement('div'))
	form.appendChild(commentInput)
	form.appendChild(document.createElement('div'))
	form.appendChild(submit)

	submit.addEventListener('click', () => {
		const comment = {
			username: nameInput.value,
			content: commentInput.value
		}
		console.log('comment to send', comment)
		commentBlogPost(id, comment)
		commentInput.value = ''
		element.appendChild(createComment(comment))
	})

	formDiv.appendChild(header)
	formDiv.appendChild(form)
	formDiv.appendChild(submit)

	return formDiv
}
// shows all comments of post with id given as parameters
const postsComments = (post, id) => {
	const commentSection = document.createElement('div')
	const commentContainer = document.createElement('div')
	post.comments.map(comment => {
		commentContainer.appendChild(createComment(comment))
	})
	commentSection.appendChild(commentContainer)
	commentSection.appendChild(commentForm(id, commentContainer))
	return commentSection
}

// creates content element of single blogpost
const createContent = (post) => {
	let contentDiv = document.createElement('div')
	let blogContent = document.createElement('p')

	blogContent.textContent = post.content
	contentDiv.appendChild(blogContent)
	contentDiv.className='article_content'

	return contentDiv
}

// comment button for showing / hiding blogposts comments
const createCommentButton = (post, element, id) => {
	let isVisible = false
	let button = document.createElement('button')
	button.textContent = 'show comments'
	button.addEventListener('click', () => {
		if (!isVisible) {
			element.appendChild(postsComments(post, id, element))
			isVisible = true
			button.textContent = 'hide comments'
		} else {
			element.removeChild(element.lastChild)
			isVisible = false
			button.textContent = 'show comments'
		}
		
	})

	return button
}
// puts all the blog pieces together and returns single blogpost
const createSingleBlog = (post) => {
	let blog = document.createElement('div')
	const blogID = post.id
	console.log('blog id: ', blogID)
	blog.setAttribute('id', blogID)

	blog.appendChild(createHeader(post))
	blog.appendChild(createContent(post))
   	blog.appendChild(createCommentButton(post, blog, blogID))
	

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



