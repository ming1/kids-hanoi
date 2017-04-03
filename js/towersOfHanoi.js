      var nr_discs;
      var move_delay;
      var tower_h, tower_w;
      var o_disc_h = 18;
      var o_disc_w = 9;
      var disc_base_bottom;
      var dd_obj = false;			//drag & drop object
	  var que = new Queue();
	  var count = 0;
	  var start_time;
	  var status_obj, status1_obj;

      discs = new Array(64);
      top_disc = new Array(4);       //one extra

	  window.onload = setup_game();

      function Disc(elem, tower_no) {
          this.elem = elem;
          this.tower_no = tower_no;
      }

      //.onmousedown event handler for disc
      function drag_disc(e) {
          if (!e) var e = window.event;
          obj = (e.target) ? e.target: e.srcElement;

		  //alert("drag from " + obj.id);
		  //for debug purpose
		  document.form2.info.value += "drag from " + obj.id + "\n";
          dd_obj = obj;
      }

      //.onmouseup event handler for disc
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

      //we must respect hanoi's rule
      function valid_drag_drop(src, dst) {
		  var disc, disc_id, tower_id;;

		  if (!src || !dst)  return false;

          //it has to be a disc we draged
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

		  //document.form2.info.value += "update: child id" + tower.firstChild.id + "\n";
		  disc_id = get_id(tower.firstChild, 4);
		  top_disc[id] = disc_id;
	  }

      function adjust_disc_height(tower, disc) {
           if (!tower.firstChild) {
		        disc.style.bottom = disc_base_bottom;
				return;
		   }

		  var o_bot = tower.firstChild.style.bottom;
		  var n_bot = parseInt(o_bot.substring(0, o_bot.length - 2)) + disc_h;
		  disc.style.bottom = n_bot + 'px';
	  }

      //src is disc, and dst is tower, and it has to be a valid drop
      function handle_drop(src, dst) {
	      var src_tower;
		  var src_tower_id;
		  var disc = discs[get_id(src, 4)];
		  var dst_tower_id = get_id(dst, 7);

		  src_tower_id = disc.tower_no;
		  src_tower = document.getElementById("content" + disc.tower_no);
          src_tower.removeChild(src);
		  adjust_disc_height(dst, src); 
		  dst.insertBefore(src, dst.firstChild);

		  update_tower_top(src_tower, src_tower_id);
		  update_tower_top(dst, dst_tower_id);

		  disc.tower_no = dst_tower_id; //update to new tower
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

      function del_children(parent) {
          obj = document.getElementById(parent);
          while (obj && obj.firstChild) {
             obj.removeChild(obj.firstChild);
          }
	  }
      function del_disc(parent) {
			  del_children(parent);
	  }
      function del_discs() {
            del_disc("content1");
            del_disc("content2");
            del_disc("content3");
	  }

      function add_discs() {
        var w_delta = disc_w;
        var obj;
		var tdiv;
		var curr_width = tower_w - nr_discs * w_delta;
		var curr_bottom = (nr_discs - 1) * disc_h;
		var curr_left = nr_discs * w_delta / 2;

        for (idx = 0; idx < nr_discs; idx++) {
            //tower
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
			tdiv.style.textAlign = "center"
		    tdiv.appendChild(document.createTextNode(idx + 1));
            init_drag(tdiv);

		    obj.appendChild(tdiv);

			//we are at the 1st tower af the beginning
			discs[idx] = new Disc(tdiv, 1)
			disc_base_bottom = curr_bottom;
			curr_width += w_delta;
			curr_bottom -= disc_h;
			curr_left -= w_delta/2;
		}

        for (idx = 0; idx < 4; idx++) {
            top_disc[idx] = -1;
        }
        top_disc[1] = 0;
	  }

      //set tower's .onmouseup & .onmousedown evt handler
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
		 move_delay = parseInt(document.form1.move_delay.value);


		 if (nr_discs < 0 || nr_discs > 64) {
			 message = "The number of disc(" + nr_discs + ") is too big!\n"
		     alert(message);

			 nr_discs = 3;
			 document.form1.nr_discs.value = nr_discs;
		 }

		 if (nr_discs <= 12) {
		     disc_w = o_disc_w + 8;
		     disc_h = o_disc_h + 8;
		 } else if (nr_discs <= 16) {
		     disc_w = o_disc_w + 6;
		     disc_h = o_disc_h + 6;
		 } else if (nr_discs <= 24) {
		     disc_w = o_disc_w + 4;
		     disc_h = o_disc_h + 4;
		 } else if (nr_discs <= 32) {
		     disc_w = o_disc_w + 2;
		     disc_h = o_disc_h + 2;
		 } else {
		     disc_w = o_disc_w;
		     disc_h = o_disc_h;
		 }

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

         obj = document.getElementById("info1");
		 obj.style.display = "none"
         obj = document.getElementById("info2");
		 obj.style.display = "none"
	  }

	  function delay(ms) {
          ms += new Date().getTime();
		  while (new Date() < ms){}
      }

      function MoveElem(from, to) {
	  		this.from = from;
			this.to = to;
	  }

      function auto_play_start() {
	  		start_time = new Date().getTime();
			count = 0;

			del_children("info1");
			del_children("info2");
         	obj = document.getElementById("info1");
			obj.style.display = "block"
			status_obj = document.createTextNode("");
			obj.appendChild(status_obj);

         	obj = document.getElementById("info2");
			obj.style.display = "block"
			status1_obj = document.createTextNode("");
			obj.appendChild(status1_obj);
	  }
      function auto_play_update() {
          elapsed = new Date().getTime();
		  elapsed -= start_time;

		  time = elapsed / count;
		  status_obj.nodeValue = "Moving " + count + " discs takes " + elapsed + "ms.\n";
		  status1_obj.nodeValue = "Moving one takes ~" + time.toFixed(4) + "ms.\n";
	  }

	  function handle_move() {
		  move_elem = que.dequeue();

		  from = move_elem.from;
		  to = move_elem.to;
          src = document.getElementById("content" + from);	  
          dst = document.getElementById("content" + to);

		  src_disc = src.firstChild;
		  handle_drop(src_disc, dst);
		  count += 1;
		
		  auto_play_update();

		  if (que.getLength() > 0) {
				  setTimeout(handle_move, move_delay);
		  }
	  }

	  function move_disc(from, to) {
	     que.enqueue(new MoveElem(from, to));	 
	  }

      function hanoi(nr, from, buffer, to) {
          if (!nr) return;

		  hanoi(nr - 1, from, to, buffer);
		  move_disc(from, to); 
		  hanoi(nr - 1, buffer, from, to);
	  }

	  function auto_play() {
		  auto_play_start();
          hanoi(nr_discs, 1, 2, 3);
		  if (que.getLength() > 0) {
				  setTimeout(handle_move, move_delay);
		  }
	  }
