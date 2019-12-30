document.getElementById("start_btn").addEventListener("click",()=>{
    document.getElementById("dialog_start").style.display="none";
    main()
})
function setMode(m) {
    mode = m
}