function Redirect({ match }) {

    function handleRedirect() {
        console.log("sending GET to " + match.params.code)
        fetch(`https://smoll.me/v1/api/url/${match.params.code}`)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return(
        <div>
            {handleRedirect()}
        </div>
    )
}

export default Redirect