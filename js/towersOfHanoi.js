      var nr_discs;
	  var delay;
	  var tower_h, tower_w;
	  var disc_h = 18;

	  function setup_game() {
	     nr_discs = parseInt(document.form1.nr_discs.value);
		 delay = document.form1.move_delay.value;

		 tower_h = 140 + nr_discs * disc_h;
		 tower_w = 189 + nr_discs * 7
		 obj = document.getElementById("tower1");
		 obj.style.height = tower_h + "px";
		 obj.style.width = tower_w + "px";

		 obj = document.getElementById("tower2");
		 obj.style.height = tower_h + "px";
		 obj.style.width = tower_w + "px";

		 obj = document.getElementById("tower3");
		 obj.style.height = tower_h + "px";
		 obj.style.width = tower_w + "px";

		 height = 90 + nr_discs * disc_h;
		 b_w = tower_w / 2 - 10;
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
