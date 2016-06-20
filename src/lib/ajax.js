// Ajax组件封装
// json(url, method, data, success, headers)

function ajax(json) {
	var xhr = null,
	 method = json.method || 'get',
	 data = json.data || null,
	 success = json.success || '',
	 headers = json.headers || null,
	 url = json.url;

	try {
		xhr = new XMLHttpRequest();
	} catch(e) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(method == 'get' && data) {
		url += '?' + encodeURI(data);
	}
	xhr.open(method, url, true);

	if(headers) {
		for(var i in headers) {
			xhr.setRequestHeader(i, headers[i]);
		}
	}

	if(method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.send(data);
	}

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				success && success(xhr.responseText);
			} else {
				alert('Err: ' + xhr.status);
			}
		}
	};
}