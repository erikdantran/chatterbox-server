// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', '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');
});

// Put your campus prefix here
window.CAMPUS = 'hr-lax';
