document.onmousedown=disableclick;

function disableclick(event){
    const status="마우스오른쪽 클릭금지.";

    if (event.button==2) {

        alert(status);

        return false;

    }

}