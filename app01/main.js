document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {

    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedInput').value;
    let issueId = chance.guid();
    let status = 'Open';

    let issue = {

        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: status

    }

    if (localStorage.getItem('issues') == null) {

        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));

    } else {

        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));

    }

    document.getElementById('issueInputForm').reset();
    e.preventDefault();
    fetchIssues();

}

function setStatusClosed(id) {

    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++){

        if( issues[i].id == id ){
            issues[i].status = 'Closed'
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {

    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++){

        if( issues[i].id == id ){
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();

}

function fetchIssues() {

    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesListe = document.getElementById('issuesList');
    
    issuesListe.innerHTML = '';

    if(localStorage.getItem('issues') != null){

        for ( let i = 0; i < issues.length; i++){

            let id = issues[i].id;
            let desc = issues[i].description;
            let severity = issues[i].severity;
            let assignedTo = issues[i].assignedTo;
            let status = issues[i].status;

            issuesListe.innerHTML += '<div class="jumbotron">'+
                                        '<h6>Issue ID: ' + id + '</h6>'+
                                        '<p><span class="badge badge-info"> ' + status + '</span></p>'+
                                        '<h3>' + desc + '</h3>'+
                                        '<p><span class="fa fa-clock"></span> ' + severity + '</p>'+
                                        '<p><span class="fa fa-user"></span> ' + assignedTo + '</p>'+
                                        '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                                        '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                    '</div>';

        }
    }
}