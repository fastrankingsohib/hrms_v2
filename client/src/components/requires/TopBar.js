const TopBar = () => {
    let user = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null 
    return(
        <section className="w-full px-8 h-full flex items-center justify-between">
            <input type="search" className="primary-search-bar" placeholder="Search" />
            <div className="text-xl font-bold">Hi {user ? user.username : ""}</div>
        </section>
    )
}

export default TopBar;