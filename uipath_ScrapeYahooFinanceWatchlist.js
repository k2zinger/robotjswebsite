function uipath_loadScrapeYahooFinanceWatchlist() {
    let process_name = "YahooFinanceWatchlist_Scrape";
    let arguments = {};
    const robot = UiPathRobot.init();
    robot.getProcesses().then(function (results) {
        if (results.length === 0) {
            showError("Robot not connected to Orchestrator or no processes are available")
        }

	let process = results.find(e => e.name.includes(process_name))

        if (process) {
            console.log("Process is available")
        } else {
            showError("Process not found!")
        }

	process.start(arguments).then((result) => {
	    console.log("Status:", result.out_Status);
	    alert(result.out_Status);
	}, err => {
            console.log(err)
            showError(err)
        });
    }, function (err) {
        console.log("Something else went wrong", err)
        showError("Something else went wrong " + err)
    });
}
