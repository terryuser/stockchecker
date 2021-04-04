
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
import { count } from "d3-array";
import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";

import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class AreaChart extends React.Component {
	render() {
		const { data, type, width, height, ratio, symbol } = this.props;

		const currentDate = data[10].date;
		const startDate = data[count(data) - 1].date;

		return (
			<ChartCanvas ratio={ratio} width={width} height={height}
				margin={{ left: 10, right: 50, top: 10, bottom: 30 }}
				seriesName={symbol}
				data={data} type={type}
				xAccessor={d => d.date}
				xScale={scaleTime()}
				xExtents={[startDate, currentDate]}
			>
				<Chart id={1} yExtents={d => d.close}>
					<defs>
						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
							<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
							<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
							<stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
						</linearGradient>
					</defs>
					<XAxis axisAt="bottom" orient="bottom" ticks={20} tickStroke="white" />
					<YAxis axisAt="right" orient="right" tickStroke="white" />
					<AreaSeries
						yAccessor={d => d.close}
						fill="url(#MyGradient)"
						strokeWidth={2}
						interpolation={curveMonotoneX}
						canvasGradient={canvasGradient}
					/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />
					<SingleValueTooltip
						yLabel="Open" yAccessor={(d) => d.open}
						origin={[0, 0]} />
					<SingleValueTooltip
						yLabel="Close" yAccessor={(d) => d.close}
						origin={[0, 20]} />
					<SingleValueTooltip
						yLabel="High" yAccessor={(d) => d.high}
						origin={[0, 40]} />
					<SingleValueTooltip
						yLabel="Low" yAccessor={(d) => d.low}
						origin={[0, 60]} />
					<SingleValueTooltip
						yLabel="Volume" yAccessor={(d) => d.volume}
						origin={[0, 80]} />
				</Chart>
				<Chart id={2}
					yExtents={[d => d.volume]}
					height={150} origin={(w, h) => [0, h - 150]}
				>
					<BarSeries yAccessor={d => d.volume}
						widthRatio={1}
						opacity={0.3}
						stroke fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}
						width={5}
					/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}


AreaChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
	type: "svg",
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;