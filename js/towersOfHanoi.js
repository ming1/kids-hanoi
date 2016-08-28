      var nr_discs;
      var delay;
      var tower_h, tower_w;
      var disc_h = 18;
      var dd_obj = false;

      discs = new Array(nr_discs);
      top_disc = new Array(4);       //one extra

	  window.onload = setup_game();

      function Disc(elem, tower_no) {
          this.elem = elem;
          this.tower_no = tower_no;
      }

      function drag_disc(e) {
          if (!e) var e = window.event;
          obj = (e.target) ? e.target: e.srcElement;

		  //alert("drag from " + obj.id);
		  document.form2.info.value += "drag from " + obj.id + "\n";
          dd_obj = obj;
      }

	  function disable_drag_drop(e) {
			  return false;
	  }

      function get_id(src, prefix_len) {
          return parseInt(src.id.substring(prefix_len, src.id.length));
      }

	  function convert_to_tower(dst) {
          if (dst.id.substring(0, 4) == "disc") {
               var disc_id = get_id(dst, 4);
			   var disc = discs[disc_id];
			   var tower = document.getElementById("content" + disc.tower_no)
			   return tower;
		  } else {
              return dst;
		  }
	  }

      function valid_drag_drop(src, dst) {
		  var disc, disc_id, tower_id;;

		  if (!src || !dst)  return false;
          if (src.id.substring(0, 4) != "disc") return false; //not drag a disc

          if (src == dst) return false;   //drop to myself

		  dst = convert_to_tower(dst);    //convert to tower
		  disc_id = get_id(src, 4);
		  tower_id = get_id(dst, 7);
		  disc = discs[disc_id];

		  if (tower_id == disc.tower_no) return false; //in same tower
		  if (top_disc[disc.tower_no] != disc_id)   //not the top one
				  return false;

		  if (top_disc[tower_id] == -1) return true; //tower is empty

		  if (top_disc[tower_id] < disc_id)
				  return false;
		  else
				  return true;
      }

      function update_tower_top(tower, id) {
		  var disc_id;

		  if (!tower.firstChild) {
				  top_disc[id] = -1;
				  return;
		  }

		  document.form2.info.value += "update: child id" + tower.firstChild.id + "\n";
		  disc_id = get_id(tower.firstChild, 4);
		  top_disc[id] = disc_id;
	  }

      function handle_drop(src, dst) {
	      var src_tower;
		  var src_tower_id;
		  var disc = discs[get_id(src, 4)];
		  var dst_tower_id = get_id(dst, 7);

		  src_tower_id = disc.tower_no;
		  src_tower = document.getElementById("content" + disc.tower_no);
          src_tower.removeChild(src);
		  dst.insertBefore(src, dst.firstChild);

		  update_tower_top(src_tower, src_tower_id);
		  update_tower_top(dst, dst_tower_id);

		  disc.tower_no = dst_tower_id;
          dd_obj = false;
	  }

      function drop_to_tower(e) {
          if (!e) var e = window.event;
          obj = (e.target) ? e.target: e.srcElement;

		  //document.form2.info.value += "drop to " + obj.id + "\n";
		  if (!valid_drag_drop(dd_obj, obj))
				  return;

		  document.form2.info.value += "drop to " + obj.id + "\n";
		  obj = convert_to_tower(obj);

		  handle_drop(dd_obj, obj);
      }

      function init_drag(disc) {
          disc.onmousedown = drag_disc;
          disc.onmousedup = disable_drag_drop;
      }

      function init_drop(tower) {
          tower.onmouseup = drop_to_tower;
          tower.onmousedown = disable_drag_drop();
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
		var curr_bottom = (nr_discs - 1) * disc_h;
		var curr_left = nr_discs * w_delta / 2;

        for (idx = 0; idx < nr_discs; idx++) {
	        obj = document.getElementById("content1");
            tdiv = document.createElement('div');
            tdiv.classList.add("draggable");
            tdiv.classList.add("disk1");

		    tdiv.style.height = disc_h + "px";
		    tdiv.style.width =  curr_width + "px";
		    tdiv.style.bottom =  curr_bottom + "px";
			//tdiv.style.alignContent = "center";
			//tdiv.style.alignSelf = "center";
		    tdiv.style.left =  curr_left + "px";
            tdiv.id = "disc" + idx;
            init_drag(tdiv);

		    obj.appendChild(tdiv);

			discs[idx] = new Disc(tdiv, 1)
			curr_width += w_delta;
			curr_bottom -= disc_h;
			curr_left -= w_delta/2;
		}

        for (idx = 0; idx < 4; idx++) {
            top_disc[idx] = -1;
        }
        top_disc[1] = 0;
	  }

      function set_tower(no, w, h) {
         obj = document.getElementById("tower" + no);
         obj.style.width = w + "px";
         obj.style.height = h + "px";
		 obj.onmouseup = disable_drag_drop;
		 obj.onmousedown = disable_drag_drop;
 
         obj = document.getElementById("content" + no);
         obj.style.width = w + "px";
         obj.style.height = h + "px";
         obj.onmouseup = drop_to_tower;
         obj.onmousedown = disable_drag_drop;
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

      function initialize() {
        init_drag();
        init_drop();
		setup_game();
      }

	  function auto_play() {
	  
	  }
