(function (interact) {

    'use strict';

    var transformProp;

    interact.maxInteractions(Infinity);

    // setup draggable elements.
    interact('.js-drag')
        .draggable({ max: Infinity })
        .on('dragstart', function (event) {
            event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
            event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
        })
        .on('dragmove', function (event) {
            event.interaction.x += event.dx;
            event.interaction.y += event.dy;

            if (transformProp) {
                event.target.style[transformProp] =
                    'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
            }
            else {
                event.target.style.left = event.interaction.x + 'px';
                event.target.style.top  = event.interaction.y + 'px';
            }
        })
        .on('dragend', function (event) {
            event.target.setAttribute('data-x', event.interaction.x);
            event.target.setAttribute('data-y', event.interaction.y);
        });

    // setup drop areas.
    // dropzone #1 accepts draggable #1
    setupDropzone('#drop1', '#drag1');
    // dropzone #2 accepts draggable #1 and #2
    setupDropzone('#drop2', '#drag1, #drag2');
    // every dropzone accepts draggable #3
    setupDropzone('.js-drop', '#drag3');

    /**
     * Setup a given element as a dropzone.
     *
     * @param {HTMLElement|String} el
     * @param {String} accept
     */
    function setupDropzone(el, accept) {
        interact(el)
            .dropzone({
                accept: accept,
                ondropactivate: function (event) {
                    addClass(event.relatedTarget, '-drop-possible');
                },
                ondropdeactivate: function (event) {
                    removeClass(event.relatedTarget, '-drop-possible');
                }
            })
            .on('dropactivate', function (event) {
                var active = event.target.getAttribute('active')|0;

                // change style if it was previously not active
                if (active === 0) {
                    addClass(event.target, '-drop-possible');
                    event.target.textContent = 'Drop me here!';
                }

                event.target.setAttribute('active', active + 1);
            })
            .on('dropdeactivate', function (event) {
                var active = event.target.getAttribute('active')|0;

                // change style if it was previously active
                // but will no longer be active
                if (active === 1) {
                    removeClass(event.target, '-drop-possible');
                    event.target.textContent = 'Dropzone';
                }

                event.target.setAttribute('active', active - 1);
            })
            .on('dragenter', function (event) {
                addClass(event.target, '-drop-over');
                event.relatedTarget.textContent = 'I\'m in';
            })
            .on('dragleave', function (event) {
                removeClass(event.target, '-drop-over');
                event.relatedTarget.textContent = 'Drag me…';
            })
            .on('drop', function (event) {
                removeClass(event.target, '-drop-over');
                event.relatedTarget.textContent = 'Dropped';
            });
    }

    function addClass (element, className) {
        if (element.classList) {
            return element.classList.add(className);
        }
        else {
            element.className += ' ' + className;
        }
    }

    function removeClass (element, className) {
        if (element.classList) {
            return element.classList.remove(className);
        }
        else {
            element.className = element.className.replace(new RegExp(className + ' *', 'g'), '');
        }
    }

    interact(document).on('ready', function () {
        transformProp = 'transform' in document.body.style
            ? 'transform': 'webkitTransform' in document.body.style
            ? 'webkitTransform': 'mozTransform' in document.body.style
            ? 'mozTransform': 'oTransform' in document.body.style
            ? 'oTransform': 'msTransform' in document.body.style
            ? 'msTransform': null;
    });

$(function() {
  var doubleClicked = false;
  $(document).on("contextmenu", function (e) {
   if(doubleClicked == false) {
    e.preventDefault(); // To prevent the default context menu.
    var windowHeight = $(window).height()/2;
    var windowWidth = $(window).width()/2;
    //When user click on bottom-left part of window
    if(e.clientY > windowHeight && e.clientX <= windowWidth) {
      $("#contextMenuContainer").css("left", e.clientX);
      $("#contextMenuContainer").css("bottom", $(window).height()-e.clientY);
      $("#contextMenuContainer").css("right", "auto");
      $("#contextMenuContainer").css("top", "auto");
    } else if(e.clientY > windowHeight && e.clientX > windowWidth) {
      //When user click on bottom-right part of window
      $("#contextMenuContainer").css("right", $(window).width()-e.clientX);
      $("#contextMenuContainer").css("bottom", $(window).height()-e.clientY);
      $("#contextMenuContainer").css("left", "auto");
      $("#contextMenuContainer").css("top", "auto");
    } else if(e.clientY <= windowHeight && e.clientX <= windowWidth) {
      //When user click on top-left part of window
      $("#contextMenuContainer").css("left", e.clientX);
      $("#contextMenuContainer").css("top", e.clientY);
      $("#contextMenuContainer").css("right", "auto");
      $("#contextMenuContainer").css("bottom", "auto");
    } else {
       //When user click on top-right part of window
      $("#contextMenuContainer").css("right", $(window).width()-e.clientX);
      $("#contextMenuContainer").css("top", e.clientY);
      $("#contextMenuContainer").css("left", "auto");
      $("#contextMenuContainer").css("bottom", "auto");
    }
    $("#contextMenuContainer").fadeIn(500, FocusContextOut());
      doubleClicked = true;
    } else {
      e.preventDefault();
      doubleClicked = false;
      $("#contextMenuContainer").fadeOut(500);
    }
  });
  function FocusContextOut() {
    $(document).on("click", function () {
      doubleClicked = false; 
      $("#contextMenuContainer").fadeOut(500);
      $(document).off("click");           
    });
  }
});
}(window.interact));

$(document).ready(function() {
    $("#person-btn").click(function(){
        var valor = $('#text').val();
        $('.list-right').append('<div id="drag1" class="draggable js-drag">'+valor+'</div>');
    });
  
    $("#project-btn").click(function(){
        var valor = $('#text').val();
        $('.list-right').append('<div id="drop1" class="dropzone js-drop">'+valor+'</div>');
    });
});