
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	AreaSeries,
	LineSeries
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class AreaChartWithEdge extends React.Component {
	render() {
		const { type, data: initialData, width, height, ratio, symbol } = this.props;

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];
		return (
			<ChartCanvas height={height}
				ratio={ratio}
				width={width}
				margin={{ left: 10, right: 50, top: 10, bottom: 30 }}
				type={type}
				seriesName={symbol}
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1} yExtents={d => d.close}>

					<XAxis axisAt="bottom" orient="bottom" ticks={10} tickStroke="white" />
					<YAxis axisAt="right" orient="right" ticks={10} tickStroke="white" />

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<LineSeries yAccessor={d => d.close} strokeWidth={2} fill="#343a40" />

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
				<Chart id={2} yExtents={d => d.volume} height={150} origin={(w, h) => [0, h - 150]} >

					<BarSeries yAccessor={d => d.volume}
						fill={(d) => d.close > d.open ? "#28a745" : "#dc3545"}
						opacity={0.4}
						widthRatio={0.5} />
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

AreaChartWithEdge.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChartWithEdge.defaultProps = {
	type: "svg",
};
AreaChartWithEdge = fitWidth(AreaChartWithEdge);

export default AreaChartWithEdge;
