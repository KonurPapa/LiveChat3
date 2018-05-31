javascript: (function() {
    var request = new XMLHttpRequest(),
        key = location.href.split("/")[5],
        data, num, doc, description = document.createElement("div"),
        proto = $(".link_1uvuyao-o_O-computing_77ub1h")[0].cloneNode(true),
        modal = description.cloneNode(),
        b = [proto.cloneNode(), proto.cloneNode(), proto.cloneNode()],
        offset = new Date().getTimezoneOffset(),
        hours;

    b[0].innerHTML = "Help / FAQs";
    b[0].onclick = function() {
        modal.innerHTML = "<br><div><b>FAQs</b><br><br>To view a list of frequently-asked questions, please visit <a href=\'https://www.bit.ly/LC3FAQs\'>this link</a>.<br><br><b>Get Help</b><br><br>To get help with a specific issue or to report a bug with LiveChat, please contact <a href=\'https://www.bit.ly/KonurPapa\'>KonurPapa</a>.</div>";
    };
    b[1].innerHTML = "Chat Settings";
    b[1].onclick = function() {
        modal.innerHTML = "<br><div><b>Settings</b></div>";
    };
    b[2].innerHTML = "Changelog";
    b[2].onclick = function() {
        modal.innerHTML = "<br><div><b>Changelog</b><br><br>Alpha<br><em>+ Added LiveChat3 core post-loading code</em></div>";
    };
    description.innerHTML = "<div><b>Thanks for using LiveChat! Version Alpha</b><br><br>Start chatting now – <em>or</em> – Click one of the buttons below</div><br>";
    $(".about_544kid").append([document.createElement("hr"), description, b[0], b[1], b[2], modal]);
    $("#comments-tab-header").find("a")[0].textContent = "LiveChat";
    $(".video-discussion-header").find("a")[4].click();
    setInterval(function() {
        $(".video-discussion-header").find("a")[3].style.display = "none";
        $(".video-discussion-header").find("a")[4].click();
        request.onload = function() {
            data = eval("(" + this.response + ")");
            hours = "";
            hours = Number(data.feedback[0].date.substr(11, 2));
            hours -= offset / 60;
            if (hours > 12) hours -= 12;
            doc = $(".comment")[1];
            doc = doc.cloneNode(true);
            doc.id = data.feedback[0].key;
            doc.setAttribute("data-key", data.feedback[0].key);
            doc.childNodes[3].innerHTML = data.feedback[0].content;
            if (num == undefined) num = data.feedback[0].date;
            if (data.feedback[0].date.replace(/\D/g, "") > num.replace(/\D/g, "")) {
                num = data.feedback[0].date;
                $(".discussion-list-content")[1].prepend(doc);
                $(".comment").find(".author-nickname")[0].outerHTML = "<a class=\'author-nickname discussion-author\' data-user-kaid=\'" + data.feedback[0].authorKaid + "\' href=\'/profile/" + data.feedback[0].authorKaid + "\'><img class=\'discussion-author-avatar\' src=\'" + data.feedback[0].authorAvatarSrc + "\'>" + data.feedback[0].authorNickname;
                $(".comment").find(".timeago")[0].title = data.feedback[0].date;
                $(".comment").find(".timeago")[0].textContent = "Posted at " + hours + data.feedback[0].date.substr(13, 3);
                $(".comment").find(".sum-votes")[0].innerHTML="<span>" + data.feedback[0].sumVotesIncremented + " Vote</span>";
                $(".comment").find(".vote-up")[0].setAttribute("data-key", data.feedback[0].key);
                $(".comment").find(".vote-down")[0].setAttribute("data-key", data.feedback[0].key);
                $(".comment").find(".flag-tools")[0].setAttribute("data-key", data.feedback[0].key);
                if (data.feedback[0].numberOfFlags > 0) $(".comment").find(".flag-tools")[0].innerHTML += "- " + data.feedback[0].numberOfFlags;
                $(".comment").find(".show-replies")[0].setAttribute("data-reply-count", data.feedback[0].replyCount);
                $(".comment").find(".show-replies")[0].textContent = data.feedback[0].replyCount + " Reactions"
            }
        };
        request.open("GET", "https://www.khanacademy.org/api/internal/discussions/scratchpad/" + key + "/comments?sort=2", true);
        request.send();
    }, 5000);
})()
