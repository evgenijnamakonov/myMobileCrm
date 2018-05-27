export function sendEmail(from, to, subj, text, success, fail) {

    let cardDetails = {
        "data[from]": from,
        "data[to]": to,
        "data[subject]": subj,
        "data[text]": text
    };

    let formBody = [];
    for ( let property in cardDetails ) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(cardDetails[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://api.mailgun.net/v3/sandbox6a0dc69bf5f546268d8665d7261f5bd1.mailgun.org/messages', {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'auth': 'api:5310a8c87be0fbe5037ae55dfa02c232-115fe3a6-c1d9dc11'
        },
        body: JSON.stringify({
            "from": from,
            "to": to,
            "subject": subj,
            "text": text
        })
    }).then((response) => {
        console.log(response);
        let type = response.status;
        response.json().then(responseJson => success(type, responseJson));
    }).catch((e) => {
        console.log(e);
        fail('error');
    });
}