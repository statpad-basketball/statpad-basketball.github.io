import * as d3 from "d3";
import tip from "d3-tip";

export const createScatterPlot = (chartRef, filteredData, xAxisColumn) => {
  const xScale = d3
    .scaleLinear()
    .domain([
      Math.min(
        d3.min(filteredData, (d) => d[xAxisColumn]),
        0
      ),
      d3.max(filteredData, (d) => d[xAxisColumn]),
    ])
    .range([40, 720]);

  const yScale = d3
    .scaleLinear()
    .domain([
      Math.min(
        d3.min(filteredData, (d) => d.Prediction),
        0
      ),
      d3.max(filteredData, (d) => d.Prediction),
    ])
    .range([360, 40]);

  const xAxis = d3.axisBottom(xScale).ticks(5).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(5).tickSizeOuter(0);

  const chart = d3.select(chartRef.current);

  chart.selectAll("*").remove();

  chart
    .append("rect")
    .attr("x", 40)
    .attr("y", 40)
    .attr("width", 720)
    .attr("height", 320)
    .attr("stroke", "black")
    .attr("fill", "none");

  const tooltip = tip().attr("class", "d3-tip").offset([-10, 0]);

  chart.call(tooltip);

  // Define handleMouseOver and handleMouseOut functions
  function handleMouseOver(event, d) {
    const { Player, Prediction, Hall_of_Fame, Eligible } = d;

    d3.select(this).attr("r", 7).style("fill", "orange");

    tooltip.show(d, this);

    const tooltipBox = chart.append("g").attr("class", "tooltip-box");

    tooltipBox
      .append("rect")
      .attr("class", "tooltip-rect")
      .attr("x", xScale(d[xAxisColumn]) + 5)
      .attr("y", yScale(Prediction) - 20)
      .attr("width", 180)
      .attr("height", 60)
      .attr("rx", 5)
      .attr("ry", 5)
      .style("fill", "white");

    tooltipBox
      .append("text")
      .attr("class", "tooltip-text")
      .attr("x", xScale(d[xAxisColumn]) + 10)
      .attr("y", yScale(Prediction) - 5)
      .text(`Player: ${Player}`)
      .style("font-size", "12px");

    tooltipBox
      .append("text")
      .attr("class", "tooltip-text")
      .attr("x", xScale(d[xAxisColumn]) + 10)
      .attr("y", yScale(Prediction) + 25)
      .text(`${xAxisColumn}: ${d[xAxisColumn]}`)
      .style("font-size", "12px");

    tooltipBox
      .append("text")
      .attr("class", "tooltip-text")
      .attr("x", xScale(d[xAxisColumn]) + 10)
      .attr("y", yScale(Prediction) + 10)
      .text(`Probability: ${Math.round(Prediction * 100) / 100}`)
      .style("font-size", "12px");

    if (Eligible === 1) {
      tooltipBox
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", xScale(d[xAxisColumn]) + 10)
        .attr("y", yScale(Prediction) + 40)
        .text(`HOF: ${Hall_of_Fame}`)
        .style("font-size", "12px");
    } else {
      tooltipBox
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", xScale(d[xAxisColumn]) + 10)
        .attr("y", yScale(Prediction) + 40)
        .text("HOF: Not Eligible Yet")
        .style("font-size", "12px");
    }
  }

  function handleMouseOut(event, d) {
    d3.select(this).attr("r", 5).style("fill", "steelblue");

    tooltip.hide(d);

    chart.selectAll(".tooltip-box").remove();
  }

  chart
    .selectAll("circle")
    .data(filteredData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[xAxisColumn]))
    .attr("cy", (d) => yScale(d.Prediction))
    .attr("r", 5)
    .style("fill", "steelblue")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  chart.append("g").attr("transform", "translate(0, 360)").call(xAxis);
  chart.append("g").attr("transform", "translate(40, 0)").call(yAxis);

  chart
    .append("text")
    .attr("x", 400)
    .attr("y", 400)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text(xAxisColumn);

  chart
    .append("text")
    .attr("x", -180)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("font-size", "14px")
    .text("Prediction");

  chart
    .append("text")
    .attr("x", 400)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text(`Scatter plot of ${xAxisColumn} vs Prediction`);
};
