console.log("home");const reportBtn=document.getElementById("report-site-btn"),submitReportContainer=document.getElementById("submit-report-container"),message=document.getElementById("login-message");reportBtn.onclick=async()=>{const e=reportBtn.getAttribute("data-user");console.log(e),""==e?(setTimeout((function(){message.style.display="none"}),8500),message.style.display="block",window.scrollBy({top:165,left:0,behavior:"smooth"})):(submitReportContainer.style.display="flex",submitReportContainer.style.flexDirection="column",window.location.href="#submit-report-container")};