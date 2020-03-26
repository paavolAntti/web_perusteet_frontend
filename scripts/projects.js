
const endpoint = 'http://localhost:3003/api/projects'

const getProjects = async () => {
	const res = await axios.get(endpoint)
	const projects = res.data
	if (projects) {
		console.log('projects ', projects)
		mapToProjects(projects)
	}
}

const createProjectLink = (project) => {
	const projectLink = document.createElement('a')
	const linkText = document.createTextNode(project.link)
	projectLink.href = project.link
	projectLink.appendChild(linkText)

	return projectLink
}

const createProjectImage = (project) => {
	const projectImage = document.createElement('img')
	console.log('project passed to image function', project)
	console.log('imageurl', project.imageUrl)
	projectImage.src = project.imageUrl
	return projectImage
}

const createSingleProject = (projectContent) => {
	const project = document.createElement('div')
	//setting attributes to blog
	project.setAttribute('id', projectContent.id)
	project.appendChild(createHeader(projectContent))
	project.appendChild(createContent(projectContent))
	project.appendChild(createProjectLink(projectContent))
	project.appendChild(createProjectImage(projectContent))
	project.className='article'
	
	return project
}

const mapToProjects = (projects) => {
	const contentContainer = document.querySelector('#posts')
	projects.map(project => {
		contentContainer.appendChild(createSingleProject(project))
	})
}
getProjects()