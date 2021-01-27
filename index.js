let yearSegment = '';
for (let year = 2006; year <= 2020; year++ ){
    yearSegment += `<div class="years" onclick = 'filterby(this,${year})'> ${year} </div>`;
}
const yearlist = document.querySelector('.year-list');
yearlist.innerHTML = yearSegment;

function filterby(that,year){
        const node = document.querySelector('.launch-program');
        node.innerHTML = '';
        const removeClass = document.querySelectorAll('.active');
        if (removeClass) removeClass.forEach(obj=>obj.classList.remove("active"));
        that.className = 'years active';
        fetch (`https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${year}`).then(async Response => {
        const filterdata = await Response.json();
        multiplyNode(node, filterdata);
    });    
}

function filterbylaunch(that, success){
    const node = document.querySelector('.launch-program');
    node.innerHTML = '';
    const removeClass = document.querySelector('.active.option');
    if (removeClass) removeClass.classList.remove('active');
    that.className = 'option active';
    activeYear = document.querySelector('.years.active');
    if (activeYear) activeYear = activeYear.innerHTML.trim();
    const yearUrl = activeYear ? `&launch_year=${activeYear}` : '';
    fetch (`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${success}${yearUrl}`).then(async Response => {
    const launch = await Response.json();
    multiplyNode(node, launch);
    });
}
function filterbylanding(that, success){
    const node = document.querySelector('.launch-program');
    node.innerHTML = '';
    const removeClass = document.querySelector('.active.option2');
    if (removeClass) removeClass.classList.remove('active');
    that.className = 'option2 active';
    document.querySelector('#success-true').classList.add('active');
    activeYear = document.querySelector('.years.active');
    if (activeYear) activeYear = activeYear.innerHTML;
    const yearUrl = activeYear ? `&launch_year=${activeYear}` : '';
    fetch (`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=${success}${yearUrl}`).then(async Response => {
    const landing = await Response.json();
    multiplyNode(node, landing);
    });
}

function multiplyNode(node, programs) {
    let htmlSegment = '';
    programs.forEach(element => {
    htmlSegment += `<div class="program-name">
    <img src="${element.links.mission_patch}" class="program-img" />
    <div class="program-info">
        <div class="mission-name"><b>${element.mission_name}#${element.flight_number}</b></div>
        <div class="mission-id">
            <span><b>Mission IDs:</b></span>
            <ul class="mission-id-list">
               <li>{list mission_ids}</li> 
            </ul>
        </div>
        <div class="sublaunch-year"><b>Launch Year :</b><span class="subinfo"> ${element.launch_year}</span></div>
        <div class="launch-success"><b>Successful Launch: </b> <span class="subinfo">${element.launch_success}</span></div>
        <div class=""><b>Successful Landing: </b><span class="subinfo"> ${element.launch_landing ? element.launch_landing : ''}</span></div>
    </div>
    </div>`;        
    });
    node.innerHTML = htmlSegment;
}
const getData = async function (){
    const api = await (await fetch ('https://api.spaceXdata.com/v3/launches?limit=100')).json();
    multiplyNode(document.querySelector('.launch-program'), api);
}
getData();



