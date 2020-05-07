(function(document) {
    const header  = document.getElementById('header'),
        headerBtn = document.getElementById('header_btn');
        
    if ( header.length < 1 || headerBtn.length < 1 ) {
        return;
    }

    headerBtn.onclick = function() {
        const elementClasses    = (" " + header.className + " ").replace(/[\n\t\r]/g, " ");
        header.className = (elementClasses + " header_hidden ").trim();
        header.style.padding = '0px';
        return false;
    };
    

    var button = document.getElementById("play_btn");
    button.innerHTML = "Start";
    button.addEventListener("click", function() {
        button.innerHTML = "Reset";
        function even(v){
            if (v % 2 == 0) {
               	return true;
            } else {
                return false;
	        };
        };

        function odd(v){
	        if (v % 1 == 0) {
		        return true;
	        } else {
		        return false;
	        };
        };

        function original(arr) {
            var first = arr[0];
            if (arr[0] == "") {
            	return false;
            } else {
            	return arr.every(function(element) {
                	return element == first;
            	});
            };
        };

        let winner;
        var scale = parseInt(document.getElementById("scale").value);
        var color = document.getElementById("color").value;
        var squares = document.getElementsByClassName("square");
        var box_clicked = 0;
        var square_clicked = [];
        var box = [];
        var square_count = (scale * scale);

        for (var i = 0; i < square_count; i++) {
	        box.push(i);
        };

        document.getElementById("game_box").innerHTML = '<div id="panel_box"></div>';

        var player_name = document.getElementById("player_name")
        player_name.style.color = "#000";
        player_name.innerHTML = "&quotX&quot is playing";

        var panel_box = document.getElementById("panel_box");
        panel_box.style.margin = '0 auto';
        panel_box.style.height = (50 * scale) + 'px';
        panel_box.style.width = (50 * scale) + 'px';
        panel_box.style.border = 'solid 1px #000';

        for (var i = 0; i < square_count; i++) {
	        panel_box.innerHTML += '<div class="square"></div>';
        };

        for (var i = 0; i < square_count; i++) {
	        squares[i].setAttribute("id", i.toString());
        };

        if (square_count % 2 !== 0) {
	        for (var i = 0; i < square_count; i += 2) {
		        squares[i].style.backgroundColor = color;
	        };
        } else {
	        for (i = 0; i < square_count; i += 1) {
		        if (even(i/scale)) {
			        for (var square_object = i; square_object < (i + scale); square_object += 2) {
				        squares[square_object].style.backgroundColor = color;	
			        };
		        } else if (odd(i/scale)) {
			        for (var square_object = i+1; square_object < (i + scale); square_object += 2) {
				        squares[square_object].style.backgroundColor = color;	
			        };
		        } else {
		        };
	        };
        };

        panel_box.addEventListener("click", function() {
            if (clicked()) {
	            player_name.style.color = "#007BC1";
	            player_name.innerHTML = '&quot' + winner[0] + '&quot win the game';
            } else if (even(box_clicked)) {
	            player_name.style.color = "#FF001B";
	            player_name.innerHTML = "&quotO&quot is playing";
            } else {
	            player_name.style.color = "#000";
	            player_name.innerHTML = "&quotX&quot is playing";
            };
            box_clicked++;
        });

        for (var i = 0; i < square_count; i++) {
	        square_clicked[i] = 0;
        };


        var clicked = function() {
            var left_diagonal = [];
            var right_diagonal = [];

	        for (i = 0; i < square_count; i += 1) {
		        if ((i % scale) == 0) {
			        var row_click = [];
			        for (var square_object = i; square_object < (i + scale); square_object += 1) {
				        row_click.push(squares[square_object].innerHTML);
			        };
			        if (original(row_click)) {
				        winner = row_click;
				        return true;
			        };
		        };
	        };

	        for (i = 0; i < square_count; i += 1) {
		        if (i < scale) {
			        var col_click = [];
			        for (var square_object = i; square_object < square_count; square_object += scale) {
				        col_click.push(squares[square_object].innerHTML);
			        };
		        
			        if (original(col_click)) {
				        winner = col_click;
				        return true;
			        };	
		        };
	        };

	        for (i = 0; i < square_count; i += 1) {
		        if ((i % (scale + 1)) == 0) {
			        left_diagonal.push(squares[i].innerHTML);
		        };
	        };

	        if (original(left_diagonal)) {
		        winner = left_diagonal;
		        return true;
	        };

	        for (i = (scale - 1); i < (square_count - 1); i += 1) {
		        if ((i % (scale - 1)) == 0) {
			        right_diagonal.push(squares[i].innerHTML);
		        };
	        };

	        if (original(right_diagonal)) {
		        winner = right_diagonal;
		        return true;
	        };
        };

        var count_clicked = function() {
	        var id = this.getAttribute("id");
	        square_clicked[id] += 1;
	        if (even(box_clicked) && square_clicked[id] == 1) {
		        this.innerHTML = 'X';
	        } else if (odd(box_clicked) && square_clicked[id] == 1) {
		        this.innerHTML = 'O';
		        this.style.color = "red";
	        } else if (!clicked()){
		        alert('The box is filled. Choose another box, please ');
		        box_clicked -= 1;
	        };
	        if (clicked()) {
		        for (var i = 0; i < square_count; i++) {
			        square_clicked[i] = 2;
		        };
		        document.getElementById("play_btn").innerHTML = "Play"
	        };
        };

        for (var i = 0; i < square_count; i++) {
	        squares[i].addEventListener("click", count_clicked);
        };
    });
})(document);
