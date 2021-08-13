const Logout = () => {
    window.localStorage.removeItem('userAccessToken');
        window.location.href = '/admin/category'
	return(
	<div className='content'/>
	)
}

export default Logout;