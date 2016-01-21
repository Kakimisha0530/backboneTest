var actu_time = Math.floor((new Date()).getTime() / 1000);

var platform = "",
    tab = {},
    appURL = "",
    local = {},
    baseTimestamp = {
	"app" : {
		"time" : actu_time,
		"file" : "",
		"url" : ""
	},
	"config" : {
		"time" : actu_time,
		"file" : "",
		"url" : ""
	},
	"panneaux" : {
		"time" : actu_time,
		"file" : "",
		"url" : ""
	},
	"videos" : {
		"time" : actu_time,
		"file" : "",
		"url" : ""
	}
};

function onInitFs(fs) {
	alert('Opened file system: ' + fs.name);
}

function errorHandler(e) {
	var msg = '';

	switch (e.code) {
	case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR';
		break;
	case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR';
		break;
	case FileError.SECURITY_ERR:
		msg = 'SECURITY_ERR';
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		msg = 'INVALID_MODIFICATION_ERR';
		break;
	case FileError.INVALID_STATE_ERR:
		msg = 'INVALID_STATE_ERR';
		break;
	default:
		msg = 'Unknown Error';
		break;
	};

	alert('Error: ' + msg);
}

function getLocalUpdate(fs) {
	local = JSON.parse(localStorage.getItem("updates"));
}

function setLocalUpdate(fs) {
	localStorage.setItem("updates", JSON.stringify(tab));
}

function proceedApp(fs) {
	localStorage.setItem("plugins", (window.location.href + "").split("index")[0]);
	setLocalUpdate(fs);

	if (platform.toLowerCase() == "android") {
		window.resolveLocalFileSystemURL(appURL + "app.zip", rmFile, errorHandler);
	} else if (platform.toLowerCase() == "ios") {
		fs.root.getFile('app.zip', {
			create : false
		}, rmFile, errorHandler);
	}
}

function rmFile(fileEntry) {
	fileEntry.remove(function() {
		window.location = appURL + "/app/config/index.html";
	}, errorHandler);
}

var app = {
	initialize : function() {
		this.bindEvents();
	},

	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady : function() {
		app.receivedEvent('deviceready');
		var fileTransfer = new FileTransfer();

		platform = window.device.platform.toLowerCase();

		if (platform.toLowerCase() == "ios") {
			StatusBar.hide();
		} else {
		}

		if (platform.toLowerCase() == "android") {
			appURL = cordova.file.applicationStorageDirectory + "Documents/";
		} else if (platform.toLowerCase() == "ios") {
			appURL = cordova.file.documentsDirectory;
		} else {
		}

		function updateAppData() {
			getLocalUpdate();
			if (local) {
				window.location = appURL + "/app/config/index.html";
			}
		}

		function downloadLocalApp() {
			tab = baseTimestamp;

			fileTransfer.download((window.location.href + "").split("index")[0] + "app.zip", appURL + "app.zip", function(entry) {
				zip.unzip(appURL + "app.zip", appURL, function() {
					window.requestFileSystem(window.PERSISTENT, 1024 * 1024, proceedApp, function() {
						alert("some problems occured, please retry later !!!!");
					});
				});
			}, function(error) {
				alert("file www/app.zip not found !!!!");
				alert(JSON.stringify(error));
			});
		}


		window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function() {
			window.resolveLocalFileSystemURL(appURL + "/app", updateAppData, downloadLocalApp);
		}, errorHandler);

	},

	receivedEvent : function(id) {
	}
};
