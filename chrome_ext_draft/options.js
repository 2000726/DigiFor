$.options = $.extend({}, $.base, {
    ready: function() {

       // Message passing                                                                             
       chrome.extension.onMessage.addListener(this.onMessage);

                                                            
    }
});