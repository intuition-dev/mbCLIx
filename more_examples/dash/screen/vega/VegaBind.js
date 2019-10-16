class VegaBind {

   constructor() {
      this.canvas = '';
      this.vegaViewModel = new VegaViewModel();
   }

   getViewChart(vegaId) {
      let _this = this
      let spec = this.getSpec()

      Promise.all([this.vegaViewModel.read()])
         .then(function () {

            const data = _this.vegaViewModel.getViewChart();

            depp.require(['vega'], function () {

               var view = new vega.View(vega.parse(spec))
                  .logLevel(vega.Warn) // set view logging level
                  .initialize(document.querySelector('#' + vegaId)) // set parent DOM element
                  .renderer('canvas') // set render type (defaults to 'canvas')
                  .hover(); // enable hover event processing, *only call once*!

               view.insert('table', data)

               view.runAsync()
            })


         })
   }

   getSpec() {
      //config of vega
      //consist of 5 main groups: data, signals, scales, axes and marks
      return {
         "width": 600,
         "height": 200,
         "padding": 20,
         "data": [
            {
               "name": "table",
               "values": []
            }],
         //signals is dynamic variables that helps setup click, hover etc.
         "signals": [
            {
               "name": "tooltip",
               "value": {},
               "on": [
                  {
                     "events": "rect:mouseover",
                     "update": "datum"
                  },
                  {
                     "events": "rect:mouseout",
                     "update": "{}"
                  }
               ]
            },
            {
               "name": "clickBar",
               "value": "category",
               "on": [
                  {
                     "events": "click!",
                     "update": "invert('xscale', x())"
                  }
               ]
            },
         ],
         //scales map data values(number, categories, etc.) to visual values(pixels)
         "scales": [
            {
               "name": "xscale", //x axes
               "type": "band",
               "domain": {
                  "data": "table",
                  "field": "category"
                  //the name of the field in data
                  /*
                  {
                     "category": "A",
                     "amount": 28
                  },*/
               },
               "range": "width",
               "padding": 0.05,
               "round": true
            },
            {
               "name": "yscale",
               "domain": {
                  "data": "table",
                  "field": "amount"
               },
               "nice": true,
               "range": "height"
            }
         ],

         //setting up the axes
         "axes": [
            {
               "orient": "bottom",
               "scale": "xscale"
            },
            {
               "orient": "left",
               "scale": "yscale"
            }
         ],

         //Graphical marks visually encode data using geometric primitives such as rectangles, lines etc.
         "marks": [
            {
               "type": "rect", //describing the rectangle
               "from": {
                  "data": "table" //where this data - > table (line 41)
               },

               //Each mark supports a set of visual encoding properties that determine the position and appearance of mark
               //enter is the basic styling
               //update reacts to clicks
               "encode": {
                  "enter": {
                     "x": {
                        "scale": "xscale",
                        "field": "category"
                     },
                     "width": {
                        "scale": "xscale",
                        "band": 1
                     },
                     "y": {
                        "scale": "yscale",
                        "field": "amount"
                     },
                     "y2": {
                        "scale": "yscale",
                        "value": 0
                     },
                     "fill": {
                        "value": "steelblue"
                     }
                  },
                  "update": {
                     "fill": {
                        "signal": "clickBar == datum.category ? 'black': 'steelblue'"
                     }
                  },
                  "hover": {
                     "fill": {
                        "value": "#2f6089"
                     }
                  }
               }
            },
            {  //mark of the text, that will describe how it will be shown on the chart: position, color, etc
               "type": "text",
               "encode": {
                  "enter": {
                     "align": {
                        "value": "center"
                     },
                     "baseline": {
                        "value": "bottom"
                     },
                     "fill": {
                        "value": "#333"
                     }
                  },
                  "update": {
                     "x": {
                        "scale": "xscale",
                        "signal": "tooltip.category",
                        "band": 0.5
                     },
                     "y": {
                        "scale": "yscale",
                        "signal": "tooltip.amount",
                        "offset": -2
                     },
                     "text": {
                        "signal": "tooltip.amount"
                     },
                     "fillOpacity": [
                        {
                           "test": "datum === tooltip",
                           "value": 0
                        },
                        {
                           "value": 1
                        }
                     ]
                  }
               }
            }
         ]
      }
   }
}