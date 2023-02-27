function view() {
    let btnGetMore = document.querySelector("#btn_getMore");
    btnGetMore.onclick = function () {
        let bannerTitle = document.querySelector("#banner-title");
        bannerTitle.scrollIntoView();
    }
}

function progress() {
    let progress = document.querySelector(".progress-bar");
    let progressWidth = progress.style.width;
    progress.innerHTML = "完善进度：" + progressWidth;
    if (progressWidth === "100%") {
        progress.innerHTML = "构建完成";
    }
}

function mark() {
    let mark = document.querySelector("mark");
    let strArray = ["舒适", "简洁", "现代", "轻量", "快速", "丰富", "优雅", "美观", "强大"];
    let i = 0;
    markChange(strArray[i]);

    function markChange(str) {
        let timer = setInterval(function () {
            mark.innerHTML = str.substring(0, mark.innerHTML.length + 1);
            if (mark.innerHTML.length === str.length) {
                clearInterval(timer)
                let timers = setInterval(function () {
                    mark.innerHTML = mark.innerHTML.substring(0, mark.innerHTML.length - 1);
                    if (mark.innerHTML.length === 0) {
                        clearInterval(timers);
                        i++;
                        if (i === strArray.length) {
                            i = 0;
                        }
                        markChange(strArray[i]);
                    }
                }, 500);
            }
        }, 700);
    }
}

function download() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.appcenter.ms/v0.1/public/sdk/apps/40e59c36-67cd-468f-8a8b-311b2a24a5fb/distribution_groups/2fd8b725-73c7-4f28-bb44-3f3b36cfa417/releases/latest?is_install_page=false");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            let releaseNotes = data.release_notes;
            releaseNotes = releaseNotes.replace(/\n/g, "<br>");
            let versionName = data.short_version;
            let versionCode = data.version;
            let downloadModalTitle = document.querySelector("#downloadModal-Title");
            let downloadModalContent = document.querySelector("#downloadModal-Content");
            let downloadModalHistory = document.querySelector("#downloadModal-History");
            let downloadModal2Download = document.querySelector("#downloadModal-Download");
            downloadModalTitle.innerHTML = "文乎 v" + versionName + " (" + versionCode + ")";
            downloadModalContent.innerHTML = releaseNotes;
            downloadModalHistory.onclick = function () {
                window.open("https://install.appcenter.ms/users/fleey/apps/wenhu/distribution_groups/public");
                $('#downloadModal').modal('hide');
            }
            downloadModal2Download.onclick = function () {
                let downloadUrl = "http://file.threegoo.com/wenhu/bin/wenhu_" + versionCode +".apk";
                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = "wenhu_" + versionCode +".apk";
                a.click();
                const alertDiv = document.createElement("div");
                alertDiv.classList.add("alert", "alert-success", "alert-dismissible");
                const closeButton = document.createElement("button");
                closeButton.setAttribute("type", "button");
                closeButton.classList.add("btn-close");
                closeButton.setAttribute("data-bs-dismiss", "alert");
                const strongElement = document.createElement("strong");
                strongElement.textContent = "成功：";
                const messageElement = document.createTextNode("下载成功，期望你能喜欢✨");
                alertDiv.appendChild(closeButton);
                alertDiv.appendChild(strongElement);
                alertDiv.appendChild(messageElement);
                document.body.appendChild(alertDiv);
                alertDiv.style.position = "fixed";
                alertDiv.style.top = "100px";
                alertDiv.style.right = "30px";
                $('#downloadModal').modal('hide');
            }
        }
    }
}