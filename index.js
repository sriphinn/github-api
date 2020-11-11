function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(responseJson => displayRepos(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong: ${error.message}`);
        });
}

function displayRepos(responseJson) {
    console.log(responseJson);
    $('#results-list').empty()
    $('#js-error-message').empty()
    if (responseJson.message == 'Not Found') {
        $('#js-error-message').text(`${responseJson.message}`);
        console.log(responseJson.message)
        $('#results').addClass('hidden');
    } else {
        for (let i = 0; i < responseJson.length; i++) {
            $('#results-list').append(
                `<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3>
                <p>${responseJson[i].description}</p>
                </li><br>`
            )
        }
    $('#results').removeClass('hidden');
    }
    
};

function watchForm() {
    $("body").on("submit", "#js-form", e => {
        e.preventDefault();
        console.log("Form submitted.")
        const username = $('#js-search-term').val()
        console.log(username)
        getRepos(username);
    });
};

$(function () {
    console.log("App loaded! Waiting for user input and submit.");
    watchForm();
});
