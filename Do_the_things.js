let btn    = document.getElementById("doTheThing"),
    under  = document.querySelector(".underlay"),
    over   = document.querySelector(".overlay"),
    pos = {
      under : { x : 0,   y : 100 },
      over  : { x : 100, y : 0 }
    };

btn.addEventListener("click", (e) => {
  let w = _.clamp(under.offsetWidth + 50, 0, 479) + "px";
  
  console.log(w);
  
  pos.under.x += 100;  
  pos.under.y -= 100;  
  pos.over.x  -= 100;  
  pos.over.y  += 100;  
  
  under.style.backgroundPosition = pos.under.x + "% " + pos.under.y + "%";
  over.style.backgroundPosition = pos.over.x + "% " + pos.over.y + "%";
  
  under.style.width = w;
  over.style.width = w;
});
