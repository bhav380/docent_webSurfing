let loadMoreBtn=document.querySelector(".custom-btn"),currentItem=4;loadMoreBtn.onclick=()=>{let e=[...document.querySelectorAll(".post-box")];for(var t=currentItem;t<currentItem+4&&t<e.length;t++)e[t].style.display="flex",e[t].style.flexDirection="column",e[t].style.justifyContent="space-between",e[t].style.marginBottom="35px",e[t].style.marginLeft="25px";currentItem+=4,currentItem>=e.length&&(loadMoreBtn.style.display="none")};let createBlog=document.getElementById("blog-btn"),addBlogForm=document.getElementById("add-blog-form"),blogPageHeader=document.querySelector("#blogs-page-header h1");const user=createBlog.getAttribute("data-user");createBlog.onclick=()=>{if(""==user){const e=document.getElementById("login-message");setTimeout((function(){e.style.display="none"}),7e3),e.style.display="block"}else document.getElementById("create-blog-btn-container").style.display="none",addBlogForm.style.display="flex",blogPageHeader.style.marginTop="100px"};let blogSubmit=function(){$("#blog-form").submit((function(e){e.preventDefault();let t=$("#blog-form")[0];console.log(t);let o=new FormData(t);console.log(o),$.ajax({type:"post",url:$(this).attr("action"),data:o,contentType:!1,processData:!1,success:function(e){const t=document.getElementById("blog-created");t.style.display="block",t.style.marginTop="-150px",console.log("ajax operation succesfull")},error:function(e){console.log(e.responseText)}}),addBlogForm.style.display="none",blogPageHeader.style.marginTop="-145px"}))};function reallySure(e){action=!!confirm(" Remove this Blog ? ")||e.preventDefault()}function actionToFunction(e){"true"==e.target.getAttribute("data-removeBlog")&&reallySure(e)}blogSubmit(),document.body.addEventListener("click",actionToFunction);