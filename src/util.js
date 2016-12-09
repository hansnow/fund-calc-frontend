/* globals localStorage */
export default {
  store: {
    set (data) {
      localStorage.setItem('funds', JSON.stringify(data))
    },
    get () {
      return JSON.parse(localStorage.getItem('funds'))
    },
    clear () {
      localStorage.clear()
    }
  },
  chart: {
    horizonalLinePlugin: {
      afterDraw: function (chartInstance) {
        var yScale = chartInstance.scales['y-axis-0']
        var canvas = chartInstance.chart
        var ctx = canvas.ctx
        var index
        var line
        var style
        var yValue

        if (chartInstance.options.horizontalLine) {
          for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
            line = chartInstance.options.horizontalLine[index]

            if (!line.style) {
              style = 'rgba(169,169,169, .6)'
            } else {
              style = line.style
            }

            if (line.y) {
              yValue = yScale.getPixelForValue(line.y)
            } else {
              yValue = 0
            }

            ctx.lineWidth = 3

            if (yValue) {
              ctx.beginPath()
              ctx.moveTo(0, yValue)
              ctx.lineTo(canvas.width, yValue)
              ctx.strokeStyle = style
              ctx.stroke()
            }

            if (line.text) {
              ctx.fillStyle = style
              ctx.fillText(line.text, 0, yValue + ctx.lineWidth)
            }
          }
          return
        }
      }
    }
  }
}
