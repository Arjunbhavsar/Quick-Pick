import axios from 'axios'

class getUsersListService{
	state = {  
		userTag : process.env.REACT_APP_API_URL_USER
	}

    executeGetUserListService(){
		const {userTag} = this.state;

		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return axios.get(userTag+'getUsers',
			{
				headers:{
					authorization: basicAuthHeader
				}
			}
		)
	}
	executeCheckRegisteredExternal(username) {
		const {userTag} = this.state;

		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return axios.get(userTag+'checkUsername/'+username,
			{
				headers:{
					authorization: basicAuthHeader
				}
			}
		)
	}

	executeGetUserService(username) {
		const {userTag} = this.state;

		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return axios.get(userTag+'getUser/'+username,
			{
				headers:{
					authorization: basicAuthHeader
				}
			}
		)
	}
   
    executePostUserRegisterService(user){
		const {userTag} = this.state;
        let username = 'user'
		let password =  'password'
		
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post(userTag+'register',user,
        {
            headers:{
                authorization: basicAuthHeader,
		'Content-Type': 'application/json'
            }
        }
        )
    }

    registerLogin(user) {
		const {userTag} = this.state;
        let username = 'user'
        let password = 'password'
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post(userTag+'login', user , {
				headers:{
					authorization: basicAuthHeader
				}
			}
        )
    }
	
	updateUser(user) {
		const {userTag} = this.state;
        let username = 'user'
		let password = 'password'
		let currentUsername = sessionStorage.getItem('authenticatedUser');
        console.log("UPDATING INFO : " + currentUsername)
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post(userTag+'updateUser/'+currentUsername, user , {
				headers:{
					authorization: basicAuthHeader
				}
			}
        )
	}

}
export default new getUsersListService();
