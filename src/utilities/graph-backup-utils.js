import * as d3 from "d3";
import tip from "d3-tip";

export const createScatterPlot = (
  chartRef,
  filteredData,
  xAxisColumn,
  yPredAttribute,
  yTrueAttribute,
  tooltipColumnNames
) => {
  // Make the min flexible
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(filteredData, (d) => d[xAxisColumn]),
      d3.max(filteredData, (d) => d[xAxisColumn]),
    ])
    .range([40, 720]);

  const yScale = d3
    .scaleLinear()
    .domain([
      Math.min(
        d3.min(filteredData, (d) => d[yPredAttribute]),
        0
      ),
      d3.max(filteredData, (d) => d[yPredAttribute]),
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
    const pred = d[yPredAttribute];

    d3.select(this).attr("r", 7).style("fill", "orange");

    tooltip.show(d, this);

    const tooltipBox = chart.append("g").attr("class", "tooltip-box");

    // 48 for x, prob, true
    // 16 for each additional line
    const boxHeight = tooltipColumnNames.length * 16 + 48;

    tooltipBox
      .append("rect")
      .attr("class", "tooltip-rect")
      .attr("x", xScale(d[xAxisColumn]) + 5)
      .attr("y", yScale(pred) - 20)
      .attr("width", 180)
      .attr("height", 80)
      .attr("rx", 5)
      .attr("ry", 5)
      .style("fill", "white");

    const xValue = xScale(d[xAxisColumn]) + 10;
    const yBaseValue = yScale(pred);

    const yOffset = [-5, 10]; // Y offsets for the text lines

    for (let i = 0; i < tooltipColumnNames.length; i++) {
      const tooltipText = `${tooltipColumnNames[i]}: ${
        d[tooltipColumnNames[i]]
      }`;

      tooltipBox
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", xValue)
        .attr("y", yBaseValue + yOffset[i])
        .text(tooltipText)
        .style("font-size", "12px");
    }

    tooltipBox
      .append("text")
      .attr("class", "tooltip-text")
      .attr("x", xScale(d[xAxisColumn]) + 10)
      .attr("y", yScale(pred) + 25)
      .text(`${xAxisColumn}: ${d[xAxisColumn]}`)
      .style("font-size", "12px");

    tooltipBox
      .append("text")
      .attr("class", "tooltip-text")
      .attr("x", xScale(d[xAxisColumn]) + 10)
      .attr("y", yScale(pred) + 40)
      .text(`${yPredAttribute}: ${Math.round(pred * 100) / 100}`)
      .style("font-size", "12px")
      .style("font-weight", "bold");

    // Only plot if the true value is not null
    if (yTrueAttribute !== null) {
      tooltipBox
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", xScale(d[xAxisColumn]) + 10)
        .attr("y", yScale(pred) + 55)
        .text(`${yTrueAttribute}: ${d[yTrueAttribute]}`)
        .style("font-size", "12px");
    }
  }

  function handleMouseOut(event, d) {
    const fillColor =
      d[yTrueAttribute] === "Y" || d[yTrueAttribute] === 1 ? "green" : "red";

    d3.select(this).attr("r", 5).style("fill", fillColor);

    tooltip.hide(d);

    chart.selectAll(".tooltip-box").remove();
  }

  chart
    .selectAll("circle")
    .data(filteredData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[xAxisColumn]))
    .attr("cy", (d) => yScale(d[yPredAttribute]))
    .attr("r", 5)
    .style("fill", (d) =>
      d[yTrueAttribute] === "Y" || d[yTrueAttribute] === 1 ? "green" : "red"
    ) // Update the fill color based on "Champion" value
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

export const handleXAxisChange = (event, setXAxisColumn) => {
  setXAxisColumn(event.target.value);
};
