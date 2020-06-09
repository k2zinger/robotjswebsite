let BrowserEmbeddingSample;

UiPathRobot.init(10);

/**
 * Get a list of processes from local robot
 */
UiPathRobot.getProcesses().then(function (results) {
    if (results.length === 0) {
        showError("Robot not connected to Orchestrator or no processes are available")
    }

    buildRobotTable(results);

    // Get the ID for the sample process
    BrowserEmbeddingSample = results.find(e => e.name.includes('BrowserEmbeddingSample'))

    if (BrowserEmbeddingSample) {
        console.log("Process is available")
    } else {
        showError("BrowserEmbeddingSample not found")
    }

}, function (err) {
    console.log("Something else went wrong", err)
    showError("Something else went wrong " + err)
});

const runBrowserEmbeddingSample = () => {
    let arguments = {
        ageArgIn: document.getElementById('example-input-age').value,
  nameArgIn: document.getElementById('example-input-name').value,
  surnameArgIn: document.getElementById('example-input-surname').value,			
  booleanArgIn: document.getElementById('example-input-boolean').value
    }

    document.getElementById("process-status").innerHTML = "";
    document.getElementById("process-result").innerHTML = "";

    BrowserEmbeddingSample.start(arguments).onStatus((status) => {
        console.log("Status:", status);
        if (status) {
            document.getElementById("process-status").innerHTML += `<li>${status}</li>`
        }
    }).then(
        processResults => {
            console.log(processResults)
            document.getElementById("process-result").innerHTML = `<b>Process output:</b> <br> Full Name : ${processResults.fullnameArgOut}<br> Age :  ${processResults.ageArgOut} <br> Subscription : ${processResults.booleanArgOut}`
        },
        err => {
            console.log(err)
            showError(err)
        }
    );
}

document.querySelector("#example-form").addEventListener("submit", function (event) {
    event.preventDefault();
    runBrowserEmbeddingSample();
}, false);
