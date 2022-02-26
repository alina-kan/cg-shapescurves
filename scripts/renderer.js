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
        //this.drawLine({x: 0, y: 10}, {x: 20, y: 45},[0, 255, 255, 255], ctx);
        this.drawRectangle({x: 200, y: 100}, {x: 400, y: 500}, [102, 51, 153, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        //draw circle
        this.drawCircle({x: 400, y: 300}, 100, [102, 51, 153, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        //draw curve
        this.drawBezierCurve();
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        //draw name
        
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
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
            pt_holder.push({x: x, y: y});
            pt1.x = x;
            pt1.y = y;        
            this.drawLine(pt0, pt1, color, ctx);
            pt0.x = pt1.x;
            pt0.y = pt1.y;
        }
        console.log(pt_holder);
        
        let point = {x: 0, y: 0};
        for (let i = 0; i < this.num_curve_sections; i++){
            point = pt_holder.pop();
            this.drawLine(point, point, color, ctx);
        }
        /*
        if () {
            let point = ptHolder.pop();
            for (let i = 0; i < this.num_curve_sections; i++){
                this.drawLine(point, point, color, ctx);
                point = ptHolder.pop();
            }
        } */
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
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
