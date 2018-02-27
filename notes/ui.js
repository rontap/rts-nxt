// ----------------------------------
// --- MANAGING NOTE UI CHANGE ------
// ----------------------------------

function save() {
		 $("#saveIcon").innerHTML="radio_button_checked";
		  $("#saveIcon").style.color="#4CAF50";
	}
function openDialoge(call) {

	if ($(call).classList.contains('on')) {
		return closeDialoge();
	}
	closeDialoge() ;
	setTimeout(function(){
		$(call).classList.add('on');
		$('body').classList.add('overlay');
	},100);

}
function closeDialoge() {
	$('body').classList.remove('overlay');
	$("#DInfo").classList.remove('on');
	$("#DShare").classList.remove('on');
	$("#DStats").classList.remove('on');
	$("#DFork").classList.remove('on');
	return false;
}
