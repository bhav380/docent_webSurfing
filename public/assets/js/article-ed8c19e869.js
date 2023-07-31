const API_KEY="36f66b49f93747b1946ed401287feca4",url="https://newsapi.org/v2/everything?q=",cardsContainer=document.getElementById("cards-container"),showContent=cardsContainer.getAttribute("data-showcontent");if("search"==showContent){window.addEventListener("load",(()=>fetchNews("Technology India")));const e=document.getElementById("search-button"),t=document.getElementById("search-bar");e.addEventListener("click",(()=>{const e=t.value;e&&(fetchNews(e),curSelectedNav?.classList.remove("active"),curSelectedNav=null)}))}else window.addEventListener("load",(()=>fetchNews(showContent)));function reload(){window.location.reload()}async function fetchNews(e){console.log(e);const t=await fetch(`${url}${e}&apiKey=${API_KEY}`);bindData((await t.json()).articles)}function bindData(e){const t=document.getElementById("cards-container"),n=document.getElementById("template-news-card");t.innerHTML="",e.forEach((e=>{if(!e.urlToImage)return;const c=n.content.cloneNode(!0);fillDataInCard(c,e),t.appendChild(c)}))}function fillDataInCard(e,t){const n=e.querySelector("#news-img"),c=e.querySelector("#news-title"),o=e.querySelector("#news-source"),r=e.querySelector("#news-desc");n.src=t.urlToImage;let a=t.title;c.innerHTML=a.slice(0,71)+"...",r.innerHTML=t.description.slice(0,215)+"...";const l=new Date(t.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});o.innerHTML=`${t.source.name} · ${l}`,e.firstElementChild.addEventListener("click",(()=>{window.open(t.url,"_blank")}))}let curSelectedNav=null;function onNavItemClick(e){fetchNews(e);const t=document.getElementById(e);curSelectedNav?.classList.remove("active"),curSelectedNav=t,curSelectedNav.classList.add("active")}let loadMoreBtn=document.querySelector(".custom-btn"),currentItem=6;loadMoreBtn.onclick=()=>{let e=document.querySelectorAll(".cards-container .card");console.log(e);for(var t=currentItem;t<currentItem+6&&t<e.length;t++)e[t].style.display="block";currentItem+=6,currentItem>=e.length&&(loadMoreBtn.style.display="none")};