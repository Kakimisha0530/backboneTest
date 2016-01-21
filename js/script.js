$(document).ready(function() {
	
		alert("script ready");
		
		var i = 0;
	
    	$("a#openclose").click(function() {
        	$(this).parent().toggleClass("is-open");
        	if ( i == 0 ) {
	        	$(".circuit-container").animate({"bottom":"72px"},500);
	        	i = 1;
        	}
        	else {
        		$(".circuit-container").animate({"bottom":"-195px"},500);
	        	i = 0;
        	}
        	//$(this).parent().css("bottom","72px");
        });
        
        $("a.facebook").click(function() {
        	//alert("facebook");
        	window.open('https://fr-fr.facebook.com/camilleleresistant', '_blank', 'location=no');
        });
        
        $("a.share").click(function() {
        	window.plugins.socialsharing.share('Découvrez l\'application des Sentiers de la mémoire', 'Suivez ce lien pour télécharger l\'application', 'http://www.mrdp-picardie.com/images/mrdp_appicon.png', 'http://www.mrdp-picardie.com/');
        });
        
});