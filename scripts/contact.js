const baseUrl = 'http://localhost:3003/api/email'

// send email via server
const sendMail = async (mail) => {
	try {
		await axios.post(baseUrl, mail)
		window.alert('Message sent succesfully!')
	} catch (error) {
		window.alert('error sending message', error.message)
	}
}

const form = document.querySelector('#contact_form')
const nameInput = document.querySelector('#name_input')
const mailInput = document.querySelector('#mail_input')
const messageInput = document.querySelector('#message_input')
// getting the submit button and adding event listener to it 
const submit = document.querySelector('#submit_contact')
submit.addEventListener('click', () => {
	const mail = {
		email: mailInput.value,
		message: `${messageInput.value}
			Sender: ${nameInput.value}`
	}
	console.log('email', mail)
	sendMail(mail)
	form.reset()
})




