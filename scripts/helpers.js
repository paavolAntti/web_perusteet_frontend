const createHeader = (post) => {
	let headerDiv = document.createElement('div')
	let blogheader = document.createElement('h2')

	blogheader.textContent = post.header
	headerDiv.appendChild(blogheader)
	headerDiv.className='article_heading'

	return headerDiv
}

const createContent = (post) => {
	let contentDiv = document.createElement('div')
	let blogContent = document.createElement('p')

	blogContent.textContent = post.content
	contentDiv.appendChild(blogContent)
	//contentDiv.className='article_content'

	return contentDiv
}