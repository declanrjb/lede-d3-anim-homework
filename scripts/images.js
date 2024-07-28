      // Step 4. load your data with d3.csv()
      d3.csv("../data/image_directory.csv")
      // d3.json("happiness-sample-data.json")
        .then(data => {

          const myChart = d3
            .select('#my-svg-chart')
            .append('svg')
            .attr('width', 640)
            .attr('height', 640)

          const individualCharts = myChart
            .selectAll('image')
            .data(data)
            .join('svg:image');

        const gap = 2
        const numTiles = 15

          const gridWidth = (640 / numTiles) - (gap * 2)
          const gridHeight = (gridWidth * (207/140)) - (gap * 2) 

          individualCharts
            .attr('x', (d,i) => {
              return Math.floor(i%numTiles)*(gridWidth+ gap);
            })
            .attr('y', (d,i) => {
              return Math.floor(i/numTiles)*(gridHeight+ gap);
            })
            .attr('width', gridWidth)
            .attr('height', gridHeight)
            .attr('xlink:href', (d,i) => {
                return d['step0']
              })
          
        const swapNewCast = function(step) {
                individualCharts
                .attr('xlink:href', (d,i) => {
                    return d[step]
                })
                .transition()
                .duration(200)
                .attr('width', 0)
                .attr('height',0)
                .transition()
                .duration(500)
                .attr('width', gridWidth)
                .attr('height',gridHeight)
            }


          // ======================================
          // === HERE starts the scrollama code ===
          // ======================================

          // using d3 for convenience
          const scrolly = d3.select("#scroll-content");
          const figure = scrolly.select("#my-svg-chart");
          const step = scrolly.selectAll(".step"); 

          // initialize the scrollama
          const scroller = scrollama();

          // generic window resize listener event
          function handleResize() {
            
            // 1. update height of step elements
            var stepH = Math.floor(window.innerHeight * 0.75);
            step.style("height", stepH + "px");

            var figureHeight = Math.min(window.innerHeight*0.8,640);
            var figureMarginTop = (window.innerHeight - figureHeight) / 2;

            figure
              .style("height", figureHeight + "px")
              .style("top", figureMarginTop + "px");
            // 3. tell scrollama to update new element dimensions
            scroller.resize();
          }

          // scrollama event handlers
          function handleStepEnter(response) {

            console.log(response);
			      // response = { element, direction, index }
            
            // add color to current step only
            step.classed("is-active", function (d, i) {
              return i === response.index;
            });

            // update graphic based on step
            if (response.index == 0) {
              // swap in the second cast
              if (response.direction == 'down') {
                swapNewCast('step1')
              } else {
                swapNewCast('step0')
              }
              
            } else if (response.index == 1) {
              // swap in the third cast
              if (response.direction == 'down') {
                swapNewCast('step2')
              } else {
                swapNewCast('step1')
              }
            } else if (response.index == 2) {
              // swap in the fourth cast
              if (response.direction == 'down') {
                swapNewCast('step3')
              } else {
                swapNewCast('step2')
              }
            }
          }

          function init() {

            // 1. force a resize on load to ensure proper dimensions are sent to scrollama
            handleResize();

            // 2. setup the scroller passing options
            // 		this will also initialize trigger observations
            // 3. bind scrollama event handlers (this can be chained like below)
            scroller
              .setup({
                step: "#scroll-content .step",
                offset: 0.33,
                debug: false
              })
              .onStepEnter(handleStepEnter);
          }

          // kick things off
          init();
        


        })