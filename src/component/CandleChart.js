import React from "react";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { utcDay } from "d3-time";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import AreaSeries from "react-stockcharts/lib/series/AreaSeries";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";

let CandleChart = (props) => {
  const { data, type, width, height, ratio, symbol } = props;
  const xAccessor = (d) => {
    return d.date;
  };
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() -14);

  const numberFormat = format(".2f");

  const tooltipContent = (ys) => {
    return ({ currentItem, xAccessor }) => {
      return {
        x: (xAccessor(currentItem)),
        y: [
          {
            label: "open",
            value: currentItem.open && numberFormat(currentItem.open)
          },
          {
            label: "close",
            value: currentItem.close && numberFormat(currentItem.close)
          },{
            label: "low",
            value: currentItem.low && numberFormat(currentItem.low)
          },{
            label: "high",
            value: currentItem.high && numberFormat(currentItem.high)
          }
        ]
        .concat(
          ys.map(each => ({
            label: each.label,
            value: each.value(currentItem),
            stroke: each.stroke
          }))
        )
        .filter(line => line.value)
      }
    }
  }


  return (
    <div className="ChartJS">
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        data={data}
        seriesName={symbol}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={[startDate, currentDate]}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="right" orient="right" />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
          <AreaSeries yAccessor={(d) => d.close} />
          <HoverTooltip
            yAccessor={(d) => [d.high, d.low]}
            tooltipContent={tooltipContent([])}
            fontSize={14}
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

CandleChart.prototype = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleChart.defaultProps = {
  type: "hybird",
};

CandleChart = fitWidth(CandleChart);

export default CandleChart;