      var nr_discs;
	  var delay;
	  var tower_h, tower_w;
	  var disc_h = 18;

	  discs = new Array(nr_discs);
	  window.onload = setup_game();

      function Disc(elem, tower_no) {
          this.elem = elem;
          this.tower_no = tower_no;
      }

      function del_disc(parent) {
          obj = document.getElementById(parent);
          while (obj.firstChild) {
             obj.removeChild(obj.firstChild);
          }
	  }
      function del_discs() {
            del_disc("content1");
            del_disc("content2");
            del_disc("content3");
	  }

      function add_discs() {
        var w_delta = 9;
        var obj;
		var tdiv;
		var curr_width = tower_w - nr_discs * w_delta;

        for (idx = 0; idx < nr_discs; idx++) {
	        obj = document.getElementById("content1");
            tdiv = document.createElement('div');
            tdiv.classList.add("draggable");
            tdiv.classList.add("disk1");

		    tdiv.style.height = disc_h + "px";
		    tdiv.style.width =  curr_width + "px";
			tdiv.style.alignContent = "center";
		    obj.appendChild(tdiv);

			discs[nr_discs - idx - 1] = new Disc(tdiv, 1)

			curr_width += w_delta;
		}
	  }

      function set_tower(no, w, h) {
         obj = document.getElementById("tower" + no);
         obj.style.width = w + "px";
         obj.style.height = h + "px";
 
         obj = document.getElementById("content" + no);
         obj.style.width = w + "px";
         obj.style.height = h + "px";
	  }

      function set_bar(no, l, h) {
         obj = document.getElementById("bar" + no);
         obj.style.left = l + "px";
         obj.style.height = h + "px";
	  }

	  function setup_game() {
	     nr_discs = parseInt(document.form1.nr_discs.value);
		 delay = parseInt(document.form1.move_delay.value);

		 tower_h = 140 + nr_discs * disc_h;
		 tower_w = 189 + nr_discs * 7
         set_tower(1, tower_w, tower_h)
         set_tower(2, tower_w, tower_h)
         set_tower(3, tower_w, tower_h)


		 bar_h = 90 + nr_discs * disc_h;
		 bar_l = tower_w / 2 - 10;
         set_bar(1, bar_l, bar_h)
         set_bar(2, bar_l, bar_h)
         set_bar(3, bar_l, bar_h)

		 del_discs();
		 add_discs();
	  }

      function init_drag() {
      }

      function init_drop() {
      }

      function initialize() {
        init_drag();
        init_drop();
		setup_game();
      }

	  function auto_play() {
	  
	  }
