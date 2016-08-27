      var nr_discs;
	  var delay;

	  function setup_game() {
	     nr_discs = parseInt(document.form1.nr_discs.value);
		 delay = document.form1.move_delay.value;

		 height = 140 + nr_discs * 18;
		 width = 189 + nr_discs * 7
		 obj = document.getElementById("tower1");
		 obj.style.height = height + "px";
		 obj.style.width = width + "px";
		 obj = document.getElementById("tower2");
		 obj.style.height = height + "px";
		 obj.style.width = width + "px";
		 obj = document.getElementById("tower3");
		 obj.style.height = height + "px";
		 obj.style.width = width + "px";

		 height = 90 + nr_discs * 18;
		 b_w = width / 2 - 10;
		 obj = document.getElementById("bar1");
		 obj.style.height = height + "px";
		 obj.style.left = b_w + "px";

		 obj = document.getElementById("bar2");
		 obj.style.height = height + "px";
		 obj.style.left = b_w + "px";

		 obj = document.getElementById("bar3");
		 obj.style.height = height + "px";
		 obj.style.left = b_w + "px";

	  }

      function initialize() {
        initDrag();
        initDrop();
		setup_game();
      }

      function initDrag() {
      }

      function initDrop() {
      }

      function isDraggingAllowed(parent, child) {
        return $(parent).children()[0].id == child.id;
      }

      function isValidMove(parent, child) {
        var children = $(parent).children();
        return (children.length == 0) || (children.css(ATTR_WIDTH) >= child.css(ATTR_WIDTH));
      }

      function isDone(parent) {
        return ((parent.id == ID_LAST_TOWER) && ($(parent).find(SELECT_CONTENT).children().length == NUMBER_OF_DISCS));
      }

	  function auto_play() {
	  
	  }
