class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        //draw rectangle here
        this.drawRectangle({x: 100, y: 100}, {x: 300, y: 550}, [102, 51, 153, 255], ctx);
        this.drawRectangle({x: 400, y: 450}, {x: 700, y: 550}, [179, 55, 176, 255], ctx);
        this.drawRectangle({x: 400, y: 100}, {x: 700, y: 400}, [36, 43, 173, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        //draw circle
        this.drawCircle({x: 400, y: 325}, 150, [156, 101, 0, 255], ctx);
        
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        //draw curve
        this.drawBezierCurve({x: 100, y: 200}, {x: 100, y: 400}, {x: 400, y: 400}, {x: 400, y: 200}, [102, 51, 153, 255], ctx);
        this.drawBezierCurve({x: 600, y: 100}, {x: 500, y: 100}, {x: 400, y: 600}, {x: 675, y: 500}, [27, 122, 121, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        //draw name
        //A
        this.drawLine({x: 100, y: 100}, {x: 175, y: 400}, [151, 82, 168, 255], ctx);
        this.drawLine({x: 175, y: 400}, {x: 250, y: 100}, [151, 82, 168, 255], ctx);
        this.drawLine({x: 137, y: 250}, {x: 212, y: 250}, [151, 82, 168, 255], ctx);

        //l
        this.drawLine({x: 275, y: 350}, {x: 275, y: 100}, [151, 82, 168, 255], ctx);

        //i
        this.drawLine({x: 300, y: 250}, {x: 300, y: 100}, [151, 82, 168, 255], ctx);
        this.drawCircle({x: 300, y: 275}, 3, [151, 82, 168, 255], ctx);

        //n
        this.drawLine({x: 325, y: 250}, {x: 325, y: 100}, [151, 82, 168, 255], ctx);
        this.drawBezierCurve({x: 325, y: 200}, {x: 325, y: 270}, {x: 400, y: 270}, {x: 400, y: 200}, [151, 82, 168, 255], ctx);
        this.drawLine({x: 400, y: 200}, {x: 400, y: 100}, [151, 82, 168, 255], ctx);

        //a - most complicated letter :/
        this.drawBezierCurve({x: 475, y: 250}, {x: 400, y: 260}, {x: 400, y: 50}, {x: 487, y: 110}, [151, 82, 168, 255], ctx);
        this.drawLine({x: 475, y: 250}, {x: 498, y: 230}, [151, 82, 168, 255], ctx);
        this.drawLine({x: 487, y: 110}, {x: 498, y: 120}, [151, 82, 168, 255], ctx);
        this.drawLine({x: 498, y: 240}, {x: 498, y: 120}, [151, 82, 168, 255], ctx);
        this.drawBezierCurve({x: 498, y: 120}, {x: 498, y: 100}, {x: 525, y: 100}, {x: 525, y: 105}, [151, 82, 168, 255], ctx);

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        //create other corners
        let left_top = {x: left_bottom.x, y: right_top.y};
        let right_bottom = {x: right_top.x, y: left_bottom.y};

        this.drawLine(left_bottom, left_top, color, ctx);
        this.drawLine(left_top, right_top, color, ctx);
        this.drawLine(right_top, right_bottom, color, ctx);
        this.drawLine(right_bottom, left_bottom, color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        //use for loop with num_sections
        let x = 0;
        let y = 0;
        let radians = 0;
        let pt1 = new Object({x: (center.x + radius), y: (center.y)});
        let pt0 = new Object({x: pt1.x, y: pt1.y});
        let pt_holder = [];

        for (let i = 0; i < this.num_curve_sections; i++){
            //determine where to draw lines
            radians = radians + ((Math.PI*2)/this.num_curve_sections);
            x = center.x + Math.round(radius * (Math.cos(radians)));
            y = center.y + Math.round(radius * (Math.sin(radians)));

            let point = new Object({x: x, y: y});
            pt_holder.push(point);

            pt1.x = x;
            pt1.y = y;        
            this.drawLine(pt0, pt1, color, ctx);
            pt0.x = pt1.x;
            pt0.y = pt1.y;
        }

        //console.log(pt_holder);

        if (this.show_points){
            this.show_points = false;
            for (let i = 0; i < pt_holder.length; i++){
                let pt_x = pt_holder[i].x;
                let pt_y = pt_holder[i].y;
                this.drawRectangle({x: pt_x-3, y: pt_y-3}, {x: pt_x+3, y: pt_y+3}, [255, 0, 0, 255], ctx);
                this.show_points = true;
            }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let x = 0;
        let y = 0;
        let t = 0.0;
        let drawPt0 = {x: pt0.x, y: pt0.y};
        let drawPt1 = {x: 0, y: 0};
        let pt_holder = [{x: pt0.x, y: pt0.y}];

        for (let i = 0; i < this.num_curve_sections; i++){
            t = t + 1/this.num_curve_sections;
            x = Math.round(
                (Math.pow((1 - t), 3) * pt0.x) +
                (3 * Math.pow((1-t), 2) * t * pt1.x) +
                (3 * (1 - t) * Math.pow(t, 2) * pt2.x) +
                (Math.pow(t, 3) * pt3.x)
            );
            y = Math.round(
                (Math.pow((1 - t), 3) * pt0.y) +
                (3 * Math.pow((1-t), 2) * t * pt1.y) +
                (3 * (1 - t) * Math.pow(t, 2) * pt2.y) +
                (Math.pow(t, 3) * pt3.y)
            );
            
            let point = new Object({x: x, y: y});
            pt_holder.push(point);

            drawPt1.x = x;
            drawPt1.y = y;
            this.drawLine(drawPt0, drawPt1, color, ctx);
            drawPt0.x = drawPt1.x;
            drawPt0.y = drawPt1.y;
        }

        //console.log(pt_holder);

        if (this.show_points){
            this.show_points = false;
            //control points
            this.drawRectangle({x: pt1.x-3, y: pt1.y-3}, {x: pt1.x+3, y: pt1.y+3}, [45, 194, 37, 255], ctx);
            this.drawRectangle({x: pt2.x-3, y: pt2.y-3}, {x: pt2.x+3, y: pt2.y+3}, [45, 194, 37, 255], ctx);
            for (let i = 0; i < pt_holder.length; i++){
                let pt_x = pt_holder[i].x;
                let pt_y = pt_holder[i].y;
                //curve points
                this.drawRectangle({x: pt_x-3, y: pt_y-3}, {x: pt_x+3, y: pt_y+3}, [255, 0, 0, 255], ctx);
                //setting back to true will allow for the points to continue
                // being shown when slider moves
                this.show_points = true;
            }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        console.log(pt0, pt1, color, ctx);
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        console.log(ctx.strokeStyle);
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
